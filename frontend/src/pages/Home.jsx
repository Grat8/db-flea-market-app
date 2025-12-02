import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchProducts();
  }, [page, limit, search]);

  const fetchProducts = async () => {
    try {
      // fetch paginated products from the API endpoint
      const res = await fetch(`http://localhost:3000/api/product?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`);
      const data = await res.json();
      // server returns { products, total }
      setProducts(data.products || []);
      setTotal(data.total || 0);
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };

  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* ---------------- HEADER ---------------- */}
      <div className="text-center mt-10">
        <h2 className="text-2xl font-semibold">
          Buy & Sell Pre-Owned Items Easily
        </h2>
      </div>


      {/* ---------------- SEARCH BAR ---------------- */}
      <div className="flex justify-center mt-6">
        <div className="flex items-center w-1/2 bg-white shadow rounded-full px-4 py-2">
          <input
            type="text"
            placeholder="Search for a Product"
            className="flex-1 outline-none"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
          <span className="text-gray-500 text-xl">&#128269;</span>
        </div>
      </div>


      {/* ---------------- PRODUCT LIST ---------------- */}
      <div className="mt-10 px-10">
        <h3 className="text-center text-xl font-semibold mb-6">Listing of Products</h3>

        {/* Pagination controls */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="px-3 py-1 bg-white border rounded disabled:opacity-50"
            >
              Prev
            </button>

            <span className="px-2">Page {page} of {totalPages}</span>

            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="px-3 py-1 bg-white border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-sm">Per page:</label>
            <select
              value={limit}
              onChange={(e) => { setLimit(Number(e.target.value)); setPage(1); }}
              className="border rounded px-2 py-1"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
            </select>
          </div>
        </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {products.map((p) => (
                  <div
                      key={p.id}
                      className="flex flex-col bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
                  >
                      {/* Product name links to product details */}
                      <Link to={`/product/${p.id}`}>
                          <h4 className="font-semibold text-lg hover:text-blue-600 cursor-pointer">
                              {p.name}
                          </h4>
                      </Link>

                      <div className="mt-2">
                          <p className="text-gray-500 mb-1"> {p.description}</p>
                          <p> Price: ${p.price}</p>
                          <p>Qty: {p.count || 0}</p>
                      </div>

                      <div className="flex flex-col space-y-2 mt-4 grow justify-end">
                          {/* View Product Details Button */}
                          <Link
                              to={`/product/${p.id}`}
                              className="text-center bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                          >
                              View Product
                          </Link>

                          {/* Vendor Details Button - Secondary */}
                          <Link
                              to={`/vendor/${p.vid}`}
                              className="text-center bg-white text-blue-500 border border-blue-500 py-2 rounded-lg hover:bg-blue-50"
                          >
                              View Vendor
                          </Link>
                      </div>
                  </div>
              ))}
          </div>
      </div>

      <footer className="text-center text-sm text-gray-600 pb-4 mt-32">
        Open 7am - 4pm Everyday | © Virginia Tech CS 5614
      </footer>
    </div>
  );
}
