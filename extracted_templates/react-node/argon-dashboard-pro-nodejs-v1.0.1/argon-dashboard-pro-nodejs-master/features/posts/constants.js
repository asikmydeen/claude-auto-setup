const TITLE_MIN = 3;
const TITLE_MAX = 60;
const CONTENT_MIN = 3;
const CONTENT_MAX = 300;

// Errors constant name is created from:
// 1: uppercase input name + _ + (eg: NAME)
// 2: error type served by joi + _ + (eg: MIN)
// 3: ERROR
// 4: final constant name: NAME_MIN_ERROR

const TITLE_MIN_ERROR = `Title length must be at least ${TITLE_MIN} characters long`;
const TITLE_MAX_ERROR = `Title length must be less than or equal to ${TITLE_MAX} characters long`;
const CONTENT_MIN_ERROR = `Content length must be at least ${CONTENT_MIN} characters long`;
const CONTENT_MAX_ERROR = `Content length must be less than or equal to ${CONTENT_MAX} characters long`;
const ADD_POST_SUCCESS_MESSAGE = 'Post successfully added.';
const ADD_POST_ERROR_MESSAGE = 'Could not save your post information';
const REMOVE_POST_ERROR_MESSAGE = 'Could not remove post';
const UPDATE_POST_SUCCESS_MESSAGE = 'Post successfully updated.';
const UPDATE_POST_ERROR_MESSAGE = 'Could not save your post information';

module.exports = {
  TITLE_MIN,
  TITLE_MAX,
  TITLE_MIN_ERROR,
  TITLE_MAX_ERROR,
  CONTENT_MIN,
  CONTENT_MAX,
  CONTENT_MIN_ERROR,
  CONTENT_MAX_ERROR,
  ADD_POST_SUCCESS_MESSAGE,
  ADD_POST_ERROR_MESSAGE,
  REMOVE_POST_ERROR_MESSAGE,
  UPDATE_POST_SUCCESS_MESSAGE,
  UPDATE_POST_ERROR_MESSAGE,
};
