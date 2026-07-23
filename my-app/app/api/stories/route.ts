import { NextResponse } from "next/server";
import {
  deleteStory,
  formatDisplayDate,
  getAllStories,
  readUploadedStories,
  saveStoryImages,
  updateStory,
  writeUploadedStories,
  type Story,
} from "@/lib/stories";

export const runtime = "nodejs";

export async function GET() {
  const stories = await getAllStories();
  return NextResponse.json(stories);
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const title = String(formData.get("title") ?? "").trim();
    const caption = String(formData.get("caption") ?? "").trim();
    const location = String(formData.get("location") ?? "").trim();
    const dateInput = String(formData.get("date") ?? "").trim();
    const images = formData.getAll("images").filter((item): item is File => item instanceof File);

    if (!title) {
      return NextResponse.json({ error: "Title is required." }, { status: 400 });
    }

    if (!caption) {
      return NextResponse.json({ error: "Caption is required." }, { status: 400 });
    }

    if (!location) {
      return NextResponse.json({ error: "Location is required." }, { status: 400 });
    }

    if (images.length === 0) {
      return NextResponse.json({ error: "At least one image is required." }, { status: 400 });
    }

    const storyId = `story-${Date.now()}`;
    const gallery = await saveStoryImages(storyId, images);
    const createdAt = dateInput
      ? new Date(dateInput).toISOString()
      : new Date().toISOString();

    const newStory: Story = {
      id: storyId,
      title,
      caption,
      date: formatDisplayDate(dateInput || createdAt),
      location,
      coverImage: gallery[0],
      gallery,
      createdAt,
    };

    const uploadedStories = await readUploadedStories();
    uploadedStories.unshift(newStory);
    await writeUploadedStories(uploadedStories);

    return NextResponse.json(newStory, { status: 201 });
  } catch (error) {
    console.error("Failed to create story:", error);
    return NextResponse.json(
      { error: "Failed to upload story. Please try again." },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const formData = await request.formData();
    const id = String(formData.get("id") ?? "").trim();
    const title = String(formData.get("title") ?? "").trim();
    const caption = String(formData.get("caption") ?? "").trim();
    const location = String(formData.get("location") ?? "").trim();
    const dateInput = String(formData.get("date") ?? "").trim();
    const existingGalleryRaw = formData.get("existingGallery");
    const newImages = formData.getAll("newImages").filter(
      (item): item is File => item instanceof File
    );

    if (!id) {
      return NextResponse.json({ error: "Story ID is required." }, { status: 400 });
    }

    if (!title || !caption || !location) {
      return NextResponse.json(
        { error: "Title, caption, and location are required." },
        { status: 400 }
      );
    }

    let existingGallery: string[] | undefined;
    if (existingGalleryRaw) {
      try {
        existingGallery = JSON.parse(String(existingGalleryRaw));
      } catch {
        existingGallery = undefined;
      }
    }

    const updatedStory = await updateStory(id, {
      title,
      caption,
      location,
      date: dateInput || undefined,
      newImages,
      existingGallery,
    });

    return NextResponse.json(updatedStory);
  } catch (error) {
    console.error("Failed to update story:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update story." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Story ID is required." }, { status: 400 });
    }

    await deleteStory(id);
    return NextResponse.json({ success: true, message: "Story deleted successfully." });
  } catch (error) {
    console.error("Failed to delete story:", error);
    return NextResponse.json(
      { error: "Failed to delete story. Please try again." },
      { status: 500 }
    );
  }
}
