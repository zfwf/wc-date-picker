import { html, render } from "https://unpkg.com/lit-html?module";

class DatePicker extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });
    const template = html`<h1>hello world</h1>`;
    render(template, shadowRoot);
  }
}

customElements.define("date-picker", DatePicker);
