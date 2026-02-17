
import { atom, map } from 'nanostores';
import { persistentMap } from '@nanostores/persistent';

export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  slug: string;
}

export const isCartOpen = atom(false);

// Using a map for O(1) access by ID, but persistent
// The persistentMap stores strings, so we need to serialize the object if we want to store the whole item metadata
// Or we can use persistentAtom with JSON encode/decode for the whole cart state which is simpler for complex objects.
import { persistentAtom } from '@nanostores/persistent';

export const cartItems = persistentAtom<Record<string, CartItem>>('cart', {}, {
  encode: JSON.stringify,
  decode: JSON.parse,
});

export function addCartItem(item: CartItem) {
  const currentItems = cartItems.get();
  const existingItem = currentItems[item.id];

  if (existingItem) {
    cartItems.set({
      ...currentItems,
      [item.id]: {
        ...existingItem,
        quantity: existingItem.quantity + item.quantity,
      },
    });
  } else {
    cartItems.set({
      ...currentItems,
      [item.id]: item,
    });
  }
  isCartOpen.set(true);
}

export function removeCartItem(itemId: string) {
  const currentItems = cartItems.get();
  const { [itemId]: removed, ...rest } = currentItems;
  cartItems.set(rest);
}

export function updateCartItemQuantity(itemId: string, quantity: number) {
  const currentItems = cartItems.get();
  const existingItem = currentItems[itemId];

  if (existingItem) {
    if (quantity <= 0) {
        removeCartItem(itemId);
    } else {
        cartItems.set({
            ...currentItems,
            [itemId]: {
                ...existingItem,
                quantity,
            }
        });
    }
  }
}
