import s from "../../Components/CityPage/CityPage.module.css";
import Loader from "../../YrhW.gif";
type Prop = {
  temp: number;
  city: string;
  description: string;
};
export function Weather({ temp, description, city }: Prop) {
  return (
    <>
      {isNaN(temp) ? (
        <div className="loader">
          <img src={Loader} />
        </div>
      ) : (
        <>
          {" "}
          <p className={s.temp}>{temp}℃</p>
          <p className={s.description}>
            {description} in {city}
          </p>
        </>
      )}
    </>
  );
}
