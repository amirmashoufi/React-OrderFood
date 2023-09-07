import { useRef, useState } from 'react';
import classes from './Checkout.module.css'

const isEmpty = (value) => value.trim() === '';
const isFiveChars = (value) => value.trim().length === 5 ;

const Checkout = (props) => {
    const [formIsValidity, setFormIsValidity] = useState({
        name: true,
        street: true,
        postalCode: true,
        city: true
    })



    const nameInputRef = useRef()
    const streetInputRef = useRef()
    const postalCodeInputRef = useRef()
    const cityInputRef = useRef()


    const confirmHandler = (event) => {
        event.preventDefault();

      const  enteredName = nameInputRef.current.value;
      const  enteredStreet = streetInputRef.current.value;
      const  enteredPostalCode = postalCodeInputRef.current.value;
      const  enteredCity = cityInputRef.current.value;

      const enteredNameIsValid = !isEmpty(enteredName)
      const enteredStreetIsValid = !isEmpty(enteredStreet)
      const enteredPostalCodeIsValid = !isEmpty(enteredPostalCode)
      const enteredCityIsValid = !isFiveChars(enteredCity)


      setFormIsValidity({
        name: enteredNameIsValid,
        street: enteredStreetIsValid,
        postalCode: enteredPostalCodeIsValid,
        city: enteredCityIsValid
      })

      const formIsValid = 
      enteredNameIsValid && 
      enteredStreetIsValid && 
      enteredPostalCodeIsValid &&
      enteredCityIsValid


      if (!formIsValid){
        return;
        }
        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            postalCode: enteredPostalCode,
            city: enteredCity,
        })

    }

    const nameControlClasses = `${classes.control} ${
        formIsValidity.name ? '' : classes.invalid
    }`
    const streetControlClasses = `${classes.control} ${
        formIsValidity.street ? '' : classes.invalid
    }`
    const postalCodeControlClasses = `${classes.control} ${
        formIsValidity.postalCode ? '' : classes.invalid
    }`
    const cityControlClasses = `${classes.control} ${
        formIsValidity.city ? '' : classes.invalid
    }`
return (
<form className={classes.form} onSubmit={confirmHandler}>
    <div className={nameControlClasses}>
        <label htmlFor="name">Your name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formIsValidity.name && <p>Please enter a valid name!</p>}
    </div>
    <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formIsValidity.street && <p>Please enter a valid street!</p>}
    </div>
    <div className={postalCodeControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalCodeInputRef} />
        {!formIsValidity.postalCode && <p>Please enter a valid postal code (5 characters long)!</p>}
    <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="City" ref={cityInputRef} />
        {!formIsValidity.city && <p>Please enter a valid city!</p>}
    </div>
    </div>
    <div className={classes.actions}>
    <button type='button' onClick={props.onCancle}>Cancel</button>
    <button className={classes.submit}>Confirm</button>
    </div>
</form>
)
    
}

export default Checkout