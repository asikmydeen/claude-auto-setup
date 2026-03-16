const NAME_MIN = 3;
const PASSWORD_MIN = 3;
const NAME_MAX = 60;

// Errors constant name is created from:
// 1: uppercase input name + _ + (eg: NAME)
// 2: error type served by joi + _ + (eg: MIN)
// 3: ERROR
// 4: final constant name: NAME_MIN_ERROR

const NAME_MIN_ERROR = `Name length must be at least ${NAME_MIN} characters long`;
const NAME_MAX_ERROR = `Name length must be less than or equal to ${NAME_MAX} characters long`;
const PASSWORD_MIN_ERROR = `Password length must be at least ${PASSWORD_MIN} characters long`;
const PASSWORD_MAX_ERROR = `Password length must be less than or equal to ${NAME_MAX} characters long`;
const NEWPASSWORD_MIN_ERROR = `New Password length must be at least ${PASSWORD_MIN} characters long`;
const NEWPASSWORD_MAX_ERROR = `New Password length must be less than or equal to ${NAME_MAX} characters long`;
const USERNAME_EMAIL_ERROR = 'Email must be a valid email address';
const UPDATE_INFO_SUCCESS_MESSAGE = 'Profile successfully updated.';
const CONFIRMPASSWORD_ALLOWONLY_ERROR = 'New password and Confirm new password fields must match';
const UPDATE_INFO_ERROR_MESSAGE = 'Could not save your account information';
const FETCH_INFO_ERROR_MESSAGE = 'Could not fetch your account information';

module.exports = {
  PASSWORD_MIN,
  NAME_MIN,
  NAME_MAX,
  NAME_MIN_ERROR,
  NAME_MAX_ERROR,
  PASSWORD_MIN_ERROR,
  PASSWORD_MAX_ERROR,
  NEWPASSWORD_MIN_ERROR,
  NEWPASSWORD_MAX_ERROR,
  CONFIRMPASSWORD_ALLOWONLY_ERROR,
  USERNAME_EMAIL_ERROR,
  UPDATE_INFO_SUCCESS_MESSAGE,
  UPDATE_INFO_ERROR_MESSAGE,
  FETCH_INFO_ERROR_MESSAGE,
};
