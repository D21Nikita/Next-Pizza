"use client";

import { FormProvider, useForm } from "react-hook-form";
import { useCart } from "@/shared/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
    CheckoutCart,
    CheckoutPersonalForm,
    CheckoutAdressForm,
    CheckoutSidebar,
    Container,
    Title } from "@/shared/components";
import { checkoutFormSchema, CheckoutFormSchema } from "@/shared/constants";
import { createOrder } from "@/app/actions";
import toast from "react-hot-toast";
import React from "react";

const VAT = 15;
const DELIVERY_PRICE = 250;

export default function CheckoutPage() {
    const [submitting, setSubmitting] = React.useState(false);

    const { totalAmount, items, updateItemQuantity, removeCartItem, loading } = useCart();

    const form = useForm<CheckoutFormSchema>({
        resolver: zodResolver(checkoutFormSchema),
        defaultValues: {
            email: "",
            firstName: "",
            lastName: "",
            phone: "",
            address: "",
            comment: "",
        },
    })

    const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
        const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
        updateItemQuantity(id, newQuantity);
    }


    const onSubmit = async (data: CheckoutFormSchema) => {
        try {
            setSubmitting(true);

            const url = await createOrder(data);

            toast.error('Заказ успешно оформлен! 📝 Переход на оплату...', {
                icon: '✅',
              });

              if (url) {
                location.href = url;
              }

        } catch (err) {
            console.log(err);
            setSubmitting(false);
            toast.error('Не удалось создать заказ', {
                icon: '❌',
            });
        }
    }
    
    return (
        <Container className="mt-5">
            <Title text="Оформление заказа" className="font-extrabold mb-8 text-[36px]" /> 

            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex gap-10">
                        {/* Левая часть */}
                        <div className="flex flex-col gap-10 flex-1 mb-20">

                        <CheckoutCart 
                            onClickCountButton={onClickCountButton}
                            onClickRemove={removeCartItem}
                            items={items} 
                            loading={loading}
                        />

                        <CheckoutPersonalForm className={loading ? 'opacity-40 pointer-events-none' : undefined} />

                        <CheckoutAdressForm className={loading ? 'opacity-40 pointer-events-none' : undefined} />

                        </div>

                        {/* Правая часть */}
                        <div className="w-[450px]">
                            <CheckoutSidebar totalAmount={totalAmount} loading={submitting || loading} />
                        </div>
                    </div>
                </form>
            </FormProvider>
        </Container>
    )
}
