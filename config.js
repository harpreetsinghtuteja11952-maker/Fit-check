const path = require('path');
const isVercel = !!process.env.VERCEL;

module.exports = {
  PORT: process.env.PORT || 3000,
  SESSION_SECRET: process.env.SESSION_SECRET || 'gym-expert-system-secret-2024',
  DB_PATH: isVercel
    ? path.join('/tmp', 'gym_expert.db')
    : path.join(__dirname, 'data', 'gym_expert.db'),
  UPLOAD_DIR: isVercel
    ? path.join('/tmp', 'uploads')
    : path.join(__dirname, 'uploads'),
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  IS_VERCEL: isVercel,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || 'AQ.Ab8RN6Kh8-Xi6ek1faYzDyGQ1ez4UFjfsYcZugVfn8i6rtuNAg',
};
