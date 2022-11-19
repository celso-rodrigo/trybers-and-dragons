import Fighter, { SimpleFighter } from '../Fighter';
import Monster from '../Monster';
import Battle from './Battle';

export default class PVE extends Battle {
  constructor(
    private _player: Fighter,
    private _enemies: Array<Monster | Fighter | SimpleFighter>,
  ) {
    super(_player);
  }

  fight(): number {
    let fighting = true;
    while (fighting) {
      const targets = this._enemies.filter(
        (monster) => monster.lifePoints > 0,
      ); // Get all monsters with remaining HP
      this._player.attack(targets[0]);
      if (targets.every((target) => target.lifePoints === -1)) fighting = false;
      targets.forEach((monster) => monster.attack(this._player));
      if (this._player.lifePoints === -1) fighting = false;
    }
    return super.fight();
  }
}