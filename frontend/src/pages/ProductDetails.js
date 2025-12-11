import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function ProductDetails() {
    const { id } = useParams(); // Get product ID from URL
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [vendor, setVendor] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [booth, setBooth] = useState(null);
    useEffect(() => {
        fetchProductData();
    }, [id]);

    const fetchProductData = async () => {
        try {
            setLoading(true);

            // Fetch product info
            const productResponse = await fetch(`https://db-flea-market-app.onrender.com/api/product/${id}`);
            if (!productResponse.ok) throw new Error('Failed to fetch product');
            const productData = await productResponse.json();
            const prod = productData[0];

            if (!prod) {
                throw new Error('Product not found');
            }

            setProduct(prod);

            // Fetch vendor info
            if (prod.vid) {
                const vendorResponse = await fetch(`https://db-flea-market-app.onrender.com/api/vendor/${prod.vid}`);
                if (vendorResponse.ok) {
                    const vendorData = await vendorResponse.json();
                    setVendor(vendorData[0]);

                    // Fetch related products from same vendor
                    const relatedResponse = await fetch(`https://db-flea-market-app.onrender.com/api/vendor/${prod.vid}/product`);
                    if (relatedResponse.ok) {
                        const relatedData = await relatedResponse.json();
                        // Filter out current product and limit to 4
                        const filtered = relatedData.filter(p => p.id !== parseInt(id)).slice(0, 4);
                        setRelatedProducts(filtered);
                    }
                }
                // Fetch booth info
                const boothResponse = await fetch(`https://db-flea-market-app.onrender.com/api/vendor/${prod.vid}/booth`);
                if (boothResponse.ok) {
                    const boothData = await boothResponse.json();
                    setBooth(boothData[0] || null);
                }
            }

            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
                <div className="text-xl text-gray-600">Loading product details...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
                <div className="text-xl text-red-600">Error: {error}</div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
                <div className="text-xl text-gray-600">Product not found</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Breadcrumb */}
                <div className="mb-6">
                    <div className="flex items-center text-sm text-gray-500 space-x-2">
                        <span className="hover:text-gray-700 cursor-pointer" onClick={() => navigate('/')}>Home</span>
                        <span>/</span>
                        <span className="hover:text-gray-700 cursor-pointer">Products</span>
                        <span>/</span>
                        <span className="text-gray-900">{product.name}</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    {/* Product Image Section */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm p-8">
                            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                                <span className="text-8xl">📦</span>
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                                <div className="aspect-square bg-gray-100 rounded flex items-center justify-center cursor-pointer hover:bg-gray-200">
                                    <span className="text-2xl">📦</span>
                                </div>
                                <div className="aspect-square bg-gray-100 rounded flex items-center justify-center cursor-pointer hover:bg-gray-200">
                                    <span className="text-2xl">📦</span>
                                </div>
                                <div className="aspect-square bg-gray-100 rounded flex items-center justify-center cursor-pointer hover:bg-gray-200">
                                    <span className="text-2xl">📦</span>
                                </div>
                                <div className="aspect-square bg-gray-100 rounded flex items-center justify-center cursor-pointer hover:bg-gray-200">
                                    <span className="text-2xl">📦</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Information */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                                    <p className="text-gray-600">ID: {product.id}</p>
                                </div>
                            </div>

                            <div className="flex items-baseline space-x-4 mb-6">
                                <span className="text-4xl font-bold text-gray-900">
                                    ${product.price ? parseFloat(product.price).toFixed(2) : '0.00'}
                                </span>
                                <span className={`text-sm ${product.count > 5 ? 'text-green-600' : 'text-orange-600'}`}>
                                    {product.count > 0 ? `${product.count} in stock` : 'Out of stock'}
                                </span>
                            </div>

                            <div className="border-t border-gray-200 pt-6 mb-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-3">Description</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    {product.description || 'No description available.'}
                                </p>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Additional Information */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Vendor Information */}
                    <div className="lg:col-span-1 bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Vendor</h2>
                        {vendor ? (
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-gray-500">Name</p>
                                    <p className="text-gray-900 font-medium">{vendor.name}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Booth Number</p>
                                    <p className="text-gray-900 font-medium">{booth ? `Booth #${booth.id}` : 'No booth assigned'}</p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">Email</p>
                                    <p className="text-gray-900 font-medium">{vendor.email || 'N/A'}</p>
                                </div>
                                <button
                                    onClick={() => navigate(`/vendor/${vendor.id}`)}
                                    className="w-full mt-4 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 font-medium"
                                >
                                    View All Products
                                </button>
                            </div>
                        ) : (
                            <p className="text-gray-500">Vendor information not available</p>
                        )}
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Related Products</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {relatedProducts.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => navigate(`/product/${item.id}`)}
                                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md cursor-pointer transition"
                                >
                                    <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                                        <span className="text-5xl">📦</span>
                                    </div>
                                    <h3 className="text-sm font-medium text-gray-900 mb-1">{item.name}</h3>
                                    <p className="text-lg font-bold text-gray-900">
                                        ${item.price ? parseFloat(item.price).toFixed(2) : '0.00'}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}