import { useState, useEffect } from 'react';
import ExerciseTable from '../components/ExerciseTable';

function Home() {
  const [exercises, setExercises] = useState([]);
  useEffect(()=>{
    fetchExercises();
  }, []);
  const fetchExercises=async()=>{
    try {
      const response = await fetch('/exercises');
      if (!response.ok) throw new Error('Failed to fetch exercises');
      const data=await response.json();
      setExercises(data);
    }
    catch (error){
      console.error('Error:',error);
      alert('Failed to load exercises');
    }
  };
  const handleDelete = async (id) => {
    try {
      const response=await fetch(`/exercises/${id}`,{ method: 'DELETE' });
      if (!response.ok)throw new Error('Failed to delete exercise');
      setExercises(exercises.filter(exercise => exercise._id !== id));
    }
    catch (error){
      console.error('Error:', error);
      alert('Failed to delete exercise');
    }
  };
  return (
    <div className="home">
      <h2>All Exercises</h2>
      <ExerciseTable exercises={exercises} onDelete={handleDelete} />
    </div>
  );
}

export default Home;