/**
 * ! Patrón Prototype:

 * Es un patrón de diseño creacional que nos permite copiar objetos existentes sin hacer
 * que el código dependa de sus clases.
 * 
 * * Es útil cuando queremos duplicar el contenido, 
 * * el título y el autor de un documento, por ejemplo o cualquier objeto complejo.
 * 
 * https://refactoring.guru/es/design-patterns/prototype
 */

class Documento {
  public title: string;
  private content: string;
  public author: string;

  constructor(title: string, content: string, author: string) {
    this.title = title;
    this.content = content;
    this.author = author;
  }

  displayInfo(): void {
    console.log(`Title: ${this.title}, Author: ${this.author}`);
  }

  clone(): Documento {
    return new Documento(this.title, this.content, this.author);
  }
}

function main() {
  const document1 = new Documento('Cotización', '500USD', 'Fernando');
  console.log( {document1} );
  document1.displayInfo();

  const document2 = { ...document1 } as Documento;
  document2.title = 'Nueva cotización'
  console.log( {document2} );
  document1.displayInfo();

  const document3 = document1.clone();
  document3.title = 'Cotización clonada';
  console.log( {document3} );
  document3.displayInfo();
  
}

main();