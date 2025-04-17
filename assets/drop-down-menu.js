// Getting elements
function toggleMenu(id) {
  const element = document.getElementById(id)
  const isOpen = element.getAttribute("data-open") === "true" ? true : false
  element.setAttribute("data-open", !isOpen)
}

// Defining class
class DropDownMenu extends HTMLElement {
  bound = this.getAttribute("data-bound")

  constructor() {
    super();

    document.addEventListener("click", (e) => {
      this.clickOutRange(e)
    })

  }

  getIdButton() {
    return this.bound
  }

  // Observed attributes to make it reactive
  static get observedAttributes() {
    return ["data-open"] // The attribute which is going to be observed
  }

  // This is the actual method that change the property
  attributeChangedCallback(name, old, now) {
    if (now === "true") {
      this.removeAttribute("hidden")
    } else {
      this.setAttribute("hidden", true)
    }
  }

  clickOutRange(event) {
    if (this.getAttribute("data-open") === "true") {
      const isContained = this.contains(event.target)
      const element = document.getElementById(`button-${this.id}`)
      const isTrigger = element.contains(event.target)

      if (!isContained && !isTrigger) {
        this.setAttribute("hidden", true)
      }
    }
  }
}

// Custom Elements register
customElements.define("drop-down-menu", DropDownMenu)

