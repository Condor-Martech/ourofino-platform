import { useStore } from '@nanostores/react';
import { cartItems, isCartOpen, removeCartItem, updateCartItemQuantity, type CartItem } from '../../stores/cart';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function CartDrawer() {
  const $isCartOpen = useStore(isCartOpen);
  const $cartItems = useStore(cartItems);
  const items = Object.values($cartItems);

  // Calculate subtotal
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const closeCart = () => isCartOpen.set(false);

  return (
    <AnimatePresence>
      {$isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black z-40"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col"
          >
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="text-xl font-bold font-serif">Seu Carrinho</h2>
              <button 
                onClick={closeCart}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {items.length === 0 ? (
                <div className="text-center text-gray-500 py-10">
                  <p>Seu carrinho está vazio.</p>
                  <button 
                    onClick={closeCart}
                    className="mt-4 px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition"
                  >
                    Continuar Comprando
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 border-b pb-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden relative">
                        {item.image && (
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">{item.title}</h3>
                        <button 
                            onClick={() => removeCartItem(item.id)}
                            className="text-gray-400 hover:text-red-500"
                        >
                            ✕
                        </button>
                      </div>
                      <p className="text-gray-600">R$ {item.price.toFixed(2)}</p>
                      
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center border rounded-full">
                            <button 
                                onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                                className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full"
                            >
                                -
                            </button>
                            <span className="text-sm w-4 text-center">{item.quantity}</span>
                            <button 
                                onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full"
                            >
                                +
                            </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t p-4 space-y-4 bg-gray-50">
                <div className="flex justify-between text-lg font-bold">
                  <span>Subtotal</span>
                  <span>R$ {subtotal.toFixed(2)}</span>
                </div>
                <p className="text-xs text-gray-500 text-center">Frete e impostos calculados no checkout.</p>
                <button className="w-full py-4 bg-black text-white font-bold rounded-full hover:scale-[1.02] active:scale-[0.98] transition">
                  Finalizar Compra
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
