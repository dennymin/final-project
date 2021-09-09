require('dotenv/config');
const express = require('express');
const pg = require('pg');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');

const app = express();
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

app.use(staticMiddleware);

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});

app.use(express.json());
app.post('/api', (req, res) => {
  const { date, muscleGroups, details } = req.body;
  const length = parseInt(req.body.length, 10);
  const caloriesBurned = parseInt(req.body.caloriesBurned, 10);
  if (!date || !length || !caloriesBurned || !muscleGroups || !details) {
    throw new ClientError(400, 'date, length, calories burned, muscle groups, and details are all require fields!');
  }
  if (!Number.isInteger(length) || length < 0) {
    throw new ClientError(400, 'length must be a positive integer');
  }
  if (!Number.isInteger(caloriesBurned) || caloriesBurned < 0) {
    throw new ClientError(400, 'calories burned must be a positive integer');
  }
  const data = [date, length, caloriesBurned, details];
  const sqlIntoWorkouts = `
  insert into "workouts" ("userId", "date", "length", "caloriesBurned", "details", "points")
  values (1, $1, $2, $3, $4, 50)
  returning *;
  `;
  db.query(sqlIntoWorkouts, data)
    .then(result => {
      const workoutId = result.rows[0].workoutId;
      const grouping = [];
      for (let i = 0; i < muscleGroups.length; i++) {
        let rowValue = null;
        if (muscleGroups[i] === 'Chest') {
          rowValue = `(${workoutId}, 1)`;
        } else if (muscleGroups[i] === 'Back') {
          rowValue = `(${workoutId}, 2)`;
        } else if (muscleGroups[i] === 'Arms') {
          rowValue = `(${workoutId}, 3)`;
        } else if (muscleGroups[i] === 'Legs') {
          rowValue = `(${workoutId}, 4)`;
        }
        grouping.push(rowValue);
      }
      const sendGroup = grouping.join(', ');
      const sqlIntoWorkoutMuscleGroups = `
      insert into "workoutMuscleGroups" ("workoutId", "muscleId")
      values ${sendGroup}
      returning *;
      `;
      db.query(sqlIntoWorkoutMuscleGroups)
        .then(result => res.status(201).json(result.rows[0]));
    });
}
);
