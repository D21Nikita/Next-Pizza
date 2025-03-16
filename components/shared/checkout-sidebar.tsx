"use client";

import React from 'react';
import { WhiteBlock } from './white-block';
import { Button } from '../ui/button';
import { ArrowRight, Package, Percent, Truck } from 'lucide-react';
import { CheckoutItemDetails } from './checkout-item-details';
import { Skeleton } from '../ui';

const VAT = 15;
const DELIVERY_PRICE = 250;

interface Props {
    totalAmount: number;
    loading?: boolean;
    submitting?: boolean;
    className?: string;
}

export const CheckoutSidebar: React.FC<Props> = ({className, totalAmount, loading}) => {

    const vatPrice = (totalAmount * VAT) / 100;
    const totalPrice = totalAmount + vatPrice + DELIVERY_PRICE;

    return (
        <WhiteBlock className="p-5 sticky top-4"> 
                        <div className="flex flex-col gap-1">
                            <span className="text-xl">Итого:</span>
                            {
                                loading ? (<Skeleton className="w-48 h-10" />

                                ): (
                                    <span className="h-11 text-[34px] font-extrabold">{totalPrice} ₽</span>
                                )
                            }
                        </div>

                        <CheckoutItemDetails
                            title={
                                <div className="flex items-center">
                                    <Package size={20} className="mr-2 text-gray-400" />
                                    Стоимость товаров:
                                </div>
                            }
                            value={loading ? <Skeleton className="w-16 h-6 rounded-[6px]" /> : `${totalAmount} ₽`} 
                        />

                        <CheckoutItemDetails
                            title={
                                <div className="flex items-center">
                                    <Percent size={20} className="mr-2 text-gray-400" />
                                    Налоги:
                                </div>
                            }
                            value={loading ? <Skeleton className="w-16 h-6 rounded-[6px]" /> : `${vatPrice} ₽`} 
                        />

                        <CheckoutItemDetails
                            title={
                                <div className="flex items-center">
                                    <Truck size={20} className="mr-2 text-gray-400" />
                                    Доставка:
                                </div>
                            }
                            value={loading ? <Skeleton className="w-16 h-6 rounded-[6px]" /> : `${DELIVERY_PRICE} ₽`} 
                        />

                        <Button loading={loading} type="submit" className="w-full h-14 rounded-2xl mt-6 text-base font-bold">
                            Перейти к оплате
                            <ArrowRight className="w-5 ml-2" />
                        </Button>
                    </WhiteBlock>
    )
        
}
