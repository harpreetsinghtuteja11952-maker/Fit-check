const express = require('express');
const path = require('path');
const session = require('express-session');
const config = require('./config');

// Require db so tables are created on startup
require('./models/db');

const app = express();

// ---------- View engine ----------
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ---------- Body parsers ----------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------- Static files ----------
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(config.UPLOAD_DIR));

// ---------- Session ----------
app.use(
  session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 1 day
  })
);

// ---------- Routes ----------
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const workoutRoutes = require('./routes/workout');
const dietRoutes = require('./routes/diet');
const healthRoutes = require('./routes/health');
const progressRoutes = require('./routes/progress');

app.use('/auth', authRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/workout', workoutRoutes);
app.use('/diet', dietRoutes);
app.use('/health', healthRoutes);
app.use('/progress', progressRoutes);

// Root route: First Gym Landing Page (Screenshot Design)
app.get('/', (req, res) => {
  let user = null;
  if (req.session && req.session.userId) {
    try {
      const { getDb } = require('./models/db');
      user = getDb().prepare('SELECT * FROM users WHERE id = ?').get(req.session.userId);
    } catch (e) {
      console.error('Error fetching user for index:', e);
    }
  }
  res.render('index', { user, title: 'GYM - Be Strong Training Hard | Expert Fitness AI', activePage: 'home' });
});

// ---------- Start server ----------
if (!config.IS_VERCEL) {
  app.listen(config.PORT, () => {
    console.log(`Gym Expert System running at http://localhost:${config.PORT}`);
  });
}

module.exports = app;
