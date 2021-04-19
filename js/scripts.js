// list 3 Pokemons in an Array to include name, height and type
let pokemonList = [
{ name: 'Pikachu', height: 1.04, type: ['Electric'] },
{ name: 'Charizard', height: 5.07, type: ['Fire', 'Flying'] },
{ name: 'Gengar', height: 4.11, type: ['Ghost', 'Poison'] },
];

//Print on document the name and height of each Pokemon. Highlight also special Pokemon
for (let i = 0; i < pokemonList.length; i++) {
  if (pokemonList[i].height > 5)
  document.write('<div>' + pokemonList[i].name + ' (height: ' + pokemonList[i].height + ') '
  + ' - Wow, that\'s big! </div>');
  else if (pokemonList[i].height < 5)
  document.write('<div>' + pokemonList[i].name + ' (height: ' + pokemonList[i].height + ') </div>');
}
