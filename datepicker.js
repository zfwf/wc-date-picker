import { html, render } from "https://unpkg.com/lit-html?module";

const weekdays = moment()
  .localeData()
  .weekdaysShort()
  .map(d => d.toLowerCase());
const now = moment(new Date());

const style = html`
<style>
  *, *:before, *:after {
    box-sizing: border-box;
  }
  .container {
    display: flex;
    flex-wrap: wrap;
  }
  .cell {
    flex: 0 0 calc(100%/7);
    border: 1px solid #ddd;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
`;

class DatePicker extends HTMLElement {
  constructor() {
    super();

    const now = moment();
    const daysInMonth = now.daysInMonth();
    console.log("daysinmonth", daysInMonth);
    const firstDayOfTheMonth = moment([now.year(), now.month(), 1]);
    const lastDayOfTheMonth = moment([now.year(), now.month(), daysInMonth]);
    const offsetDaysFromLastMonth = firstDayOfTheMonth.day();

    const numWeeksInMonth = Math.ceil(
      (lastDayOfTheMonth + offsetDaysFromLastMonth) / 7
    );
    const padDaysToNextMonth =
      (lastDayOfTheMonth + offsetDaysFromLastMonth) % 7;
    const firstDateOfCalMonth = firstDayOfTheMonth
      .clone()
      .subtract(offsetDaysFromLastMonth, "days");
    const lastDateOfCalMonth = lastDayOfTheMonth
      .clone()
      .add(padDaysToNextMonth, "days");
    this.currentMonth = now.month();
    this.currentYear = now.year();
    const template = html`
      ${style}
        <div class="container">
        ${weekdays.map(d => html`<div class="cell"><span>${d}</span></div>`)}
        ${this.createDateCells(firstDateOfCalMonth, lastDateOfCalMonth)}
      </div>
    `;
    const shadowRoot = this.attachShadow({ mode: "open" });
    render(template, shadowRoot);
  }

  createDateCells(a, b) {
    const res = [];
    for (let m = moment(a); m.isBefore(b); m.add(1, "days")) {
      res.push(this.createDateCell(m));
    }

    return res;
  }

  createDateCell(date) {
    if (this.isInCurrentMonth(this.currentMonth, date)) {
      return html`<div class="cell"><span>${date.date()}</span></div>`;
    } else {
      return html`<div class="cell"></div>`;
    }
  }

  isInCurrentMonth(currentMonth, date) {
    return currentMonth === date.month();
  }
}

customElements.define("date-picker", DatePicker);
