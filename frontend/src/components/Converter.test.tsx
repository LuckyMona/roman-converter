import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Converter from './Converter';
import * as api from '../api/romanNumeral';

// Mock API request
jest.mock('../api/romanNumeral');

describe('Converter Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly', () => {
    render(<Converter />);
    expect(screen.getByText(/Roman numeral converter/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Enter a number/i)).toBeInTheDocument();
    expect(screen.getByText(/Convert to roman numeral/i)).toBeInTheDocument();
  });

  test('accepts input value and updates state', () => {
    render(<Converter />);
    const input = screen.getByLabelText(/Enter a number/i);
    fireEvent.change(input, { target: { value: '123' } });
    expect(input).toHaveValue(123);
  });

  test('shows error message for invalid input', () => {
    render(<Converter />);
    const input = screen.getByLabelText(/Enter a number/i);
    fireEvent.change(input, { target: { value: '5000' } });
    expect(screen.getByText(/Invalid input. Please enter a number between 1 and 3999./i)).toBeInTheDocument();
  });

  test('calls getRomanNumeral and displays output on success', async () => {
    // Mock success response
    (api.getRomanNumeral as jest.Mock).mockResolvedValueOnce({ output: 'XII' });

    render(<Converter />);
    const input = screen.getByLabelText(/Enter a number/i);
    const button = screen.getByText(/Convert to roman numeral/i);

    fireEvent.change(input, { target: { value: '12' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/Roman numeral:/i)).toBeInTheDocument();
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(screen.getByText(/XII/i)).toBeInTheDocument();
    });
  });

  test('displays error message on API failure', async () => {
    // Mock failure response
    (api.getRomanNumeral as jest.Mock).mockRejectedValueOnce(new Error('Invalid input, please enter an integer between 1 and 3999'));

    render(<Converter />);
    const input = screen.getByLabelText(/Enter a number/i);
    const button = screen.getByText(/Convert to roman numeral/i);

    fireEvent.change(input, { target: { value: '12' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/Error:/i)).toBeInTheDocument();
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(screen.getByText(/Invalid input, please enter an integer between 1 and 3999/i)).toBeInTheDocument();
    });
  });
});
