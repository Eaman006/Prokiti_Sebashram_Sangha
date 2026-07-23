import { promises as fs } from "fs";
import path from "path";
import { SEED_STORIES, type Story } from "./seedStories";

const STORIES_FILE = path.join(process.cwd(), "data", "stories.json");
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "stories");

const DELETED_STORIES_FILE = path.join(process.cwd(), "data", "deleted_stories.json");

export async function readUploadedStories(): Promise<Story[]> {
  try {
    const raw = await fs.readFile(STORIES_FILE, "utf-8");
    const parsed = JSON.parse(raw) as Story[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function writeUploadedStories(stories: Story[]): Promise<void> {
  await fs.mkdir(path.dirname(STORIES_FILE), { recursive: true });
  await fs.writeFile(STORIES_FILE, JSON.stringify(stories, null, 2), "utf-8");
}

export async function readDeletedStoryIds(): Promise<string[]> {
  try {
    const raw = await fs.readFile(DELETED_STORIES_FILE, "utf-8");
    const parsed = JSON.parse(raw) as string[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function writeDeletedStoryIds(ids: string[]): Promise<void> {
  await fs.mkdir(path.dirname(DELETED_STORIES_FILE), { recursive: true });
  await fs.writeFile(DELETED_STORIES_FILE, JSON.stringify(ids, null, 2), "utf-8");
}

export async function getAllStories(): Promise<Story[]> {
  const uploaded = await readUploadedStories();
  const deletedIds = new Set(await readDeletedStoryIds());
  const merged = [...uploaded, ...SEED_STORIES].filter(
    (story) => !deletedIds.has(story.id)
  );
  return merged.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function deleteStory(id: string): Promise<boolean> {
  const uploaded = await readUploadedStories();
  const isUploaded = uploaded.some((s) => s.id === id);

  if (isUploaded) {
    const updated = uploaded.filter((s) => s.id !== id);
    await writeUploadedStories(updated);
  }

  const deletedIds = await readDeletedStoryIds();
  if (!deletedIds.includes(id)) {
    deletedIds.push(id);
    await writeDeletedStoryIds(deletedIds);
  }

  return true;
}

export async function updateStory(
  id: string,
  updates: {
    title: string;
    caption: string;
    location: string;
    date?: string;
    newImages?: File[];
    existingGallery?: string[];
  }
): Promise<Story> {
  const uploaded = await readUploadedStories();
  const allStories = await getAllStories();
  const existingStory = allStories.find((s) => s.id === id);

  if (!existingStory) {
    throw new Error("Story not found.");
  }

  let updatedGallery = updates.existingGallery ?? existingStory.gallery;
  if (updates.newImages && updates.newImages.length > 0) {
    const newPaths = await saveStoryImages(id, updates.newImages);
    updatedGallery = [...updatedGallery, ...newPaths];
  }

  if (updatedGallery.length === 0) {
    throw new Error("Story must have at least one image.");
  }

  const updatedDateStr = updates.date
    ? formatDisplayDate(updates.date)
    : existingStory.date;

  const updatedStory: Story = {
    ...existingStory,
    title: updates.title.trim(),
    caption: updates.caption.trim(),
    location: updates.location.trim(),
    date: updatedDateStr,
    coverImage: updatedGallery[0],
    gallery: updatedGallery,
  };

  const index = uploaded.findIndex((s) => s.id === id);
  if (index !== -1) {
    uploaded[index] = updatedStory;
  } else {
    uploaded.unshift(updatedStory);
  }

  await writeUploadedStories(uploaded);
  return updatedStory;
}

export async function saveStoryImages(
  storyId: string,
  files: File[]
): Promise<string[]> {
  const storyDir = path.join(UPLOAD_DIR, storyId);
  await fs.mkdir(storyDir, { recursive: true });

  const imagePaths: string[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const ext = path.extname(file.name).toLowerCase() || ".jpg";
    const filename = `${Date.now()}-${i}${ext}`;
    const filePath = path.join(storyDir, filename);
    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(filePath, buffer);
    imagePaths.push(`/uploads/stories/${storyId}/${filename}`);
  }

  return imagePaths;
}

export function formatDisplayDate(dateInput?: string): string {
  const date = dateInput ? new Date(dateInput) : new Date();
  if (Number.isNaN(date.getTime())) {
    return new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export type { Story };
