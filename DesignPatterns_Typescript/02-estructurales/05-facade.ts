/**
 * ! Patrón Facade
 * Este patrón proporciona una interfaz unificada para un conjunto de interfaces
 * en un subsistema.
 *
 * Facade define una interfaz de nivel más alto que hace que el subsistema
 * sea más fácil de usar.
 *
 * * Es útil cuando un subsistema es complejo o difícil de entender para
 * * proporcionar una interfaz simplificada para el cliente.
 *
 * https://refactoring.guru/es/design-patterns/facade
 */
class Projector {
  turnOn(): void {
    console.log('Proyector encendido');
  }

  turnOff(): void {
    console.log('Proyector apagado');
  }
}

class SoundSystem {
  on(): void {
    console.log('Sistema de sonido encendido');
  }

  off(): void {
    console.log('Sistema de sonido apagado');
  }
}

class VideoPlayer {
  on(): void {
    console.log('Reproductor de video encendido');
  }
  
  off(): void {
    console.log('Reproductor de video apagado');
  }

  play(movie: string): void {
    console.log(`Reproduciendo película: ${movie}`);
  }

  stop(): void {
    console.log('Película detenida');
  }
}

class PopcornMaker {
  popingPopcorn(): void {
    console.log('Haciendo palomitas de maíz');
  }

  turnOffPoppingPopcorn(): void {
    console.log('Deteniendo las palomitas de maíz');
  }
}

interface HomeTheaterOptions {
  projector: Projector;
  soundSystem: SoundSystem;
  videoPlayer: VideoPlayer;
  popcornMaker: PopcornMaker;
}

// Facade
class HomeTheaterFacade {
  private projector: Projector;
  private soundSystem: SoundSystem;
  private videoPlayer: VideoPlayer;
  private popcornMaker: PopcornMaker;

  constructor( {
    projector,
    soundSystem,
    videoPlayer,
    popcornMaker
  } : HomeTheaterOptions) {
    this.projector = projector;
    this.soundSystem = soundSystem;
    this.videoPlayer = videoPlayer;
    this.popcornMaker = popcornMaker;
  }
  watchMovie(movie: string): void {
    console.log('Preparando para ver una película...');
    this.popcornMaker.popingPopcorn();
    this.projector.turnOn();
    this.soundSystem.on();
    this.videoPlayer.on();
    this.videoPlayer.play(movie);
    console.log('¡Disfruta de la película!');
  }
  
  endMovie(): void {
    console.log('Terminando la película...');
    this.popcornMaker.turnOffPoppingPopcorn();
    this.projector.turnOff();
    this.soundSystem.off();
    this.videoPlayer.stop();
    this.videoPlayer.off();
  }
}

function main() {
  const projector = new Projector();
  const soundSystem = new SoundSystem();
  const videoPlayer = new VideoPlayer();
  const popcornMaker = new PopcornMaker();

  const homeTheater = new HomeTheaterFacade( {
    projector,
    soundSystem,
    videoPlayer,
    popcornMaker
  } );
  
  homeTheater.watchMovie('Inception');
  console.log('\n--- Película en progreso ---\n');
  homeTheater.endMovie();
}

main();