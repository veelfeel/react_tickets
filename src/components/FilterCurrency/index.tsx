import React from "react";
import style from "./FilterCurrency.module.scss";

export const FilterCurrency: React.FC = () => {
  const [currencyButtons, setCurrencyButtons] = React.useState([
    { name: "RUB", isActive: true },
    { name: "USD", isActive: false },
    { name: "EUR", isActive: false },
  ]);

  const onClickActiveButton = (index: number) => {
    const newStateButton = currencyButtons.map((button, idx) =>
      index === idx
        ? { ...button, isActive: true }
        : { ...button, isActive: false }
    );
    setCurrencyButtons(newStateButton);
  };

  return (
    <>
      <span>Валюта</span>
      <ul className={style.root}>
        {currencyButtons.map((button, index) => (
          <li
            key={index}
            onClick={() => onClickActiveButton(index)}
            className={
              button.isActive === true ? style.buttonActive : style.button
            }
          >
            <button>{button.name}</button>
          </li>
        ))}
      </ul>
    </>
  );
};
