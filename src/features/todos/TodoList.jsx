import React from 'react';
import useTodos from './hooks/useTodos';
import TodoItem from './components/TodoItem';
import EditModal from './components/EditModal';
import FilterBar from './components/FilterBar';
import { useState } from 'react';


const TodoList = () => {
    const { todos, loading, error, updateTodo, deleteTodo } = useTodos();

    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');
    const [selectedTodo, setSelectedTodo] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const filteredTodos = todos.filter((todo) => {
        const matchesSearch = todo.title.toLowerCase().includes(search.toLowerCase());
        const matchesFilter =
          filter === 'all'
            ? true
            : filter === 'completed'
            ? todo.completed
            : !todo.completed;
      
        return matchesSearch && matchesFilter;
      });
      

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
            <FilterBar
                currentFilter={filter}
                onFilterChange={setFilter}
                search={search}
                onSearchChange={setSearch}
            />
      <h2 className="text-2xl font-bold mb-4">Todo List</h2>
        <ul className="space-y-2">
        {filteredTodos.map(todo => (
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
