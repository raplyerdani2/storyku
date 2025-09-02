import { getApi } from "./api/getApi.js";
import { postApi } from "./api/postApi.js";

export class StoryModel {
  async getStories(token) {
    return getApi.getStories("https://story-api.dicoding.dev/v1", token);
  }

  async getStoryById(id, token) {
    return getApi.getDetailStories(
      "https://story-api.dicoding.dev/v1",
      id,
      token
    );
  }

  async register({ name, email, password }) {
    return postApi.register({
      url: "https://story-api.dicoding.dev/v1",
      name,
      email,
      password,
    });
  }

  async login({ email, password }) {
    return postApi.login({
      url: "https://story-api.dicoding.dev/v1",
      email,
      password,
    });
  }

  async addStory(data, token) {
    return postApi.addStory("https://story-api.dicoding.dev/v1", data, token);
  }
}
