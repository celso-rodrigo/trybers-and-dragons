import Archetype from './Archetype';
import { EnergyType } from '../Energy';

export default class Ranger extends Archetype {
  private static _instances = 0;
  private _energyType: EnergyType;

  constructor(name: string) {
    super(name);
    this._energyType = 'stamina';
    Ranger._instances += 1;
  }

  static createdArchetypeInstances(): number { return Ranger._instances; }

  get energyType(): EnergyType { return this._energyType; }
}