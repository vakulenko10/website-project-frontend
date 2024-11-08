import React, { useEffect, useState } from 'react';
import { AuthData } from '../auth/AuthWrapper';
import './Orders.css';

export const Orders = () => {
    const { cart } = AuthData(); // Pobrane dane koszyka
    const [orders, setOrders] = useState([]); // Zmienna do przechowywania zamówień
    const [loading, setLoading] = useState(true); // Zmienna do obsługi ładowania
    const [error, setError] = useState(null); // Zmienna do obsługi błędów
    const [name, setName] = useState(''); // Zmienna do przechowywania imienia
    const [address, setAddress] = useState(''); // Zmienna do przechowywania adresu

    // Funkcja do pobierania zamówień
    const fetchOrders = async () => {
        try {
            const response = await fetch('http://localhost:5000/orders', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }

            const data = await response.json();
            setOrders(data); // Ustawienie pobranych zamówień
        } catch (err) {
            setError(err.message); // Ustawienie błędu
        } finally {
            setLoading(false); // Zakończenie ładowania
        }
    };

    // Funkcja do składania zamówienia
    const handleCreateOrder = async () => {
        const orderData = {
            products: cart.items.map(item => ({
                product_id: item.product_id,
                quantity: item.quantity
            })),
            address: address, // Adres zamówienia pobrany z formularza
            description: `Order created by ${name}` // Można dodać imię do opisu zamówienia
        };

        try {
            const response = await fetch('http://localhost:5000/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                },
                body: JSON.stringify(orderData)
            });

            if (!response.ok) {
                throw new Error('Failed to create order');
            }

            const data = await response.json();
            alert(`Order created successfully: ${data.order_id}`);
            // Resetowanie formularza po utworzeniu zamówienia
            setName('');
            setAddress('');
        } catch (err) {
            alert(err.message);
        }
    };

    // Użycie useEffect do pobierania zamówień po załadowaniu komponentu
    useEffect(() => {
        fetchOrders();
    }, []);

    if (loading) return <p>Loading orders...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="orders-container">
            <h2 className="orders-header">Your Orders</h2>
            
            {/* Formularz do składania zamówienia */}
            <div className="order-form">
                <h3>Create New Order</h3>
                <input 
                    type="text" 
                    placeholder="Your Name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                />
                <input 
                    type="text" 
                    placeholder="Your Address" 
                    value={address} 
                    onChange={(e) => setAddress(e.target.value)} 
                    required 
                />
                <button onClick={handleCreateOrder}>Create Order</button>
            </div>

            <ul className="orders-list">
                {orders.map(order => (
                    <li key={order.id} className="order-item">
                        <h3>Order ID: {order.id}</h3>
                        <p>Status: {order.status}</p>
                        <p>Total: ${order.total}</p>
                        <p>Address: {order.address}</p>
                        <p>Products:</p>
                        <ul>
                            {order.products.map(product => (
                                <li key={product.product_id}>
                                    Product ID: {product.product_id}, Quantity: {product.quantity}
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};
