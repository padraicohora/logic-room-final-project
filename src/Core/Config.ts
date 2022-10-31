import { injectable, inject } from 'inversify'
export interface ConfigI {
  apiUrl:string;
}
@injectable()
class Config implements ConfigI{
  apiUrl:string;
  constructor() {
    this.apiUrl = 'http://localhost:4040'
  }
}
export {Config}
