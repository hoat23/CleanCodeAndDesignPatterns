/**
 * ! Inmutabilidad con copia
 * Aunque la inmutabilidad es una buena práctica, no siempre es posible.
 * En estos casos, se puede hacer una copia del objeto y modificar la copia.
 *
 *  * Es útil para mantener un historial de estados en aplicaciones interactivas.
 *
 */

class CodeEditorState {
  readonly content: string;
  readonly cursorPosition: number;
  readonly unsavedChanges: boolean;
  
  constructor(
    content: string,
    cursorPosition: number,
    unsavedChanges: boolean
  ) {
    this.content = content;
    this.cursorPosition = cursorPosition;
    this.unsavedChanges = unsavedChanges;
  }

  displayState(): void {
    console.log(`Content: ${this.content}`);
    console.log(`Cursor Position: ${this.cursorPosition}`);
    console.log(`Unsaved Changes: ${this.unsavedChanges}`);
  }

  copyWith({
    content,
    cursorPosition,
    unsavedChanges
  }: Partial<CodeEditorState>): CodeEditorState {
    return new CodeEditorState(
      content ?? this.content,
      cursorPosition ?? this.cursorPosition,
      unsavedChanges ?? this.unsavedChanges
    );
  }
}

class CodeEditorHistory {
  private history: CodeEditorState[] = [];
  private currentIndex: number = -1;

  save( state: CodeEditorState ): void {
    // Si se hacen cambios después de deshacer, se elimina el "futuro"
    if ( this.currentIndex < this.history.length - 1 ) {
      this.history = this.history.slice( 0, this.currentIndex + 1 );
    }
    this.history.push(state);
    this.currentIndex++;
  }

  undo(): CodeEditorState | null {
    if ( this.currentIndex > 0 ) {
      this.currentIndex--;
      return this.history[this.currentIndex];
    }
    return null;
  }

  redo(): CodeEditorState | null {
    if ( this.currentIndex < this.history.length - 1 ) {
      this.currentIndex++;
      return this.history[this.currentIndex];
    }
    return null;
  }
}

function main() {
  const history = new CodeEditorHistory();
  let editorState = new CodeEditorState("Console.log('Hello World');", 2, false);

  history.save(editorState);
  console.log("Estado inicial", editorState);

  editorState.displayState();

  editorState = editorState.copyWith({ content: "Console.log('Hola Mundo'; \nconsole.log('Nueva linea');", cursorPosition: 3, unsavedChanges: true });

  console.log("\nDespués de editar:");
  editorState.displayState();
  
  editorState = editorState.copyWith( { cursorPosition: 5 } );
  history.save(editorState);
  editorState.displayState();

  console.log("\nDeshaciendo cambios:");
  editorState = history.undo()!;
  editorState.displayState();

  console.log("\nRehaciendo cambios:");
  editorState = history.redo()!;
  editorState.displayState();
}