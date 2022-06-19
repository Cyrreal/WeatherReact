import s from "../../Components/MainPage/MainPage.module.css";

import { useState } from "react";
import { Weather, Buttons, Input } from "../CityPage";
// import { } from "../CityPage";
// import {  } from "../CityPage";

type Prop = {
  props: any;
  changeCityStatus: boolean;
  setChangeCityStatus: (arg: boolean) => void;
  setCityName: (arg: string) => void;
  isGeo: boolean;
};
export function MainPage({
  props,
  setChangeCityStatus,
  changeCityStatus,
  setCityName,
  isGeo,
}: Prop) {
  const [typeCity, setTypeCity] = useState(props[2]);
  const temp = Math.ceil(props[0] - 273);
  const city = props[2];
  const description = props[1];
  return (
    <div className={s.container}>
      <div className={s.content}>
        <h1 className={s.title}>Weather</h1>

        {changeCityStatus === false ? (
          <Weather temp={temp} city={city} description={description} />
        ) : (
          <Input setTypeCity={setTypeCity} />
        )}
        <Buttons
          setChangeCityStatus={setChangeCityStatus}
          typeCity={typeCity}
          changeCityStatus={changeCityStatus}
          setCityName={setCityName}
        />
      </div>
    </div>
  );
}
