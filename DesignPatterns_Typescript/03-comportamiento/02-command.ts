/**
 * ! Patrón Command
 * Este patrón encapsula una solicitud como un objeto,
 * lo que le permite parametrizar otros objetos con diferentes solicitudes,
 * encolar solicitudes, o registrar solicitudes, y soporta operaciones que pueden deshacerse.
 *
 * Me gustó mucho la explicación de Refactoring Guru
 * https://refactoring.guru/es/design-patterns/command
 *
 * * Es útil cuando se necesita desacoplar el objeto que invoca
 * * la operación del objeto que sabe cómo realizarla.
 *
 *
 */

import { COLORS } from "../helpers/colors.ts";

interface Command {
  execute(): void;
}

class Light {
  turnOn(): void {
    console.log('%cLa luz está encendida.', COLORS.yellow);
  }

  turnOff(): void {
    console.log('%cLa luz está apagada.', COLORS.gray);
  }
}

class Fan {
  on(): void {
    console.log('%cEl ventilador está encendido.', COLORS.cyan);
  }

  off(): void {
    console.log('%cEl ventilador está apagado.', COLORS.gray);
  }
}

class LigthOnCommand implements Command {
  private light: Light;

  constructor(light: Light) {
    this.light = light;
  }

  execute(): void {
    this.light.turnOn();
  }
}

class LightOffCommand implements Command {
  constructor(private light: Light) {}

  execute(): void {
    this.light.turnOff();
  }
}

class FanOnCommand implements Command {
  constructor(private fan: Fan) {}
  
  execute(): void {
    this.fan.on();
  }
}

class FanOffCommand implements Command {
  constructor(private fan: Fan) {}

  execute(): void {
    this.fan.off();
  }
}

class RemoteControl {
  private commands: Record<string, Command> = {};

  setCommand(name: string, command: Command): void {
    this.commands[name] = command;
  }

  pressButton(button: string): void {
    const command = this.commands[button];
    if (command) {
      command.execute();
    } else {
      console.log('%cNo hay comandos para ejecutar.', COLORS.red);
    }
  }
}

// Código Cliente
function main() {
  const remoteControl = new RemoteControl();
  const light = new Light();
  const fan = new Fan();
  
  const lightOnCommand = new LigthOnCommand(light);
  const lightOffCommand = new LightOffCommand(light);
  const fanOnCommand = new FanOnCommand(fan);
  const fanOffCommand = new FanOffCommand(fan);

  remoteControl.setCommand('lightOn', lightOnCommand);
  remoteControl.setCommand('lightOff', lightOffCommand);
  remoteControl.setCommand('fanOn', fanOnCommand);
  remoteControl.setCommand('fanOff', fanOffCommand);

  remoteControl.pressButton('lightOn');
  remoteControl.pressButton('fanOn');
  remoteControl.pressButton('lightOff');
  remoteControl.pressButton('fanOff');
  remoteControl.pressButton('nonExistentCommand');
}

main();