var pokemonRepository = (function ()
{
  var pokemonList = [{ name: 'Pikachu', height: 1.04, type: ['Electric'] },
{ name: 'Charizard', height: 5.07, type: ['Fire', 'Flying'] },
{ name: 'Gengar', height: 4.11, type: ['Ghost', 'Poison'] },
];

  pokemonList.forEach(function (pokemon) {
      if (pokemon.height > 5)
  document.write(pokemon.name + ' (height: ' + pokemon.height + ') '
  + ' - Wow, that\'s big!');
      else if (pokemon.height < 5)
  document.write(pokemon.name + ' (height: ' + pokemon.height + ') ');
    });

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  return {
    add: add,
    getAll: getAll,
  };
})();
