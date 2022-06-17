import s from "../../Components/CityPage/CityPage.module.css";

type Prop = {
  setChangeCityStatus: (arg: boolean) => void;
  typeCity: string;
  changeCityStatus: boolean;
  setCityName: (arg: string) => void;
};

export function Buttons({
  setChangeCityStatus,
  typeCity,
  changeCityStatus,
  setCityName,
}: Prop) {
  return (
    <>
      {changeCityStatus === false ? (
        <>
          <button
            className={s.change}
            onClick={() => {
              setChangeCityStatus(true);
            }}
          >
            Change city
          </button>
        </>
      ) : (
        <>
          <button
            className={s.find}
            onClick={() => {
              setChangeCityStatus(false);
              setCityName(typeCity);
            }}
          >
            Change city
          </button>
        </>
      )}
    </>
  );
}
