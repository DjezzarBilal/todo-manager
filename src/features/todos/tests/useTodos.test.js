import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import useTodos from '../hooks/useTodos';

describe('useTodos hook', () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn(); // ✅ marche dans tous les env jsdom
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('fetches todos on mount', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: 1, title: 'Test Todo', completed: false }],
    });

    const { result } = renderHook(() => useTodos());
    await act(() => Promise.resolve());

    expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/todos');
    expect(result.current.todos.length).toBe(1);
  });

  it('handles fetch error', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
    });

    const { result } = renderHook(() => useTodos());
    await act(() => Promise.resolve());

    expect(result.current.error).toBe('Failed to fetch todos');
  });
});
