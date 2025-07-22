import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditExercise() {
  const {id}=useParams();
  const navigate=useNavigate();
  const [formData,setFormData]=useState({
    name:'',
    reps:'',
    weight:'',
    unit:'kgs',
    date:''
  });
  useEffect(()=>{
    const exercise=JSON.parse(localStorage.getItem('exerciseToEdit'));
    if (exercise)
    {
      setFormData({
        name:exercise.name,
        reps:exercise.reps,
        weight:exercise.weight,
        unit:exercise.unit,
        date:exercise.date
      });
    }
  }, [id]);
  const handleChange=(e)=>{
    const {name,value}=e.target;
    setFormData(prev=>({...prev,[name]:value}));
  };
  const handleSubmit=async (e) => {
    e.preventDefault();
    try {
      const response=await fetch(`/exercises/${id}`,{

        method:'PUT',
        headers:{ 'Content-Type': 'application/json' },
        body:JSON.stringify(formData)
      });
      if (response.status===200)
      {
        alert('Exercise updated successfully!');
        navigate('/');
      }
      else {
        throw new Error('Failed to update exercise');
      }
    }
    catch (error) {
      console.error('Error:',error);
      alert('Failed to update exercise');
      navigate('/');
    }
  };
  return (
    <div className="form-container">
      <h2>Edit Exercise</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Reps:
          <input
            type="number"
            name="reps"
            value={formData.reps}
            onChange={handleChange}
            min="1"
            required
          />
        </label>

        <label>
          Weight:
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            min="1"
            required
          />
        </label>

        <label>
          Unit:
          <select name="unit" value={formData.unit} onChange={handleChange}>
            <option value="kgs">kgs</option>
            <option value="lbs">lbs</option>
          </select>
        </label>

        <label>
          Date (MM-DD-YY):
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            pattern="\d{2}-\d{2}-\d{2}"
            placeholder="MM-DD-YY"
            required
          />
        </label>

        <button type="submit">Update Exercise</button>
      </form>
    </div>
  );
}

export default EditExercise;