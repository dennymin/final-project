require('dotenv/config');
const express = require('express');
const pg = require('pg');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const uploadsMiddleware = require('./uploads-middleware');

const app = express();
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

app.use(staticMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});

app.use(express.json());
app.post('/api/new/workout', (req, res, next) => {
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
  const points = (length * 10) + (caloriesBurned * 2);
  const data = [date, length, caloriesBurned, details, points];
  const sqlIntoWorkouts = `
  insert into "workouts" ("userId", "date", "length", "caloriesBurned", "details", "points")
  values (1, $1, $2, $3, $4, $5 )
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
        .then(result => res.status(201).json(result.rows[0]))
        .catch(err => next(err));
    }).catch(err => next(err));
}
);

app.post('/api/new/meal', uploadsMiddleware, (req, res, next) => {
  const { name, ingredients, nutrition, notes } = req.body;
  const calories = parseInt(req.body.calories, 10);
  if (!name || !ingredients || !nutrition || !notes || !calories) {
    throw new ClientError(400, 'name, calories, ingredients, nutrition, and notes are required fields!');
  }
  if (!Number.isInteger(calories) || calories < 0) {
    throw new ClientError(400, 'calories must be a positive integer');
  }
  const pictureUrl = `/images/${req.file.filename}`;
  const data = [name, calories, ingredients, nutrition, notes, pictureUrl];
  const sqlIntoMeals = `
  insert into "meals" ("userId", "name", "calories", "ingredients", "nutrition", "notes", "pictureUrl")
  values (1, $1, $2, $3, $4, $5, $6)
  returning *;
  `;
  db.query(sqlIntoMeals, data)
    .then(result => {
      res.status(201).json(result.rows[0]);
    }).catch(err => next(err));
}
);

app.get('/api/your/workouts', (req, res, next) => {
  const sqlIntoUserWorkouts = `
  select "workouts"."workoutId",
         "workouts"."date",
         "workouts"."length",
         "workouts"."caloriesBurned",
         "workouts"."details",
         STRING_AGG(("muscleGroup"."name"), ', ') as "muscles"
  from "workouts"
  join "workoutMuscleGroups" using ("workoutId")
  join "muscleGroup" using ("muscleId")
  where "userId" = 1
  group by "workouts"."workoutId"
  order by "workouts"."date" desc;
  `;
  db.query(sqlIntoUserWorkouts)
    .then(result => {
      res.status(200).json(result.rows);
    }).catch(err => next(err));
});

app.get('/api/your/meals', (req, res, next) => {
  const sqlIntoUserMeals = `
  select "mealId", "calories", "name", "ingredients", "nutrition", "notes", "pictureUrl"
  from "meals"
  where "userId" = 1
  `;
  db.query(sqlIntoUserMeals)
    .then(result => {
      res.status(200).json(result.rows);
    }).catch(err => next(err));
});

app.put('/api/your/fitness', (req, res, next) => {
  const { startDate, endDate } = req.body;
  // const dateToday = new Date();
  // const dateInIso = dateToday.toISOString().slice(0, 10);
  // const todayInMilSeconds = dateToday.getTime();
  // const lastWeekInSeconds = todayInMilSeconds - (604800 * 1000);
  // const lastWeekDate = new Date(lastWeekInSeconds);
  // const lastWeekDateIso = lastWeekDate.toISOString().slice(0, 10);
  if (!Date(startDate) || !Date(endDate)) {
    throw new ClientError(400, 'dates are invalid!');
  }
  const sqlIntoUserWorkouts = `
  select "workouts"."workoutId",
         "workouts"."length",
         "workouts"."caloriesBurned",
         DATE("workouts"."date"),
         STRING_AGG(("muscleGroup"."name"), ', ') as "muscles"
  from   "workouts"
  join   "workoutMuscleGroups" using ("workoutId")
  join   "muscleGroup" using ("muscleId")
  where  "userId" = 1
  and    DATE("workouts"."date") >= '${startDate}'
  and    DATE("workouts"."date") <= '${endDate}'
  group  by "workouts"."workoutId"
  order  by "workouts"."date" desc;
  `;
  db.query(sqlIntoUserWorkouts)
    .then(result => {
      console.log(startDate, endDate);
      res.status(200).json(result.rows);
    }).catch(err => next(err));
});

app.use(errorMiddleware);
