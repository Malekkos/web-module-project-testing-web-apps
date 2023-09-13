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

//Arrange
//Render the stuff
//Act
//Find the stuff your gonna check
//Assert
//run the checks







test('renders without errors', () => {
  render(<ContactForm />)
  //If ContactForm is NOT imported, the test fails
});

test('renders the contact form header', () => {
  //Arrange
  render(<ContactForm />)
  //Act
  const header = screen.getByText("Contact Form") // dont need the special way of //i because this is hardcoded
  // console.log(header)
  //Assert
  // Reqs are ; be in the document, determine if 'heads' is truthy?, and if text content is what it should be
  expect(header).toBeInTheDocument()
  expect(header).toBetruthy() // I dont understand, reference video
  expect(header).toHaveTextContent("Contact Form")

});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
  //Arrange
  render(<ContactForm />)
  //Act
  const firstNameInput = screen.getByPlaceholderText("Edd")
  // console.log(firstNameInput)//It is getting it
  await userEvent.click(firstNameInput)
  await userEvent.type(firstNameInput, "eddy") //When doing type, YOU HAVE TO TELL IT WHERE TO TYPE!!!!!!!!!!!!!!!!!!!!!!!!!!
  //Assert
  await expect(screen.queryByTestId("error"))
  //pretty sure i didnt use await right, reference video
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
  render(<ContactForm />)

  const firstNameInput = screen.getByPlaceholderText("Edd")
  const lastNameInput = screen.getByPlaceholderText("Burke")
  const emailInput = screen.getByPlaceholderText("bluebill1049@hotmail.com")
  const submitButton = screen.getByRole("button")
  
  userEvent.type(firstNameInput, "asda")
  userEvent.type(lastNameInput, "asdas")
  userEvent.type(emailInput, "asdffF@gmail.com")
  userEvent.clear(firstNameInput)
  userEvent.clear(lastNameInput)
  userEvent.clear(emailInput)
  userEvent.click(submitButton)
  // console.log(firstNameInput)
  // I've realized in hindsight that its if they click the submit button.
  const errorsArray =  screen.getAllByTestId("error")
  await expect(errorsArray).toHaveLength(3)
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
  render(<ContactForm />)

  const firstNameInput = screen.getByPlaceholderText("Edd")
  const lastNameInput = screen.getByPlaceholderText("Burke")
  const submitButton = screen.getByRole("button")

  userEvent.type(firstNameInput, "Markus")
  userEvent.type(lastNameInput, "Loodenburg")
  userEvent.click(submitButton)

  const error = screen.getByTestId("error")
  expect(error).toBeVisible()

});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {

});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {

});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {

});

test('renders all fields text when all fields are submitted.', async () => {

});
