const URL = "https://api.pexels.com/v1/search?query=";
const myQuery = "christmas";
const token = "7mXgr2Q2gFNvdKuc1SowmnLxZUEAd959Rt3OpF4DYnizhB9xozKgZ3T1";
const album = document.getElementById("albumContainer");

const fetchAlbum = () => {
  clearAlbum();
  fetch(`${URL}${myQuery}`, {
    method: "GET",
    headers: {
      Authorization: `${token}`,
    },
  })
    .then((response) => {
      if (response.status >= 400 && response.status < 500) {
        throw new Error(`Errore client! Stato: ${response.status}`);
      } else if (response.status >= 500 && response.status < 600) {
        throw new Error(`Errore server! Stato: ${response.status}`);
      } else if (!response.ok) {
        throw new Error(`Errore HTTP! Stato: ${response.status}`);
      } else {
        console.log(`Richiesta HTTP riuscita con stato: ${response.status}`);
      }
      return response.json();
    })
    .then((photos) => {
      console.log(photos);

      photos.photos.forEach((photo) => {
        const div = document.createElement("div");
        div.className = "col-md-4";
        div.innerHTML = `

        <div class="card mb-4 shadow-sm">
          <img src="${photo.src.medium}" alt="${photo.src.medium}" style="object-fit: cover; height: 300px;" >
          <div class="card-body">
          <a href="./details.html?photoId=${photo.id}" class="text-decoration-none text-success">
            <h5 class="card-title">${photo.alt}</h5>
            </a>
            <p class="card-text">
              ${photo.photographer}
            </p>
            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group">
              <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
              View
            </button>
                <button type="button" class="btn btn-sm btn-outline-secondary" id="hideButton-${photo.id}">Hide</button>
              </div>
              <small class="text-muted">${photo.id}</small>
            </div>
          </div>
        </div>
        `;

        const hideButton = div.querySelector(`#hideButton-${photo.id}`);
        hideButton.addEventListener("click", function () {
          div.remove();
        });

        album.appendChild(div);
      });
    });
};
