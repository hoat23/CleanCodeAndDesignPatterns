/**
 * ! Patrón State
 * Este patrón permite a un objeto cambiar su comportamiento
 * cuando su estado interno cambia.
 *
 * * Es útil cuando un objeto tiene un comportamiento que depende de su estado
 * * y debe cambiar su comportamiento en tiempo de ejecución dependiendo de ese estado.
 *
 * https://refactoring.guru/es/design-patterns/state
 */

import { COLORS } from "../helpers/colors.ts";

/**
 * * Objetivo: Implementar el patrón State para simular el funcionamiento
 * * de una máquina expendedora.
 * * La máquina tiene diferentes estados,
 *  * Como Esperando Dinero,
 *  * Seleccionando Producto,
 *  * Entregando Producto,
 * * y su comportamiento varía dependiendo del estado actual.
 */


interface State {
  name: string;
  insertMoney(): void;
  selectProduct(): void;
  dispenseProduct(): void;
}

class VendingMachine {
  // vending machine cambia su comportamiento basado en su estado actual
  public state: State;

  constructor() {
    this.state = new WaitingForMoneyState(this);
    console.log(`%cLa máquina expendedora está en el estado: ${this.state.name}`, COLORS.green);
  }

  insertMoney(): void {
    this.state.insertMoney();
  }

  selectProduct(): void {
    this.state.selectProduct();
  }

  dispenseProduct(): void {
    this.state.dispenseProduct();
  }

  setState(newState: State): void {
    this.state = newState;
    console.log(`%cLa máquina expendedora está ahora en el estado: ${newState.name}`, COLORS.yellow);
  } 

  getStateName(): string {
    return this.state.name;
  }
}

class WaitingForMoneyState implements State {
  public name: string = 'Esperando Dinero';
  private vendingMachine: VendingMachine;

  constructor(vendingMachine: VendingMachine) {
    this.vendingMachine = vendingMachine;
  }

  insertMoney(): void {
    console.log('Dinero insertado. Cambiando al estado Seleccionando Producto.');
    this.vendingMachine.setState(new SelectingProductState(this.vendingMachine));
  }

  selectProduct(): void {
    console.log('%cPor favor inserte dinero primero.', COLORS.red);
  }

  dispenseProduct(): void {
    console.log('%cPrimero debe insertar dinero.', COLORS.red);
  }
}

class SelectingProductState implements State {
  public name: string = 'Seleccionando Producto';
  private vendingMachine: VendingMachine;

  constructor(vendingMachine: VendingMachine) {
    this.vendingMachine = vendingMachine;
  }

  insertMoney(): void {
    console.log(
      '%cPor favor selecciona un producto - dinero ya insertado.', COLORS.red);
  }

  selectProduct(): void {
    console.log('Producto seleccionado. Cambiando al estado Entregando Producto.');
    this.vendingMachine.setState( new DispensingProductState(this.vendingMachine) );
  }

  dispenseProduct(): void {
    console.log('%cPor favor selecciona un producto - antes de despacharlo')
  }
}

class DispensingProductState implements State {
  public name: string = 'Despachando producto';
  private vendingMachine: VendingMachine;

  constructor(vendingMachine: VendingMachine) {
    this.vendingMachine = vendingMachine;
  }

  insertMoney(): void {
    console.log('%cPor favor espera - despachando producto.', COLORS.red);
  }

  selectProduct(): void {
    console.log('%cPor favor espera - despachando producto.', COLORS.red);
  }

  dispenseProduct(): void {
    console.log('Producto despachado. Volviendo al estado Esperando Dinero.');
    this.vendingMachine.setState( new WaitingForMoneyState(this.vendingMachine) );
  }
}

async function main() {
  const vendingMachine = new VendingMachine();
  let selectedOption: string | null = '4';

  do {
    console.clear();
    console.log(`%cSelecciona una opción: %c${vendingMachine.getStateName()}`, COLORS.green, COLORS.white);
    console.log('%cSeleccione una opción:', COLORS.blue);
    console.log('%c1. Insertar Dinero', COLORS.yellow);
    console.log('%c2. Seleccionar Producto', COLORS.yellow);
    console.log('%c3. Despachar Producto', COLORS.yellow);
    console.log('%c4. Salir', COLORS.yellow);

    selectedOption = prompt('Ingrese el número de la opción deseada: ');

    switch (selectedOption) {
      case '1':
        vendingMachine.insertMoney();
        break;
      case '2':
        vendingMachine.selectProduct();
        break;
      case '3':
        vendingMachine.dispenseProduct();
        break;
      case '4':
        console.log('%cSaliendo de la simulación de la máquina expendedora.', COLORS.red);
        break;
      default:
        console.log('%cOpción no válida. Por favor, intente de nuevo.', COLORS.red);
        break;
    }
    await new Promise(resolve => setTimeout(resolve, 2000));
  } while (selectedOption !== '4');
}

main();