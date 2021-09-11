insert into "users" ("userId", "username", "firstName", "lastName", "hashedPassword")
values (1, 'admin', 'denny', 'min', 'password1'),
       (2, 'dummy', 'dumbo', 'johnson', 'password2'),
       (3, 'testman', 'guy', 'dude', 'password3'),
       (4, 'testwoman', 'girl', 'dudette', 'password4');
insert into "muscleGroup" ("muscleId", "name")
values (1, 'Chest'), (2, 'Back'), (3, 'Arms'), (4, 'Legs');
insert into "workouts" ("workoutId", "userId", "date", "length", "caloriesBurned", "details", "points")
values ('1','1','2019-09-11T00:00:00Z', 10, 100, 'I worked out', 1),
       ('2','1','2019-09-11T00:00:00Z', 20, 200, 'I worked out again', 55),
       ('3','1','2019-09-11T00:00:00Z', 30, 125, 'I worked out but not really', 1234),
       ('4','1','2019-10-12T00:00:00Z', 40, 250, 'I worked out kinda', 12),
       ('5','4','2019-09-12T00:00:00Z', 60, 295, 'I did not worked out', 87),
       ('6','2','2019-09-13T00:00:00Z', 70, 30, 'I worked out my english', 49),
       ('7','3','2019-09-13T00:00:00Z', 40, 225, 'I hung out', 1234),
       ('8','4','2019-09-12T00:00:00Z', 50, 150, 'I straight up died', 12),
       ('9','2','2019-09-11T00:00:00Z', 20, 325, 'I be existing', 87);
