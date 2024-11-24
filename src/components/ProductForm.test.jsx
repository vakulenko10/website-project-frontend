import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductForm from './ProductForm';
import { AuthData } from '../auth/AuthWrapper';

// Mock AuthData
jest.mock('../auth/AuthWrapper', () => ({
  AuthData: jest.fn(),
}));

describe('ProductForm', () => {
  const mockToggleOverlay = jest.fn();
  const mockHandleSubmit = jest.fn();
  const mockSetFormData = jest.fn();

  const formData = {
    name: 'Test Product',
    description: 'Test Description',
    price: 100,
    material: 'Cotton',
    color: 'Blue',
    images: ['image1.jpg'],
  };

  beforeEach(() => {
    AuthData.mockReturnValue({
      token: 'mock-token',
    });
  });

  it('renders the form with correct initial values', () => {
    render(
      <ProductForm
        isOverlayOpen={true}
        editingProductId="123"
        formData={formData}
        setFormData={mockSetFormData}
        handleSubmit={mockHandleSubmit}
        toggleOverlay={mockToggleOverlay}
      />
    );

    expect(screen.getByPlaceholderText('Product Name').value).toBe(
      'Test Product'
    );
    expect(screen.getByPlaceholderText('Description').value).toBe(
      'Test Description'
    );
    expect(screen.getByPlaceholderText('Price').value).toBe('100');
    expect(screen.getByPlaceholderText('Material').value).toBe('Cotton');
    expect(screen.getByPlaceholderText('Color').value).toBe('Blue');
  });

  it('calls setFormData when inputs are changed', () => {
    render(
      <ProductForm
        isOverlayOpen={true}
        editingProductId="123"
        formData={formData}
        setFormData={mockSetFormData}
        handleSubmit={mockHandleSubmit}
        toggleOverlay={mockToggleOverlay}
      />
    );

    fireEvent.change(screen.getByPlaceholderText('Product Name'), {
      target: { value: 'Updated Product' },
    });
    expect(mockSetFormData).toHaveBeenCalledWith({
      ...formData,
      name: 'Updated Product',
    });
  });

  it('calls handleSubmit when the form is submitted', () => {
    render(
      <ProductForm
        isOverlayOpen={true}
        editingProductId="123"
        formData={formData}
        setFormData={mockSetFormData}
        handleSubmit={mockHandleSubmit}
        toggleOverlay={mockToggleOverlay}
      />
    );

    fireEvent.submit(screen.getByRole('form'));
    expect(mockHandleSubmit).toHaveBeenCalled();
  });

  it('calls toggleOverlay when the overlay close button is clicked', () => {
    render(
      <ProductForm
        isOverlayOpen={true}
        editingProductId="123"
        formData={formData}
        setFormData={mockSetFormData}
        handleSubmit={mockHandleSubmit}
        toggleOverlay={mockToggleOverlay}
      />
    );

    fireEvent.click(screen.getByText('Close'));
    expect(mockToggleOverlay).toHaveBeenCalled();
  });
});
