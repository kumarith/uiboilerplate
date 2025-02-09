import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import Search from './components/search';

describe('Search Component', () => {
  test('renders input and button', () => {
    render(<Search onSearch={jest.fn()} />);

    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  test('updates input value when typing', () => {
    render(<Search onSearch={jest.fn()} />);

    const input = screen.getByPlaceholderText('Search') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'React' } });

    expect(input.value).toBe('React');
  });

  test('calls onSearch with correct input value on button click', () => {
    const mockOnSearch = jest.fn();
    render(<Search onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Search') as HTMLInputElement;
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'React' } });
    fireEvent.click(button);

    expect(mockOnSearch).toHaveBeenCalledWith('React');
  });

  test('does not call onSearch if input is empty', () => {
    const mockOnSearch = jest.fn();
    render(<Search onSearch={mockOnSearch} />);

    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.click(button);

    expect(mockOnSearch).toHaveBeenCalledWith('');
  });
});
