export const CHANGE_EMAIL_VALUE = 'CHANGE_EMAIL_VALUE';
export const CHANGE_PASSWORD_VALUE = 'CHANGE_PASSWORD_VALUE';

export const changeEmailValue = (email) => ({
  type: CHANGE_EMAIL_VALUE,
  email,
});

export const changePasswordValue = (password) => ({
  type: CHANGE_PASSWORD_VALUE,
  password,
});
