export const addStoryPage = (root, onSubmit) => {
  root.innerHTML = `
    <div id="addStoryContainer">
      <div id="addStoryContainer2">
        <h2>Tambah Story Baru</h2>
        <form id="addStoryForm">
          <div id="mediaAddStory">
            <div style="width: 100%; display: flex; flex-direction: column; align-items: center; gap: 10px;">
              <label tabindex="0">Lokasi Favorit</label>
              <div id="mapAddData"></div>
            </div>
            <div style="width: 100%; display: flex; flex-direction: column; align-items: center; gap: 10px;">
              <label tabindex="0">Foto</label>
              <div id="photoAddData">
                <div id="photoAddData2">
                  <video id="camera" autoplay playsinline style="width:100%;"></video>
                  <canvas id="canvas" style="display:none; width:100%;"></canvas>
                  <button type="button" id="captureBtn">Tangkap</button>
                  <button type="button" style="display:none;" id="cancelCaptureBtn">Batal</button>
                  <input type="hidden" id="photoData" />
                </div>
              </div>
            </div>
          </div>
          <div style="width: 100%; display: flex; flex-direction: column; align-items: center; gap: 10px;">
            <label tabindex="0">Deskripsi</label>
            <textarea id="description" placeholder="Deskripsi" required></textarea>
          </div>
          <input type="hidden" id="lat" />
          <input type="hidden" id="lon" />
          <button type="submit">Simpan</button>
        </form>
      </div>
    </div>
  `;
  const header = document.getElementById("header");
  const footer = document.getElementById("footer");
  header.style.display = "flex";
  footer.style.display = "flex";

  let stream;
  const map = L.map("mapAddData").setView([-2.548926, 118.0148634], 5);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  let marker;
  map.on("click", (e) => {
    const { lat, lng } = e.latlng;
    if (marker) map.removeLayer(marker);
    marker = L.marker([lat, lng]).addTo(map);
    marker.bindPopup(`Lat: ${lat}, Lon: ${lng}`).openPopup();
    document.getElementById("lat").value = lat;
    document.getElementById("lon").value = lng;
  });

  const video = document.getElementById("camera");
  const canvas = document.getElementById("canvas");
  const captureBtn = document.getElementById("captureBtn");
  const cancelCaptureBtn = document.getElementById("cancelCaptureBtn");
  const photoInput = document.getElementById("photoData");
  const ctx = canvas.getContext("2d");

  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((s) => {
        stream = s;
        video.srcObject = stream;
      })
      .catch((err) => {
        console.error("Kamera tidak bisa diakses:", err);
      });
  }

  captureBtn.addEventListener("click", () => {
    canvas.style.display = "block";
    video.style.display = "none";
    captureBtn.style.display = "none";
    cancelCaptureBtn.style.display = "block";
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataURL = canvas.toDataURL("image/png");
    photoInput.value = dataURL;
  });

  cancelCaptureBtn.addEventListener("click", () => {
    canvas.style.display = "none";
    video.style.display = "block";
    captureBtn.style.display = "block";
    cancelCaptureBtn.style.display = "none";
    photoInput.value = "";
  });

  document
    .getElementById("addStoryForm")
    .addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append(
        "description",
        document.getElementById("description").value
      );
      formData.append("lat", document.getElementById("lat").value);
      formData.append("lon", document.getElementById("lon").value);

      const photoBase64 = document.getElementById("photoData").value;
      if (photoBase64) {
        const blob = await fetch(photoBase64).then((res) => res.blob());
        formData.append("photo", blob, "photo.png");
      }

      // Kirim ke API
      await onSubmit(formData);
    });

  window.addEventListener("hashchange", () => {
    if (location.hash !== "#/add-data" && stream) {
      stream.getTracks().forEach((track) => track.stop());
      video.srcObject = null;
    }
  });
};
