/**
 * ! Patrón Strategy
 *
 * El patrón Strategy es un patrón de diseño de software que define una
 * familia de algoritmos, los encapsula y los hace intercambiables.
 *
 *
 * * Es útil cuando se tiene una clase que tiene un comportamiento que puede
 * * cambiar en tiempo de ejecución y se quiere delegar la responsabilidad de
 * * la implementación a otra clase.
 *
 * https://refactoring.guru/es/design-patterns/strategy
 */

import { COLORS } from "../helpers/colors.ts";

/**
 * !Objetivo: Explicar el patrón Strategy usando un ejemplo donde varios
 * ! patitos compiten en una carrera y cada uno tiene su propia
 * ! estrategia de movimiento (por ejemplo, nadar, volar o caminar).
 */

interface MovementStrategy {
  move(): void;
}

class SwimStrategy implements MovementStrategy {
  move(): void {
    console.log('%cEl patito está nadando.', COLORS.cyan);
  }
}

class FlyStrategy implements MovementStrategy {
  move(): void {
    console.log('%cEl patito está volando sobre el agua.', COLORS.blue);
  }
}

class WalkStrategy implements MovementStrategy {
  move(): void {
    console.log('%cEl patito está caminando.', COLORS.green);
  }
}

class Duck {
  private name: string;
  private movementStrategy: MovementStrategy;
  
  constructor(name: string, movementStrategy: MovementStrategy) {
    this.name = name;
    this.movementStrategy = movementStrategy;

    console.log(`%cPatito creado: ${this.name}`, COLORS.yellow);
  }

  performMove(): void {
    console.log(`%c${this.name} se está moviendo:`, COLORS.purple);
    this.movementStrategy.move();
  }

  setMovementStrategy(movementStrategy: MovementStrategy): void {
    this.movementStrategy = movementStrategy;
    console.log(`%c${this.name} ha cambiado su estrategia de movimiento.`, COLORS.orange);
  }

}

function main() {
  const duck1 = new Duck('Patito rápido', new FlyStrategy());
  const duck2 = new Duck('Patito nadador', new SwimStrategy());
  const duck3 = new Duck('Patito caminante', new WalkStrategy());

  console.log('\n%c--- Carrera de Patitos Comienza ---\n', COLORS.red);
  
  duck1.performMove();
  duck2.performMove();
  duck3.performMove();

  duck3.setMovementStrategy(new SwimStrategy());
  duck3.performMove();

  duck2.setMovementStrategy(new FlyStrategy());
  duck2.performMove();

  console.log('\n%c--- Carrera de Patitos Termina ---', COLORS.red);
}

main();