'use client';

import React from 'react';
import { cn } from '@/shared/lib/utils';
import { X } from 'lucide-react';
import { CartItemProps } from './cart-item-details/cart-item-details.types';
import * as CartItemDetails from './cart-item-details';
import { CountButtonProps } from './count-button';
import { Ingredient } from '@prisma/client';

interface Props extends CartItemProps {
  onClickRemove: () => void;
  ingredients?: Ingredient[];
  onClickCountButton: CountButtonProps['onClick'];
  className?: string;
  disabled?: boolean;
}

export const CheckoutItem: React.FC<Props> = ({
  name,
  price,
  imageUrl,
  quantity,
  details,
  className,
  disabled,
  onClickCountButton,
  onClickRemove,
}) => {
  return (
    <div className={cn('flex items-center justify-between mb-5 mt-5', 
      {
        'opacity-50 pointer-events-none': disabled,
      }, 
      className)}>
      <div className="flex items-center gap-5 flex-1">
        <CartItemDetails.Image src={imageUrl} />
        <CartItemDetails.Info name={name} details={details} />
      </div>

      <CartItemDetails.Price value={price} />

      <div className="flex items-center gap-5 ml-8">
        <CartItemDetails.CountButton onClick={onClickCountButton} value={quantity} />
        <button type='button' onClick={onClickRemove}>
          <X className="text-gray-400 cursor-pointer hover:text-gray-600" size={20} />
        </button>
      </div>
    </div>
  );
};
