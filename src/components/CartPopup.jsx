import React, { useEffect } from 'react';
import { useCart } from '../context/CartContext';

const CartPopup = () => {
  const { cartItems, showCartPopup, setShowCartPopup, removeFromCart, updateQuantity } = useCart();

  // Debug: log when popup state changes
  useEffect(() => {
    console.log('Cart popup state:', showCartPopup);
  }, [showCartPopup]);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      let price = 0;
      // If price is a number, use it directly
      if (typeof item.price === 'number') {
        price = item.price;
      } 
      // If priceDisplay exists, parse from it
      else if (item.priceDisplay) {
        price = parseFloat(item.priceDisplay.replace(/[Rp\s.]/g, '').replace(',', '.'));
      }
      // If price is a string, try to parse it
      else if (typeof item.price === 'string') {
        price = parseFloat(item.price.replace(/[Rp\s.]/g, '').replace(',', '.'));
      }
      return total + (price * item.quantity);
    }, 0);
  };

  const formatRupiah = (amount) => {
    return `Rp ${amount.toLocaleString('id-ID')}`;
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  if (!showCartPopup) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[90]"
        onClick={() => setShowCartPopup(false)}
      />
      
      {/* Cart Popup */}
      <div className="fixed top-20 right-4 z-[100] w-full max-w-md animate-slide-in-right" style={{ maxWidth: '28rem' }}>
        <div className="bg-white dark:bg-background-dark/95 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-200 dark:border-white/10 overflow-hidden flex flex-col max-h-[80vh]">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-white/10">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Shopping Cart
            </h2>
            <button
              onClick={() => setShowCartPopup(false)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <span className="material-symbols-outlined text-6xl text-gray-300 dark:text-gray-600 mb-4">
                  shopping_bag
                </span>
                <p className="text-gray-500 dark:text-gray-400 text-base font-medium">
                  Your cart is empty
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10"
                  >
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.alt}
                        className="w-20 h-20 object-cover rounded-xl"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 flex flex-col gap-2">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                            {item.name}
                          </h3>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                            {item.description}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <span className="material-symbols-outlined text-lg">delete</span>
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-auto">
                        <p className="text-base font-bold text-primary dark:text-primary">
                          {item.priceDisplay || (typeof item.price === 'number' ? formatRupiah(item.price) : item.price)}
                        </p>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="flex items-center justify-center w-8 h-8 rounded-full bg-white dark:bg-white/10 border border-gray-200 dark:border-white/20 hover:bg-primary hover:text-white hover:border-primary transition-all"
                          >
                            <span className="material-symbols-outlined text-base">remove</span>
                          </button>
                          <span className="text-sm font-semibold w-8 text-center" style={{ color: '#000000' }}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="flex items-center justify-center w-8 h-8 rounded-full bg-white dark:bg-white/10 border border-gray-200 dark:border-white/20 hover:bg-primary hover:text-white hover:border-primary transition-all"
                          >
                            <span className="material-symbols-outlined text-base">add</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer with Total and Checkout */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-gray-200 dark:border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-base font-semibold text-gray-700 dark:text-gray-300">
                  Total:
                </span>
                <span className="text-2xl font-bold text-primary dark:text-primary">
                  {formatRupiah(calculateTotal())}
                </span>
              </div>
              <button className="w-full flex items-center justify-center rounded-full h-12 bg-primary hover:bg-primary/85 dark:bg-primary dark:hover:bg-primary/85 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95">
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartPopup;

