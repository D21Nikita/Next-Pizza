"use client"

import { cn } from "@/shared/lib/utils";
import React, { use } from "react";
import { Container } from "./container";
import Image from "next/image";
import { Button } from "../ui"; 
import { User } from "lucide-react";
import { SearchInput } from "./search-input";
import Link from "next/dist/client/link";
import { CartButton } from "./cart-button";
import {useSession, signIn} from 'next-auth/react';
import { ProfileButton } from "./profile-button";
import { AuthModal } from "..";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
    hasSearch?: boolean;
    hasCart?: boolean;
    className?: string;
}

export const Header: React.FC<Props> = ({ className, hasSearch = true, hasCart = true }) => {
    const router = useRouter();
    const [openAuthModal, setOpenAuthModal] = React.useState(false)

    const { data: session } = useSession();

    console.log(session, 999)
    

    const searchParams = useSearchParams();

    React.useEffect(() => {
        let toastMessage = '';

        if (searchParams.has('verified')) {
            toastMessage = 'Почта успешно подтверждена!';
        }

        if (toastMessage) {
            setTimeout(() => {
                router.replace('/');
                toast.success(toastMessage, {
                    duration: 3000,
                });
            }, 1000);
        }
    })


    return (
        <header className={cn("border-b", className)}>
            <Container className="flex items-center justify-between py-8">

                {/* левая часть */}
                <Link href="/">
                    <div className="flex items-center gap-4">
                        <Image src="/logo.png" alt="logo" width={35} height={35}></Image>
                        <div>
                            <h1 className="text-2xl uppercase font-black">Next Pizza</h1>
                            <p className="text-sm text-gray-400 leading-3">вкусней уже некуда</p>
                        </div>
                    </div>
                </Link>


                {hasSearch && (
                    <div className="mx-10 flex-1"><SearchInput /></div>
                )}

                {/* правая часть */}
                <div className="flex items-center gap-3">
                    <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />

                    <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} className={"flex items-center gap-3"}  />

                    {hasCart && <CartButton />}
                </div>
                
            </Container>
        </header>
    );
}