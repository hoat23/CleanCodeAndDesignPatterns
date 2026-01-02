/**
 * ! Patron Chain of Responsibility
 * Es un patrón de diseño de comportamiento que te permite pasar solicitudes
 * a lo largo de una cadena de manejadores.
 *
 * * Es útil cuando se necesita procesar datos de diferentes maneras, pero no
 * * se sabe de antemano qué tipo de procesamiento se necesita o en qué orden
 * * pero se sabe que se necesita procesar en una secuencia.
 *
 * https://refactoring.guru/es/design-patterns/chain-of-responsibility
 */

import { COLORS } from "../helpers/colors.ts";

interface Handler {
  setNext(handler: Handler): Handler;
  handle(request: string): string | null;
}

abstract class BaseHandler implements Handler {
  private nextHandler?: Handler;

  setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }

  handle(request: string): string | null {
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }
    return null;
  }
}
// Soporte básico
class BasicSuppport extends BaseHandler {
  override handle(request: string): string | null {
    if (request === 'basic') {
      return `Soporte básico: Resuelto el problema de nivel básico.`;
    }
    console.log('%cSoporte básico: No puedo manejar la solicitud, pasando al siguiente.', COLORS.red);
    return super.handle(request);
  }
}

class AdvanceSupport extends BaseHandler {
  override handle(request: string): string | null {
    if (request === 'advance') {
      return `Soporte avanzado: Resuelto el problema de nivel avanzado.`;
    }
    console.log('%cSoporte avanzado: No puedo manejar la solicitud, pasando al siguiente.', COLORS.yellow);
    return super.handle(request);
  }
}

class ExpertSupport extends BaseHandler {
  override handle(request: string): string | null {
    if (request === 'expert') {
      return `Soporte experto: Resuelto el problema de nivel experto.`;
    }
    console.log('%cSoporte experto: No puedo manejar la solicitud, pasando al siguiente.', COLORS.green);
    return null;
  }
}

function main() {
  const basicSupport = new BasicSuppport();
  const advanceSupport = new AdvanceSupport();
  const expertSupport = new ExpertSupport();
  
  basicSupport.setNext(advanceSupport).setNext(expertSupport);

  basicSupport.handle('basic');
  console.log('---');
  basicSupport.handle('advance');
  console.log('---');
  basicSupport.handle('expert');
  console.log('---');
  const result = basicSupport.handle('unknown');
  if (result === null) {
    console.log('Ningún soporte pudo manejar la solicitud.');
  }
}

main();