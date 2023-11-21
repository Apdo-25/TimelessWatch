export const product = {
  id: "123",
  name: "Apple Watch",
  price: 1000,
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris convallis imperdiet scelerisque. Etiam suscipit est nec massa consectetur feugiat. Proin sollicitudin cursus diam vitae tincidunt. Vivamus molestie feugiat enim. Sed suscipit eget ligula vel vehicula. Nullam interdum felis vitae nisi tristique viverra. Aenean tristique augue vitae fermentum euismod. Suspendisse pulvi",
  category: "Watch",
  brand: "Apple",
  inStock: true,
  isOnSale: true,
  images: [
    {
      color: "gray",
      colorCode: "#d1d5db",
      image: "/images/apple.jpg",
    },
    {
      color: "black",
      colorCode: "#111827",
      image: "/images/apple.jpg",
    },
    {
      color: "white",
      colorCode: "#ffffff",
      image: "/images/apple.jpg",
    },
  ],
  reviews: [
    {
      id: "1",
      userId: "1",
      productId: "1",
      rating: 3,
      comment: "best watch eveeer!!",
      createdDate: "2023-07-06T06:08:33.067Z",
      user: {
        id: "1",
        name: "king kong",
        email: "kingkong@gmail.com",
        emailVerified: null,
        image: null,
        hashedPassword: null,
        createdAt: "2023-07-06T06:08:33.067Z",
        updatedAt: "2023-07-06T06:08:33.067Z",
        role: "Admin",
      },
    },
  ],
};
