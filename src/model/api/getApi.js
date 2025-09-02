import { getAllStoriesIdb } from "../../utils/db.js";

export const getApi = {
  getStories: async (url, token) => {
    const res = await fetch(`${url}/stories`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = res.json();
    return data;
  },

  getDetailStories: async (url, id, token) => {
    const res = await fetch(`${url}/stories/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
  },
};
