/**
 * ! Singleton:
 * Es un patrón de diseño creacional que garantiza que una clase
 * tenga una única instancia y proporciona un punto de acceso global a ella.
 *
 * * Es útil cuando necesitas controlar el acceso a una única instancia
 * * de una clase, como por ejemplo, en un objeto de base de datos o en un
 * * objeto de configuración.
 *
 * https://refactoring.guru/es/design-patterns/singleton
 */

class DragonBalls {
  private static instance: DragonBalls;
  private ballsCollected: number

  private constructor() {
    this.ballsCollected = 0;
  }

  public static getInstance(): DragonBalls {
    if (!DragonBalls.instance) {
      DragonBalls.instance = new DragonBalls();
      console.log('Creating DragonBalls instance');
    }
    return DragonBalls.instance;
  }

  collecteBall(): void {
    if (this.ballsCollected < 7) {
      this.ballsCollected++;
      console.log(`Ball collected! Total: ${this.ballsCollected}`);
    }
    console.log("All 7 Dragon Balls have been collected!");
  }

  summonShenLong() {
    if (this.ballsCollected === 7) {
      console.log("Summoning Shen Long!");
      this.ballsCollected = 0; // Reset after summoning
      return;
    }

    console.log("You need to collect all 7 Dragon Balls first!");
    console.log(`Current balls collected: ${this.ballsCollected}`);
  }

}


function main() {
  const dragonBalls1 = DragonBalls.getInstance();
  const dragonBalls2 = DragonBalls.getInstance();
  
  console.log(dragonBalls1 === dragonBalls2); // true
  dragonBalls1.collecteBall();
  dragonBalls1.collecteBall();
  dragonBalls1.collecteBall();
  dragonBalls1.collecteBall();
  dragonBalls1.collecteBall();
  dragonBalls1.collecteBall();
  dragonBalls1.collecteBall();
  dragonBalls1.summonShenLong();
  dragonBalls2.summonShenLong();
}

main();