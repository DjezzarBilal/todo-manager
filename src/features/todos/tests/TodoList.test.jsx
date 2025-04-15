import { describe, it, expect, beforeEach, vi} from 'vitest';
import { render, screen } from '@testing-library/react';
import TodoList from '../TodoList';
import * as useTodosHook from '../hooks/useTodos';

// mock le hook useTodos
vi.mock('../hooks/useTodos');

describe('TodoList component', () => {
  beforeEach(() => {
    useTodosHook.default.mockReturnValue({
      todos: [
        { id: 1, title: 'Test Todo 1', completed: false },
        { id: 2, title: 'Test Todo 2', completed: true },
      ],
      loading: false,
      error: null,
      updateTodo: vi.fn(),
      deleteTodo: vi.fn(),
    });
  });

  it('renders the list of todos', () => {
    render(<TodoList />);
    expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
    expect(screen.getByText('Test Todo 2')).toBeInTheDocument();
  });

  it('renders filters and search bar', () => {
    render(<TodoList />);
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument();
  });

  it('shows loading message', () => {
    useTodosHook.default.mockReturnValueOnce({
      todos: [],
      loading: true,
      error: null,
      updateTodo: vi.fn(),
      deleteTodo: vi.fn(),
    });
    render(<TodoList />);
    expect(screen.getByText(/loading todos/i)).toBeInTheDocument();
  });

  it('shows error message', () => {
    useTodosHook.default.mockReturnValueOnce({
      todos: [],
      loading: false,
      error: 'Something went wrong',
      updateTodo: vi.fn(),
      deleteTodo: vi.fn(),
    });
    render(<TodoList />);
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });
});

