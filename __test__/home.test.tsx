import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Home from "@/app/page";
import getProducts from "../actions/getProducts";

jest.mock("../actions/getProducts", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("Home Component Tests", () => {
  it("should display products when available", async () => {
    const mockProducts = [
      {
        id: "product1",
        name: "Product 1",
        description: "Description 1",
        category: "Category 1",
        brand: "Brand 1",
        price: 100.0,
        inStock: true,
        images: [{ color: "red", colorCode: "#ff0000", image: "image-url-1" }],
        reviews: [],
      },
    ];
    (getProducts as jest.Mock).mockResolvedValue(mockProducts);

    await waitFor(async () => {
      render(<Home searchParams={{}} />);
      mockProducts.forEach(async (product) => {
        expect(await screen.findByText(product.name)).toBeInTheDocument();
      });
    });
  });

  it("should display NullData component when no products are found", async () => {
    (getProducts as jest.Mock).mockResolvedValue([]);

    await waitFor(async () => {
      render(<Home searchParams={{}} />);
      expect(
        await screen.findByText("Oops! No products found")
      ).toBeInTheDocument();
    });
  });
});
