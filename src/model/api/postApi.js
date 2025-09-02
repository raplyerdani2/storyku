export const postApi = {
  register: async ({ url, name, email, password }) => {
    try {
      const res = await fetch(`${url}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      return res.json();
    } catch (err) {
      return { error: true, message: "Gagal terhubung ke server" };
    }
  },

  login: async ({ url, email, password }) => {
    try {
      const res = await fetch(`${url}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.loginResult?.token) {
        localStorage.setItem("token", data.loginResult.token);
      }
      return data;
    } catch (e) {
      console.log(e);
    }
  },

  addStory: async (url, data, token) => {
    try {
      const res = await fetch(`${url}/stories`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });
      return await res.json();
    } catch (err) {
      return { error: true, message: err.message };
    }
  },
};
