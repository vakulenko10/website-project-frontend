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
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center overflow-scroll items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full h-full ">
              <button
                onClick={handleOverlayClose}
                className="absolute top-4 right-4 z-100 text-text1 text-6xl hover:text-text2"
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold mb-4">Order Details #{selectedOrder.id}</h2>
              <p>Status: {selectedOrder.status}</p>
              <p>Total: ${selectedOrder.total.toFixed(2)}</p>
              <p>Address: {selectedOrder.address}</p>
              <h3 className="text-lg font-semibold mt-4">Products</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  overflow-y-scroll">
                {selectedOrder.products.map((product) => {
                  const productDetails = getProductDetails(product.product_id);
                  return (
                    <li key={product.product_id} className="border p-4 rounded-lg shadow-sm">
                      {productDetails?.images ? (
                        <img
                          src={productDetails.images[0]}
                          alt={productDetails.name}
                          className="w-full h-32 object-cover rounded-md mb-2"
                        />
                      ) : (
                        <div className="w-full h-32 bg-gray-200 rounded-md mb-2 flex items-center justify-center">
                          No Image
                        </div>
                      )}
                      <h4 className="font-semibold">{productDetails?.name || 'Unknown Product'}</h4>
                      <p>Quantity: {product.quantity}</p>
                      <p>Price: ${productDetails?.price || 'N/A'}</p>
                      <p>Total: ${product.total.toFixed(2)}</p>
                    </li>
                  );
                })}
              </ul>
              <p>order total:{selectedOrder.total}</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
