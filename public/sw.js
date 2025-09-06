import { precacheAndRoute } from "workbox-precaching";

precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener("install", (event) => {
  console.log("Service worker is installing...");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(cacheNames.map((cache) => caches.delete(cache)));
    })
  );
});

const shownNotifications = new Set();

self.addEventListener("push", (event) => {
  let data = {};
  if (event.data) {
    try {
      data = event.data.json();
    } catch {
      data = { title: "Notifikasi Baru" };
    }
  }

  const storyId = data?.options?.data?.storyId || data?.storyId;

  if (storyId && shownNotifications.has(storyId)) {
    console.log("Notifikasi untuk story ini sudah pernah ditampilkan, skip...");
    return;
  }

  if (storyId) shownNotifications.add(storyId);

  const title = data.title || "Notifikasi Baru";
  const options = data.options || {
    body: "Ada story baru nih!",
    icon: "/icon.png",
    badge: "/badge.png",
    data: { storyId },
  };

  event.waitUntil(self.registration.showNotification(title, options));
});