export class Account {
    private _balance: number;

    constructor(balance = 0) {
        this._balance = balance;
    }

    get balance(): number {
        return this._balance;
    }

    deposit(amount: number) {
        this._balance += amount;
    }

  withdraw() {
    const balance = this._balance;
    this._balance = 0;
    return balance;
  }
}