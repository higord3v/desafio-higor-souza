import { Context } from "./strategy/context.js";
import { Dinheiro } from "./strategy/strategies/dinheiro.js";
import { Debito } from "./strategy/strategies/debito.js";
import { Credito } from "./strategy/strategies/credito.js";
import { cardapio } from "./cardapio.js";
import { BRLReal } from "./util.js";
export class CaixaDaLanchonete {
  #context;

  constructor() {
    this.#context = new Context();
  }
  calcularValorDaCompra(metodoDePagamento, itens) {
    if (!itens.length) {
      return "Não há itens no carrinho de compra!";
    }

    switch (metodoDePagamento) {
      case "dinheiro":
        this.#context.setStrategy(new Dinheiro());

        break;
      case "debito":
        this.#context.setStrategy(new Debito());

        break;
      case "credito":
        this.#context.setStrategy(new Credito());
        break;
      default:
        return "Forma de pagamento inválida!";
    }

    let erro;
    const itensList = itens.map((i) => {
      const [item] = i.split(",");
      return item;
    });
    if (itensList.includes("chantily") && !itensList.includes("cafe"))
      return "Item extra não pode ser pedido sem o principal";

    if (itensList.includes("queijo") && !itensList.includes("sanduiche"))
      return "Item extra não pode ser pedido sem o principal";

    const valorTotal = itens.reduce((prev, curr) => {
      let [item, quantidade] = curr.split(",");
      quantidade = Number(quantidade);

      quantidade === 0 ? (erro = "Quantidade inválida!") : null;
      cardapio[item] ? null : (erro = "Item inválido!");

      return prev + cardapio[item] * quantidade;
    }, 0);

    if (erro) return erro;

    const valorFinal = this.#context.executeStrategy(valorTotal).toFixed(2);
    return BRLReal.format(valorFinal);
  }
}
