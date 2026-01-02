/**
 * ! Patrón mediator
 * Es un patrón de diseño de comportamiento que ayuda a reducir
 * las dependencias desordenadas entre objetos.
 * Este patrón limita la comunicación directa entre ellos,
 * haciendo que solo interactúen a través de un objeto mediador.
 *
 * * Es útil reducir la complejidad de las relaciones entre objetos
 *
 * https://refactoring.guru/es/design-patterns/mediator
 */

import { COLORS } from "../helpers/colors.ts";

class ChatRoom {
  private users: User[] = [];
  public title: string;
  
  constructor(title: string) {
    this.title = title;
  }

  addUser(user: User): void {
    this.users.push(user);
  }

  sendMessage(fromUser: User, message: string): void {
    const usersToSend = this.users.filter(user => user !== fromUser);
    for (const user of usersToSend) {
      user.receiveMessage(message, fromUser);      
    } 
  }


}

class User {
  private username: string;
  private chatRoom: ChatRoom;

  constructor(username: string, chatRoom: ChatRoom) {
    this.username = username;
    this.chatRoom = chatRoom;
    this.chatRoom.addUser(this);
  }

  sendMessage(message: string): void {
    console.log(`\n\n\n%c${this.username} envía: %c${message}`, COLORS.blue, COLORS.white);
    this.chatRoom.sendMessage(this, message);
  }

  receiveMessage(message: string, fromUser: User): void {
    console.log(`%c${this.username} recibe un mensaje de %c${fromUser.username}: %c${message}`, COLORS.green, COLORS.blue, COLORS.white);
  }
}

function main() {
  const chatRoom = new ChatRoom('Patrones de Diseño');

  const user1 = new User('Alice', chatRoom);
  const user2 = new User('Bob', chatRoom);
  const user3 = new User('Charlie', chatRoom);

  user1.sendMessage('Hola a todos en el chat!');
  user2.sendMessage('¡Hola Alice! ¿Cómo estás?');
  user3.sendMessage('¡Hola a ambos! ¿Qué están discutiendo?');
}

main();