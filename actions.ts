'use server'

import { prisma } from "@/prisma/prisma-client";
import { PayOrderTemplate } from "@/shared/components/shared";
import { VerificationUserTemplate } from "@/shared/components/shared/email-temapltes/verification-user";
import { CheckoutFormSchema } from "@/shared/constants";
import { sendEmail } from "@/shared/lib";
import { getUserSession } from "@/shared/lib/get-user-session";
import { OrderStatus, Prisma } from "@prisma/client";
import { hashSync } from "bcrypt";
import { cookies } from "next/headers";
import React from 'react';


export async function createOrder(data: CheckoutFormSchema) {
    try {
        const cookieStore = await cookies();
        const cartToken = cookieStore.get('cartToken')?.value;

        if (!cartToken) {
            throw new Error('Cart token not found');
        }

        const userCart = await prisma.cart.findFirst({
            include: {
                user: true,
                items: {
                  include: {
                    ingredients: true,
                    productItem: {
                      include: {
                        product: true,
                      },
                    },
                  },
                },
              },
              where: {
                token: cartToken,
              },
        });

        if (!userCart) {
            throw new Error('Cart not found');
        }

        if (userCart?.totalAmount === 0) {
            throw new Error('Cart is empty');
        }

        const order = await prisma.order.create({
            data: {
              token: cartToken,
              fullName: data.firstName + ' ' + data.lastName,
              email: data.email,
              phone: data.phone,
              address: data.address,
              comment: data.comment,
              totalAmount: userCart.totalAmount,
              status: OrderStatus.PENDING,
              items: JSON.stringify(userCart.items),
            },
          });

        await prisma.cart.update({
            where: {
                id: userCart.id,
            },
            data: {
                totalAmount: 0,
            }
        });

        await prisma.cartItem.deleteMany({
            where: {
                cartId: userCart.id,
            },
        });

        // Сделать создание 

        await sendEmail(data.email, 'Next Pizza / Оплатите заказ #' + order.id, 
            React.createElement(PayOrderTemplate, {
                orderId: order.id,
                totalAmount: order.totalAmount,
                paymentUrl: "https://resend.com/"
            })
        );

        return 'https://resend.com/';

    } catch (err) {
        console.log('Error creating order', err);
        throw new Error('Failed to create order: ' + (err instanceof Error ? err.message : String(err)));
    }
}
 

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
  try {
    const currentUser = await getUserSession();

    if (!currentUser) {
      throw new Error('Пользователь не найден');
    }

    const findUser = await prisma.user.findFirst({
      where: {
        id: Number(currentUser.id),
      },
    })

    await prisma.user.update({
      where: {
        id: Number(currentUser.id),
      },
      data: {
        fullName: body.fullName,
        email: body.email,
        password: body.password ? hashSync(body.password as string, 10) : findUser?.password,
      },
    });
      
  } catch (err) {
    console.log('Error updating user info', err);
    throw err;
  }
}

export async function registerUser(body: Prisma.UserCreateInput) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (user) {
      if (!user.verified) {
        throw new Error('Почта не подтверждена');
      }

      throw new Error('Пользователь уже существует');
    }

    const createdUser = await prisma.user.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        password: hashSync(body.password, 10),
      },
    });

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.verificationCode.create({
      data: {
        code,
        userId: createdUser.id,
      },
    });

    await sendEmail(
      createdUser.email,
      'Next Pizza / Подтвердите вашу почту',
      React.createElement(VerificationUserTemplate, { code })
    )

  } catch (error) {
    console.log('Error [CREATE_USER]', error);
    throw error;
  }
}