import React, { useEffect, useState } from "react";
import { AuthData } from "../auth/AuthWrapper";
import { createOrder, getOrderById } from "../services/orderAPI";
import Checkout from "./Checkout";

const OrderForm = ({ prevTab, nextTab, setActiveTab, activeTab }) => {
  const { token, cart } = AuthData();

  // State management for form fields
  const [contactInfo, setContactInfo] = useState({
    name: "",
    lastName: "",
    phone: "",
    email: "",
  });
  const [deliveryInfo, setDeliveryInfo] = useState({
    country: "",
    state: "",
    city: "",
    address: "",
    postalCode: "",
  });
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [order, setOrder] = useState(null)
  // Handle form submissions based on active tab
  const handleOrderSubmit = async () => {
    setLoading(true);
    try {
      const products = cart.items;
      const description = `Order for ${contactInfo.name} ${contactInfo.lastName}, phone number: ${contactInfo.number}, email: ${contactInfo.email}`;
      const address = `conutry:${deliveryInfo.country}, state:${deliveryInfo.state}, city:${deliveryInfo.city}, adress:${deliveryInfo.address}, postalCode:${deliveryInfo.postalCode}`;

      // Step 1: Create a new order
      const orderResponse = await createOrder(
        cart.items,
        `Order for ${contactInfo.name} ${contactInfo.lastName}, phone number: ${contactInfo.number}, email: ${contactInfo.email}`,
        `conutry:${deliveryInfo.country}, state:${deliveryInfo.state}, city:${deliveryInfo.city}, adress:${deliveryInfo.address}, postalCode:${deliveryInfo.postalCode}`,
        token
      );

      if (orderResponse) {
        setOrderId(orderResponse.order_id);
        try{
          const detailedOrder = await getOrderById(orderResponse.order_id, token)
          if (detailedOrder){
            setOrder(detailedOrder)
            setMessage("Order details received successfully!");
          }
        }
        catch(error){
          console.error("Failed to create order:", error);
          setMessage(error.message || "Failed to receive order");
        }
        console.log("Order created:", orderResponse);
        setMessage("Order created successfully!");
        setActiveTab("payment");
      } else {
        throw new Error(orderResponse.error);
      }
    } catch (error) {
      console.error("Failed to create order:", error);
      setMessage(error.message || "Failed to create order");
    } finally {
      setLoading(false);
    }
  };
  const handlePaymentSuccess = (orderId, newStatus) => {
    setOrder((prevOrderState) => order.id === orderId?{...prevOrderState, status: newStatus}:order)
};
useEffect(()=>{
  console.log("order inside the irederForm:", order)
}, [order])
  return (
    <div className="order-form bg-white !ml-0 mt-0 p-8 rounded-lg shadow-lg w-full md:max-w-1/2 h-full overflow-scroll custom-scrollbar relative">
      {/* Navigation buttons */}
      <button
        onClick={prevTab}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#5B0101] text-2xl font-bold"
      >
        &larr;
      </button>
      <button
        onClick={nextTab}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 text-[#5B0101] text-2xl font-bold"
      >
        &rarr;
      </button>

      {/* Tabs Navigation */}
      <div className="flex justify-between mb-2 mt-2">
        <button
          onClick={() => setActiveTab("contact")}
          className={`w-4 h-4 rounded-full ${
            activeTab === "contact" ? "bg-[#5B0101]" : "bg-gray-200"
          }`}
        />
        <button
          onClick={() => setActiveTab("delivery")}
          className={`w-4 h-4 rounded-full ${
            activeTab === "delivery" ? "bg-[#5B0101]" : "bg-gray-200"
          }`}
        />
        <button
          onClick={() => setActiveTab("payment")}
          className={`w-4 h-4 rounded-full ${
            activeTab === "payment" ? "bg-[#5B0101]" : "bg-gray-200"
          }`}
        />
      </div>

      {/* Tab Content */}
      <div className="max-h-full overflow-y-auto">
        {activeTab === "contact" && (
          <div>
            <h3 className="text-xl font-semibold">Contact Information</h3>
            <input
              type="text"
              placeholder="Name"
              value={contactInfo.name}
              onChange={(e) =>
                setContactInfo({ ...contactInfo, name: e.target.value })
              }
              className="w-full border-b-2 border-gray-300 p-2"
            />
            <input
              type="text"
              placeholder="Lastname"
              value={contactInfo.lastName}
              onChange={(e) =>
                setContactInfo({ ...contactInfo, lastName: e.target.value })
              }
              className="w-full border-b-2 border-gray-300 p-2"
            />
            <input
              type="text"
              placeholder="Phone number"
              value={contactInfo.phone}
              onChange={(e) =>
                setContactInfo({ ...contactInfo, phone: e.target.value })
              }
              className="w-full border-b-2 border-gray-300 p-2"
            />
            <input
              type="text"
              placeholder="Email"
              value={contactInfo.email}
              onChange={(e) =>
                setContactInfo({ ...contactInfo, email: e.target.value })
              }
              className="w-full border-b-2 border-gray-300 p-2"
            />
            
          </div>
        )}
        {activeTab === "delivery" && (
          <div>
          <h3 className="text-xl font-semibold">Contact Information</h3>
          <input
            type="text"
            placeholder="Country"
            value={deliveryInfo.country}
            onChange={(e) =>
              setDeliveryInfo({ ...deliveryInfo, country: e.target.value })
            }
            className="w-full border-b-2 border-gray-300 p-2"
          />
          <input
            type="text"
            placeholder="State"
            value={deliveryInfo.state}
            onChange={(e) =>
              setDeliveryInfo({ ...deliveryInfo, state: e.target.value })
            }
            className="w-full border-b-2 border-gray-300 p-2"
          />
          <input
            type="text"
            placeholder="City"
            value={deliveryInfo.city}
            onChange={(e) =>
              setDeliveryInfo({ ...deliveryInfo, city: e.target.value })
            }
            className="w-full border-b-2 border-gray-300 p-2"
          />
          <input
            type="text"
            placeholder="Adress"
            value={deliveryInfo.address}
            onChange={(e) =>
              setDeliveryInfo({ ...deliveryInfo, address: e.target.value })
            }
            className="w-full border-b-2 border-gray-300 p-2"
          />
          <input
            type="text"
            placeholder="Postal code"
            value={deliveryInfo.postalCode}
            onChange={(e) =>
              setDeliveryInfo({ ...deliveryInfo, postalCode: e.target.value })
            }
            className="w-full border-b-2 border-gray-300 p-2"
          />
          </div>
        )}
        {activeTab === "payment" && (
          <div>
            <h3 className="text-xl font-semibold">Payment Information</h3>
            {/* <input
              type="text"
              placeholder="Cardholder Name"
              value={paymentInfo.cardholderName}
              onChange={(e) => setPaymentInfo({ ...paymentInfo, cardholderName: e.target.value })}
              className="w-full border-b-2 border-gray-300 p-2"
            /> */}
            {/* <CardElement className="p-4 border rounded" /> */}
            <Checkout order={order} onPaymentSuccess={handlePaymentSuccess} />
            {/* <button onClick={handlePaymentSubmit} disabled={loading}>
              {loading ? 'Processing Payment...' : 'Pay Now'}
            </button> */}
          </div>
        )}
        {JSON.stringify(order)}
        <button onClick={handleOrderSubmit} disabled={loading}>
              {loading ? "Creating Order..." : "Next"}
            </button>
      </div>

      {message && <p className="text-red-500 mt-4">{message}</p>}
    </div>
  );
};

export default OrderForm;
