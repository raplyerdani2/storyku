import { getAllStoriesIdb } from "../../utils/db.js";

export const storiesPage = async (root, stories) => {
  let allStories = stories;

  if (!stories || stories.length === 0) {
    console.log("Offline mode: ambil dari IndexedDB");
    allStories = await getAllStoriesIdb();
  }

  console.log(allStories);
  root.innerHTML = `
    <div id="storiesContainer">
      <div id="mapStories"></div>
      <h2 style="padding: 30px 0px 10px; text-align:center">Stories</h2>
        <div id="storiesContainer2">
          <div id="toContent" class="storiesContainerCard">
            ${stories
              .map(
                (s) => `
                <a href="#/stories/${s.id}">
                  <div id="card-story" tabindex="0">
                    <div id="card-story-img">
                      <img src="${s.photoUrl}" alt="Nama akun ${s.name} dengan deskripsi ${s.description}"/>
                    </div>
                    <div style="display:flex; flex-direction: column; gap: 5px; font-weight: bold">
                      <h3>Nama: ${s.name}</h3>
                      <h3>Deskripsi: ${s.description}</h3>
                      <p>lat: ${s.lat}</p>
                      <p>lon:${s.lon}</p>
                    </div>
                  </div>
                </a>
                `
              )
              .join("")}
              </div>
        </div>
      </div>
    `;

  const header = document.getElementById("header");
  const footer = document.getElementById("footer");
  header.style.display = "flex";
  footer.style.display = "flex";

  const myMap = L.map("mapStories").setView([0, 0], 2);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(myMap);

  const markers = [];

  stories.forEach((element) => {
    if (element.lat && element.lon) {
      const coor = [parseFloat(element.lat), parseFloat(element.lon)];

      const marker = L.marker(coor).addTo(myMap);
      marker.bindPopup(`<b>${element.name}</b><br>${element.description}`);

      markers.push(coor);
    }
  });

  if (markers.length > 0) {
    myMap.fitBounds(markers);
  }
};
