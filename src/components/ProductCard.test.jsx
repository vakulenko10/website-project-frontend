import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from './ProductCard';
import { AuthData } from '../auth/AuthWrapper';

// Mock AuthData
jest.mock('../auth/AuthWrapper', () => ({
  AuthData: jest.fn(),
}));

describe('ProductCard', () => {
  const mockAddToCart = jest.fn();
  const mockHandleEditProduct = jest.fn();
  const mockHandleDeleteProduct = jest.fn();

  beforeEach(() => {
    AuthData.mockReturnValue({
      user: { isAuthenticated: true, isAdmin: true },
      addToCart: mockAddToCart,
    });
  });

  const product = {
    id: '123',
    name: 'Test Product',
    price: 100,
    images: ['test-image.jpg'],
    status: 'Available',
  };

  it('renders product details correctly', () => {
    render(
      <ProductCard
        product={product}
        handleEditProduct={mockHandleEditProduct}
        handleDeleteProduct={mockHandleDeleteProduct}
      />
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument();
    expect(screen.getByAltText('Test Product')).toBeInTheDocument();
  });

  it('calls addToCart when the add to cart button is clicked', () => {
    render(
      <ProductCard
        product={product}
        handleEditProduct={mockHandleEditProduct}
        handleDeleteProduct={mockHandleDeleteProduct}
      />
    );

    fireEvent.click(screen.getByText('Add to Cart'));
    expect(mockAddToCart).toHaveBeenCalledWith(product.id, 1);
  });

  it('calls handleEditProduct when the edit button is clicked', () => {
    render(
      <ProductCard
        product={product}
        handleEditProduct={mockHandleEditProduct}
        handleDeleteProduct={mockHandleDeleteProduct}
      />
    );

    fireEvent.click(screen.getByText('Edit'));
    expect(mockHandleEditProduct).toHaveBeenCalledWith(product);
  });

  it('calls handleDeleteProduct when the delete button is clicked', () => {
    render(
      <ProductCard
        product={product}
        handleEditProduct={mockHandleEditProduct}
        handleDeleteProduct={mockHandleDeleteProduct}
      />
    );

    fireEvent.click(screen.getByText('Delete'));
    expect(mockHandleDeleteProduct).toHaveBeenCalledWith(product.id);
  });
});
