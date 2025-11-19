import React, { useState } from 'react';

export default function VendorDashboard() {
    const [stats] = useState({
        totalRevenue: 8450.50,
        totalSales: 127,
        activeProducts: 24,
        averageRating: 4.5,
        viewsThisMonth: 3542,
        conversionRate: 12.5
    });

    const [recentSales] = useState([
        { id: 1, product: "Vintage Lamp", date: "2024-11-15", amount: 45.00, buyer: "John D." },
        { id: 2, product: "Antique Clock", date: "2024-11-14", amount: 120.00, buyer: "Sarah M." },
        { id: 3, product: "Retro Radio", date: "2024-11-13", amount: 75.00, buyer: "Mike R." },
        { id: 4, product: "Wooden Chair", date: "2024-11-12", amount: 85.00, buyer: "Lisa K." },
        { id: 5, product: "Vintage Vase", date: "2024-11-11", amount: 35.00, buyer: "Tom W." }
    ]);

    const [topProducts] = useState([
        { name: "Antique Clock", sales: 23, revenue: 2760.00 },
        { name: "Vintage Lamp", sales: 31, revenue: 1395.00 },
        { name: "Wooden Chair", sales: 18, revenue: 1530.00 },
        { name: "Retro Radio", sales: 15, revenue: 1125.00 }
    ]);

    const [monthlySales] = useState([
        { month: "Jul", sales: 850 },
        { month: "Aug", sales: 1200 },
        { month: "Sep", sales: 1450 },
        { month: "Oct", sales: 1650 },
        { month: "Nov", sales: 1850 }
    ]);

    const maxSales = Math.max(...monthlySales.map(m => m.sales));

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
                                    ${stats.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                </p>
                                <p className="text-xs text-green-600 mt-1">↑ 12% from last month</p>
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
                                <p className="text-xs text-green-600 mt-1">↑ 8% from last month</p>
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
                                <p className="text-xs text-gray-500 mt-1">6 low stock items</p>
                            </div>
                            <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                                <span className="text-purple-600 text-xl">📊</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Average Rating</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.averageRating}</p>
                                <p className="text-xs text-gray-500 mt-1">Based on 89 reviews</p>
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
                                <p className="text-xs text-green-600 mt-1">↑ 15% from last month</p>
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
                                <p className="text-xs text-green-600 mt-1">↑ 2% from last month</p>
                            </div>
                            <div className="h-12 w-12 bg-pink-100 rounded-full flex items-center justify-center">
                                <span className="text-pink-600 text-xl">📈</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Charts and Tables Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Monthly Sales Chart */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Monthly Sales Trend</h2>
                        <div className="space-y-3">
                            {monthlySales.map((item) => (
                                <div key={item.month} className="flex items-center">
                                    <span className="text-sm text-gray-600 w-12">{item.month}</span>
                                    <div className="flex-1 ml-4">
                                        <div className="bg-gray-200 rounded-full h-8 relative">
                                            <div
                                                className="bg-blue-500 rounded-full h-8 flex items-center justify-end pr-3"
                                                style={{ width: `${(item.sales / maxSales) * 100}%` }}
                                            >
                                                <span className="text-white text-xs font-medium">${item.sales}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Top Products */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Top Performing Products</h2>
                        <div className="space-y-4">
                            {topProducts.map((product, index) => (
                                <div key={product.name} className="flex items-center justify-between">
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
                                        ${product.revenue.toFixed(2)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recent Sales */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Sales</h2>
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
                                    <td className="py-3 px-4 text-gray-600">{sale.date}</td>
                                    <td className="py-3 px-4 text-gray-600">{sale.buyer}</td>
                                    <td className="py-3 px-4 text-gray-900 font-medium">${sale.amount.toFixed(2)}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}