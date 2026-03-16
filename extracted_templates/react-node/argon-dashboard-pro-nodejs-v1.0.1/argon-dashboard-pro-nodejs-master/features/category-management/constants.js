const NAME_MIN = 3;
const NAME_MAX = 60;
const DESCRIPTION_MAX = 60;

// Errors constant name is created from:
// 1: uppercase input name + _ + (eg: NAME)
// 2: error type served by joi + _ + (eg: MIN)
// 3: ERROR
// 4: final constant name: NAME_MIN_ERROR

const NAME_MIN_ERROR = `Name length must be at least ${NAME_MIN} characters long`;
const NAME_MAX_ERROR = `Name length must be less than or equal to ${NAME_MAX} characters long`;
const DESCRIPTION_MAX_ERROR = `Description length must be less than or equal to ${DESCRIPTION_MAX} characters long`;
const DESCRIPTION_EMPTY_ERROR = 'Description is required.';
const UPDATE_INFO_SUCCESS_MESSAGE = 'Category successfully updated.';
const UPDATE_INFO_ERROR_MESSAGE = 'Could not save category information';
const ADD_CATEGORY_SUCCESS_MESSAGE = 'Category successfully added.';
const ADD_CATEGORY_ERROR_MESSAGE = 'Could not save category';
const FETCH_INFO_ERROR_MESSAGE = 'Could not fetch category information';
const REMOVE_CATEGORY_ERROR_MESSAGE = 'Could not remove category';

module.exports = {
  NAME_MIN,
  NAME_MAX,
  DESCRIPTION_MAX,
  NAME_MIN_ERROR,
  NAME_MAX_ERROR,
  DESCRIPTION_MAX_ERROR,
  DESCRIPTION_EMPTY_ERROR,
  UPDATE_INFO_SUCCESS_MESSAGE,
  UPDATE_INFO_ERROR_MESSAGE,
  ADD_CATEGORY_SUCCESS_MESSAGE,
  ADD_CATEGORY_ERROR_MESSAGE,
  FETCH_INFO_ERROR_MESSAGE,
  REMOVE_CATEGORY_ERROR_MESSAGE,
};
