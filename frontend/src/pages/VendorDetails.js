import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function VendorDetails() {
    const navigate = useNavigate();
    
    const loggedInVendor = JSON.parse(localStorage.getItem('vendor'));
    const loggedInVendorId = loggedInVendor ? loggedInVendor.vendor_id : null;

    const handleLogout = () => {
        localStorage.removeItem('vendor'); // remove login info from local storage
        window.dispatchEvent(new Event("storage"));  // auto-updates navbar
        navigate('/login');          // redirect to login page
    };

    const { id } = useParams(); // Get vendor ID from URL
    const [vendor, setVendor] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [booth, setBooth] = useState(null);
    useEffect(() => {
        fetchVendorData();
    }, [id]);

    const fetchVendorData = async () => {
        try {
            setLoading(true);

            // Fetch vendor info
            const vendorResponse = await fetch(`http://localhost:3000/api/vendor/${id}`);
            if (!vendorResponse.ok) throw new Error('Failed to fetch vendor');
            const vendorData = await vendorResponse.json();

            // Fetch vendor products
            const productsResponse = await fetch(`http://localhost:3000/api/vendor/${id}/product`);
            if (!productsResponse.ok) throw new Error('Failed to fetch products');
            const productsData = await productsResponse.json();

            // Fetch booth info
            const boothResponse = await fetch(`http://localhost:3000/api/vendor/${id}/booth`);
            if (boothResponse.ok) {
                const boothData = await boothResponse.json();
                setBooth(boothData[0] || null);
            }


            setVendor(vendorData[0]);
            setProducts(productsData);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
                <div className="text-xl text-gray-600">Loading vendor details...</div>
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

    if (!vendor) {
        return (
            <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
                <div className="text-xl text-gray-600">Vendor not found</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Vendor Details</h1>
                    <p className="text-gray-600 mt-1">View vendor information and product inventory</p>
                </div>


                {loggedInVendorId && loggedInVendorId.toString() === id.toString() && (
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                    >
                        Logout
                    </button>
                )}

                {/* Vendor Information Card */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="flex justify-between items-start mb-4">
                        <h2 className="text-2xl font-semibold text-gray-800">{vendor.name || 'N/A'}</h2>
                        <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
                            Active
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <div>
                                <p className="text-sm text-gray-500">Email</p>
                                <p className="text-gray-900">{vendor.email || 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Phone</p>
                                <p className="text-gray-900">{vendor.phone || 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Booth Number</p>
                                <p className="text-gray-900 font-medium"> {booth ? `Booth #${booth.id}` : 'No booth assigned'}</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {/*<div>
                                <p className="text-sm text-gray-500">Member Since</p>
                                <p className="text-gray-900">
                                    {vendor.joinDate ? new Date(vendor.joinDate).toLocaleDateString() : 'N/A'}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Rating</p>
                                <p className="text-gray-900">{vendor.rating ? `${vendor.rating} / 5.0` : 'N/A'}</p>
                            </div>*/}
                            <div>
                                <p className="text-sm text-gray-500">Total Products</p>
                                <p className="text-gray-900">{products.length} items</p>
                            </div>
                        </div>
                    </div>

                    {vendor.description && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                            <p className="text-sm text-gray-500">Description</p>
                            <p className="text-gray-900 mt-1">{vendor.description}</p>
                        </div>
                    )}
                </div>

                {/* Products Section */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-800">Product Inventory</h2>
                        <span className="text-sm text-gray-600">{products.length} products</span>
                    </div>

                    {products.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">No products available</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Product Name</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Category</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Price</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Stock</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Condition</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {products.map((product) => (
                                    <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="py-3 px-4 text-gray-900">{product.name || 'N/A'}</td>
                                        <td className="py-3 px-4 text-gray-600">{product.category || 'N/A'}</td>
                                        <td className="py-3 px-4 text-gray-900 font-medium">
                                            ${product.price ? parseFloat(product.price).toFixed(2) : '0.00'}
                                        </td>
                                        <td className="py-3 px-4 text-gray-600">{product.count || 0}</td>
                                        <td className="py-3 px-4">
                                                <span className={`text-xs px-2 py-1 rounded-full ${
                                                    product.condition === 'Excellent' ? 'bg-green-100 text-green-800' :
                                                        product.condition === 'Good' ? 'bg-blue-100 text-blue-800' :
                                                            'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {product.condition || 'N/A'}
                                                </span>
                                        </td>
                                        <td className="py-3 px-4">
                                            <button
                                                onClick={() => window.location.href = `/product/${product.id}`}
                                                className="text-blue-600 hover:text-blue-800 text-sm"
                                            >
                                                View Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}