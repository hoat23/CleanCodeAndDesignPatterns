/**
 * !Patrón Memento
 * Permite capturar y externalizar un estado interno de un objeto,
 * de manera que el objeto pueda ser restaurado a ese estado más tarde.
 *
 * * Es útil cuando se necesita guardar el estado de un objeto para poder
 * * volver a él en un futuro.
 *
 * https://refactoring.guru/es/design-patterns/memento
 */

import { COLORS } from "../helpers/colors.ts";

class GameMemento {
  private level: number;
  private health: number;
  private position: string;

  constructor(level: number, health: number, position: string) {
    this.level = level;
    this.health = health;
    this.position = position;
  }

  getLevel(): number {
    return this.level;
  }

  getHealth(): number {
    return this.health;
  }

  getPosition(): string {
    return this.position;
  }

}

class Game {
  private level: number;
  private health: number;
  private position: string;

  constructor(level: number, health: number, position: string) {
    this.level = level;
    this.health = health;
    this.position = position;

    console.log(`Juego iniciado en Nivel: ${this.level}, Salud: ${this.health}, Posición: ${this.position}`);
  }

  save(): GameMemento {
    console.log('Guardando estado del juego...');
    return new GameMemento(this.level, this.health, this.position);
  }

  play( level: number, health: number, position: string): void {
    this.level = level;
    this.health = health;
    this.position = position;

    console.log(`Jugando... Nuevo estado - Nivel: ${this.level}, Salud: ${this.health}, Posición: ${this.position}`);
  }
  
  restore(memento: GameMemento): void {
    this.level = memento.getLevel();
    this.health = memento.getHealth();
    this.position = memento.getPosition();

    console.log(`Estado del juego restaurado a - Nivel: ${this.level}, Salud: ${this.health}, Posición: ${this.position}`);
  }
}

class GameHistory {
  private mementos: GameMemento[] = [];
  
  push(memento: GameMemento): void {
    this.mementos.push(memento);
  }

  // Devuelve y elimina el último estado guardado
  pop(): GameMemento | undefined {
    return this.mementos.pop() ?? undefined;
  }

  // Devuelve el último estado guardado sin eliminarlo
  peek(): GameMemento | undefined {
    return this.mementos[this.mementos.length - 1];
  }
}

function main(): void {
  const game = new Game(1, 100, 'INICIO');
  const history = new GameHistory();


  history.push(game.save());

  game.play(2, 90, 'Bosque encantado');
  history.push(game.save());

  game.play(3, 50, 'Cueva oscura');
  history.push(game.save());

  game.play(4, 50, 'Castillo del dragón');
  console.log('%cEstado actual ', COLORS.yellow)
  
  // Restaurar al estado anterior
  game.restore(history.pop()!);
  console.log('%cDespues de restaurar al estado anterior.', COLORS.cyan);

  game.restore(history.pop()!);
  console.log('%cDespues de restaurar al estado anterior.', COLORS.cyan);
}

main();
