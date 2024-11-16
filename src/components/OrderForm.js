import React from 'react'

const OrderForm = ({prevTab, nextTab, setActiveTab, activeTab}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs w-full overflow-hidden relative">
              {/* Strzałki nawigacyjne */}
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

              {/* Dekoracyjne przyciski kółkowe */}
              <div className="flex justify-between mb-2 mt-2">
                <button
                  className={`w-4 h-4 flex items-center justify-center rounded-full ${
                    activeTab === "contact" ? "bg-[#5B0101]" : "bg-gray-200"
                  }`}
                  onClick={() => setActiveTab("contact")}
                  aria-label="Contact tab"
                />
                <button
                  className={`w-4 h-4 flex items-center justify-center rounded-full ${
                    activeTab === "delivery" ? "bg-[#5B0101]" : "bg-gray-200"
                  }`}
                  onClick={() => setActiveTab("delivery")}
                  aria-label="Delivery tab"
                />
                <button
                  className={`w-4 h-4 flex items-center justify-center rounded-full ${
                    activeTab === "payment" ? "bg-[#5B0101]" : "bg-gray-200"
                  }`}
                  onClick={() => setActiveTab("payment")}
                  aria-label="Payment tab"
                />
              </div>

              {/* Tab Content */}
              <div className="max-h-80 overflow-y-auto">
                {activeTab === "contact" && (
                  <div>
                    <h3 className="text-xl font-semibold">
                      Contact Information
                    </h3>
                    <form className="space-y-4">
                      <div className="flex space-x-4">
                        <div className="w-1/2">
                          <label className="block text-sm font-medium">
                            Name
                          </label>
                          <input
                            type="text"
                            className="w-full border-b-2 border-gray-300 p-2"
                            placeholder="Your Name"
                          />
                        </div>
                        <div className="w-1/2">
                          <label className="block text-sm font-medium">
                            Last Name
                          </label>
                          <input
                            type="text"
                            className="w-full border-b-2 border-gray-300 p-2"
                            placeholder="Your Last Name"
                          />
                        </div>
                      </div>
                      <div className="flex space-x-4">
                        <div className="w-1/2">
                          <label className="block text-sm font-medium">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            className="w-full border-b-2 border-gray-300 p-2"
                            placeholder="Your Phone Number"
                          />
                        </div>
                        <div className="w-1/2">
                          <label className="block text-sm font-medium">
                            Email
                          </label>
                          <input
                            type="email"
                            className="w-full border-b-2 border-gray-300 p-2"
                            placeholder="Your Email"
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                )}

                {activeTab === "delivery" && (
                  <div>
                    <h3 className="text-xl font-semibold">
                      Delivery Information
                    </h3>
                    <form className="space-y-4">
                      <div className="flex space-x-4">
                        <div className="w-1/2">
                          <label className="block text-sm font-medium">
                            Country
                          </label>
                          <input
                            type="text"
                            className="w-full border-b-2 border-gray-300 p-2"
                            placeholder="Country"
                          />
                        </div>
                        <div className="w-1/2">
                          <label className="block text-sm font-medium">
                            State
                          </label>
                          <input
                            type="text"
                            className="w-full border-b-2 border-gray-300 p-2"
                            placeholder="State"
                          />
                        </div>
                      </div>
                      <div className="flex space-x-4">
                        <div className="w-1/2">
                          <label className="block text-sm font-medium">
                            City/Town
                          </label>
                          <input
                            type="text"
                            className="w-full border-b-2 border-gray-300 p-2"
                            placeholder="City/Town"
                          />
                        </div>
                        <div className="w-1/2">
                          <label className="block text-sm font-medium">
                            Postal Address
                          </label>
                          <input
                            type="text"
                            className="w-full border-b-2 border-gray-300 p-2"
                            placeholder="Postal Address"
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                )}

                {activeTab === "payment" && (
                  <div>
                    <h3 className="text-xl font-semibold">
                      Payment Information
                    </h3>
                    <form className="space-y-4">
                      <div className="flex space-x-4">
                        <div className="w-1/2">
                          <label className="block text-sm font-medium">
                            Cardholder Name
                          </label>
                          <input
                            type="text"
                            className="w-full border-b-2 border-gray-300 p-2"
                            placeholder="Cardholder Name"
                          />
                        </div>
                        <div className="w-1/2">
                          <label className="block text-sm font-medium">
                            Card Number
                          </label>
                          <input
                            type="text"
                            className="w-full border-b-2 border-gray-300 p-2"
                            placeholder="Card Number"
                          />
                        </div>
                      </div>
                      <div className="flex space-x-4">
                        <div className="w-1/2">
                          <label className="block text-sm font-medium">
                            Expiration Date
                          </label>
                          <input
                            type="month"
                            className="w-full border-b-2 border-gray-300 p-2"
                          />
                        </div>
                        <div className="w-1/2">
                          <label className="block text-sm font-medium">
                            CVV
                          </label>
                          <input
                            type="text"
                            className="w-full border-b-2 border-gray-300 p-2"
                            placeholder="CVV"
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
  )
}

export default OrderForm