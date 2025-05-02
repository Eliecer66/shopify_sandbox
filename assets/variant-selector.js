class VariantSelector extends HTMLElement {
  constructor() {
    super();
    this.addEventListener("change", this.onVariantChange);
  }

  onVariantChange() {
    this.getSelectedOptions();
    this.getSelectedVariant();

    if (this.currentVariant) {
      this.updateURL();
      this.updateFormID();
      this.updatePrice();
      this.updatePlaceholder()
    }
  }

  updatePlaceholder() {
    const url = window.location.pathname + window.location.search;
    fetch(url)
      .then(res => res.text())
      .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const variantContainer = doc.querySelectorAll("[variant-element]")[0]
        this.variantContainer.innerHTML = variantContainer.innerHTML;

        const stockHTML = doc.querySelector('[data-stock-content]');
        this.stockVariant.innerHTML = stockHTML.innerHTML;
      }).catch((error) =>
        console.log("There's an error: ", error)
      )
  }

  getSelectedOptions() {
    this.options = Array
      .from(this.querySelectorAll("select"), (select) => select.value)
    this.labelsOptions = Array
      .from(this.querySelectorAll("label"), (select) => select)
    this.stockVariant = document.getElementById("stock_variant");
    this.variantContainer = document.querySelectorAll("[variant-element]")[0]

    const inputsVariant = Array
      .from(this.querySelectorAll("input"))
      .find(element => element.checked === true)

    if (inputsVariant !== undefined) {
      this.options.push(inputsVariant.value);
    }
  }

  // This get from the product data the information needed
  getVariantJSON() {
    this.variantData = this.variant || JSON.parse(this.querySelector('[type="application/json"]').textContent);
    return this.variantData;
  }

  getSelectedVariant() {
    this.currentVariant = this.getVariantJSON()
      .find((variant) => {
        const variantFound = JSON.stringify(variant.options.sort()) === JSON.stringify(this.options.sort());
        if (variantFound) {
          return variant;
        }
      })
  }

  updateURL() {
    if (!this.currentVariant) return;
    window.history.replaceState({}, "", `${this.dataset.url}?variant=${this.currentVariant.id}`)
  }

  updateFormID() {
    const form_input = document.querySelector("#product-form").querySelector("input[name='id']");
    form_input.value = this.currentVariant.id;
  }

  updatePrice() {
    fetch(`${this.dataset.url}?variant=${this.currentVariant.id}&section_id=${this.dataset.section}`)
      .then(response => response.text())
      .then((responseText) => {
        const id = `price-${this.dataset.section}`;
        const html = new DOMParser().parseFromString(responseText, "text/html");

        const oldPrice = document.getElementById(id);
        const newPrice = html.getElementById(id);

        if (oldPrice && newPrice) {
          oldPrice.innerHTML = newPrice.innerHTML;
        }
      })
  }
}

customElements.define("variant-selector", VariantSelector)

