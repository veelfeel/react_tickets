import React from "react";
import { ICheckboxes } from "../../@types/checkboxes";

import style from "./FilterStop.module.scss";

import iconChecked from "../../assets/img/icon-checked.svg";

type FilterPropType = {
  setCheckboxes: (value: ICheckboxes[]) => void;
  checkboxes: ICheckboxes[];
};

export const FilterStop: React.FC<FilterPropType> = ({
  checkboxes,
  setCheckboxes,
}) => {
  const selectAllCheckboxRef = React.useRef<HTMLInputElement>(null);
  const сheckboxRefs = React.useRef<HTMLInputElement[]>([]);

  const onChangeCheckboxes = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "Все") {
      const selectedStopsNameIsAll = checkboxes.map((checkbox) => {
        return { ...checkbox, isChecked: e.target.checked };
      });
      setCheckboxes(selectedStopsNameIsAll);
    } else {
      const selectedStopsNameIsNotAll = checkboxes.map((checkbox) =>
        checkbox.name === e.target.name
          ? { ...checkbox, isChecked: e.target.checked }
          : checkbox
      );
      setCheckboxes(selectedStopsNameIsNotAll);
    }
  };

  const onMouseEnterCheckboxText = (index: number) => {
    const selectedStops = checkboxes.filter((x) => x.isChecked);

    if (selectedStops.length < 2) {
      return;
    }

    const checkboxesTextVisible = checkboxes.map((x, idx) =>
      x.isChecked === true && idx === index
        ? { ...x, textIsShow: true }
        : { ...x, textIsShow: false }
    );

    setCheckboxes(checkboxesTextVisible);
  };

  const onMouseLeaveCheckboxText = (index: number) => {
    const checkboxesTextHidden = checkboxes.map((x, idx) =>
      idx === index ? { ...x, textIsShow: false } : x
    );

    setCheckboxes(checkboxesTextHidden);
  };

  const onClickCheckboxText = (index: number) => {
    const selectOnlyOneCheckbox = checkboxes.map((x, idx) =>
      idx === index
        ? {
            ...x,
            isChecked: true,
          }
        : {
            ...x,
            isChecked: false,
          }
    );

    setCheckboxes(selectOnlyOneCheckbox);
  };

  return (
    <>
      <span>Количество пересадок</span>
      <ul className={style.root}>
        <li>
          <div
            onClick={() => selectAllCheckboxRef.current?.click()}
            className={
              checkboxes.every((checkbox) => checkbox.isChecked)
                ? style.checkboxActive
                : style.checkbox
            }
          >
            {checkboxes.every((checkbox) => checkbox.isChecked) && (
              <img
                width="10"
                height="10"
                src={iconChecked}
                alt="icon checked"
                className={style.iconChecked}
              />
            )}
          </div>
          <input
            ref={selectAllCheckboxRef}
            onChange={onChangeCheckboxes}
            type="checkbox"
            id="Все"
            name="Все"
            checked={checkboxes.every((checkbox) => checkbox.isChecked)}
            hidden
          />
          <label htmlFor="Все">Все</label>
        </li>
        {checkboxes.map((item, index) => (
          <li
            key={index}
            onMouseEnter={() => onMouseEnterCheckboxText(index)}
            onMouseLeave={() => onMouseLeaveCheckboxText(index)}
          >
            <div
              onClick={() => сheckboxRefs.current[index].click()}
              className={item.isChecked ? style.checkboxActive : style.checkbox}
            >
              {item.isChecked && (
                <img
                  width="10"
                  height="10"
                  src={iconChecked}
                  alt="icon checked"
                  className={style.iconChecked}
                />
              )}
            </div>
            <input
              ref={(element) => {
                сheckboxRefs.current[index] = element as HTMLInputElement;
              }}
              onChange={onChangeCheckboxes}
              type="checkbox"
              id={item.name}
              name={item.name}
              checked={item.isChecked}
              hidden
            />
            <label htmlFor={item.name}>{item.name}</label>
            {item.textIsShow === true && (
              <p
                onClick={() => onClickCheckboxText(index)}
                className={style.textWithHover}
              >
                Только
              </p>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};
