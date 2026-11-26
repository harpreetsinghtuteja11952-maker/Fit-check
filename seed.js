'use strict';

const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const config = require('./config');
const { getDb } = require('./models/db');

console.log('🌱 Seeding GymExpert AI Database...');

const db = getDb();

// 1. Ensure uploads directory & dummy sample report file
if (!fs.existsSync(config.UPLOAD_DIR)) {
  fs.mkdirSync(config.UPLOAD_DIR, { recursive: true });
}
const sampleReportPath = path.join(config.UPLOAD_DIR, 'sample_health_report.pdf');
if (!fs.existsSync(sampleReportPath)) {
  fs.writeFileSync(sampleReportPath, '%PDF-1.4 Sample Clinical Health & Blood Diagnostics Report for Rahul Sharma');
}

// 2. Clear previous seed data for clean run
const userEmail = 'rahul@example.com';
const existingUser = db.prepare('SELECT id FROM users WHERE email = ?').get(userEmail);
if (existingUser) {
  db.prepare('DELETE FROM meal_logs WHERE user_id = ?').run(existingUser.id);
  db.prepare('DELETE FROM workout_completions WHERE user_id = ?').run(existingUser.id);
  db.prepare('DELETE FROM weight_logs WHERE user_id = ?').run(existingUser.id);
  db.prepare('DELETE FROM health_reports WHERE user_id = ?').run(existingUser.id);
  db.prepare('DELETE FROM users WHERE id = ?').run(existingUser.id);
}

// 3. Create Seed User: Rahul Sharma
const hashedPassword = bcrypt.hashSync('Test@1234', 10);
const userInsert = db.prepare(`
  INSERT INTO users (
    name, email, password, age, gender, height, weight, goal, diet_type, activity_level, allergies, registration_complete
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
`).run(
  'Rahul Sharma',
  userEmail,
  hashedPassword,
  28,
  'male',
  175.0, // 175 cm
  78.0,  // 78 kg
  'muscle_gain',
  'non_veg',
  'moderate',
  JSON.stringify(['shellfish'])
);

const userId = userInsert.lastInsertRowid;
console.log(`👤 Created user: Rahul Sharma (ID: ${userId})`);

// 4. Create Health Report with Knee Injury and Elevated BP
db.prepare(`
  INSERT INTO health_reports (
    user_id, file_path, file_type, blood_pressure, blood_sugar, cholesterol, thyroid, injuries, medical_conditions
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
`).run(
  userId,
  '/uploads/sample_health_report.pdf',
  'application/pdf',
  '128/82',
  105,
  195,
  'normal',
  JSON.stringify(['knee_injury']),
  JSON.stringify([])
);
console.log(`🩺 Created health report for user ${userId} with knee injury`);

// 5. Create 14-day Weight Progression Logs
const today = new Date();
for (let i = 14; i >= 0; i--) {
  const d = new Date(today);
  d.setDate(d.getDate() - i);
  const dateStr = d.toISOString().split('T')[0];
  // Weight trending from 80.2 down to 78.0 kg
  const weight = (80.2 - (14 - i) * 0.15 + (Math.sin(i) * 0.1)).toFixed(1);
  db.prepare('INSERT INTO weight_logs (user_id, date, weight) VALUES (?, ?, ?)').run(userId, dateStr, parseFloat(weight));
}
console.log('📈 Seeded 14 days of weight logs');

// 6. Create Today's Partial Workout Completion (Warmup done, Workout done, Cooldown pending)
const todayStr = today.toISOString().split('T')[0];
db.prepare(`
  INSERT INTO workout_completions (user_id, date, warmup_done, workout_done, cooldown_done)
  VALUES (?, ?, 1, 1, 0)
`).run(userId, todayStr);
console.log(`🏋️ Seeded today's workout completion record for ${todayStr}`);

// 7. Seed Past 5 Days of Full Completions
for (let i = 1; i <= 5; i++) {
  const d = new Date(today);
  d.setDate(d.getDate() - i);
  const dateStr = d.toISOString().split('T')[0];
  db.prepare(`
    INSERT OR IGNORE INTO workout_completions (user_id, date, warmup_done, workout_done, cooldown_done)
    VALUES (?, ?, 1, 1, 1)
  `).run(userId, dateStr);
}

// 8. Seed Sample Meal Logs for Today
db.prepare(`
  INSERT INTO meal_logs (user_id, date, meal_type, food_name, calories, protein, carbs, fats)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`).run(userId, todayStr, 'Breakfast', 'Whole Boiled Eggs (3) & Rolled Oats', 455, 27.5, 41.5, 19.0);

db.prepare(`
  INSERT INTO meal_logs (user_id, date, meal_type, food_name, calories, protein, carbs, fats)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`).run(userId, todayStr, 'Lunch', 'Grilled Chicken Breast (150g) with Brown Basmati Rice', 485, 51.5, 50.0, 7.4);

db.prepare(`
  INSERT INTO meal_logs (user_id, date, meal_type, food_name, calories, protein, carbs, fats)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`).run(userId, todayStr, 'Post-Workout', 'Whey Protein Isolate Shake (1 Scoop)', 120, 26.0, 1.5, 0.8);

console.log('🥗 Seeded today\'s meal logs (Total: ~105g protein logged)');

console.log(`
🎉 Seed Completed Successfully!
-------------------------------------------------
Login Credentials:
Email:    rahul@example.com
Password: Test@1234
-------------------------------------------------
Start server: node app.js
Open:         http://localhost:3000
`);
