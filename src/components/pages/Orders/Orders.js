import React, { useEffect, useState } from 'react';
import './Orders.css';
import { AuthData } from '../../../auth/AuthWrapper';
import Checkout from '../../Checkout';
import { editTheOrder, getOrders } from '../../../services';

export const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [editOrder, setEditOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user, token } = AuthData();

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
          setLoading(false); // Ensure loading is set to false even if an error occurs
        }
      };
      

      useEffect(() => {
        if (token) {
          fetchOrders();
        }
      }, [token]);

    // Handler for payment success
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
        setErrorMessage(''); // Clear any previous error messages
        try {
          console.log('Submitting edit for order:', editOrder);
      
          const editOrderResponse = await editTheOrder(editOrder.id, editOrder, token);
      
          if (editOrderResponse?.success) {
            alert(editOrderResponse.message);
            setEditOrder(null);
            fetchOrders(); // Refetch orders after successful edit
          } else {
            console.error('Error response:', editOrderResponse.error);
            setErrorMessage(editOrderResponse.error || 'Failed to update order.');
          }
        } catch (error) {
          console.error('Unexpected error while updating order:', error);
          setErrorMessage('An unexpected error occurred while updating the order.');
        }
      };
      
      

    if (loading) return <div>Loading orders...</div>;

    return (
        <main>
            <div className="page orders">
            {errorMessage && <div className="error-message">{errorMessage}</div>}
                <h2>Orders Page</h2>
                <h3>Your Orders</h3>
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
                    {orders && orders.map((order) => (
                        <div key={order.id} className="order-card">
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
                            <Checkout order={order} onPaymentSuccess={handlePaymentSuccess} />
                            {user.isAdmin && (
                                <button onClick={() => handleEditClick(order)}>Edit Order</button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
};
