import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NoteBox from './NoteBox';

describe('<NoteBox />', () => {
  test('it should mount', () => {
    render(<NoteBox />);

    const noteBox = screen.getByTestId('NoteBox');

    expect(noteBox).toBeInTheDocument();
  });
});