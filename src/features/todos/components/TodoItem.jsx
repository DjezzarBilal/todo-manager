import React from 'react';
import { toast } from 'react-toastify';

const TodoItem = React.memo(({ todo, onDelete, onEdit }) => {
  return (
    <li className="p-2 border rounded shadow-sm flex justify-between items-center">
      <div>
        <p className="font-medium">{todo.title}</p>
        <p className="text-sm text-gray-500">
          {todo.completed ? '✅ Completed' : '❌ Incomplete'}
        </p>
      </div>

      <div className="space-x-2 flex">
        <button
          onClick={() => onEdit(todo)}
          className="px-3 py-1 text-sm bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-md transition"
          aria-label={`Edit todo: ${todo.title}`}
        >
          Edit
        </button>

        <button
          onClick={() => {
            const confirmed = window.confirm('Are you sure you want to delete this todo?');
            if (confirmed) {
              onDelete(todo);
            } else {
              toast.info('Deletion cancelled');
            }
          }}
          className="px-3 py-1 text-sm bg-red-100 text-red-700 hover:bg-red-200 rounded-md transition"
          aria-label={`Delete todo: ${todo.title}`}
        >
          Delete
        </button>
      </div>
    </li>
  );
});

export default TodoItem;
