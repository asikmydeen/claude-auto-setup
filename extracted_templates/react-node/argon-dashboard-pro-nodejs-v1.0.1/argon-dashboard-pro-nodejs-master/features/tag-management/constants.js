const NAME_MIN = 3;
const NAME_MAX = 60;

// Errors constant name is created from:
// 1: uppercase input name + _ + (eg: NAME)
// 2: error type served by joi + _ + (eg: MIN)
// 3: ERROR
// 4: final constant name: NAME_MIN_ERROR

const NAME_MIN_ERROR = `Name length must be at least ${NAME_MIN} characters long`;
const NAME_MAX_ERROR = `Name length must be less than or equal to ${NAME_MAX} characters long`;
const UPDATE_INFO_SUCCESS_MESSAGE = 'Tag successfully updated.';
const UPDATE_INFO_ERROR_MESSAGE = 'Could not save tag information';
const ADD_TAG_SUCCESS_MESSAGE = 'Tag successfully added.';
const ADD_TAG_ERROR_MESSAGE = 'Could not save tag';
const REMOVE_TAG_ERROR_MESSAGE = 'Could not remove tag';
const FETCH_INFO_ERROR_MESSAGE = 'Could not fetch tag information';

module.exports = {
  NAME_MIN,
  NAME_MAX,
  NAME_MIN_ERROR,
  NAME_MAX_ERROR,
  UPDATE_INFO_SUCCESS_MESSAGE,
  UPDATE_INFO_ERROR_MESSAGE,
  ADD_TAG_SUCCESS_MESSAGE,
  ADD_TAG_ERROR_MESSAGE,
  REMOVE_TAG_ERROR_MESSAGE,
  FETCH_INFO_ERROR_MESSAGE,
};
