const express = require('express');
const router = express.Router();

module.exports = (db) => {
    // Vendor Dashboard Stats
    router.get('/:vid/stats', (req, res) => {
        const vid = req.params["vid"];

        // Get total revenue and sales count
        db.query(`
            SELECT
                COUNT(DISTINCT s.id) as totalSales,
                COALESCE(SUM(si.quantity * p.price), 0) as totalRevenue
            FROM sale s
                     JOIN saleitem si ON si.sid = s.id
                     JOIN product p ON si.pid = p.id
            WHERE p.vid = ?
        `, [vid], (err, revenueResults) => {
            if (err) {
                console.error('Error executing query: ' + err.stack);
                res.status(500).send('Error fetching stats');
                return;
            }

            // Get active products count
            db.query(`SELECT COUNT(*) as activeProducts FROM product WHERE vid = ?`, [vid], (err, productResults) => {
                if (err) {
                    console.error('Error executing query: ' + err.stack);
                    res.status(500).send('Error fetching stats');
                    return;
                }

                const stats = {
                    totalRevenue: parseFloat(revenueResults[0].totalRevenue) || 0,
                    totalSales: revenueResults[0].totalSales || 0,
                    activeProducts: productResults[0].activeProducts || 0,
                    averageRating: 4.5,
                    viewsThisMonth: 0,
                    conversionRate: 0
                };

                res.json(stats);
            });
        });
    });

    // Recent Sales for Vendor
    router.get('/:vid/recent-sales', (req, res) => {
        const vid = req.params["vid"];

        db.query(`
            SELECT
                s.id as id,
                p.name as product,
                s.date,
                (si.quantity * p.price * (1 - s.discount/100)) as amount,
                'Customer' as buyer
            FROM sale s
                     JOIN saleitem si ON si.sid = s.id
                     JOIN product p ON si.pid = p.id
            WHERE p.vid = ?
            ORDER BY s.date DESC
                LIMIT 10
        `, [vid], (err, results) => {
            if (err) {
                console.error('Error executing query: ' + err.stack);
                res.status(500).send('Error fetching recent sales');
                return;
            }
            res.json(results);
        });
    });

    // Top Products by Revenue
    router.get('/:vid/top-products', (req, res) => {
        const vid = req.params["vid"];

        db.query(`
            SELECT
                p.name,
                COUNT(si.sid) as sales,
                COALESCE(SUM(si.quantity * p.price), 0) as revenue
            FROM product p
                     LEFT JOIN saleitem si ON si.pid = p.id
            WHERE p.vid = ?
            GROUP BY p.id, p.name
            ORDER BY revenue DESC
                LIMIT 5
        `, [vid], (err, results) => {
            if (err) {
                console.error('Error executing query: ' + err.stack);
                res.status(500).send('Error fetching top products');
                return;
            }
            res.json(results);
        });
    });

    // Monthly Sales Trend
    router.get('/:vid/monthly-sales', (req, res) => {
        const vid = req.params["vid"];

        db.query(`
            SELECT
                DATE_FORMAT(s.date, '%b') as month,
        COALESCE(SUM(si.quantity * p.price), 0) as sales
            FROM sale s
                JOIN saleitem si ON si.sid = s.id
                JOIN product p ON si.pid = p.id
            WHERE p.vid = ?
              AND s.date >= DATE_SUB(CURDATE(), INTERVAL 5 MONTH)
            GROUP BY DATE_FORMAT(s.date, '%Y-%m'), DATE_FORMAT(s.date, '%b')
            ORDER BY DATE_FORMAT(s.date, '%Y-%m')
        `, [vid], (err, results) => {
            if (err) {
                console.error('Error executing query: ' + err.stack);
                res.status(500).send('Error fetching monthly sales');
                return;
            }
            res.json(results);
        });
    });

    return router;
};