import Race from './Race';

export default class Dwarf extends Race {
  private static _instances = 0;
  private _maxLifePoints: number;

  constructor(name: string, dexterity: number) {
    super(name, dexterity);
    this._maxLifePoints = 80;
    Dwarf._instances += 1;
  }

  get maxLifePoints(): number { return this._maxLifePoints; }

  static createdRacesInstances():number { return Dwarf._instances; }
}