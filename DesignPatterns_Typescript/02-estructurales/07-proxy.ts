/**
 * ! Patrón Proxy
 * Este patrón se utiliza para controlar el acceso a un objeto, es decir,
 * se crea un objeto que actúa como intermediario entre el cliente y el objeto real.
 *
 * * Es útil cuando necesitamos controlar el acceso a un objeto,
 * * por ejemplo, para verificar si el cliente tiene permiso
 * * para acceder a ciertos métodos o propiedades.
 *
 * https://refactoring.guru/es/design-patterns/proxy
 *
 */
class Player {
  name: string;
  level: number;

  constructor( name: string, level: number ) {
    this.name = name;
    this.level = level;
  }
}

interface Room {
  enter( player: Player ): void;
}

class SecretRoom implements Room {

  enter(player: Player): void {
    console.log(`%c${ player.name } ha entrado en la sala secreta.`, 'color: green;');
    console.log('un gran enemigo te espera!');
  }
}

class MagicPortal implements Room {
  private secretRoom: SecretRoom;
  private requiredLevel: number;

  constructor( requiredLevel: number ) {
    this.secretRoom = new SecretRoom();
    this.requiredLevel = requiredLevel;
  }

  enter(player: Player): void {
    if ( player.level >= this.requiredLevel ) {
      this.secretRoom.enter(player);
    } else {
      console.log(`%c${ player.name } no tiene el nivel requerido para entrar en la sala secreta.`, 'color: red;');
    }
  }
}

function main() {
  const lowLevelPlayer = new Player('Novato', 2);
  const highLevelPlayer = new Player('Héroe', 10);

  const magicPortal = new MagicPortal(5); // Proxy: Verifica si tiene o no tiene acceso

  magicPortal.enter(lowLevelPlayer); // No tiene permiso
  magicPortal.enter(highLevelPlayer); // Tiene permiso
}

main();