import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LOGIN_PAGE_DATA, HEADER_COMPONENT_DATA } from './constants';

export function logInTheApplication() {
  const {
    emailInputDataTestID,
    emailTest,
    loginSubmitBtnDataTestID,
    passwordInputDataTestID,
    passwordTest,
  } = LOGIN_PAGE_DATA;

  const emailInput = screen.getByTestId(emailInputDataTestID);
  const passwordInput = screen.getByTestId(passwordInputDataTestID);
  const btnSubmit = screen.getByTestId(loginSubmitBtnDataTestID);

  userEvent.type(emailInput, emailTest);
  userEvent.type(passwordInput, passwordTest);
  userEvent.click(btnSubmit);
}

export function navigateToProfile() {
  const { profileIconDataTestID } = HEADER_COMPONENT_DATA;
  const profileIcon = screen.getByTestId(profileIconDataTestID);

  userEvent.click(profileIcon);
}

export function toBeInTheDocumentAll(elements) {
  elements.forEach((element) => {
    expect(element).toBeInTheDocument();
  });
}
