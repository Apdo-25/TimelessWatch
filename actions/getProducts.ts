import prisma from "@/lib/prismadb";

export default async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      include: {
        reviews: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return products;
  } catch (error: any) {
    throw new Error(error);
  }
}
