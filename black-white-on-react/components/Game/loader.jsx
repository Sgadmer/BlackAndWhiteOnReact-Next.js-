import classes from "../../styles/loader.module.scss";
import { useEffect, useState } from "react";

export default function Loader({
  loadText,
  URLforOtherPlayers,
  URLcopyBTNText,
}) {
  const [URLBTNText, setcopyBTNText] = useState("");

  function copyURL(e) {
    navigator.clipboard
      .writeText(URLforOtherPlayers)
      .then(() => {
        setcopyBTNText(`Ссылка скопирована`);
      })
      .catch((err) => {
        throw Error(err);
      });
  }

  useEffect(() => {
    setcopyBTNText(URLcopyBTNText);
  }, [URLcopyBTNText]);

  return (
    <>
      <div className={classes.wpapper}>
        <div className={classes.loader}></div>
        <h1 className={classes.loadText}>{loadText}</h1>
        <section className={classes.copyURLblock}>
          <h1 className={classes.URLforOtherPlayers}>{URLforOtherPlayers}</h1>
          <button onClick={() => copyURL()} className={classes.copyURL_btn}>
            {URLBTNText}
          </button>
        </section>
      </div>
    </>
  );
}
