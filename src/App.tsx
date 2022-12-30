import React from "react";
import { ICheckboxes } from "./@types/checkboxes";
import { ITicket } from "./@types/ticket";

import "./app.scss";

import logoPng from "./assets/img/logo.png";

import { FilterCurrency } from "./components/FilterCurrency";
import { FilterStop } from "./components/FilterStop";
import { TicketBlock } from "./components/TicketBlock";

import data from "./tickets.json";

function App() {
  const [checkboxes, setCheckboxes] = React.useState<ICheckboxes[]>([
    { name: "Без пересадок", stops: 0, isChecked: false, textIsShow: false },
    { name: "1 пересадка", stops: 1, isChecked: false, textIsShow: false },
    { name: "2 пересадки", stops: 2, isChecked: false, textIsShow: false },
    { name: "3 пересадки", stops: 3, isChecked: false, textIsShow: false },
  ]);
  const [tickets, setTickets] = React.useState<ITicket[]>([]);

  React.useEffect(() => {
    const selectedStops = checkboxes
      .filter((checkbox) => checkbox.isChecked)
      .map((checkbox) => checkbox.stops);

    const filterSortTickets = data.tickets
      .filter(
        (ticket) =>
          !selectedStops.length || selectedStops.includes(ticket.stops)
      )
      .sort((a, b) => a.price - b.price);

    setTickets(filterSortTickets);
  }, [checkboxes]);

  return (
    <div className="container">
      <div className="logo-container">
        <img width="66" height="66" src={logoPng} alt="Tickets logo" />
      </div>
      <div className="content">
        <div className="filter-list">
          <FilterCurrency />
          <FilterStop checkboxes={checkboxes} setCheckboxes={setCheckboxes} />
        </div>
        <div className="ticket-list">
          {tickets.map((obj: ITicket, index) => (
            <TicketBlock key={obj.price + index} {...obj} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
