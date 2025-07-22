import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateExercise() {
  const [formData, setFormData] = useState({
    name:'',
    reps:'',
    weight:'',
    unit:'kgs',
    date:''
  });
  const navigate=useNavigate();

  const handleChange=(e)=>{
    const {name,value}=e.target;
    setFormData(prev=>({...prev,[name]:value}));
  };
  const handleSubmit=async(e)=>{
  e.preventDefault();
  const [year, month, day]=formData.date.split('-');
  const formattedDate=`${month}-${day}-${year.slice(2)}`;
  const exerciseData={
    ...formData,date: formattedDate
  };

  try {
    const response=await fetch('/exercises', {
      method:'POST',
      headers:{ 'Content-Type': 'application/json' },
      body:JSON.stringify(exerciseData)
    });
    if (response.status===201) {
      alert('Exercise created successfully!');
      navigate('/');
    }
    else{
      throw new Error('Failed to create exercise');
    }
  } catch(error){
    console.error('Error:',error);
    alert('Failed to create exercise');
    navigate('/');
  }};
  return (
    <div className="form-container">
      <h2>Create New Exercise</h2>
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
              Date:
              <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
              />
          </label>

          <button type="submit">Create Exercise</button>
      </form>
    </div>
  );
}

export default CreateExercise;