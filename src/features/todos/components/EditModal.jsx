import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

const EditModal = ({ isOpen, onClose, todo, onSave }) => {
  const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState(false);
  const titleRef = useRef();

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setCompleted(todo.completed);
    }
  }, [todo]);

  // 🔁 Accessibilité : fermeture avec Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        toast.info('Update cancelled');
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // 🧠 Focus automatique sur le champ
  useEffect(() => {
    if (isOpen && titleRef.current) {
      titleRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      toast.error('Title cannot be empty');
      return;
    }

    if (trimmedTitle === todo.title && completed === todo.completed) {
      toast.info('No changes detected.');
      return;
    }

    const updated = { ...todo, title: trimmedTitle, completed };
    onSave(updated);
    onClose();
    toast.success('Todo updated successfully');
  };

  if (!isOpen || !todo) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-todo-title"
    >
      <div className="bg-white p-6 rounded w-[90%] max-w-md shadow">
        <h3 id="edit-todo-title" className="text-xl font-semibold mb-4">
          Edit Todo
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="todo-title" className="block mb-1 font-medium">
              Title
            </label>
            <input
              id="todo-title"
              ref={titleRef}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border p-2 rounded"
              required
              aria-required="true"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
              id="completed"
            />
            <label htmlFor="completed">Completed</label>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                toast.info('Update cancelled');
                onClose();
              }}
              className="text-sm text-gray-600 hover:underline"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-1 rounded text-sm hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
