import prisma from "@/lib/prismadb";

export default async function getUsers() {
  try {
    const users = prisma?.user.findMany();
    return users;
  } catch (error) {
    console.log(error);
    return null;
  }
}
