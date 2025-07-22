import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function ExerciseTable({ exercises, onDelete }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Reps</th>
          <th>Weight</th>
          <th>Unit</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {exercises.map((exercise) => (
          <ExerciseRow key={exercise._id} exercise={exercise} onDelete={onDelete} />
        ))}
      </tbody>
    </table>
  );
}

function ExerciseRow({ exercise, onDelete }) {
  return (
    <tr>
      <td>{exercise.name}</td>
      <td>{exercise.reps}</td>
      <td>{exercise.weight}</td>
      <td>{exercise.unit}</td>
      <td>{exercise.date}</td>
      <td>
        <Link to={`/edit/${exercise._id}`}>
          <FaEdit className="icon edit" />
        </Link>
        <FaTrash
          className="icon delete"
          onClick={() => onDelete(exercise._id)}
        />
      </td>
    </tr>
  );
}

export default ExerciseTable;