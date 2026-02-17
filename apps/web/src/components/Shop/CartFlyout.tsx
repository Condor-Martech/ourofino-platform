import { useStore } from '@nanostores/react';
import { cartItems, isCartOpen, removeCartItem, updateCartItemQuantity, type CartItem } from '../../stores/cart';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartFlyout() {
  const $cartItems = useStore(cartItems);
  const $isCartOpen = useStore(isCartOpen);
  const [isClient, setIsClient] = useState(false);
  const [shippingZip, setShippingZip] = useState('');
  const [shippingCost, setShippingCost] = useState<number | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const calculateShipping = () => {
      if (shippingZip.length >= 8) {
          // Mock calculation: fixed cost if zip is valid length
          setShippingCost(15.90);
      } else {
          setShippingCost(null);
      }
  };

  if (!isClient) return null;

  const items = Object.values($cartItems) as CartItem[];
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const count = items.reduce((acc, item) => acc + item.quantity, 0);
  const total = subtotal + (shippingCost || 0);

  return (
    <>
      <button
        onClick={() => isCartOpen.set(true)}
        className="relative inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
      >
        <span className="sr-only">Abrir carrinho</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
        {count > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
            {count}
          </span>
        )}
      </button>

      <AnimatePresence>
        {$isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => isCartOpen.set(false)}
              className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="fixed inset-y-0 right-0 z-50 h-full w-full border-l bg-background p-6 shadow-lg sm:max-w-sm"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-foreground">Carrinho ({count})</h2>
                  <button
                    onClick={() => isCartOpen.set(false)}
                    className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                    <span className="sr-only">Fechar</span>
                  </button>
                </div>

                <div className="mt-8 flex-1 overflow-y-auto">
                  {items.length === 0 ? (
                    <p className="text-center text-muted-foreground">Seu carrinho está vazio.</p>
                  ) : (
                    <ul className="divide-y divide-border">
                      {items.map((item) => (
                        <li key={item.id} className="flex py-6">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-border">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-foreground">
                                <h3>
                                  <a href={`/shop/${item.slug}`}>{item.title}</a>
                                </h3>
                                <p className="ml-4">
                                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price * item.quantity)}
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                                  className="h-6 w-6 rounded-full border border-input flex items-center justify-center hover:bg-accent"
                                >
                                  -
                                </button>
                                <span className="text-muted-foreground">Qtd {item.quantity}</span>
                                <button
                                  onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                                  className="h-6 w-6 rounded-full border border-input flex items-center justify-center hover:bg-accent"
                                >
                                  +
                                </button>
                              </div>

                              <button
                                type="button"
                                onClick={() => removeCartItem(item.id)}
                                className="font-medium text-destructive hover:text-destructive/90"
                              >
                                Remover
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="border-t border-border py-6 mt-auto space-y-4">
                  
                  {/* Shipping Calculator */}
                  <div className="bg-gray-50 p-3 rounded-md">
                      <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">Calcular Frete</label>
                      <div className="flex gap-2">
                          <input 
                            type="text" 
                            id="zip" 
                            placeholder="CEP" 
                            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border"
                            value={shippingZip}
                            onChange={(e) => setShippingZip(e.target.value)}
                          />
                          <button 
                            onClick={calculateShipping}
                            className="bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                          >
                              OK
                          </button>
                      </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-base font-medium text-foreground">
                        <p>Subtotal</p>
                        <p>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(subtotal)}</p>
                    </div>
                    {shippingCost !== null && (
                        <div className="flex justify-between text-sm text-foreground">
                            <p>Frete</p>
                            <p>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(shippingCost)}</p>
                        </div>
                    )}
                    <div className="flex justify-between text-lg font-bold text-foreground pt-2 border-t">
                        <p>Total</p>
                        <p>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total)}</p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <a
                      href="#"
                      className="flex items-center justify-center rounded-md border border-transparent bg-primary px-6 py-3 text-base font-medium text-primary-foreground shadow-sm hover:bg-primary/90"
                    >
                      Checkout (Em breve)
                    </a>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-muted-foreground">
                    <p>
                      ou{' '}
                      <button
                        type="button"
                        className="font-medium text-primary hover:text-primary/80"
                        onClick={() => isCartOpen.set(false)}
                      >
                        Continuar Comprando
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
