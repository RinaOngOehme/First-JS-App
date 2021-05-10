let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  function add(pokemon) {
    if (
      typeof pokemon === "object"
    ) {
      pokemonList.push(pokemon);
    } else {
      return ("pokemon is not correct");
    }
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".list-group");
    let listpokemon = document.createElement("li");
    listpokemon.classList.add("list-group-item")
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("btn-info");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    button.addEventListener("click", function (event) {
      showDetails(pokemon);
    });
  }

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function(json) {
      json.results.forEach(function(item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url,
        };
        add(pokemon);

      });
    }).catch(function(e) {
      console.error(e);
    });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
        return response.json();
      }).then(function (details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;

        //item.types = details.types;
        return item;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function (item) {
      showModal(item);
      console.log(pokemon);
    });
  }

  function showModal(item) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    let modalHeader = $(".modal-header");
    //let modalContainer = $("#modal-container");

    // clear existing content of the modal
    modalBody.empty();
    modalTitle.empty();
    modalHeader.empty();

    //create element for name in modal content
    let nameElement = $("<h1>" + item.name + "</h1>");

    //create img in modal content
    let imageElement = $('<img class ="modal-img" style="width:50%">');
    imageElement.attr("src", item.imageUrl);


    //create element for height in modal content
    let heightElement = $("<p>" + "Height: " + item.height + "</p>");


    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);

  }

  // Add the new modal content
  //    let closeButtonElement = document.createElement("button");
  //    closeButtonElement.classList.add("modal-close");
  //    closeButtonElement.innerText = "Close";
  //    closeButtonElement.addEventListener("click", hideModal);

  //    modal.appendChild(closeButtonElement);
  //    modal.appendChild(nameElement);
  //    modal.appendChild(imageElement);
  //    modal.appendChild(heightElement);
  //modal.appendChild(typesElement);
  //    modalContainer.appendChild(modal);
  //    modalContainer.classList.add("is-visible");
  //  }

  document.querySelector("#show-modal").addEventListener("click", () => {
    showModal(item);
  });

  function hideModal() {
  let modalContainer = document.querySelector("#modal-container");
  modalContainer.classList.remove("is-visible");
  }

  window.addEventListener("keydown", (e) => {
    let modalContainer = document.querySelector("#modal-container");
    if (e.key === 'Escape' && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }

    modalContainer.addEventListener("click", (e) => {
      // Since this is also triggered when clicking INSIDE the modal
      // We only want to close if the user clicks directly on the overlay
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });
  });
  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
    hideModal: hideModal
  };
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
