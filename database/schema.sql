set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."users" (
	"userId" serial NOT NULL,
	"username" TEXT NOT NULL UNIQUE,
	"firstName" TEXT NOT NULL,
	"lastName" TEXT NOT NULL,
	"hashedPassword" TEXT NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."meals" (
	"mealId" serial NOT NULL,
	"userId" integer NOT NULL,
	"calories" integer NOT NULL,
	"name" TEXT NOT NULL,
	"ingredients" TEXT NOT NULL,
	"nutrition" TEXT NOT NULL,
	"notes" TEXT NOT NULL,
	"pictureId" integer NOT NULL,
	CONSTRAINT "meals_pk" PRIMARY KEY ("mealId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."group" (
	"userId" integer NOT NULL,
	"tourneyId" integer NOT NULL,
	"workoutId" integer NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."tourney" (
	"tourneyId" serial NOT NULL,
	"startDate" DATE NOT NULL,
	"endDate" DATE NOT NULL,
	"ongoing" BOOLEAN NOT NULL,
	CONSTRAINT "tourney_pk" PRIMARY KEY ("tourneyId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."workouts" (
	"workoutId" serial NOT NULL,
	"userId" integer NOT NULL,
	"date" timestamp with time zone NOT NULL,
	"length" integer NOT NULL,
	"caloriesBurned" integer NOT NULL,
	"details" TEXT NOT NULL,
	"points" integer NOT NULL,
	CONSTRAINT "workouts_pk" PRIMARY KEY ("workoutId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."workoutMuscleGroups" (
	"workoutId" integer NOT NULL,
	"muscleId" integer NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."muscleGroup" (
	"muscleId" serial NOT NULL,
	"name" TEXT NOT NULL UNIQUE,
	CONSTRAINT "muscleGroup_pk" PRIMARY KEY ("muscleId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."gyms" (
	"gymId" serial NOT NULL,
	"userId" integer NOT NULL,
	"name" TEXT NOT NULL,
	"location" TEXT NOT NULL,
	"rating" integer NOT NULL,
	"description" TEXT NOT NULL,
	CONSTRAINT "gyms_pk" PRIMARY KEY ("gymId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."comments" (
	"commentId" serial NOT NULL,
	"gymId" integer NOT NULL,
	"userId" integer NOT NULL,
	"content" TEXT NOT NULL,
	"timestamp" TIMESTAMP NOT NULL,
	CONSTRAINT "comments_pk" PRIMARY KEY ("commentId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."pictures" (
	"pictureId" serial NOT NULL,
	"pictureUrl" TEXT NOT NULL,
	CONSTRAINT "pictures_pk" PRIMARY KEY ("pictureId")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "meals" ADD CONSTRAINT "meals_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "meals" ADD CONSTRAINT "meals_fk1" FOREIGN KEY ("pictureId") REFERENCES "pictures"("pictureId");

ALTER TABLE "group" ADD CONSTRAINT "group_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "group" ADD CONSTRAINT "group_fk1" FOREIGN KEY ("tourneyId") REFERENCES "tourney"("tourneyId");
ALTER TABLE "group" ADD CONSTRAINT "group_fk2" FOREIGN KEY ("workoutId") REFERENCES "workouts"("workoutId");


ALTER TABLE "workouts" ADD CONSTRAINT "workouts_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "workoutMuscleGroups" ADD CONSTRAINT "workoutMuscleGroups_fk0" FOREIGN KEY ("workoutId") REFERENCES "workouts"("workoutId");
ALTER TABLE "workoutMuscleGroups" ADD CONSTRAINT "workoutMuscleGroups_fk1" FOREIGN KEY ("muscleId") REFERENCES "muscleGroup"("muscleId");


ALTER TABLE "gyms" ADD CONSTRAINT "gyms_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "comments" ADD CONSTRAINT "comments_fk0" FOREIGN KEY ("gymId") REFERENCES "gyms"("gymId");
ALTER TABLE "comments" ADD CONSTRAINT "comments_fk1" FOREIGN KEY ("userId") REFERENCES "users"("userId");
