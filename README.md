# ⚡ Intelligent Gym Diet & Exercise Management — Expert System

A full-stack, rule-based **Expert System** built with **Node.js, Express, SQLite, and EJS**. It personalizes weekly workout splits, mandatory dynamic/static stretching routines, and diet plans with compulsory protein quotas based on biometrics, injuries, and clinical health reports.

---

## 🏛️ Architecture & Clean Modular Design

The system implements the classic **3-part Expert System Architecture**:

```
                              ┌─────────────────────────────────────────┐
                              │          KNOWLEDGE BASE (KB)            │
                              │ --------------------------------------- │
                              │ • workout_rules.json (splits & swaps)   │
                              │ • stretching_rules.json (pre/post warm) │
                              │ • diet_rules.json (foods & boosters)    │
                              │ • health_rules.json (clinical rules)    │
                              └────────────────────┬────────────────────┘
                                                   │
                                                   ▼
┌──────────────────────┐              ┌─────────────────────────┐
│     USER FACTS       │              │    INFERENCE ENGINE     │
│ -------------------- │              │ ----------------------- │
│ • Biometrics & Goals ├─────────────►│ • Forward-Chaining Loop │
│ • Blood Pressure/Sugar              │ • Pattern Matching      │
│ • Injuries/Thyroid   │              │ • Conflict Resolution   │
└──────────────────────┘              └────────────┬────────────┘
                                                   │
                                                   ▼
                                      ┌─────────────────────────┐
                                      │   EXPLANATION FACILITY  │
                                      │ ----------------------- │
                                      │ • Audit Trail of Rules  │
                                      │ • "Why this advice?"    │
                                      │ • Clinical Disclaimers  │
                                      └────────────┬────────────┘
                                                   │
                                                   ▼
                                      ┌─────────────────────────┐
                                      │      USER INTERFACE     │
                                      │ ----------------------- │
                                      │ • Dashboard & Analytics │
                                      │ • Weekly Workout & Warm │
                                      │ • Compulsory Protein UI │
                                      │ • Health Guidance & Chat│
                                      └─────────────────────────┘
```

### Module Breakdown
- **`knowledge_base/`**: Declarative JSON rule definitions containing conditions, priorities, clinical rationale, and corrective actions.
- **`engine/inference_engine.js`**: Forward-chaining engine that iterates rules against working-memory user facts until convergence.
- **`engine/explanation.js`**: Explanation facility recording fired rule trails and generating human-readable "Why this advice?" answers.
- **`engine/workout_engine.js`**: Weekly schedule planner, exercise injury swaps, goal-based volume adjustment, and stretching sequence generator.
- **`engine/diet_engine.js`**: BMR/TDEE calculation (Mifflin-St Jeor), macro distribution, and iterative compulsory protein booster loop.
- **`engine/health_engine.js`**: Evaluates medical rules (diabetes, hypertension, cholesterol, thyroid, joint injuries) and returns clinical directives.
- **`engine/chat_engine.js`**: Natural-language conversational interface answering questions grounded in the knowledge base.
- **`routes/` & `views/`**: Clean Express REST routes and responsive, modern EJS view templates.

---

## 🚀 Key Features

### 1. Mandatory Multi-Step Registration & Health Report
- **Step 1:** Collects name, email, password, age, gender, height, weight, goal (fat loss / muscle gain / maintenance), diet type (veg / non-veg / vegan), activity level, and allergies.
- **Step 2 (Compulsory):** Users **must** submit a health report (PDF/image upload) and manual clinical parameters:
  - Blood Pressure (systolic/diastolic)
  - Blood Sugar (fasting/random mg/dL)
  - Total Serum Cholesterol (mg/dL)
  - Thyroid Function Status
  - Musculoskeletal Injuries (Knee, Back, Shoulder, Wrist)
  - Medical Conditions (Diabetes, Hypertension, Cholesterol, Asthma)
- Password hashing with `bcryptjs`, file storage validation via `multer`.

### 2. Strict Weekly Workout Split (Sunday = Rest Day)
- **Monday & Thursday:** Biceps + Back + Arms
- **Tuesday & Friday:** Chest + Triceps
- **Wednesday & Saturday:** Legs + Shoulders
- **Sunday:** Complete Rest Day with light walking protocol (20-30 min) and cellular recovery tips.
- Each exercise shows sets, reps, rest interval, and biomechanical form tip.
- **Inference Engine Swaps:** Automatically swaps contraindicated compound movements (e.g., knee injury replaces heavy barbell squats with 45-degree seated leg press; back injury replaces deadlifts with chest-supported rows).

### 3. Mandatory Dynamic & Static Stretching Routines
- **Dynamic Warm-Up (Before):** Dynamic muscle openers and joint lubricators specific to that day's target muscle groups.
- **Static Cool-Down (After):** Deep static holds to relax hypertonic spindle receptors and prevent DOMS.
- **Enforced Sequence:** Workouts cannot be marked completed without warm-up, and the training day is not marked complete until both warm-up and cool-down are done.

### 4. Diet Plan with Compulsory Protein Enforcement
- Calculates BMR (Mifflin-St Jeor) and TDEE based on activity multiplier.
- Caloric adjustments for goal (deficit for fat loss, surplus for muscle gain) and Sunday rest day (-200 kcal).
- **Compulsory Protein Quota (1.6 – 2.2 g/kg):** If the initial meal plan has a protein deficit, the inference engine enters an iterative loop adding high-density boosters (whey isolate, paneer, eggs, soy chunks, dal) until the target is fulfilled.
- Meal logging interface with evening protein deficit warning alerts.

### 5. Health Expert System & Transparent Explanations
- Clinical rules for:
  - **Diabetes:** Low-GI carbohydrates (GI ≤ 55), moderate cardio, hypoglycemia emergency kit warning.
  - **Hypertension:** Strictly avoid Valsalva breath-holding, no heavy isometric holds, low sodium (<1500mg), replace deadlifts.
  - **High Cholesterol:** Saturated fat capped <6%, high soluble fiber, omega-3 fatty acids.
  - **Thyroid Disorders:** Micronutrient pacing and levothyroxine timing.
- **Explanation Facility ("Why this advice?"):** Full audit trail showing exact rule IDs, conditions matched, and physiological reasoning.
- **Interactive Health Chat:** Conversational expert system answering athlete questions in real time.
- **Medical Disclaimer:** Clear banner emphasizing informational fitness guidance vs. clinical doctor evaluations.

---

## 🛠️ Quickstart & Installation

### Prerequisites
- Node.js (v18 or higher)
- npm

### 1. Install Dependencies
```bash
cd c:\project
npm install
```

### 2. Seed Sample Data
Run the seed script to populate the database with a pre-configured user profile (Rahul Sharma, knee injury, 14 days of weight tracking, today's workout and meal logs):
```bash
node seed.js
```

### 3. Start Application
```bash
node app.js
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 👤 Sample Demo Account

| Field | Value |
|---|---|
| **Email** | `rahul@example.com` |
| **Password** | `Test@1234` |
| **Profile** | Male, 28 yrs, 78 kg, 175 cm, Goal: Muscle Gain |
| **Health Report** | Knee Injury (Squats swapped to Leg Press), BP: 128/82 mmHg |
| **Diet** | Non-Vegetarian, Compulsory Protein Target: **172g** |

---

## 📖 Sample Knowledge Base Rule Example

```json
{
  "id": "rule_knee_injury_rehabilitation",
  "name": "Knee Joint Protection & Load Modification",
  "priority": 15,
  "conditions": {
    "any": [
      { "field": "injuries", "operator": "contains", "value": "knee_injury" }
    ]
  },
  "actions": [
    {
      "type": "swap_exercise",
      "original": "barbell_squat",
      "replacement": "leg_press",
      "message": "Swapped heavy barbell back squat for seated leg press with high foot placement to minimize patellofemoral shear force."
    }
  ],
  "explanation": "Patellofemoral and meniscal structures face peak shear loads in deep squats (>90°). Guided leg press stabilizes the tibia and distributes force across the larger posterior chain gluteal complex."
}
```

---

## 📋 API & Page Route Directory

| Route | Method | Description |
|---|---|---|
| `/auth/login` | GET/POST | User login with hashed password comparison |
| `/auth/register` | GET/POST | Step 1 registration (profile, goals, allergies) |
| `/auth/register-health`| GET/POST | Step 2 compulsory health report upload & clinical vitals |
| `/dashboard` | GET | Main dashboard with today's workout, meals, protein bar, chart |
| `/workout` | GET | Weekly workout view (Mon-Sun tabs), exercise tips, dynamic/static stretches |
| `/workout/toggle` | POST | Toggles completion of warm-up, workout, or cool-down |
| `/diet` | GET | Daily meal plan, compulsory protein booster breakdown, macro totals |
| `/diet/log` | POST | Record a consumed meal or quick-log recommended food |
| `/diet/delete/:id` | POST | Delete a logged meal entry |
| `/health` | GET | Health guidance page and "Why this advice?" explanation audit |
| `/health/chat` | GET/POST | Ask the Health Expert conversational AI chat |
| `/progress` | GET | Historical weight tracking curve and workout compliance table |
| `/progress/weight` | POST | Log current body weight measurement |
