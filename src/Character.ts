import Archetype, { Mage } from './Archetypes';
import Energy from './Energy';
import Fighter from './Fighter';
import Race, { Elf } from './Races';
import getRandomInt from './utils';

export default class Character implements Fighter {
  private _race: Race;
  private _archetype: Archetype;
  private _maxLifePoints: number;
  private _lifePoints: number;
  private _strength: number;
  private _defense: number;
  private _dexterity: number;
  private _energy: Energy;

  constructor(name: string) {
    this._dexterity = getRandomInt(1, 10);
    this._race = new Elf(name, this._dexterity);
    this._archetype = new Mage(name);
    this._maxLifePoints = this._race.maxLifePoints / 2;
    this._lifePoints = this._maxLifePoints;
    this._strength = getRandomInt(1, 10);
    this._defense = getRandomInt(1, 10);
    this._energy = {
      type_: this._archetype.energyType,
      amount: getRandomInt(1, 10) };
  }

  get race(): Race { return this._race; }
  get archetype(): Archetype { return this._archetype; }
  get lifePoints(): number { return this._lifePoints; }
  get strength(): number { return this._strength; }
  get defense(): number { return this._defense; }
  get dexterity(): number { return this._dexterity; }
  get energy(): Energy {
    return { type_: this._energy.type_, amount: this._energy.amount };
  }

  attack(enemy:Fighter): void { enemy.receiveDamage(this.strength); }

  special?(enemy:Fighter): void {
    let critMultiplier = 1;
    const randomizer = getRandomInt(1, 20);
    if (randomizer <= 10) critMultiplier = 0;
    if (randomizer === 20) critMultiplier = 3;
    if (randomizer > 10 && randomizer <= 19) critMultiplier = 2;
    enemy.receiveDamage(this.strength * critMultiplier);
  }

  calculateLifeUpgrade(): number {
    const lifeUpgrade = getRandomInt(1, 10) + this._maxLifePoints;
    if (lifeUpgrade > this.race.maxLifePoints) return this.race.maxLifePoints;
    return lifeUpgrade;
  }

  levelUp(): void {
    this._maxLifePoints = this.calculateLifeUpgrade();
    this._lifePoints = this._maxLifePoints;
    this._strength += getRandomInt(1, 10);
    this._dexterity += getRandomInt(1, 10);
    this._defense += getRandomInt(1, 10);
    this._energy.amount = 10;
  }

  receiveDamage(attackPoints: number): number {
    const damage = attackPoints - this._defense;
    if (damage > 0) {
      this._lifePoints -= damage;
    } else {
      this._lifePoints -= 1;
    }
    if (this._lifePoints <= 0) this._lifePoints = -1;
    return this._lifePoints;
  }
}