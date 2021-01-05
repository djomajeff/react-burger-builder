import classes from '*.module.css';
import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button'

class ContactData extends Component {
	state = {
		name: '',
		email: '',
		address: {
			street: '',
			postalCode: '',
		}
	}
	render() {
		return (
			<div className={classes.ContactData}>
				<h1>Enter your Contact Data</h1>
				<form >
					<input type="text" name="name" placeholder="your Name" />
					<input type="email" name="email" placeholder="your Email" />
					<input type="text" name="street" placeholder="your Street" />
					<input type="text" name="postal code" placeholder="your Postal Code" />
					<Button type="Success">ORDER</Button>
				</form>
			</div>
		);
	}
}

export default ContactData;