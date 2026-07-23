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
    let title = "";
    let caption = "";
    let location = "";
    let dateInput = "";
    let gallery: string[] = [];

    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      const body = (await request.json()) as {
        title?: string;
        caption?: string;
        location?: string;
        date?: string;
        images?: string[];
      };
      title = String(body.title ?? "").trim();
      caption = String(body.caption ?? "").trim();
      location = String(body.location ?? "").trim();
      dateInput = String(body.date ?? "").trim();
      gallery = Array.isArray(body.images) ? body.images : [];
    } else {
      const formData = await request.formData();
      title = String(formData.get("title") ?? "").trim();
      caption = String(formData.get("caption") ?? "").trim();
      location = String(formData.get("location") ?? "").trim();
      dateInput = String(formData.get("date") ?? "").trim();
      const images = formData
        .getAll("images")
        .filter((item): item is File => item instanceof File);

      const storyId = `story-${Date.now()}`;
      gallery = await saveStoryImages(storyId, images);
    }

    if (!title) {
      return NextResponse.json({ error: "Title is required." }, { status: 400 });
    }

    if (!caption) {
      return NextResponse.json({ error: "Caption is required." }, { status: 400 });
    }

    if (!location) {
      return NextResponse.json({ error: "Location is required." }, { status: 400 });
    }

    if (gallery.length === 0) {
      return NextResponse.json(
        { error: "At least one image is required." },
        { status: 400 }
      );
    }

    const storyId = `story-${Date.now()}`;
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
      {
        error:
          error instanceof Error ? error.message : "Failed to upload story. Please try again.",
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";

    let id = "";
    let title = "";
    let caption = "";
    let location = "";
    let dateInput = "";
    let existingGallery: string[] | undefined;
    let newImages: File[] = [];

    if (contentType.includes("application/json")) {
      const body = (await request.json()) as {
        id?: string;
        title?: string;
        caption?: string;
        location?: string;
        date?: string;
        existingGallery?: string[];
        newImages?: string[];
      };
      id = String(body.id ?? "").trim();
      title = String(body.title ?? "").trim();
      caption = String(body.caption ?? "").trim();
      location = String(body.location ?? "").trim();
      dateInput = String(body.date ?? "").trim();
      existingGallery = Array.isArray(body.existingGallery) ? body.existingGallery : undefined;
      const extraImages = Array.isArray(body.newImages) ? body.newImages : [];
      if (existingGallery && extraImages.length > 0) {
        existingGallery = [...existingGallery, ...extraImages];
      }
    } else {
      const formData = await request.formData();
      id = String(formData.get("id") ?? "").trim();
      title = String(formData.get("title") ?? "").trim();
      caption = String(formData.get("caption") ?? "").trim();
      location = String(formData.get("location") ?? "").trim();
      dateInput = String(formData.get("date") ?? "").trim();
      const existingGalleryRaw = formData.get("existingGallery");
      newImages = formData
        .getAll("newImages")
        .filter((item): item is File => item instanceof File);

      if (existingGalleryRaw) {
        try {
          existingGallery = JSON.parse(String(existingGalleryRaw));
        } catch {
          existingGallery = undefined;
        }
      }
    }

    if (!id) {
      return NextResponse.json({ error: "Story ID is required." }, { status: 400 });
    }

    if (!title || !caption || !location) {
      return NextResponse.json(
        { error: "Title, caption, and location are required." },
        { status: 400 }
      );
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
