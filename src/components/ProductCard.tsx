import { useState } from 'react';
import { Heart, MapPin, ShieldCheck } from 'lucide-react';
import type { Product } from '../data/mockData';

interface ProductCardProps {
  product: Product;
  layout?: 'grid' | 'list';
}

export default function ProductCard({ product, layout = 'grid' }: ProductCardProps) {
  const [liked, setLiked] = useState(product.liked);
  const [imgError, setImgError] = useState(false);

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  if (layout === 'list') {
    return (
      <div className="flex gap-3 bg-white dark:bg-brand-dark-card rounded-2xl p-3 card-shadow dark:card-shadow-dark animate-fade-in">
        <div className="relative w-24 h-28 rounded-xl overflow-hidden flex-shrink-0 bg-neutral-100 dark:bg-brand-dark-border">
          <img
            src={imgError ? 'https://picsum.photos/seed/placeholder/200/250' : product.image}
            alt={product.title}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
          <span className={`absolute top-1.5 left-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full ${
            product.condition === 'thrift'
              ? 'bg-brand-coral text-white'
              : 'bg-brand-violet text-white'
          }`}>
            {product.condition === 'thrift' ? 'THRIFT' : 'NEW'}
          </span>
        </div>
        <div className="flex-1 min-w-0 py-0.5">
          <p className="text-xs text-neutral-400 dark:text-neutral-500 truncate">{product.brand}</p>
          <h3 className="font-display font-semibold text-sm text-neutral-900 dark:text-white line-clamp-2 leading-snug mt-0.5">{product.title}</h3>
          <div className="flex items-center gap-1 mt-1">
            <span className="font-display font-bold text-brand-violet dark:text-brand-violet-light">
              ₦{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-neutral-400 line-through">
                ₦{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 mt-1.5">
            <MapPin className="w-3 h-3 text-neutral-400" />
            <span className="text-[11px] text-neutral-400">{product.location}</span>
            {product.verified && (
              <ShieldCheck className="w-3 h-3 text-brand-violet ml-1" />
            )}
          </div>
        </div>
        <button
          onClick={() => setLiked(l => !l)}
          className="self-start p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-brand-dark-border transition-colors"
        >
          <Heart className={`w-4 h-4 ${liked ? 'fill-brand-coral text-brand-coral' : 'text-neutral-400'}`} />
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-brand-dark-card rounded-2xl overflow-hidden card-shadow dark:card-shadow-dark animate-fade-in group">
      {/* Image */}
      <div className="relative aspect-[3/4] bg-neutral-100 dark:bg-brand-dark-border overflow-hidden">
        <img
          src={imgError ? 'https://picsum.photos/seed/placeholder/400/500' : product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={() => setImgError(true)}
        />

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
            product.condition === 'thrift'
              ? 'bg-brand-coral text-white'
              : 'bg-brand-violet text-white'
          }`}>
            {product.condition === 'thrift' ? 'THRIFT' : 'NEW'}
          </span>
          {discount && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-gold text-white">
              -{discount}%
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={() => setLiked(l => !l)}
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 dark:bg-brand-dark-card/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
        >
          <Heart className={`w-4 h-4 ${liked ? 'fill-brand-coral text-brand-coral' : 'text-neutral-500'}`} />
        </button>

        {/* Hot badge */}
        {product.badges?.[0] && (
          <div className="absolute bottom-2.5 left-2.5">
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full glass-card text-white">
              {product.badges[0]}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3">
        <div className="flex items-start justify-between gap-1">
          <div className="min-w-0">
            <p className="text-[11px] text-neutral-400 dark:text-neutral-500 truncate">{product.brand}</p>
            <h3 className="font-display font-semibold text-sm text-neutral-900 dark:text-white truncate">
              {product.title}
            </h3>
          </div>
          <span className="text-xs text-neutral-400 dark:text-neutral-500 flex-shrink-0 mt-0.5">{product.size}</span>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div>
            <span className="font-display font-bold text-brand-violet dark:text-brand-violet-light">
              ₦{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-neutral-400 line-through ml-1">
                ₦{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          {product.verified && (
            <ShieldCheck className="w-4 h-4 text-brand-violet" />
          )}
        </div>

        {/* Seller */}
        <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-neutral-100 dark:border-brand-dark-border">
          <img
            src={product.sellerAvatar}
            alt={product.seller}
            className="w-5 h-5 rounded-full object-cover"
          />
          <span className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate">@{product.seller}</span>
          <div className="flex items-center gap-0.5 ml-auto">
            <MapPin className="w-3 h-3 text-neutral-400" />
            <span className="text-[10px] text-neutral-400">{product.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
