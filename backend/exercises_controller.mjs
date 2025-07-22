import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as exercises from './exercises_model.mjs';

const PORT=process.env.PORT;
const app=express();
app.use(express.json());

app.post('/exercises',asyncHandler(async (req,res)=>{
    try {
        const exercise=await exercises.createExercise(req.body);
        res.status(201).json(exercise);
    } catch (err) {
        res.status(400).json({ Error: err.message });
    }
}));

app.get('/exercises', asyncHandler(async (req,res)=>{
    const allExercises=await exercises.getAllExercises();
    res.status(200).json(allExercises);
}));

app.get('/exercises/:id',asyncHandler(async (req,res)=>{
    const exercise=await exercises.getExerciseById(req.params.id);
    if (exercise)
    {
        res.status(200).json(exercise);
    } else {
        res.status(404).json({ Error: "Not found" });
    }
}));

// PUT /exercises/:id - Update exercise by ID
app.put('/exercises/:id',asyncHandler(async (req,res)=>{
    try {
        const exercise=await exercises.updateExercise(req.params.id,req.body);
        res.status(200).json(exercise);
    } catch (err)
    {
        if (err.message==='Not found')
        {
            res.status(404).json({Error:"Not found" });
        } else {
            res.status(400).json({Error:"Invalid request" });
        }
    }
}));

app.delete('/exercises/:id',asyncHandler(async (req,res)=>{
    try {
        await exercises.deleteExercise(req.params.id);
        res.status(204).end();
    } catch (err)
    {
        res.status(404).json({ Error: "Not found" });
    }
}));

// Start the server
app.listen(PORT, async ()=>{
    await exercises.connect();
    console.log(`Server listening on port ${PORT}...`);
});