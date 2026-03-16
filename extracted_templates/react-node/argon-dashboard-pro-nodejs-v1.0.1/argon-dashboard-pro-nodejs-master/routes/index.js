const express = require('express');

const router = express.Router();

const registerRoutes = require('../features/register/routes');
const loginRoutes = require('../features/login/routes');
const logoutRoutes = require('../features/logout/routes');
const resetPasswordRoutes = require('../features/reset-password/routes');
const profileRoutes = require('../features/profile/routes');
const userManagementRoutes = require('../features/user-management/routes');
const tagManagementRoutes = require('../features/tag-management/routes');
const categoryManagementRoutes = require('../features/category-management/routes');
const postsManagementRoutes = require('../features/posts/routes');

function isAuthenticated(req, res, next) {
  if (req.user && req.isAuthenticated()) {
    return next();
  }

  return res.redirect('/login');
}

// Homepage route
router.get('/', (req, res) => {
  res.render('pages/homepage');
});

// Dashboards routes
router.get('/dashboard', isAuthenticated, (req, res) => {
  res.render('pages/dashboards/dashboard', { pageCategory: 'dashboards', activePage: 'dashboard' });
});

router.get('/alternative', isAuthenticated, (req, res) => {
  res.render('pages/dashboards/alternative', {
    pageCategory: 'dashboards',
    activePage: 'alternative',
  });
});

// Examples pages routes
router.get('/pricing', (req, res) => {
  res.render('pages/examples/pricing');
});

router.get('/lock', (req, res) => {
  res.render('pages/examples/lock');
});

router.get('/timeline', isAuthenticated, (req, res) => {
  res.render('pages/examples/timeline', { pageCategory: 'examples', activePage: 'timeline' });
});

router.use('/register', registerRoutes);

router.use('/login', loginRoutes);

router.use('/logout', isAuthenticated, logoutRoutes);

router.use('/reset-password', resetPasswordRoutes);

router.use('/profile', isAuthenticated, profileRoutes);

router.use('/user-management', isAuthenticated, userManagementRoutes);

router.use('/tag-management', isAuthenticated, tagManagementRoutes);

router.use('/category-management', isAuthenticated, categoryManagementRoutes);

router.use('/posts', isAuthenticated, postsManagementRoutes);

// Components pages routes
router.get('/buttons', isAuthenticated, (req, res) => {
  res.render('pages/components/buttons', { pageCategory: 'components', activePage: 'buttons' });
});

router.get('/cards', isAuthenticated, (req, res) => {
  res.render('pages/components/cards', { pageCategory: 'components', activePage: 'cards' });
});

router.get('/grid', isAuthenticated, (req, res) => {
  res.render('pages/components/grid', { pageCategory: 'components', activePage: 'grid' });
});

router.get('/notifications', isAuthenticated, (req, res) => {
  res.render('pages/components/notifications', {
    pageCategory: 'components',
    activePage: 'notifications',
  });
});

router.get('/typography', isAuthenticated, (req, res) => {
  res.render('pages/components/typography', {
    pageCategory: 'components',
    activePage: 'typography',
  });
});

router.get('/icons', isAuthenticated, (req, res) => {
  res.render('pages/components/icons', {
    pageCategory: 'components',
    activePage: 'icons',
  });
});

// Forms pages routes
router.get('/forms', isAuthenticated, (req, res) => {
  res.render('pages/forms/components', {
    pageCategory: 'forms',
    activePage: 'components',
  });
});

router.get('/elements', isAuthenticated, (req, res) => {
  res.render('pages/forms/elements', {
    pageCategory: 'forms',
    activePage: 'elements',
  });
});

router.get('/validation', isAuthenticated, (req, res) => {
  res.render('pages/forms/validation', {
    pageCategory: 'forms',
    activePage: 'validation',
  });
});

// Maps pages routes
router.get('/google', isAuthenticated, (req, res) => {
  res.render('pages/maps/google', {
    pageCategory: 'maps',
    activePage: 'google',
  });
});

router.get('/vector', isAuthenticated, (req, res) => {
  res.render('pages/maps/vector', {
    pageCategory: 'maps',
    activePage: 'vector',
  });
});

// Tables pages routes
router.get('/tables', isAuthenticated, (req, res) => {
  res.render('pages/tables/tables', {
    pageCategory: 'tables',
    activePage: 'tables',
  });
});

router.get('/datatables', isAuthenticated, (req, res) => {
  res.render('pages/tables/datatables', {
    pageCategory: 'tables',
    activePage: 'datatables',
  });
});

router.get('/sortable', isAuthenticated, (req, res) => {
  res.render('pages/tables/sortable', {
    pageCategory: 'tables',
    activePage: 'sortable',
  });
});

// Widgets page
router.get('/widgets', isAuthenticated, (req, res) => {
  res.render('pages/widgets', {
    pageCategory: 'dashboard',
    activePage: 'widgets',
  });
});

// Charts page
router.get('/charts', isAuthenticated, (req, res) => {
  res.render('pages/charts', {
    pageCategory: 'dashboard',
    activePage: 'charts',
  });
});

// Calendar page
router.get('/calendar', isAuthenticated, (req, res) => {
  res.render('pages/calendar', {
    pageCategory: 'dashboard',
    activePage: 'calendar',
  });
});

module.exports = router;
