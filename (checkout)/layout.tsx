import { Container } from "@/shared/components/shared/container";
import { Header } from "@/shared/components/shared/header"

export const metadata = {
    title: 'Next Pizza | Корзина',
    description: 'Корзина',
};

export default function CheckoutLayout({children}: {children: React.ReactNode;}) {
    return (
        <main className="min-h-screen bg-[#F4F1EE]">
            <Container>
                <Header hasSearch={false} hasCart={false} className="border-g" />
                {children}
            </Container>
        </main>
    );
}