class Context {
  #strategy;

  setStrategy(strategy) {
    this.#strategy = strategy;
  }

  executeStrategy(valor) {
    return this.#strategy.execute(valor);
  }
}

export { Context };
