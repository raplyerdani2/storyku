export const getShow = {
  showStories: async (model, view, token) => {
    const data = await model.getStories(token);
    data?.listStory.forEach(async (element) => await saveStoryIdb(element));
    view.renderStories(data.listStory || []);
  },
  showDetail: async (model, view, token, id) => {
    const data = await model.getStoryById(id, token);
    view.renderDetail(data.story);
  },
};
