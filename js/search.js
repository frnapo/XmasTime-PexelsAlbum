const searchInput = document.getElementById("searchInput");

function search(query) {
  console.log("chiamata", query);

  if (!query) {
    album.innerHTML = "";
    return;
  }

  const apiUrl = `${URL}${query}`;
  const options = {
    method: "GET",
    headers: {
      Authorization: `${token}`,
    },
  };

  fetch(apiUrl, options)
    .then((response) => {
      clearAlbum();
      if (!response.ok) {
        throw new Error("Errore nella risposta della rete");
      }
      return response.json();
    })
    .then((data) => displayResults(data))
    .catch((error) => {
      console.error("Errore durante la fetch:", error);
      album.innerHTML = "Errore durante la ricerca.";
    });
}

function displayResults(photos) {
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
}

searchInput.addEventListener(
  "input",
  debounce(() => {
    const query = searchInput.value.trim();
    search(query);
  }, 500)
); // Aggiunge un ritardo prima della ricerca per ridurre le richieste

// Funzione Debounce per ridurre le chiamate durante la digitazione
function debounce(func, wait) {
  let timeout;
  return function () {
    const context = this,
      args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}
