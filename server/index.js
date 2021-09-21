require('dotenv/config');
const express = require('express');
const pg = require('pg');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const uploadsMiddleware = require('./uploads-middleware');
const authorizationMiddleware = require('./authorization-middleware');
const _ = require('lodash');

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

app.get('/api/social/meals/:userId/', (req, res, next) => {
  const userId = parseInt(req.params.userId, 10);
  const userInfo = [userId];
  if (!userId) {
    throw new ClientError(400, 'userId must be a positive integer');
  }
  const sqlIntoUserMeals = `
  select "mealId", "calories", "name", "ingredients", "nutrition", "notes", "pictureUrl"
  from "meals"
  where "userId" = $1
  `;
  db.query(sqlIntoUserMeals, userInfo)
    .then(result => {
      res.status(200).json(result.rows);
    }).catch(err => next(err));
});

app.post('/api/auth/register', (req, res, next) => {
  const { username, firstName, lastName, password } = req.body;
  if (!username || !password || !firstName || !lastName) {
    throw new ClientError(400, 'Username, password, first name, and last name are all required fields!');
  }
  argon2
    .hash(password)
    .then(hashedPassword => {
      const userDetails = [username, hashedPassword, firstName, lastName];
      const sqlNewUser = `
        insert into "users" ("username", "hashedPassword", "firstName", "lastName")
        values ($1, $2, $3, $4)
        returning "username", "userId", "firstName", "lastName";
      `;
      db.query(sqlNewUser, userDetails)
        .then(result => res.status(201).json(result.rows[0]))
        .catch(err => next(err));
    }).catch(err => next(err));
});

app.post('/api/auth/signin', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(401, 'invalid login');
  }
  const sqlFindUser = `
    select "userId", "hashedPassword", "firstName", "lastName"
    from   "users"
    where  "username" = $1;
  `;
  const userDetails = [username];
  db.query(sqlFindUser, userDetails)
    .then(result => {
      if (!result.rows[0]) {
        throw new ClientError(400, 'invalid login');
      } else {
        argon2
          .verify(result.rows[0].hashedPassword, password)
          .then(isMatching => {
            if (!isMatching) {
              throw new ClientError(401, 'invalid login');
            } else if (isMatching) {
              const payload = { userId: result.rows[0].userId, username: username };
              const token = jwt.sign(payload, process.env.TOKEN_SECRET);
              const user = {
                token: token,
                user: payload
              };
              res.status(200).json(user);
            }
          }).catch(err => next(err));
      }
    }).catch(err => next(err));
});

app.use(authorizationMiddleware);

app.post('/api/new/workout', (req, res, next) => {
  const { date, muscleGroups, details } = req.body;
  const { userId } = req.user;
  const duration = parseInt(req.body.duration, 10);
  const caloriesBurned = parseInt(req.body.caloriesBurned, 10);
  if (!date || !duration || !caloriesBurned || !muscleGroups || !details) {
    throw new ClientError(400, 'date, duration, calories burned, muscle groups, and details are all require fields!');
  }
  if (!Number.isInteger(duration) || duration < 0) {
    throw new ClientError(400, 'duration must be a positive integer');
  }
  if (!Number.isInteger(caloriesBurned) || caloriesBurned < 0) {
    throw new ClientError(400, 'calories burned must be a positive integer');
  }
  const points = (duration * 10) + (caloriesBurned * 2);
  const data = [date, duration, caloriesBurned, details, points, userId];
  const sqlIntoWorkouts = `
  insert into "workouts" ("userId", "date", "duration", "caloriesBurned", "details", "points")
  values ($6, $1, $2, $3, $4, $5 )
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
  const { userId } = req.user;
  const calories = parseInt(req.body.calories, 10);
  if (!name || !ingredients || !nutrition || !notes || !calories) {
    throw new ClientError(400, 'name, calories, ingredients, nutrition, and notes are required fields!');
  }
  if (!Number.isInteger(calories) || calories < 0) {
    throw new ClientError(400, 'calories must be a positive integer');
  }
  const pictureUrl = `/images/${req.file.filename}`;
  const data = [name, calories, ingredients, nutrition, notes, pictureUrl, userId];
  const sqlIntoMeals = `
  insert into "meals" ("userId", "name", "calories", "ingredients", "nutrition", "notes", "pictureUrl")
  values ($7, $1, $2, $3, $4, $5, $6)
  returning *;
  `;
  db.query(sqlIntoMeals, data)
    .then(result => {
      res.status(201).json(result.rows[0]);
    }).catch(err => next(err));
}
);

app.get('/api/your/workouts', (req, res, next) => {
  const { userId } = req.user;
  const userInfo = [userId];
  const sqlIntoUserWorkouts = `
  select "workouts"."workoutId",
         "workouts"."date",
         "workouts"."duration",
         "workouts"."caloriesBurned",
         "workouts"."details",
         STRING_AGG(("muscleGroup"."name"), ', ') as "muscles"
  from "workouts"
  join "workoutMuscleGroups" using ("workoutId")
  join "muscleGroup" using ("muscleId")
  where "userId" = $1
  group by "workouts"."workoutId"
  order by "workouts"."date" desc;
  `;
  db.query(sqlIntoUserWorkouts, userInfo)
    .then(result => {
      res.status(200).json(result.rows);
    }).catch(err => next(err));
});

app.get('/api/your/meals', (req, res, next) => {
  const { userId } = req.user;
  const userInfo = [userId];
  const sqlIntoUserMeals = `
  select "mealId", "calories", "name", "ingredients", "nutrition", "notes", "pictureUrl"
  from "meals"
  where "userId" = $1
  `;
  db.query(sqlIntoUserMeals, userInfo)
    .then(result => {
      res.status(200).json(result.rows);
    }).catch(err => next(err));
});

app.get('/api/your/fitness', (req, res, next) => {
  const { startDate, endDate } = req.query;
  const { userId } = req.user;
  if (!Date(startDate) || !Date(endDate)) {
    throw new ClientError(400, 'dates are invalid!');
  }
  const paramaterized = [startDate, endDate, userId];
  const sqlIntoUserWorkouts = `
  select "workouts"."workoutId",
         "workouts"."duration",
         "workouts"."caloriesBurned",
         DATE("workouts"."date"),
         STRING_AGG(("muscleGroup"."name"), ', ') as "muscles"
  from   "workouts"
  join   "workoutMuscleGroups" using ("workoutId")
  join   "muscleGroup" using ("muscleId")
  where  "userId" = $3
  and    DATE("workouts"."date") >= $1
  and    DATE("workouts"."date") <= $2
  group  by "workouts"."workoutId"
  order  by "workouts"."date" desc;
  `;
  db.query(sqlIntoUserWorkouts, paramaterized)
    .then(result => {
      const stats = {
        workouts: result.rows.length,
        workoutTime: 0,
        caloriesBurned: 0,
        Chest: 0,
        Back: 0,
        Arms: 0,
        Legs: 0
      };
      for (let i = 0; i < result.rows.length; i++) {
        stats.workoutTime = 0 + result.rows[i].duration;
        stats.caloriesBurned = result.rows[i].caloriesBurned + result.rows[i].caloriesBurned;
        if (result.rows[i].muscles.includes('Chest')) {
          stats.Chest++;
        }
        if (result.rows[i].muscles.includes('Back')) {
          stats.Back++;
        }
        if (result.rows[i].muscles.includes('Arms')) {
          stats.Arms++;
        }
        if (result.rows[i].muscles.includes('Legs')) {
          stats.Legs++;
        }
      }
      res.status(200).json(stats);
    }).catch(err => next(err));
});

app.get('/api/others', (req, res, next) => {
  const { userId } = req.user;
  const activeUser = [userId];
  const sqlIntoUsers = `
  select "userId", "firstName", "lastName"
  from   "users"
  where "userId" != $1
  order by "firstName" asc
  `;
  db.query(sqlIntoUsers, activeUser)
    .then(result => {
      const contacts = result.rows;
      const contactsList = _.groupBy(contacts, 'firstName[0]');
      res.status(200).json(contactsList);
    }).catch(err => next(err));
});

app.get('/api/:userId', (req, res, next) => {
  const userId = parseInt(req.params.userId, 10);
  const userInfo = [userId];
  if (!userId) {
    throw new ClientError(400, 'userId must be a positive integer');
  }
  const sqlIntoSpecificUser = `
    select "firstName", "lastName", "userId"
    from   "users"
    where  "userId" = $1
  `;
  db.query(sqlIntoSpecificUser, userInfo)
    .then(result => {
      res.status(200).json(result.rows[0]);
    }).catch(err => next(err));
});

app.get('/api/social/workouts/:userId', (req, res, next) => {
  const userId = parseInt(req.params.userId, 10);
  const userInfo = [userId];
  if (!userId) {
    throw new ClientError(400, 'userId must be a positive integer');
  }
  const sqlIntoSpecificUser = `
    select "workouts"."workoutId",
         "workouts"."date",
         "workouts"."duration",
         "workouts"."caloriesBurned",
         "workouts"."details",
         STRING_AGG(("muscleGroup"."name"), ', ') as "muscles"
  from "workouts"
  join "workoutMuscleGroups" using ("workoutId")
  join "muscleGroup" using ("muscleId")
  where "userId" = $1
  group by "workouts"."workoutId"
  order by "workouts"."date" desc;
  `;
  db.query(sqlIntoSpecificUser, userInfo)
    .then(result => {
      res.status(200).json(result.rows);
    }).catch(err => next(err));
});

app.use(errorMiddleware);
