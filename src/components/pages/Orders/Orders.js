import React, { useEffect, useState } from 'react';
import './Orders.css';
import { AuthData } from '../../../auth/AuthWrapper';
import Checkout from '../../Checkout';
import { editTheOrder, getOrders } from '../../../services';
import Filter from '../../Filter';

export const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [editOrder, setEditOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, token } = AuthData();
  const [filteredOrders, setFilteredOrders] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null); // Overlay visibility
  const [isOrderOpen, setIsOrderOpen] = useState(null)
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await getOrders(token);
      if (data) {
        setOrders(data);
      } else {
        console.error('Failed to fetch orders.');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    // Zablokowanie przewijania tła, gdy overlay jest otwarty
    if (isOrderOpen) {
      document.body.style.overflow = 'hidden'; // Zablokowanie scrolla strony
    } else {
      document.body.style.overflow = 'auto'; // Przywrócenie scrolla strony
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOrderOpen, token]);
  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  const handlePaymentSuccess = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const handleEditClick = (order) => setEditOrder(order);

  const handleEditChange = (field, value) => {
    setEditOrder((prevOrder) => ({ ...prevOrder, [field]: value }));
  };

  const [errorMessage, setErrorMessage] = useState('');

  const submitEditOrder = async () => {
    setErrorMessage('');
    try {
      const editOrderResponse = await editTheOrder(editOrder.id, editOrder, token);
      if (editOrderResponse?.success) {
        alert(editOrderResponse.message);
        setEditOrder(null);
        fetchOrders();
      } else {
        setErrorMessage(editOrderResponse.error || 'Failed to update order.');
      }
    } catch (error) {
      setErrorMessage('An unexpected error occurred while updating the order.');
    }
  };

  const handleOrderClick = (order) => {
    setIsOrderOpen((prevState) => {
      const isOpen = !prevState;
      
      if (isOpen) {
          document.body.classList.add("cart-no-scroll");
      } else {
          document.body.classList.remove("cart-no-scroll");
      }
      
      return isOpen;
  })
    setSelectedOrder(order);
  };

  const handleOverlayClose = () => {
    setIsOrderOpen((prevState) => {
      const isOpen = !prevState;
      
      if (isOpen) {
          document.body.classList.add("cart-no-scroll");
      } else {
          document.body.classList.remove("cart-no-scroll");
      }
      
      return isOpen;
  })
    setSelectedOrder(null);
  };

  if (loading) return <div>Loading orders...</div>;

  // Get product details from localStorage
  const products = JSON.parse(localStorage.getItem('products') || '[]');

  const getProductDetails = (productId) => {
    return products.find((product) => product.id === productId);
  };
  return (
    <main className="pt-[50px]">
      <div className="page orders">
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <h2>Orders Page</h2>
        <h3>Your Orders</h3>
        <Filter items={orders} setFilteredItems={setFilteredOrders} itemsName={'orders'} />
        {user.isAdmin && editOrder && (
          <div className="edit-order">
            <h3>Edit Order #{editOrder.id}</h3>
            <input
              type="text"
              value={editOrder.status}
              onChange={(e) => handleEditChange('status', e.target.value)}
              placeholder="Status"
            />
            <textarea
              value={editOrder.description}
              onChange={(e) => handleEditChange('description', e.target.value)}
              placeholder="Description"
            />
            <button onClick={submitEditOrder}>Save Changes</button>
            <button onClick={() => setEditOrder(null)}>Cancel</button>
          </div>
        )}
        <div className="orders-list">
          {(!filteredOrders ? orders : filteredOrders).map((order) => (
            <div
              key={order.id}
              className="order-card hover:shadow-lg cursor-pointer"
              onClick={() => handleOrderClick(order)}
            >
              <h1>Order number: {order.id}</h1>
              <p>Status: {order.status}</p>
              <p>Total: ${order.total.toFixed(2)}</p>
              <p>Address: {order.address}</p>
              <h4>Products:</h4>
              <ul>
                {order.products.map((product, index) => (
                  <li key={index}>
                    Product ID: {product.product_id}, Quantity: {product.quantity}, Total: ${product.total.toFixed(2)}
                  </li>
                ))}
              </ul>
              {order.status !== 'Paid' &&
                order.status !== 'payment_successful' &&
                order.status !== 'done' &&
                !user.isAdmin && <Checkout order={order} onPaymentSuccess={handlePaymentSuccess} />}
              {order.user_id === user.id ? (
                <h1 className="text-text3">This is your order</h1>
              ) : (
                <></>
              )}
              {user.isAdmin && <button onClick={() => handleEditClick(order)}>Edit Order</button>}
            </div>
          ))}
        </div>
        {/* Overlay */}
        {isOrderOpen && selectedOrder && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full h-full p-6 overflow-y-auto relative">
      {/* Close Button */}
      <button
        onClick={handleOverlayClose}
        className="absolute top-4 right-4 text-4xl font-bold text-gray-700 hover:text-gray-900"
      >
        &times;
      </button>

      {/* Order Header */}
      <h2 className="text-3xl font-bold mb-4">Order Details #{selectedOrder.id}</h2>
      <div className="mb-6">
        <p className="text-lg font-medium">Status: <span className="font-normal">{selectedOrder.status}</span></p>
        <p className="text-lg font-medium">Total: <span className="font-normal">${selectedOrder.total.toFixed(2)}</span></p>
        <p className="text-lg font-medium">Address: <span className="font-normal">{selectedOrder.address}</span></p>
      </div>

      {/* Product List */}
      <h3 className="text-2xl font-semibold mb-4">Products</h3>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {selectedOrder.products.map((product) => {
          const productDetails = getProductDetails(product.product_id);
          return (
            <li key={product.product_id} className="border p-4 rounded-lg shadow-sm">
              {/* Product Image */}
              {productDetails?.images?.[0] ? (
                <img
                  src={productDetails.images[0]}
                  alt={productDetails.name}
                  className="w-full h-32 object-cover rounded-md mb-4"
                />
              ) : (
                <div className="w-full h-32 bg-gray-200 rounded-md mb-4 flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}

              {/* Product Details */}
              <h4 className="font-semibold text-lg">{productDetails?.name || 'Unknown Product'}</h4>
              <p className="text-sm text-gray-700">Product ID: {product.product_id}</p>
              <p className="text-sm text-gray-700">Price: ${productDetails?.price?.toFixed(2) || 'N/A'}</p>
              <p className="text-sm text-gray-700">Quantity: {product.quantity}</p>
              <p className="text-sm font-semibold text-gray-900">
                Total: ${product.total.toFixed(2)}
              </p>
            </li>
          );
        })}
      </ul>

      {/* Order Total */}
      <div className="mt-6 text-lg font-semibold">
        <p>Order Total: ${selectedOrder.total.toFixed(2)}</p>
      </div>
    </div>
  </div>
)}

      </div>
    </main>
  );
};
