import { COLORS } from '../../helpers/colors.ts';

// TODO: Implementar el LocalLogger Class

export class LocalLogger {
  constructor (private file: string) {}

  writeLog( msg: string ): void {
    console.log(`%c[ ${ this.file } Log ] ${msg}`, COLORS.white);
  }

  writeError( msg: string ): void {
    console.log(`%c[ ${ this.file } Error ] ${msg}`, COLORS.red);
  }

  writeWarning( msg: string ): void {
    console.log(`%c[ ${ this.file } Warning ] ${msg}`, COLORS.yellow);
  }
}