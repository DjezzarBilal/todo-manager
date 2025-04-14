import React from 'react';

const TodoItem = ({ todo, onDelete, onEdit }) => {
  return (
    <li className="p-2 border rounded shadow-sm flex justify-between items-center">
      <div>
        <p className="font-medium">{todo.id}</p>
        <p className="font-medium">{todo.title}</p>
        <p className="text-sm text-gray-500">
          {todo.completed ? '✅ Completed' : '❌ Incomplete'}
        </p>
      </div>
      <div className="space-x-2">
        <button
          onClick={() => onEdit(todo)}
          className="text-sm text-blue-600 hover:underline"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(todo)}
          className="text-sm text-red-600 hover:underline"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
