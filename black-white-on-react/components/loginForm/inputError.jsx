import classes from "../../styles/index.module.scss";

export default function InputError({ text }) {
  return (
    <>{text ? <h1 className={classes.inputErrorAlert}>{text}</h1> : null}</>
  );
}
