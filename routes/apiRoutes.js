const db = require("../models");

module.exports = app => {

    // Get last workout
    app.get("/api/workouts", async (req, res) => {
        try {
            const data = await db.Workout.find({})
            res.json(data);
        }
        catch(err){
            res.json(err);
        }
    });
    
    // Creates a new workout
    app.post("/api/workouts", async (req, res)=> {
        try{
            const response = await db.Workout.create({type: "workout"})
            res.json(response);
        }
        catch(err){
            console.log("error occurred creating a workout: ", err)
        }
    })

    // Add an exercise to a workout
    app.put("/api/workouts/:id", ({body, params}, res) => {
        // console.log(body, params)
        const workoutId = params.id;
        let savedExercises = [];

        // gets all the currently saved exercises in the current workout
        db.Workout.find({_id: workoutId})
            .then(dbWorkout => {
                // console.log(dbWorkout)
                savedExercises = dbWorkout[0].exercises;
                res.json(dbWorkout[0].exercises);
                let allExercises = [...savedExercises, body]
                console.log(allExercises)
                updateWorkout(allExercises)
            })
            .catch(err => {
                res.json(err);
            });

        function updateWorkout(exercises) {
            db.Workout.findByIdAndUpdate(workoutId, {exercises: exercises}, (err, doc) => {
                if(err){
                    console.log(err)
                };
            });
        };
            
    });

    app.get("/api/workouts/range", async (req, res) => {
        try {
            const data = await db.Workout.find({})
            res.json(data);
        }
        catch (err) {
            res.json(err);
        }
      
    });
};

