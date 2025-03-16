import { ShooseProductModal } from '@/shared/components/shared';
import { prisma } from '@/prisma/prisma-client';
import { notFound } from 'next/navigation';

export default async function ProductModalPage({ params }: { params: { id: string } }) {
  const product = await prisma.product.findFirst({
    where: {
      id: Number(params.id),
    },
    include: {
      ingredients: true,
      items: true,
    },
  });

  if (!product) {
    notFound();
  }

  return <ShooseProductModal product={product} />
}
