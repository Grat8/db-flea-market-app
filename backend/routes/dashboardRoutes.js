module.exports = (db) => {

    const express = require('express');
    const router = express.Router();

    // Vendor Dashboard Stats
    router.get('/:vid/stats', async (req, res) => {
        const vid = req.params.vid;
        try {
            const [revenueResults] = await db.query(`
                SELECT
                    COUNT(DISTINCT s.id) as totalSales,
                    COALESCE(SUM(si.quantity * p.price), 0) as totalRevenue
                FROM Sale s
                JOIN SaleItem si ON si.sid = s.id
                JOIN Product p ON si.pid = p.id
                WHERE p.vid = ?
            `, [vid]);

            const [productResults] = await db.query(`
                SELECT COUNT(*) as activeProducts FROM Product WHERE vid = ?
            `, [vid]);

            const stats = {
                totalRevenue: parseFloat(revenueResults[0].totalRevenue) || 0,
                totalSales: revenueResults[0].totalSales || 0,
                activeProducts: productResults[0].activeProducts || 0,
                averageRating: 4.5,  // placeholder
                viewsThisMonth: 0,   // placeholder
                conversionRate: 0    // placeholder
            };

            res.json(stats);
        } catch (err) {
            console.error('Error fetching stats:', err);
            res.status(500).send('Error fetching stats');
        }
    });

    // Recent Sales for Vendor
    router.get('/:vid/recent-sales', async (req, res) => {
        const vid = req.params.vid;
        try {
            const [results] = await db.query(`
                SELECT
                    s.id as id,
                    p.name as Product,
                    s.date,
                    (si.quantity * p.price * (1 - s.discount/100)) as amount,
                    'Customer' as buyer
                FROM Sale s
                JOIN SaleItem si ON si.sid = s.id
                JOIN Product p ON si.pid = p.id
                WHERE p.vid = ?
                ORDER BY s.date DESC
                LIMIT 10
            `, [vid]);

            res.json(results);
        } catch (err) {
            console.error('Error fetching recent sales:', err);
            res.status(500).send('Error fetching recent sales');
        }
    });

    // Top Products by Revenue
    router.get('/:vid/top-products', async (req, res) => {
        const vid = req.params.vid;
        try {
            const [results] = await db.query(`
                SELECT
                    p.name,
                    COUNT(si.sid) as sales,
                    COALESCE(SUM(si.quantity * p.price), 0) as revenue
                FROM Product p
                LEFT JOIN SaleItem si ON si.pid = p.id
                WHERE p.vid = ?
                GROUP BY p.id, p.name
                ORDER BY revenue DESC
                LIMIT 5
            `, [vid]);

            res.json(results);
        } catch (err) {
            console.error('Error fetching top products:', err);
            res.status(500).send('Error fetching top products');
        }
    });

    // Monthly Sales Trend
    router.get('/:vid/monthly-sales', async (req, res) => {
        const vid = req.params.vid;
        try {
            const [results] = await db.query(`
                SELECT
                    DATE_FORMAT(s.date, '%b') as month,
                    COALESCE(SUM(si.quantity * p.price), 0) as sales
                FROM Sale s
                JOIN SaleItem si ON si.sid = s.id
                JOIN Product p ON si.pid = p.id
                WHERE p.vid = ?
                  AND s.date >= DATE_SUB(CURDATE(), INTERVAL 5 MONTH)
                GROUP BY DATE_FORMAT(s.date, '%Y-%m'), DATE_FORMAT(s.date, '%b')
                ORDER BY DATE_FORMAT(s.date, '%Y-%m')
            `, [vid]);

            res.json(results);
        } catch (err) {
            console.error('Error fetching monthly sales:', err);
            res.status(500).send('Error fetching monthly sales');
        }
    });

    return router;
};
