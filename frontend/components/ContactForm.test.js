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
  const header = screen.queryByText("Contact Form") // dont need the special way of //i because this is hardcoded
  //Should use query when getting things
  // console.log(header)
  //Assert
  // Reqs are ; be in the document, determine if 'heads' is truthy?, and if text content is what it should be
  expect(header).toBeInTheDocument()
  expect(header).toBeTruthy() // I dont understand, reference video
  expect(header).toHaveTextContent("Contact Form")

});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
  //Arrange
  render(<ContactForm />)
  //Act
  const firstNameInput = screen.queryByPlaceholderText("Edd")
  // console.log(firstNameInput)//It is getting it
  await userEvent.click(firstNameInput)
  await userEvent.type(firstNameInput, "eddy") //When doing type, YOU HAVE TO TELL IT WHERE TO TYPE!!!!!!!!!!!!!!!!!!!!!!!!!!
  //Assert
  await expect(screen.queryByTestId("error"))
  //pretty sure i didnt use await right, reference video
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
  render(<ContactForm />)

  const firstNameInput = screen.queryByPlaceholderText("Edd")
  const lastNameInput = screen.queryByPlaceholderText("Burke")
  const emailInput = screen.queryByPlaceholderText("bluebill1049@hotmail.com")
  const submitButton = screen.queryByRole("button")
  
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

  const firstNameInput = screen.queryByPlaceholderText("Edd")
  const lastNameInput = screen.queryByPlaceholderText("Burke")
  const submitButton = screen.queryByRole("button")

  userEvent.type(firstNameInput, "Markus")
  userEvent.type(lastNameInput, "Loodenburg")
  userEvent.click(submitButton)

  const error = screen.queryByTestId("error")
  expect(error).toBeVisible()

});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
  render(<ContactForm />)

  const emailInput = screen.queryByPlaceholderText("bluebill1049@hotmail.com")

  userEvent.type(emailInput, "afd234f749hasd")
  const errorEmail = screen.queryByText("Error: email must be a valid email address.")
  expect(errorEmail).toHaveTextContent("Error: email must be a valid email address.")
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
  render(<ContactForm />)

  const firstNameInput = screen.queryByPlaceholderText("Edd")
  const emailInput = screen.queryByPlaceholderText("bluebill1049@hotmail.com")
  const submitButton = screen.queryByRole("button")

  userEvent.type(firstNameInput, "Joseph")
  userEvent.type(emailInput, "phiraxxis@hotmedia.com")
  userEvent.click(submitButton)
  const errorLastName = screen.queryByText("Error: lastName is a required field.")

  expect(errorLastName).toHaveTextContent("Error: lastName is a required field.")

});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
  render(<ContactForm />)

  const firstNameInput = screen.queryByPlaceholderText("Edd")
  const lastNameInput = screen.queryByPlaceholderText("Burke")
  const emailInput = screen.queryByPlaceholderText("bluebill1049@hotmail.com")
  const submitButton = screen.queryByRole("button")

  userEvent.type(firstNameInput, "Lotaska")
  userEvent.type(lastNameInput, "Harconius")
  userEvent.type(emailInput, "W0rldRul3r@warlord.com")
  userEvent.click(submitButton)
  expect(screen.getByTestId("firstnameDisplay")).toHaveTextContent("First Name: Lotaska")
  expect(screen.getByTestId("lastnameDisplay")).toHaveTextContent("Last Name: Harconius")
  expect(screen.getByTestId("emailDisplay")).toHaveTextContent("W0rldRul3r@warlord.com")
  
});

test('renders all fields text when all fields are submitted.', async () => {
render(<ContactForm />)

  const firstNameInput = screen.queryByPlaceholderText("Edd")
  const lastNameInput = screen.queryByPlaceholderText("Burke")
  const emailInput = screen.queryByPlaceholderText("bluebill1049@hotmail.com")
  const messageInput = screen.queryByLabelText("Message")//had to cus no placeholder
  const submitButton = screen.queryByRole("button")
  
  userEvent.type(firstNameInput, "Lotaska")
  userEvent.type(lastNameInput, "Harconius")
  userEvent.type(emailInput, "W0rldRul3r@warlord.com")
  userEvent.type(messageInput, "Time to conquer those imperial bastards!")
  userEvent.click(submitButton)
  expect(screen.getByTestId("firstnameDisplay")).toHaveTextContent("First Name: Lotaska")
  expect(screen.getByTestId("lastnameDisplay")).toHaveTextContent("Last Name: Harconius")
  expect(screen.getByTestId("emailDisplay")).toHaveTextContent("W0rldRul3r@warlord.com")
  expect(screen.getByTestId("messageDisplay")).toHaveTextContent("Message: Time to conquer those imperial bastards!")
  
});
