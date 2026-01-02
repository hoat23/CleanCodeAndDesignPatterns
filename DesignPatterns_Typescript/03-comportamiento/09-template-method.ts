/**
 * ! Patrón Template Method
 *
 * El patrón Template Method es un patrón de diseño de comportamiento
 * que define el esqueleto de un algoritmo en una operación,
 * delegando algunos pasos a las subclases.
 *
 * Permite que las subclases redefinan ciertos pasos de un algoritmo
 * sin cambiar su estructura.
 *
 * * Es útil cuando se tiene un algoritmo que sigue una secuencia de pasos
 * * y se quiere permitir a las subclases que redefinan algunos de esos pasos.
 *
 * https://refactoring.guru/es/design-patterns/template-method
 */

/**
 * Contexto: Vamos a implementar un sistema que permite preparar
 * diferentes bebidas calientes, como café y té.
 *
 * Aunque el proceso general para preparar ambas bebidas es similar
 * (hervir agua, añadir el ingrediente principal, servir en una taza),
 * hay pasos específicos que varían dependiendo de la bebida.
 *
 * El patrón Template Method es perfecto para este caso,
 * ya que define un esqueleto general del algoritmo en una clase base
 * y delega los detalles específicos a las subclases.
 */

import { COLORS } from "../helpers/colors.ts";

// Clase abstracta que define el esqueleto del algoritmo

abstract class HotBeverage {
  prepare(): void {
    this.boilWater();
    this.addMainIngredient();
    this.pourInCup();
    this.addCondiments();
  } 
  
  private boilWater(): void {
    console.log('%cHirviendo agua...', COLORS.cyan);
  }

  private pourInCup(): void {
    console.log('%cSirviendo en la taza...', COLORS.cyan);
  }

  protected abstract addMainIngredient(): void; // Ingrediente principal
  protected abstract addCondiments(): void; // Ingredientes extra
}

class Tea extends HotBeverage {
  protected override addMainIngredient(): void {
    console.log('%cAñadiendo la bolsita de té al agua caliente...', COLORS.green);
  }
  protected override addCondiments(): void {
    console.log('%cAñadiendo limón al té...', COLORS.green);
  }
}

class Coffee extends HotBeverage {
  protected override addMainIngredient(): void {
    console.log('%cAñadiendo café molido al agua caliente...', COLORS.brown);
  }
  protected override addCondiments(): void {
    console.log('%cAñadiendo azúcar y leche al café...', COLORS.brown);
  }
}

function main() {
  console.log('%cPreparando té:', COLORS.yellow);
  const tea = new Tea();
  tea.prepare();

  console.log('\n%cPreparando café:', COLORS.yellow);
  const coffee = new Coffee();
  coffee.prepare();
}

main();
