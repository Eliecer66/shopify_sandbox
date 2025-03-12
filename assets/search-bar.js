
function toggleSearch(id) {
  const element = document.getElementById(id);
  const isOpen = element.getAttribute("data-open") === "true" ? true : false;
  element.setAttribute("data-open", !isOpen);
}

class SearchBar extends HTMLElement {
  constructor() {
    super();
    console.log("Constructing Searchbar")
  }

  // Observed attributes to make it reactive
  static get observedAttributes() {
    return ["data-open"] // The attribute which is going to be observed
  }

  /**
   * This method change the atribute that makes appear the search bar in the header
   * @param {name} string - this is the name of the atribute that is being obseved
   * @param {old} string - The old value that it got
   * @param {now} string - The new value that was set
   * */
  attributeChangedCallback(name, old, now) {
    if (now === "true") {
      this.removeAttribute("hidden");
    } else {
      this.setAttribute("hidden", true);
    }
  }
}

// Custom Elements register
customElements.define("search-bar", SearchBar)
