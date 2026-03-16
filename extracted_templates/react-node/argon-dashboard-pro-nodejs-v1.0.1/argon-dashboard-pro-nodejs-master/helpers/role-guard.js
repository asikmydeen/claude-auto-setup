module.exports = function roleGuard(roles = []) {
  if (!Array.isArray(roles)) {
    roles = [roles]; // eslint-disable-line no-param-reassign
  }
  return function validateRole(req, res, next) {
    if (!req.session.userInfo || !req.session.userInfo.id) {
      return res.redirect('/login');
    }
    if (roles.length) {
      if (!req.session.userInfo.role) {
        return res.redirect(req.headers.referer || '/');
      }

      if (!roles.includes(req.session.userInfo.role)) {
        return res.redirect(req.headers.referer || '/');
      }
    }
    return next();
  };
};
