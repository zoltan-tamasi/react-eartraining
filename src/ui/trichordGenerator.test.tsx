import React from 'react';
import { render, screen } from '@testing-library/react';
import TrichordGeneratorComponent from './trichordGenerator';

test('Chord display is visible', () => {
  render(<TrichordGeneratorComponent />);
  const linkElement = screen.getByText(/Chord is:/i);
  expect(linkElement).toBeInTheDocument();
});
