import React from "react";

interface Props {
    totalAmount: number;
    orderId: number;
    paymentUrl: string;
}

export const PayOrderTemplate: React.FC<Props> = ({totalAmount, orderId, paymentUrl}) => (
    <div>
        <h1>Заказ # {orderId}</h1>


        <p>Оплатить заказ на сумму {totalAmount} ₽. Перейдите <a href={paymentUrl}>по этой ссылке</a> для оплаты заказа.</p>
    </div>
)
