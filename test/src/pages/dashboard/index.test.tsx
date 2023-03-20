/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dashboard from '@/pages/dashboard';

describe('Dashboard', () => {
  it('should render the dashboard', () => {
    render(<Dashboard />);
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });
});
