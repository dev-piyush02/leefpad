import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignUp from './SignUp';

describe('<SignUp />', () => {
  test('it should mount', () => {
    render(<SignUp />);

    const signUp = screen.getByTestId('SignUp');

    expect(signUp).toBeInTheDocument();
  });
});