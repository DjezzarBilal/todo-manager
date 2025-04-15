import React, { useState, useMemo, useCallback } from 'react';
import useTodos from './hooks/useTodos';
import TodoItem from './components/TodoItem';
import EditModal from './components/EditModal';
import FilterBar from './components/FilterBar';
import Pagination from './components/Pagination';

const TodoList = () => {
  const { todos, loading, error, updateTodo, deleteTodo } = useTodos();

  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const todosPerPage = 10;

  const [selectedTodo, setSelectedTodo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = useCallback((todo) => {
    setSelectedTodo(todo);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedTodo(null);
  }, []);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      const matchesSearch = todo.title.toLowerCase().includes(search.toLowerCase());
      const matchesFilter =
        filter === 'all'
          ? true
          : filter === 'completed'
          ? todo.completed
          : !todo.completed;

      return matchesSearch && matchesFilter;
    });
  }, [todos, search, filter]);

  const currentTodos = useMemo(() => {
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    return filteredTodos.slice(indexOfFirstTodo, indexOfLastTodo);
  }, [filteredTodos, currentPage]);

  if (loading) return <p className="text-center">Loading todos...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Todo List</h2>

      <FilterBar
        currentFilter={filter}
        onFilterChange={setFilter}
        search={search}
        onSearchChange={setSearch}
      />

      <ul className="space-y-2">
        {currentTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onEdit={handleEditClick}
            onDelete={deleteTodo}
          />
        ))}
      </ul>

      <Pagination
        currentPage={currentPage}
        totalTodos={filteredTodos.length}
        todosPerPage={todosPerPage}
        onPageChange={handlePageChange}
      />

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
