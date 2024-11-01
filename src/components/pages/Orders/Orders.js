import React, { useEffect, useState } from 'react';
import './Orders.css';
import { AuthData } from '../../../auth/AuthWrapper';
import Checkout from '../../Checkout';

export const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [editOrder, setEditOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = AuthData();

    const fetchOrders = async () => {
        try {
            const response = await fetch('http://localhost:5000/orders', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                },
            });
            const data = await response.json();
            setOrders(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching orders:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

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

    const submitEditOrder = async () => {
        try {
            const response = await fetch(`http://localhost:5000/orders/${editOrder.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                },
                body: JSON.stringify(editOrder),
            });
            if (response.ok) {
                alert('Order updated successfully!');
                setEditOrder(null);
                fetchOrders();
            } else {
                const errorData = await response.json();
                alert(`Error updating order: ${errorData.error}`);
            }
        } catch (error) {
            console.error('Error updating order:', error);
        }
    };

    if (loading) return <div>Loading orders...</div>;

    return (
        <main>
            <div className="page orders">
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
                    {orders.map((order) => (
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
