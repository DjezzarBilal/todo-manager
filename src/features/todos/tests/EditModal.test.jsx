import { render, screen, fireEvent } from '@testing-library/react';
import EditModal from '../components/EditModal';
import { describe, it, expect, vi} from 'vitest';

describe('EditModal component', () => {
  const mockTodo = {
    id: 1,
    title: 'Original Title',
    completed: false,
  };

  const mockOnSave = vi.fn();
  const mockOnClose = vi.fn();

  it('renders with correct initial values', () => {
    render(
      <EditModal
        isOpen={true}
        todo={mockTodo}
        onClose={mockOnClose}
        onSave={mockOnSave}
      />
    );

    expect(screen.getByDisplayValue(/original title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/completed/i)).not.toBeChecked();
  });

  it('submits changes and calls onSave', () => {
    render(
      <EditModal
        isOpen={true}
        todo={mockTodo}
        onClose={mockOnClose}
        onSave={mockOnSave}
      />
    );

    const titleInput = screen.getByLabelText(/title/i);
    fireEvent.change(titleInput, { target: { value: 'Updated Title' } });

    const saveButton = screen.getByRole('button', { name: /save/i });
    fireEvent.click(saveButton);

    expect(mockOnSave).toHaveBeenCalledWith({
      ...mockTodo,
      title: 'Updated Title',
      completed: false,
    });
  });

  it('cancels when clicking cancel button', () => {
    render(
      <EditModal
        isOpen={true}
        todo={mockTodo}
        onClose={mockOnClose}
        onSave={mockOnSave}
      />
    );

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButton);

    expect(mockOnClose).toHaveBeenCalled();
  });
});
