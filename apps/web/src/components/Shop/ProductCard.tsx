import { type FunctionComponent } from 'react';
import { addCartItem } from '../../stores/cart';

type ProductCardProps = {
  id: string;
  name: string;
  price: number;
  imageSrc: string;
  slug: string;
};

export const ProductCard: FunctionComponent<ProductCardProps> = ({ id, name, price, imageSrc, slug }) => {
  return (
    <div className="group relative overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md">
      <a href={`/products/${slug}`} className="block aspect-square overflow-hidden bg-muted">
        <img
          src={imageSrc}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </a>
      <div className="p-4">
        <h3 className="text-lg font-semibold leading-none tracking-tight">
          <a href={`/products/${slug}`} className="hover:underline">
            {name}
          </a>
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)}
        </p>
        <button
          onClick={() => addCartItem({ id, name, price, imageSrc })}
          className="mt-4 w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
};
