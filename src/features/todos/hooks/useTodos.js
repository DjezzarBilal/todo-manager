import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';


const useTodos = () => {

  const url='https://jsonplaceholder.typicode.com/todos';

  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetching todos
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed to fetch todos');
        const data = await res.json();
        setTodos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  // Update todo
  const updateTodo = async (updatedTodo) => {
    const prevTodos = [...todos];
    setTodos(
      todos.map((todo) =>
        todo.id === updatedTodo.id ? { ...todo, ...updatedTodo } : todo
      )
    );

    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${updatedTodo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodo),
      });
      if (!res.ok) throw new Error('Failed to update todo');
    } catch (err) {
      setTodos(prevTodos); 
      setError(err.message);
    }
  };

  // Delete todo
  const deleteTodo = async (todoToDelete) => {
    // 🔄 Optimistic update
    const prevTodos = [...todos];
    setTodos(todos.filter((todo) => todo.id !== todoToDelete.id));
  
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoToDelete.id}`, {
        method: 'DELETE',
      });
  
      if (!res.ok) throw new Error('Failed to delete todo');
  
      // ✅ Succès
      toast.success('Todo deleted successfully');
    } catch (err) {
      // ❌ Rollback
      setTodos(prevTodos);
      setError(err.message);
      toast.error('Failed to delete todo');
    }
  };

  return {
    todos,
    loading,
    error,
    updateTodo,
    deleteTodo,
  };
};

export default useTodos;
