insert into "users" ("userId", "username", "firstName", "lastName", "hashedPassword")
values (1, 'admin', 'denny', 'min', 'password1'),
       (2, 'dummy', 'dumbo', 'johnson', 'password2');
insert into "muscleGroup" ("muscleId", "name")
values (1, 'Chest'), (2, 'Back'), (3, 'Arms'), (4, 'Legs');
insert into "workouts" ("workoutId", "userId", "date", "length", "caloriesBurned", "details", "points")
values ('1','1','2019-09-11T00:00:00Z', 10, 100, 'I worked out', 1),
       ('2','1','2019-09-11T00:00:00Z', 20, 200, 'I worked out again', 55),
       ('3','1','2019-09-11T00:00:00Z', 30, 125, 'I worked out but not really', 1234),
       ('4','1','2019-09-11T00:00:00Z', 40, 250, 'I worked out kinda', 12),
       ('5','1','2019-09-11T00:00:00Z', 50, 225, 'I did not worked out', 87),
       ('6','1','2019-09-11T00:00:00Z', 60, 300, 'I worked out my english', 49);
