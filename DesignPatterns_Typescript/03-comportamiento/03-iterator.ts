/**
 * ! Patrón Iterator
 * Este patrón permite recorrer los elementos de una colección sin exponer
 * la estructura interna de la colección.
 *
 * * Es útil cuando se necesita recorrer una colección de elementos sin importar
 * * cómo se almacenan los elementos.
 *
 * https://refactoring.guru/es/design-patterns/iterator
 */

interface Iterator<T> {
  next(): T | null;
  hasNext(): boolean;
  current(): T | null;
}

class Pokemon {
  public name: string;
  public type: string;
  
  constructor(name: string, type: string) {
    this.name = name;
    this.type = type;
  }
}

class PokemonCollection {
  private pokemons: Pokemon[] = [];
  
  addPokemon(pokemon: Pokemon): void {
    this.pokemons.push(pokemon);
  }

  getPokemonAt(index: number): Pokemon | null {
    if( index >= 0 && index < this.pokemons.length ){
      return this.pokemons[index];
    }
    return null;
  } 

  getLength(): number {
    return this.pokemons.length;
  }

  createIterator(): PokemonIterator {
    return new PokemonIterator(this);
  }
}

class PokemonIterator implements Iterator<Pokemon> {
  private collection: PokemonCollection;
  private position: number = 0;

  constructor(collection: PokemonCollection) {
    this.collection = collection;
  }

  next(): Pokemon | null {
    if (this.hasNext()) {
      return this.collection.getPokemonAt(this.position++);
    }
    return null;
  }

  hasNext(): boolean {
    return this.position < this.collection.getLength();
  }

  current(): Pokemon | null {
    return this.collection.getPokemonAt(this.position);
  }
}

function main() {
  const collection = new PokemonCollection();
  collection.addPokemon(new Pokemon('Pikachu', 'Eléctrico'));
  collection.addPokemon(new Pokemon('Charmander', 'Fuego'));
  collection.addPokemon(new Pokemon('Squirtle', 'Agua'));
  collection.addPokemon(new Pokemon('Bulbasaur', 'Planta'));
  
  const iterator = collection.createIterator();
  console.log('%cRecorriendo la colección de Pokémons:', 'color: green; font-weight: bold;');
  while (iterator.hasNext()) {
    const pokemon = iterator.next();
    console.log(`%c${pokemon?.name} - Tipo: ${pokemon?.type}`, 'color: blue;');
  }
}

main();