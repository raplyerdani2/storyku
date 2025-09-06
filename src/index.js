import "./style.css";
import "./style/stories.css";
import "./style/detailStory.css";
import "./style/register.css";
import "./style/login.css";
import "./style/addStory.css";

import { Router } from "./router.js";
import { StoryModel } from "./model/storyModel.js";
import { logicRegister } from "./logicRegister.js";

const app = document.getElementById("app");
const router = new Router(app);
const storyModel = new StoryModel();

router.register("/stories", () => logicRegister.get.stories(app));

router.register("/stories/:id", (params) =>
  logicRegister.get.detailStories(app, params)
);

router.register("/register", () =>
  logicRegister.post.register(app, storyModel)
);

router.register("/login", () => logicRegister.post.login(app, storyModel));

router.register("/add-data", () => logicRegister.post.addData(app, storyModel));

router.init();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.bundle.js")
      .then((registration) => {
        console.log("✅ Service Worker terdaftar:", registration);
      })
      .catch((error) => {
        console.error("❌ Gagal mendaftarkan Service Worker:", error);
      });
  });
}

// document.querySelector("#skipcontent").addEventListener("click", (e) => {
//   e.preventDefault();
//   const app = document.getElementById("toContent");
//   if (app) {
//     app.setAttribute("tabindex", "-1");
//     app.focus();
//   }
// });

// window.addEventListener("hashchange", () => {
//   if (document.startViewTransition) {
//     document.startViewTransition(() => {
//       renderPage();
//     });
//   } else {
//     renderPage();
//   }
// });

// window.addEventListener("hashchange", () => {
//   if (document.startViewTransition) {
//     document.startViewTransition(() => {
//       router.resolve();
//     });
//   } else {
//     router.resolve();
//   }
// });

// if ("serviceWorker" in navigator) {
//   window.addEventListener("load", async () => {
//     try {
//       const reg = await navigator.serviceWorker.register("/sw.js");
//       console.log("✅ Service Worker terdaftar:", reg);
//     } catch (err) {
//       console.error("❌ Gagal daftar Service Worker:", err);
//     }
//   });
// }

// export async function askNotificationPermission() {
//   return await Notification.requestPermission();
// }

// function urlBase64ToUint8Array(base64String) {
//   const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
//   const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

//   const rawData = window.atob(base64);
//   return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
// }

// export async function subscribeUser(reg) {
//   let subscription = await reg.pushManager.getSubscription();

//   if (subscription) {
//     console.log("Unsubscribing old subscription...");
//     await subscription.unsubscribe();
//   }

//   subscription = await reg.pushManager.subscribe({
//     userVisibleOnly: true,
//     applicationServerKey: urlBase64ToUint8Array(
//       "BCCs2eonMI-6H2ctvFaWg-UYdDv387Vno_bzUzALpB442r2lCnsHmtrx8biyPi_E-1fSGABK_Qs_GlvPoJJqxbk"
//     ),
//   });

//   console.log("Push Subscription baru:", subscription.toJSON());

//   await fetch("https://story-api.dicoding.dev/v1/notifications/subscribe", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${localStorage.getItem("token")}`,
//     },
//     body: JSON.stringify({
//       endpoint: subscription.endpoint,
//       keys: {
//         p256dh: subscription.toJSON().keys.p256dh,
//         auth: subscription.toJSON().keys.auth,
//       },
//     }),
//   });

//   console.log("Notif berhasil dikirim!");
//   return subscription;
// }

// document.addEventListener("DOMContentLoaded", async () => {
//   console.log("Berhasil mendaftarkan service worker.");
// });
