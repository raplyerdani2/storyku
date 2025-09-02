export class Router {
  constructor(app) {
    this.routes = {};
    this.app = app;
  }

  register(path, callback) {
    this.routes[path] = callback;
  }

  resolve() {
    const hash = location.hash.slice(1) || "/stories";
    const parts = hash.split("/").filter(Boolean);

    const directPath = "/" + parts.join("/");
    if (this.routes[directPath]) {
      this.routes[directPath]();
      return;
    }

    if (parts.length === 2) {
      const basePath = `/${parts[0]}/:id`;
      if (this.routes[basePath]) {
        this.routes[basePath]({ id: parts[1] });
        return;
      }
    }

    this.app.innerHTML = "<h2>Halaman Tidak Ditemukan (404)</h2>";
  }

  init() {
    window.addEventListener("load", () => this.resolve());
  }
}
