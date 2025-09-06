import L from "leaflet";
import "leaflet/dist/leaflet.css";

export const detailStoriesPage = (root, story) => {
  root.innerHTML = `
        <div id="detailStoriesContainer">
          <div id="toContent" class="detailStoriesContainer2">
            <div id="mapDetail"></div>
            <div id="detailStoriesContainer3">
              <h2>${story.name}</h2>
              <img src="${story.photoUrl}" alt="${story.name}" width="300"/>
              <p>${story.description}</p></div>          
          </div>
        </div>
    `;

  const header = document.getElementById("header");
  const footer = document.getElementById("footer");
  header.style.display = "flex";
  footer.style.display = "flex";

  const coor = [story.lat, story.lon];
  if (coor[0] !== null || coor[1] !== null) {
    const myMap = L.map("mapDetail", {
      zoom: 8,
      center: coor,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(myMap);

    const marker = L.marker(coor).addTo(myMap);
    marker.bindPopup(`<b>${story.description}</b>`);
  } else {
    const myMap = L.map("mapDetail", {
      zoom: 1,
      center: [0, 0],
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(myMap);
  }
};
