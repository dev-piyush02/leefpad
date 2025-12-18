import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NoteDisplay from './NoteDisplay';

describe('<NoteDisplay />', () => {
  test('it should mount', () => {
    render(<NoteDisplay />);

    const noteDisplay = screen.getByTestId('NoteDisplay');

    expect(noteDisplay).toBeInTheDocument();
  });
});