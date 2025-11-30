import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function VendorDetails() {
    const navigate = useNavigate();
    const { id } = useParams(); // Get vendor ID from URL
    
    const loggedInVendor = JSON.parse(localStorage.getItem('vendor'));
    const loggedInVendorId = loggedInVendor ? loggedInVendor.vendor_id : null;
    const isOwnProfile = loggedInVendorId && loggedInVendorId.toString() === id.toString();
    
    const [vendor, setVendor] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [booth, setBooth] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({});
    const [editMsg, setEditMsg] = useState(null);
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [newProduct, setNewProduct] = useState({ name: '', description: '', count: 0, price: 0 });
    const [productMsg, setProductMsg] = useState(null);
    const [editingProductId, setEditingProductId] = useState(null);
    const [editProductData, setEditProductData] = useState({});

    const handleLogout = () => {
        localStorage.removeItem('vendor'); // remove login info from local storage
        window.dispatchEvent(new Event("storage"));  // auto-updates navbar
        navigate('/login');          // redirect to login page
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        setEditMsg(null);

        try {
            const res = await fetch(`http://localhost:3000/api/vendor/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editData),
            });
            const json = await res.json();
            if (!res.ok) {
                setEditMsg(json.error || 'Failed to update');
            } else {
                setEditMsg('Vendor updated successfully');
                setVendor(json.vendor);
                localStorage.setItem('vendor', JSON.stringify({ ...loggedInVendor, ...json.vendor, vendor_id: id }));
                setIsEditing(false);
            }
        } catch (err) {
            console.error(err);
            setEditMsg('Network error');
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) return;

        try {
            const res = await fetch(`http://localhost:3000/api/vendor/${id}`, { method: 'DELETE' });
            const json = await res.json();
            if (!res.ok) {
                setEditMsg(json.error || 'Failed to delete');
            } else {
                localStorage.removeItem('vendor');
                window.dispatchEvent(new Event("storage"));
                navigate('/login');
            }
        } catch (err) {
            console.error(err);
            setEditMsg('Network error');
        }
    };
    useEffect(() => {
        if (vendor) {
            setEditData({
                name: vendor.name || '',
                owner: vendor.owner || '',
                phone: vendor.phone || '',
                email: vendor.email || '',
                description: vendor.description || '',
            });
        }
    }, [vendor]);

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
                    <p className="text-gray-600 mt-1">This page has information about the vendor and the products they offer.</p>
                </div>


                {isOwnProfile && (
                    <div className="flex gap-2 mb-4">
                        <button onClick={() => setIsEditing(!isEditing)} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                            {isEditing ? 'Cancel' : 'Edit Profile'}
                        </button>
                        <button onClick={() => setShowAddProduct(!showAddProduct)} className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded">
                            {showAddProduct ? 'Close Add Product' : 'Add Product'}
                        </button>
                        <button onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">Delete Account</button>
                        <button onClick={handleLogout} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded">Logout</button>
                    </div>
                )}

                {/* Vendor Information Card or Edit Form */}
                {isEditing ? (
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Edit Vendor Profile</h2>
                        <form onSubmit={handleEditSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input type="text" placeholder="Vendor Name" value={editData.name || ''} onChange={e => setEditData({ ...editData, name: e.target.value })} className="border rounded px-3 py-2" required />
                                <input type="text" placeholder="Owner" value={editData.owner || ''} onChange={e => setEditData({ ...editData, owner: e.target.value })} className="border rounded px-3 py-2" />
                                <input type="text" placeholder="Phone" value={editData.phone || ''} onChange={e => setEditData({ ...editData, phone: e.target.value })} className="border rounded px-3 py-2" />
                                <input type="email" placeholder="Email" value={editData.email || ''} onChange={e => setEditData({ ...editData, email: e.target.value })} className="border rounded px-3 py-2" />
                            </div>
                            <textarea placeholder="Description" value={editData.description || ''} onChange={e => setEditData({ ...editData, description: e.target.value })} className="w-full border rounded px-3 py-2 mt-4" rows={3} />
                            <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded mt-4">Save Changes</button>
                            {editMsg && <p className={`mt-2 text-sm ${editMsg.includes('success') ? 'text-green-600' : 'text-red-600'}`}>{editMsg}</p>}
                        </form>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                        <div className="flex justify-between items-start mb-4">
                            <h2 className="text-2xl font-semibold text-gray-800">{vendor.name || 'N/A'}</h2>
                            <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">Active</span>
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
                )}

                {/* Products Section */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-800">Product Inventory</h2>
                        <span className="text-sm text-gray-600">{products.length} products</span>
                    </div>

                    {/* Add Product Form (visible to owner) */}
                    {isOwnProfile && showAddProduct && (
                        <div className="mb-6 p-4 border rounded">
                            <h3 className="font-semibold mb-2">Add New Product</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <input value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} placeholder="Product Name" className="border rounded px-3 py-2" />
                                <input value={newProduct.count} onChange={e => setNewProduct({ ...newProduct, count: e.target.value })} placeholder=" Product Count" type="number" className="border rounded px-3 py-2" />
                                <input value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} placeholder="Product Price" type="number" step="0.01" className="border rounded px-3 py-2" />
                                <input value={newProduct.description} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} placeholder="Product Description" className="border rounded px-3 py-2" />
                            </div>
                            <div className="mt-3">
                                <button onClick={async () => {
                                    setProductMsg(null);
                                    try {
                                        const res = await fetch(`http://localhost:3000/api/vendor/${id}/product`, {
                                            method: 'POST',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify({ ...newProduct })
                                        });
                                        const json = await res.json();
                                        if (!res.ok) {
                                            setProductMsg(json.error || 'Failed to create product');
                                        } else {
                                            setProducts([json.product, ...products]);
                                            setNewProduct({ name: '', description: '', count: 0, price: 0 });
                                            setShowAddProduct(false);
                                            setProductMsg('Product created successfully');
                                        }
                                    } catch (err) {
                                        console.error(err);
                                        setProductMsg('Network error');
                                    }
                                }} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">Create Product</button>
                                {productMsg && <span className="ml-3 text-sm text-gray-700">{productMsg}</span>}
                            </div>
                        </div>
                    )}

                    {/* Edit Product Form (inline above table) */}
                    {isOwnProfile && editingProductId && (
                        <div className="mb-6 p-4 border rounded">
                            <h3 className="font-semibold mb-2">Edit Product</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <input value={editProductData.name || ''} onChange={e => setEditProductData({ ...editProductData, name: e.target.value })} placeholder="Product Name" className="border rounded px-3 py-2" />
                                <input value={editProductData.count || 0} onChange={e => setEditProductData({ ...editProductData, count: e.target.value })} placeholder="Count" type="number" className="border rounded px-3 py-2" />
                                <input value={editProductData.price || 0} onChange={e => setEditProductData({ ...editProductData, price: e.target.value })} placeholder="Price" type="number" step="0.01" className="border rounded px-3 py-2" />
                                <input value={editProductData.description || ''} onChange={e => setEditProductData({ ...editProductData, description: e.target.value })} placeholder="Description" className="border rounded px-3 py-2" />
                            </div>
                            <div className="mt-3">
                                <button onClick={async () => {
                                    setProductMsg(null);
                                    try {
                                        const res = await fetch(`http://localhost:3000/api/product/${editingProductId}`, {
                                            method: 'PUT',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify(editProductData)
                                        });
                                        const json = await res.json();
                                        if (!res.ok) {
                                            setProductMsg(json.error || 'Failed to update product');
                                        } else {
                                            // update product in list
                                            setProducts(products.map(p => p.id === json.product.id ? json.product : p));
                                            setEditingProductId(null);
                                            setEditProductData({});
                                            setProductMsg('Product updated');
                                        }
                                    } catch (err) {
                                        console.error(err);
                                        setProductMsg('Network error');
                                    }
                                }} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded mr-2">Save</button>
                                <button onClick={() => { setEditingProductId(null); setEditProductData({}); }} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
                                {productMsg && <span className="ml-3 text-sm text-gray-700">{productMsg}</span>}
                            </div>
                        </div>
                    )}

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
                                            {isOwnProfile ? (
                                                <div className="flex gap-2">
                                                    <button onClick={() => {
                                                        setEditingProductId(product.id);
                                                        setEditProductData({
                                                            name: product.name,
                                                            description: product.description,
                                                            count: product.count,
                                                            price: product.price
                                                        });
                                                    }} className="text-indigo-600 hover:text-indigo-800 text-sm">Edit</button>
                                                    <button onClick={async () => {
                                                        if (!window.confirm('Delete this product?')) return;
                                                        try {
                                                            const res = await fetch(`http://localhost:3000/api/product/${product.id}`, { method: 'DELETE' });
                                                            const json = await res.json();
                                                            if (!res.ok) {
                                                                setProductMsg(json.error || 'Failed to delete product');
                                                            } else {
                                                                setProducts(products.filter(p => p.id !== product.id));
                                                                setProductMsg('Product deleted');
                                                            }
                                                        } catch (err) {
                                                            console.error(err);
                                                            setProductMsg('Network error');
                                                        }
                                                    }} className="text-red-600 hover:text-red-800 text-sm">Delete</button>
                                                    <button onClick={() => window.location.href = `/product/${product.id}`} className="text-blue-600 hover:text-blue-800 text-sm">View</button>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => window.location.href = `/product/${product.id}`}
                                                    className="text-blue-600 hover:text-blue-800 text-sm"
                                                >
                                                    View Details
                                                </button>
                                            )}
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