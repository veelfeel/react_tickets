import React from "react";
import style from "./TicketBlock.module.scss";

import companyLogo from "../../assets/img/company-logo.svg";
import airplaneSvg from "../../assets/img/airplane.svg";

import { declensionEndings } from "../../utils/declensionEndings";
import { getWeekDay } from "../../utils/getWeekDay";
import { getModifiedDateDormat } from "../../utils/getModifiedDateDormat";

interface TicketProps {
  origin: string;
  origin_name: string;
  destination: string;
  destination_name: string;
  departure_date: string;
  departure_time: string;
  arrival_date: string;
  arrival_time: string;
  stops: number;
  price: number;
}

export const TicketBlock: React.FC<TicketProps> = ({
  origin,
  origin_name,
  destination,
  destination_name,
  departure_date,
  departure_time,
  arrival_date,
  arrival_time,
  stops,
  price,
}) => {
  return (
    <div className={style.root}>
      <div className={style.leftContent}>
        <img
          height="38"
          className={style.airlineLogo}
          src={companyLogo}
          alt="company logo"
        />
        <button className={style.button}>
          Купить
          <br />
          за {price.toLocaleString("ru-RU")} ₽
        </button>
      </div>
      <div className={style.rightContent}>
        <div className={style.flightInformation}>
          <p className={style.time}>{departure_time}</p>
          <p className={style.city}>
            {origin}, {origin_name}
          </p>
          <p className={style.date}>
            {getModifiedDateDormat(departure_date)},{" "}
            {getWeekDay(departure_date)}
          </p>
        </div>
        <p className={style.transfer}>
          {(stops === 0 ? "без" : stops) +
            " " +
            declensionEndings(stops, ["пересадка", "пересадки", "пересадок"])}
          <img width="16" height="16" src={airplaneSvg} alt="airplane" />
        </p>
        <div className={style.flightInformation}>
          <p className={style.time}>{arrival_time}</p>
          <p className={style.city}>
            {destination_name}, {destination}
          </p>
          <p className={style.date}>
            {getModifiedDateDormat(arrival_date)}, {getWeekDay(arrival_date)}
          </p>
        </div>
      </div>
    </div>
  );
};
