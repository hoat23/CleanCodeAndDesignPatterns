/**
 * ! Patrón Bridge
 * Este patrón nos permite desacoplar una abstracción de su implementación,
 * de tal forma que ambas puedan variar independientemente.
 *
 * * Es útil cuando se tienen múltiples implementaciones de una abstracción
 * * Se puede utilizar para separar la lógica de negocio de la lógica de presentación
 * * Se puede utilizar para separar la lógica de la interfaz de usuario también.
 *
 * https://refactoring.guru/es/design-patterns/bridge
 */

import { COLORS } from "../helpers/colors.ts";

interface Ability {
  user(): void;
}

class SwordAttack implements Ability {

  user(): void {
    console.log('%cAtaque con espada!', COLORS.blue);
  }
}

class MagicSpell implements Ability {
  
  user(): void {
    console.log('%cLanzando hechizo mágico!', COLORS.purple);
  } 
}

class FireballSpell implements Ability {
  
  user(): void {
    console.log('%cLanzando bola de fuego!', COLORS.orange);
  }
}

class AxeAttack implements Ability {
  
  user(): void {
    console.log('%cAtaque con hacha!', COLORS.red);
  }
}

abstract class Character {
  protected ability: Ability;

  constructor(ability: Ability) {
    this.ability = ability;
  }

  setAbility( ability: Ability) {
    this.ability = ability;
  }

  abstract performAbility(): void;
}

class Warrior extends Character {
  
  override performAbility(): void {
    console.log('%cGuerrero se prepara para usar su habilidad:', COLORS.green);
    this.ability.user();
  }

}

class Mage extends Character {

  override performAbility(): void {
    console.log('%cMago se prepara para usar su habilidad:', COLORS.green);
    this.ability.user();
  }
}

function main() {
  const warrior = new Warrior( new SwordAttack() );
  warrior.performAbility();

  const mage = new Mage( new MagicSpell() );
  mage.performAbility();

  // cambiando la habilidad en tiempo de ejecución
  warrior.setAbility( new AxeAttack() );
  warrior.performAbility();

  mage.setAbility( new FireballSpell() );
  mage.performAbility();

}

main();