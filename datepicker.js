import { html, render } from "https://unpkg.com/lit-html?module";

const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
const now = new Date();
const template = html`
<div class="container">
  ${days.map(d => html`<div>${d}</div>`)}
</div>
`;

class DatePicker extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });
    render(template, shadowRoot);
  }
}

customElements.define("date-picker", DatePicker);
