import mongoose from 'mongoose';
import 'dotenv/config';

const EXERCISE_DB_NAME='exercise_db';
let connection=undefined;
const exerciseSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:1
    },
    reps:{
        type:Number,
        required:true,
        min:1
    },
    weight:{
        type:Number,
        required:true,
        min:1
    },
    unit:{
        type:String,
        required:true,
        enum:['kgs','lbs']
    },
    date:{
        type:String,
        required:true,
        validate:{
            validator:isDateValid,
            message:'Date must be in MM-DD-YY format'
        }
    }
});
const Exercise=mongoose.model('Exercise', exerciseSchema);

function isDateValid(date){
    const format=/^\d\d-\d\d-\d\d$/;
    return format.test(date);
}

/**
 * Connect to MongoDB
 */
async function connect(){
    try {
        connection = await mongoose.connect(process.env.MONGODB_CONNECT_STRING,
            { dbName:EXERCISE_DB_NAME });
        console.log("Successfully connected to MongoDB using Mongoose!");
    } catch (err) {
        console.log(err);
        throw Error(`Could not connect to MongoDB ${err.message}`);
    }
}

/**
 * Create a new exercise
 */
async function createExercise(exerciseData) {
    try {
        const exercise=new Exercise(exerciseData);
        await exercise.save();
        return exercise;
    } catch (err) {
        throw new Error('Invalid request');
    }
}

/**
 * Get all exercises
 */
async function getAllExercises() {
    return await Exercise.find({});
}

/**
 * Get exercise by ID
 */
async function getExerciseById(id) {
    try {
        return await Exercise.findById(id);
    } catch (err) {
        return null;
    }
}

/**
 * Update exercise by ID
 */
async function updateExercise(id, exerciseData) {
    try {
        if (exerciseData.date&&/^\d{4}-\d{2}-\d{2}$/.test(exerciseData.date))
        {
            const [year,month, day]=exerciseData.date.split('-');
            exerciseData.date=`${month}-${day}-${year.slice(2)}`;
        }
        const exercise = await Exercise.findByIdAndUpdate(id, exerciseData, { new: true });
        if (!exercise) {
            throw new Error('Not found');
        }
        return exercise;
    }
    catch (err) {
        if (err.message === 'Not found') {
            throw err;
        }
        throw new Error('Invalid request');
    }
}
/**
 * Delete exercise by ID
 */
async function deleteExercise(id) {
    const exercise = await Exercise.findByIdAndDelete(id);
    if (!exercise) {
        throw new Error('Not found');
    }
}
export {
    connect,
    createExercise,getAllExercises,getExerciseById,
    updateExercise,deleteExercise
};