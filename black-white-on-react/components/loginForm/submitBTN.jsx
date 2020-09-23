import classes from '../../styles/index.module.scss'


export default function SubmitBTN({ submitBTNText }) {

  return (
  
      <button className={classes.startGameBTN} type='submit'>{submitBTNText}</button>
   
  )
}