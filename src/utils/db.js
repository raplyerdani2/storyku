import { openDB } from "idb";

const DB_NAME = "storyku-db";
const DB_VERSION = 2;
const STORIES_STORE = "stories";
const DETAIL_STORY_STORE = "stories-id";

export const initDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORIES_STORE)) {
        db.createObjectStore(STORIES_STORE, { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains(DETAIL_STORY_STORE)) {
        db.createObjectStore(DETAIL_STORY_STORE, { keyPath: "id" });
      }
    },
  });
};

export const saveStoryIdb = async (story) => {
  const db = await initDB();
  await db.put(STORIES_STORE, story);
};

export const getAllStoriesIdb = async () => {
  const db = await initDB();
  return await db.getAll(STORIES_STORE);
};

export const saveDetailStoryIdb = async (story) => {
  const db = await initDB();
  await db.put(DETAIL_STORY_STORE, story);
};

export const getDetailStoryIdb = async (id) => {
  const db = await initDB();
  return await db.get(DETAIL_STORY_STORE, id);
};

export const clearStoriesIdb = async () => {
  const db = await initDB();
  await db.clear("stories");
};
