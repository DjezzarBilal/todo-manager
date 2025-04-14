import React from 'react';
import useTodos from './hooks/useTodos';
import TodoItem from './components/TodoItem';
import EditModal from './components/EditModal';
import { useState } from 'react';


const TodoList = () => {
    const { todos, loading, error, updateTodo, deleteTodo } = useTodos();

    const [selectedTodo, setSelectedTodo] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const handleEditClick = (todo) => {
      setSelectedTodo(todo);
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
      setSelectedTodo(null);
    };

  if (loading) return <p className="text-center">Loading todos...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Todo List</h2>
      <ul className="space-y-2">
        {todos.map(todo => (
            <TodoItem
                key={todo.id}
                todo={todo}
                onDelete={deleteTodo}
                onEdit={handleEditClick}
            />
        ))}
      </ul>
            <EditModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                todo={selectedTodo}
                onSave={updateTodo}
            />
    </div>
  );
};

export default TodoList;
