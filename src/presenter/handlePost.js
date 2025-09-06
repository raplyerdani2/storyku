import { askNotificationPermission, subscribeUser } from "../index.js";

export const handlePost = {
  handleRegister: async (model, view, formData) => {
    view.showLoading();
    try {
      const result = await model.register(formData);
      if (!result.error) {
        view.showMessage("Registrasi berhasil.");
        view.navigate("/login");
      } else {
        alert(result.message);
        view.reload();
      }
    } catch (err) {
      alert("Terjadi kesalahan pada server.");
    }
  },

  handleLogin: async (model, view, formData) => {
    view.showLoading();
    try {
      const result = await model.login(formData);
      if (!result.error) {
        view.showMessage("Login berhasil.");
        view.navigate("/stories");
        view.reload();
      } else {
        view.showMessage(result.message);
        view.reload();
      }
    } catch (err) {
      alert("Terjadi kesalahan pada server.");
    }
  },

  handleAddStory: async (model, view, token, formData) => {
    view.showLoading();
    const reg = await navigator.serviceWorker.getRegistration();
    if (reg) {
      const permission = await askNotificationPermission();
      if (permission === "granted") {
        await subscribeUser(reg);
      }
    }
    const res = await model.addStory(formData, token);
      if (res.error) {
        view.showMessage(res.message);
        view.reload();
      } else {
        view.showMessage("Story berhasil ditambahkan!");
        view.navigate("/stories");
        view.reload();
      }
  },
};
