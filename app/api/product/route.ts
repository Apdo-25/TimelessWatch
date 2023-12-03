import prisma from "@/lib/prismadb";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import formidable from "formidable";
import firebaseApp from "@/lib/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "Admin") {
    return NextResponse.error();
  }

  const body = await request.json();
  const { name, price, description, brand, category, inStock, images } = body;
  const product = await prisma.product.create({
    data: {
      name,
      price: parseFloat(price),
      description,
      brand,
      category,
      inStock,
      images,
    },
  });

  return NextResponse.json(product);
}

export async function PUT(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "Admin") {
    return NextResponse.error();
  }
  const body = await request.json();
  const { id, name, price, description, brand, category, inStock, images } =
    body;
  const product = await prisma.product.update({
    where: { id },
    data: {
      name,
      price: parseFloat(price),
      description,
      brand,
      category,
      inStock,
      images,
    },
  });

  return NextResponse.json(product);
}

export async function DELETE(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "Admin") {
    return NextResponse.error();
  }
  const body = await request.json();
  const { id } = body;
  const product = await prisma.product.delete({
    where: { id },
  });

  return NextResponse.json(product);
}
