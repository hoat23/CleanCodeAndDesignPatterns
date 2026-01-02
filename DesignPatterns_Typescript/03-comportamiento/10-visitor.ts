/**
 * !Patrón Visitor
 *
 * El patrón Visitor es un patrón de diseño de comportamiento
 * que te permite separar algoritmos de los objetos sobre
 * los que operan.
 *
 * * Es útil cuando necesitas añadir nuevas operaciones a
 * * clases estables sin cambiar su código.
 *
 * https://refactoring.guru/es/design-patterns/visitor
 */

/**
 * Contexto: Imagina que estás diseñando un sistema para un parque
 * temático con diferentes tipos de atracciones:
 * montañas rusas, casas del terror y ruedas de la fortuna.
 *
 * Cada atracción tiene su propio precio de entrada y ofrece un descuento
 * dependiendo del tipo de visitante (niño, adulto o adulto mayor).
 *
 * Aquí es donde entra el patrón Visitor, que permite aplicar operaciones
 * específicas (como calcular el precio con descuento) dependiendo tanto
 * de la atracción como del tipo de visitante,
 * sin modificar las clases originales.
 */
interface Visitor {
  visitRollerCoaster(attraction: RollerCoaster): void;
  visitHauntedHouse(attraction: HauntedHouse): void;
  visitFerrisWheel(attraction: FerrisWheel): void;
}

interface Attraction {
  accept(visitor: Visitor): void;
}

class RollerCoaster implements Attraction {
  private price: number = 50;

  getPrice(): number {
    return this.price;
  }

  accept(visitor: Visitor): void {
    visitor.visitRollerCoaster(this);
  }
}

class HauntedHouse implements Attraction {
  private price: number = 30;

  getPrice(): number {
    return this.price;
  }

  accept(visitor: Visitor): void {
    visitor.visitHauntedHouse(this);
  }
}

class FerrisWheel implements Attraction {
  private price: number = 20;

  getPrice(): number {
    return this.price;
  }

  accept(visitor: Visitor): void {
    visitor.visitFerrisWheel(this);
  }
}
// Visitor concreto para calcular precios con descuento

class ChildVisitor implements Visitor {
  visitRollerCoaster(attraction: RollerCoaster): void {
    const discountPrice = attraction.getPrice() * 0.5;
    console.log(`Precio para niño en Montaña Rusa: $${discountPrice}`);
  }

  visitHauntedHouse(attraction: HauntedHouse): void {
    const discountPrice = attraction.getPrice() * 0.6;
    console.log(`Precio para niño en Casa del Terror: $${discountPrice}`);
  }

  visitFerrisWheel(attraction: FerrisWheel): void {
    const discountPrice = attraction.getPrice() * 0.7;
    console.log(`Precio para niño en Rueda de la Fortuna: $${discountPrice}`);
  }
}

class AdultVisitor implements Visitor {
  visitRollerCoaster(attraction: RollerCoaster): void {
    const discountPrice = attraction.getPrice();
    console.log(`Precio para adulto en Montaña Rusa: $${discountPrice}`);
  }

  visitHauntedHouse(attraction: HauntedHouse): void {
    const discountPrice = attraction.getPrice();
    console.log(`Precio para adulto en Casa del Terror: $${discountPrice}`);
  }

  visitFerrisWheel(attraction: FerrisWheel): void {
    const discountPrice = attraction.getPrice();
    console.log(`Precio para adulto en Rueda de la Fortuna: $${discountPrice}`);
  }
}

class SeniorVisitor implements Visitor {
  visitRollerCoaster(attraction: RollerCoaster): void {
    const discountPrice = attraction.getPrice() * 0.7;
    console.log(`Precio para adulto mayor en Montaña Rusa: $${discountPrice}`);
  }

  visitHauntedHouse(attraction: HauntedHouse): void {
    const discountPrice = attraction.getPrice() * 0.8;
    console.log(`Precio para adulto mayor en Casa del Terror: $${discountPrice}`);
  }

  visitFerrisWheel(attraction: FerrisWheel): void {
    const discountPrice = attraction.getPrice() * 0.9;
    console.log(`Precio para adulto mayor en Rueda de la Fortuna: $${discountPrice}`);
  }
}

// Código Cliente para probar el Visitor

function main(): void {
  const attractions: Attraction[] = [
    new RollerCoaster(),
    new HauntedHouse(),
    new FerrisWheel(),
  ];

  const visitors: Visitor[] = [
    new ChildVisitor(),
    new AdultVisitor(),
    new SeniorVisitor(),
  ];

  for (const visitor of visitors) {
    console.log('\n%cCalculando precios para un nuevo visitante:', 'color: blue; font-weight: bold;');
    for (const attraction of attractions) {
      attraction.accept(visitor);
    }
  }
}

main();