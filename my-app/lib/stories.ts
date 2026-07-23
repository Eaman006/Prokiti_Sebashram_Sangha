import { promises as fs } from "fs";
import path from "path";
import os from "os";
import { SEED_STORIES, type Story } from "./seedStories";

const LOCAL_STORIES_FILE = path.join(process.cwd(), "data", "stories.json");
const TMP_STORIES_FILE = path.join(os.tmpdir(), "pss_stories.json");

const LOCAL_DELETED_FILE = path.join(process.cwd(), "data", "deleted_stories.json");
const TMP_DELETED_FILE = path.join(os.tmpdir(), "pss_deleted_stories.json");

// In-memory cache for Vercel serverless environments
declare global {
  // eslint-disable-next-line no-var
  var _uploadedStoriesCache: Story[] | undefined;
  // eslint-disable-next-line no-var
  var _deletedStoryIdsCache: string[] | undefined;
}

export async function readUploadedStories(): Promise<Story[]> {
  if (globalThis._uploadedStoriesCache) {
    return globalThis._uploadedStoriesCache;
  }

  // 1. Try local project file (local development)
  try {
    const raw = await fs.readFile(LOCAL_STORIES_FILE, "utf-8");
    const parsed = JSON.parse(raw) as Story[];
    if (Array.isArray(parsed)) {
      globalThis._uploadedStoriesCache = parsed;
      return parsed;
    }
  } catch {}

  // 2. Try /tmp file (Vercel serverless)
  try {
    const raw = await fs.readFile(TMP_STORIES_FILE, "utf-8");
    const parsed = JSON.parse(raw) as Story[];
    if (Array.isArray(parsed)) {
      globalThis._uploadedStoriesCache = parsed;
      return parsed;
    }
  } catch {}

  globalThis._uploadedStoriesCache = [];
  return [];
}

export async function writeUploadedStories(stories: Story[]): Promise<void> {
  globalThis._uploadedStoriesCache = stories;

  // Try writing to local project dir first
  try {
    await fs.mkdir(path.dirname(LOCAL_STORIES_FILE), { recursive: true });
    await fs.writeFile(LOCAL_STORIES_FILE, JSON.stringify(stories, null, 2), "utf-8");
  } catch {
    // Fallback to /tmp directory on Vercel
    try {
      await fs.writeFile(TMP_STORIES_FILE, JSON.stringify(stories, null, 2), "utf-8");
    } catch {}
  }
}

export async function readDeletedStoryIds(): Promise<string[]> {
  if (globalThis._deletedStoryIdsCache) {
    return globalThis._deletedStoryIdsCache;
  }

  try {
    const raw = await fs.readFile(LOCAL_DELETED_FILE, "utf-8");
    const parsed = JSON.parse(raw) as string[];
    if (Array.isArray(parsed)) {
      globalThis._deletedStoryIdsCache = parsed;
      return parsed;
    }
  } catch {}

  try {
    const raw = await fs.readFile(TMP_DELETED_FILE, "utf-8");
    const parsed = JSON.parse(raw) as string[];
    if (Array.isArray(parsed)) {
      globalThis._deletedStoryIdsCache = parsed;
      return parsed;
    }
  } catch {}

  globalThis._deletedStoryIdsCache = [];
  return [];
}

export async function writeDeletedStoryIds(ids: string[]): Promise<void> {
  globalThis._deletedStoryIdsCache = ids;

  try {
    await fs.mkdir(path.dirname(LOCAL_DELETED_FILE), { recursive: true });
    await fs.writeFile(LOCAL_DELETED_FILE, JSON.stringify(ids, null, 2), "utf-8");
  } catch {
    try {
      await fs.writeFile(TMP_DELETED_FILE, JSON.stringify(ids, null, 2), "utf-8");
    } catch {}
  }
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
  _storyId: string,
  files: File[]
): Promise<string[]> {
  const imagePaths: string[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const buffer = Buffer.from(await file.arrayBuffer());
    const mimeType = file.type || "image/jpeg";
    const dataUrl = `data:${mimeType};base64,${buffer.toString("base64")}`;
    imagePaths.push(dataUrl);
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
