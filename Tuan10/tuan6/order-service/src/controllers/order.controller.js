const Order = require('../models/order.model');

const axios = require('axios');

// POST /orders - Tạo đơn hàng mới từ giỏ hàng
exports.createOrder = async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            return res.status(400).json({ error: 'userId là bắt buộc' });
        }

        // 1. Gọi User Service để validate user
        const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://user-service:8081';
        try {
            const usersRes = await axios.get(`${USER_SERVICE_URL}/users`);
            const users = usersRes.data;
            const userExists = users.some(u => u.id == userId);
            if (!userExists) {
                return res.status(400).json({ error: 'User không tồn tại' });
            }
        } catch (error) {
            return res.status(500).json({ error: 'Lỗi khi gọi User Service: ' + error.message });
        }

        // 2. Lấy giỏ hàng từ Cart Service
        const CART_SERVICE_URL = process.env.CART_SERVICE_URL || 'http://cart-service:8085';
        let cartItems = [];

        try {
            const cartRes = await axios.get(`${CART_SERVICE_URL}/cart/${userId}`);
            cartItems = cartRes.data.items || [];

            if (cartItems.length === 0) {
                return res.status(400).json({ error: 'Giỏ hàng đang trống' });
            }
        } catch (error) {
            return res.status(500).json({ error: 'Lỗi khi gọi Cart Service: ' + error.message });
        }

        // 3. Gọi Product Service để lấy giá sản phẩm và tính tổng tiền
        const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL || process.env.FOOD_SERVICE_URL || 'http://food-service:8082';
        let totalAmount = 0;
        let orderItems = [];

        try {
            const productsRes = await axios.get(`${PRODUCT_SERVICE_URL}/products`);
            const allProducts = productsRes.data;

            for (let item of cartItems) {
                const product = allProducts.find(p => p.id == item.productId);
                if (!product) {
                    return res.status(400).json({ error: `Product với id ${item.productId} không tồn tại` });
                }
                totalAmount += product.price * item.quantity;
                orderItems.push({
                    productId: product.id,
                    productName: product.name,
                    price: product.price,
                    quantity: item.quantity
                });
            }
        } catch (error) {
            return res.status(500).json({ error: 'Lỗi khi gọi Product Service: ' + error.message });
        }

        // 4. Tạo đơn hàng trong DB riêng của Order Service
        const newOrder = await Order.create({
            userId,
            totalAmount,
            status: 'PENDING',
            items: orderItems
        });

        res.status(201).json({ message: 'Tạo đơn hàng thành công', data: newOrder });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// GET /order - Lấy danh sách đơn hàng (có thể lọc theo userId)
exports.getOrders = async (req, res) => {
    try {
        const { userId } = req.query;
        let orders;
        if (userId) {
            orders = await Order.findAll({ where: { userId } });
        } else {
            orders = await Order.findAll();
        }
        res.json({ orders, total: orders.length });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// GET /order/:id - Lấy chi tiết 1 đơn hàng
exports.getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findByPk(id);
        if (!order) {
            return res.status(404).json({ error: 'Không tìm thấy đơn hàng' });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// PUT /order/:id - Cập nhật trạng thái
exports.updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        if (!status) {
            return res.status(400).json({ error: 'status là bắt buộc' });
        }

        const order = await Order.findByPk(id);
        if (!order) {
            return res.status(404).json({ error: 'Không tìm thấy đơn hàng' });
        }

        order.status = status;
        await order.save();

        res.json({ message: 'Cập nhật trạng thái thành công', data: order });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
