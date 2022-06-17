import s from "../../Components/CityPage/CityPage.module.css";

type Prop = { changeCity: (arg: string) => void };

export function CityPage({ changeCity }: Prop) {
  return <div className={s.popup}></div>;
}
