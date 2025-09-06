export const favroitePage = () => {
  root.innerHTML = `
    <div id="storiesContainer">
      <div id="mapStories"></div>
      <h2 style="padding: 30px 0px 10px; text-align:center">Stories</h2>
        <div id="storiesContainer2">
          <div id="toContent" class="storiesContainerCard">
            
          </div>
        </div>
      </div>
    `;

  const header = document.getElementById("header");
  const footer = document.getElementById("footer");
  header.style.display = "flex";
  footer.style.display = "flex";
}