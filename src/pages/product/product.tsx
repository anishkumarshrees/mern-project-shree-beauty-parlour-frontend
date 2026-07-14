import { useEffect, useMemo, useState } from "react";
import Navbar from "../../globals/components/Navbar";
import Card from "./component/Card";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchProducts } from "../../store/productSlice";
import { API } from "../../http";

interface ICategory {
  id: string;
  categoryName: string;
}

function Product() {
  const dispatch = useAppDispatch();

  const { products } = useAppSelector((store) => store.product);

  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    dispatch(fetchProducts());

    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await API.get("/category");
      setCategories(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.productName
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        product.productDescription
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" ||
        product.categoryId === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, selectedCategory]);

  return (
    <>
      <Navbar />

      <div className="bg-pink-50 py-10">

        <div className="mx-auto max-w-7xl px-5">

          <h1 className="text-center text-4xl font-bold text-pink-600">
            Product Available in Our Parlour
          </h1>

          <p className="mt-2 text-center text-gray-500">
            Find your favourite beauty products
          </p>

          {/* Search */}

          <div className="mt-8 flex justify-center">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full max-w-xl rounded-full border border-pink-300 bg-white px-6 py-3 shadow outline-none focus:border-pink-500"
            />
            <p>Search: {search}</p>
          </div>

          {/* Categories */}

          <div className="mt-8 flex flex-wrap justify-center gap-3">

            <button
              onClick={() => setSelectedCategory("All")}
              className={`rounded-full px-5 py-2 transition ${
                selectedCategory === "All"
                  ? "bg-pink-600 text-white"
                  : "bg-white text-gray-700 shadow"
              }`}
            >
              All
            </button>

            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`rounded-full px-5 py-2 transition ${
                  selectedCategory === category.id
                    ? "bg-pink-600 text-white"
                    : "bg-white text-gray-700 shadow"
                }`}
              >
                {category.categoryName}
              </button>
            ))}

          </div>

          {/* Product Count */}

          <div className="mt-8 text-center text-gray-500">
            Showing {filteredProducts.length} Product
            {filteredProducts.length !== 1 ? "s" : ""}
          </div>

          {/* Products */}

          <section className="mt-10 grid grid-cols-1 justify-items-center gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  product={product}
                />
              ))
            ) : (
              <div className="col-span-full py-20 text-center text-2xl font-semibold text-gray-500">
                No products found.
              </div>
            )}

          </section>

        </div>

      </div>
    </>
  );
}

export default Product;