import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

//Should try to break it first after writing it
// check all input fields - do they work as intended?
// theres a link in the top right of the page. Functionally, it should do something or go somewhere.
// does submit work?
//does submit work despite missing fields?
// does submit work despite Required missing fields?


test('renders without errors', () => {
  render(<ContactForm />)
  //If ContactForm is NOT imported, the test fails
});

test('renders the contact form header', () => {

});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {

});

test('renders THREE error messages if user enters no values into any fields.', async () => {

});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {

});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {

});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {

});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {

});

test('renders all fields text when all fields are submitted.', async () => {

});
