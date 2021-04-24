let pokemonRepository = (function () {
  let repository = [{
      name: "Pikachu",
      height: 1.04,
      types: ["Electric"],
    },
    {
      name: "Charizard",
      height: 5.07,
      types: ["Fire", "Flying"],
    },
    {
      name: "Gengar",
      height: 4.11,
      types: ["Ghost", "Poison"],
    },
  ];

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "height" in pokemon &&
      "types" in pokemon
    ) {
      repository.push(pokemon);
    } else {
      return ("pokemon is not correct");
    }
  }

  function getAll() {
    return repository;
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    button.addEventListener("click", function (showDetails) {console.log(pokemon);});
  }

  function showDetails(pokemon) {
    console.log(pokemon);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    addEventListener: showDetails,
  };
})();

pokemonRepository.add({
  name: "Arcanine",
  height: 6.03,
  types: ["Fire"],
});

pokemonRepository.getAll();

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
