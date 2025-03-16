import { PizzaSize } from "@/shared/constants/pizza";
import React from "react";
import { WhiteBlock } from "../white-block";
import { CheckoutItem } from "../checkout-item";
import { getCartItemDetails } from "@/shared/lib/get-cart-item-details";
import { PizzaType } from "@/shared/constants/pizza";
import { CartStateItem } from "@/shared/lib/get-cart-details";
import { CheckoutItemSkeleton, Skeleton } from "../..";

interface Props {
    className?: string;
    items: CartStateItem[];
    onClickCountButton: (id: number, quantity: number, type: 'plus' | 'minus') => void;
    onClickRemove: (id: number) => void;
    loading?: boolean;
}

export const CheckoutCart: React.FC<Props> = ({ className, items, onClickCountButton, onClickRemove, loading }) => {
    return (
        <WhiteBlock title="1. Корзина" className={className}> 

            <div className="flex flex-col gap-5">

                {loading ? 
                    [...Array(4)].map((_, index) => 
                        <CheckoutItemSkeleton key={index} />
                    )
                :
                    items.map((item) => (
                        <CheckoutItem
                        key={item.id}
                        id={item.id}
                        imageUrl={item.imageUrl}
                        details={getCartItemDetails(
                            item.ingredients,
                            item.pizzaType as PizzaType,
                            item.pizzaSize as PizzaSize
                        )}
                        name={item.name}
                        price={item.price}
                        quantity={item.quantity}
                        disabled={item.disabled}
                        onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
                        onClickRemove={() => onClickRemove(item.id)}
                    />
                ))}  
            </div>     
        </WhiteBlock>
    )
};
