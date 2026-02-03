export default function TaskList({ tasks, onDelete, onToggle }) {
  return (
    <ul>
      {tasks.map((task) => (
        <li
          key={task._id}
          className="flex justify-between bg-white p-2 mb-2 rounded"
        >
         <span
  className={`flex-1 cursor-pointer ${
    task.status === 'completed'
      ? 'line-through text-green-600'
      : 'text-gray-800'
  }`}
  onClick={() => onToggle(task)}
  title="Click to toggle status"
>
  {task.title}
  <span className="ml-2 text-xs">
    ({task.status})
  </span>
</span>


          <button
            onClick={() => onDelete(task._id)}
            className="text-red-500"
          >
            X
          </button>
        </li>
      ))}
    </ul>
  );
}
