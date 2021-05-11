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
    button.setAttribute("data-target","#pokemonModal");
    button.setAttribute("data-toggle","modal");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    button.addEventListener("click", function (event) {showDetails(pokemon);
    });
  }

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url,
        };
        add(pokemon);

      });
    }).catch(function (e) {
      console.error(e);
    });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
        return response.json();
      }).then(function (details) {
        // Now we add the details to the item
        item.name = details.name;
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
    let modalTitle = $("modal-title");
    let modalHeader = $(".modal-header");
    let modalContainer = $("#modal-container");

    // clear existing content of the modal
    modalBody.empty();
    modalTitle.empty();
    modalHeader.empty();

    //create element for name in modal content
    let nameElement = $("<h5>" + "Name: " + item.name + "</h5>");

    //create img in modal content
    let imageElement = $("<img class ='modal-img' style='width:50%'>");
    imageElement.attr("src", item.imageUrl);


    //create element for height in modal content
    let heightElement = $("<p>" + "Height: " + item.height + "</p>");

    modalHeader.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
  }


    return {
      getAll: getAll,
      add: add,
      addListItem: addListItem,
      showDetails: showDetails,
      loadList: loadList,
      loadDetails: loadDetails,
      showModal: showModal,


    };
  })();

  pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  });
