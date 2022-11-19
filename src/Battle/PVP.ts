import Fighter from '../Fighter';
import Battle from './Battle';

export default class PVP extends Battle {
  constructor(private _playerOne: Fighter, private _playerTwo: Fighter) {
    super(_playerOne);
  }

  fight(): number {
    let fighting = true;
    while (fighting) {
      this._playerOne.attack(this._playerTwo);
      if (this._playerTwo.lifePoints <= 0) fighting = false;
      this._playerTwo.attack(this._playerOne);
      if (this._playerOne.lifePoints <= 0) fighting = false;
    }
    return super.fight();
  }
}