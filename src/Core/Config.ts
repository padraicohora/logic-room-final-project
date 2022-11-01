import { injectable, inject } from 'inversify'
export interface ConfigI {
  apiUrl:string;
}
@injectable()
class Config implements ConfigI{
  apiUrl:string;
  constructor() {
    this.apiUrl = 'https://api.logicroom.co/secure-api/padraicohora@gmail.com'
  }
}
export {Config}
