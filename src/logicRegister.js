import { StoryModel } from "./model/storyModel.js";
import { StoryPresenter } from "./presenter/storyPresenter.js";
import { StoryView } from "./view/storyView.js";

export const logicRegister = {
  get: {
    stories: (app) => {
      if (!localStorage.getItem("token")) {
        location.hash = "/login";
        return;
      }
      const modelStory = new StoryModel();
      const viewStory = new StoryView(app);
      const presenterStory = new StoryPresenter(
        modelStory,
        viewStory,
        localStorage.getItem("token")
      );
      presenterStory.showStories();
    },
    detailStories: (app, params) => {
      if (!localStorage.getItem("token")) {
        location.hash = "/login";
        return;
      }
      const modelStory = new StoryModel();
      const viewStory = new StoryView(app);
      const presenterStory = new StoryPresenter(
        modelStory,
        viewStory,
        localStorage.getItem("token")
      );
      presenterStory.showDetail(params.id);
    },
  },
  post: {
    register: (app, storyModel) => {
      const view = new StoryView(app);
      const presenter = new StoryPresenter(storyModel, view);
      view.renderRegister((data) => presenter.handleRegister(data));
    },
    login: (app, storyModel) => {
      const view = new StoryView(app);
      const presenter = new StoryPresenter(storyModel, view);
      view.renderLogin((data) => presenter.handleLogin(data));
    },
    addData: (app, storyModel) => {
      if (!localStorage.getItem("token")) {
        location.hash = "/login";
        return;
      }
      const view = new StoryView(app);
      const presenter = new StoryPresenter(
        storyModel,
        view,
        localStorage.getItem("token")
      );
      view.renderAddForm((formData) => presenter.handleAddStory(formData));
    },
  },
};
