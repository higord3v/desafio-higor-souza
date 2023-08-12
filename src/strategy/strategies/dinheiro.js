class Dinheiro {
  execute(valor) {
    const resultado = valor - valor * 0.05;
    return resultado;
  }
}

export { Dinheiro };
