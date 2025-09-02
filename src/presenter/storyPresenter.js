import { getShow } from "./getShow.js";
import { handlePost } from "./handlePost.js";

export class StoryPresenter {
  constructor(model, view, token) {
    this.model = model;
    this.view = view;
    this.token = token;
  }

  async showStories() {
    return getShow.showStories(this.model, this.view, this.token);
  }

  async showDetail(id) {
    return getShow.showDetail(this.model, this.view, this.token, id);
  }

  async handleRegister(formData) {
    return handlePost.handleRegister(this.model, this.view, formData);
  }

  async handleLogin(formData) {
    return handlePost.handleLogin(this.model, this.view, formData);
  }

  async handleAddStory(formData) {
    return handlePost.handleAddStory(
      this.model,
      this.view,
      this.token,
      formData
    );
  }
}
