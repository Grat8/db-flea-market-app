import React, { useState, useEffect } from 'react';

export default function VendorDashboard() {
    const [stats, setStats] = useState(null);
    const [recentSales, setRecentSales] = useState([]);
    const [topProducts, setTopProducts] = useState([]);
    const [monthlySales, setMonthlySales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const vendor = JSON.parse(localStorage.getItem("vendor"));
    const vendorId = vendor?.id || 1;

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);

            // Fetch all dashboard data
            const [statsRes, salesRes, productsRes, monthlyRes] = await Promise.all([
                fetch(`http://localhost:3000/api/dashboard/${vendorId}/stats`),
                fetch(`http://localhost:3000/api/dashboard/${vendorId}/recent-sales`),
                fetch(`http://localhost:3000/api/dashboard/${vendorId}/top-products`),
                fetch(`http://localhost:3000/api/dashboard/${vendorId}/monthly-sales`)
            ]);

            if (!statsRes.ok || !salesRes.ok || !productsRes.ok || !monthlyRes.ok) {
                throw new Error('Failed to fetch dashboard data');
            }

            const statsData = await statsRes.json();
            const salesData = await salesRes.json();
            const productsData = await productsRes.json();
            const monthlyData = await monthlyRes.json();

            setStats(statsData);
            setRecentSales(salesData);
            setTopProducts(productsData);
            setMonthlySales(monthlyData);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
                <div className="text-xl text-gray-600">Loading dashboard...</div>
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

    const maxSales = monthlySales.length > 0
        ? Math.max(...monthlySales.map(m => parseFloat(m.sales)))
        : 1;

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Vendor Dashboard</h1>
                    <p className="text-gray-600 mt-1">Track your performance and sales analytics</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Total Revenue</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    ${parseFloat(stats.totalRevenue).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">All time</p>
                            </div>
                            <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                                <span className="text-green-600 text-xl">$</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Total Sales</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.totalSales}</p>
                                <p className="text-xs text-gray-500 mt-1">Completed orders</p>
                            </div>
                            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-blue-600 text-xl">📦</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Active Products</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.activeProducts}</p>
                                <p className="text-xs text-gray-500 mt-1">In inventory</p>
                            </div>
                            <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                                <span className="text-purple-600 text-xl">📊</span>
                            </div>
                        </div>
                    </div>

                    {/*<div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Average Rating</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.averageRating}</p>
                                <p className="text-xs text-gray-500 mt-1">Customer feedback</p>
                            </div>
                            <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center">
                                <span className="text-yellow-600 text-xl">⭐</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Views This Month</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.viewsThisMonth.toLocaleString()}</p>
                                <p className="text-xs text-gray-500 mt-1">Product views</p>
                            </div>
                            <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center">
                                <span className="text-indigo-600 text-xl">👁️</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Conversion Rate</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.conversionRate}%</p>
                                <p className="text-xs text-gray-500 mt-1">View to sale</p>
                            </div>
                            <div className="h-12 w-12 bg-pink-100 rounded-full flex items-center justify-center">
                                <span className="text-pink-600 text-xl">📈</span>
                            </div>
                        </div>
                    </div>*/}
                </div>

                {/* Charts and Tables Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Monthly Sales Chart */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Monthly Sales Trend</h2>
                        {monthlySales.length > 0 ? (
                            <div className="space-y-3">
                                {monthlySales.map((item, index) => (
                                    <div key={index} className="flex items-center">
                                        <span className="text-sm text-gray-600 w-12">{item.month}</span>
                                        <div className="flex-1 ml-4">
                                            <div className="bg-gray-200 rounded-full h-8 relative">
                                                <div
                                                    className="bg-blue-500 rounded-full h-8 flex items-center justify-end pr-3"
                                                    style={{ width: `${(parseFloat(item.sales) / maxSales) * 100}%` }}
                                                >
                                                    <span className="text-white text-xs font-medium">
                                                        ${parseFloat(item.sales).toFixed(0)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-center py-8">No sales data available</p>
                        )}
                    </div>

                    {/* Top Products */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Top Performing Products</h2>
                        {topProducts.length > 0 ? (
                            <div className="space-y-4">
                                {topProducts.map((product, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
                                                {index + 1}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{product.name}</p>
                                                <p className="text-xs text-gray-500">{product.sales} sales</p>
                                            </div>
                                        </div>
                                        <p className="text-sm font-semibold text-gray-900">
                                            ${parseFloat(product.revenue).toFixed(2)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-center py-8">No product data available</p>
                        )}
                    </div>
                </div>

                {/* Recent Sales */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Sales</h2>
                    {recentSales.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Product</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Buyer</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Amount</th>
                                </tr>
                                </thead>
                                <tbody>
                                {recentSales.map((sale) => (
                                    <tr key={sale.id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="py-3 px-4 text-gray-900">{sale.product}</td>
                                        <td className="py-3 px-4 text-gray-600">
                                            {new Date(sale.date).toLocaleDateString()}
                                        </td>
                                        <td className="py-3 px-4 text-gray-600">{sale.buyer || 'N/A'}</td>
                                        <td className="py-3 px-4 text-gray-900 font-medium">
                                            ${parseFloat(sale.amount).toFixed(2)}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center py-8">No recent sales</p>
                    )}
                </div>
            </div>
        </div>
    );
}