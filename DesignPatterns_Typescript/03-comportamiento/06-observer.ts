/**
 * ! Patrón Observer
 * El patrón Observer es un patrón de diseño de comportamiento que establece
 * una relación de uno a muchos entre un objeto, llamado sujeto,
 * y otros objetos, llamados observadores, que son notificados
 * y actualizados automáticamente por el sujeto
 * cuando se producen cambios en su estado.
 *
 * * Es útil cuando necesitamos que varios objetos estén
 * * pendientes de los cambios
 *
 * !No confundirlo con RXJS Observables
 *
 * https://refactoring.guru/es/design-patterns/observer
 */

import { COLORS } from "../helpers/colors.ts";

interface Observer {
  notify(videoTitle: string): void;
}

class YouTubeChannel {
  private subscribers: Observer[] = [];
  private channelName: string;

  constructor(channelName: string) {
    this.channelName = channelName;
  }

  subscribe(observer: Observer): void {
    this.subscribers.push(observer);
    console.log('%cNuevo suscriptor en %c' + this.channelName, COLORS.green, COLORS.green);
  }

  unsubscribe(observer: Observer): void {
    this.subscribers = this.subscribers.filter(sub => sub !== observer);
    console.log('%cUn suscriptor se ha ido de %c' + this.channelName, COLORS.red, COLORS.red);
  }

  uploadVideo(videoTitle: string): void {
    console.log(`%c${this.channelName} ha subido un nuevo video: %c${videoTitle}`, COLORS.blue, COLORS.white);
    for(const subscriber of this.subscribers) {
      subscriber.notify(videoTitle);
    }
  }
}

class Subscriber implements Observer {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  notify(videoTitle: string): void {
    console.log(`%c${this.name}, nuevo video disponible: %c${videoTitle}`, COLORS.purple, COLORS.white);
  }
}

function main() {
  const channel = new YouTubeChannel('Patrones de Diseño');

  const subscriber1 = new Subscriber('Alice');
  const subscriber2 = new Subscriber('Bob');

  channel.subscribe(subscriber1);
  channel.subscribe(subscriber2);

  channel.uploadVideo('Patrón Observer explicado');

  channel.unsubscribe(subscriber1);

  channel.uploadVideo('Patrón Singleton explicado');
}

main();