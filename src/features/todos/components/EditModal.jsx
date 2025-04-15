import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const EditModal = ({ isOpen, onClose, todo, onSave }) => {
  const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setCompleted(todo.completed);
    }
  }, [todo]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedTitle = title.trim();

    // Validation
    if (!trimmedTitle) {
      toast.error('Title cannot be empty');
      return;
    }
    if (trimmedTitle === todo.title && completed === todo.completed) {
      toast.info('No changes detected.');
      return;
    }

    // save update
    const updated = { ...todo, title: trimmedTitle, completed };
    onSave(updated);
    onClose();
    toast.success('Todo updated successfully');
  };

  if (!isOpen || !todo) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded w-[90%] max-w-md shadow">
        <h3 className="text-xl font-semibold mb-4">Edit Todo</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border p-2 rounded"
              required
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
