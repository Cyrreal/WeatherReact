import s from "../../Components/CityPage/CityPage.module.css";

type Prop = {
  setTypeCity: (arg: string) => void;
};

export function Input({ setTypeCity }: Prop) {
  return (
    <>
      <input
        className={s.input}
        type="text"
        placeholder="Type your city here"
        onChange={(event) => {
          setTypeCity(event.target.value);
        }}
      ></input>
      <hr className={s.underline} />
    </>
  );
}
