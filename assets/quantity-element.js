const BUTTON = "BUTTON";
const PLUS = "plus"

class QuantityElement extends HTMLElement {

  constructor() {
    super();
    this.quantity = null;
    this.addEventListener("click", (element) => this.onQuantityChange(element))
  }

  onQuantityChange(element) {
    if (element.srcElement.tagName === BUTTON) {
      this.quantity = document.getElementsByName("quantity")[0];
      let newQuantity = parseInt(this.quantity.value);

      if (element.srcElement.name === PLUS) {
        newQuantity = newQuantity + 1;
      } else {
        if (newQuantity > 1) {
          newQuantity = newQuantity - 1;
        }
      }
      this.quantity.value = newQuantity.toString();
    }
  }
}

customElements.define("quantity-element", QuantityElement)

