/**
 * ! Singleton:
 * Es un patrón de diseño creacional que garantiza que una clase
 * tenga una única instancia y proporciona un punto de acceso global a ella.
 *
 * * Es útil cuando necesitas controlar el acceso a una única instancia
 * * de una clase, como por ejemplo, en un objeto de base de datos o en un
 * * objeto de configuración.
 *
 * https://refactoring.guru/es/design-patterns/singleton
 */

class ConfigManager {
  private config: Record<string, string> = {};

  public setConfig(key: string, value: string): void {
    this.config[key] = value;
  }

  public getConfig(key: string): string | null {
    return this.config[key] || null;
  }

  public getAllConfig(): Record<string, string> {
    return { ...this.config  }; //Evitar q lo modifiquen desde afuera
  }
}

export const configmanager = new ConfigManager();


configmanager.setConfig('apiUrl', 'https://api.example.com');
configmanager.setConfig('timeout', '5000');
configmanager.setConfig('retries', '3');

console.log('API URL:', configmanager.getConfig('apiUrl'));
console.log('Timeout:', configmanager.getConfig('timeout'));
console.log('All Configurations:', configmanager.getAllConfig());
