import s from "../../Components/CityPage/CityPage.module.css";

type Prop = {
  temp: number;
  city: string;
  description: string;
};
export function Weather({ temp, description, city }: Prop) {
  return (
    <>
      <p className={s.temp}>{temp}℃</p>
      <p className={s.description}>
        {description} in {city}
      </p>
    </>
  );
}
