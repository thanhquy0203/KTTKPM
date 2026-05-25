const CartItem = require('../models/cartItem.model');

exports.addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity = 1 } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({ error: 'userId và productId là bắt buộc' });
    }

    if (Number(quantity) <= 0) {
      return res.status(400).json({ error: 'quantity phải lớn hơn 0' });
    }

    const [item, created] = await CartItem.findOrCreate({
      where: { userId, productId },
      defaults: { userId, productId, quantity },
    });

    if (!created) {
      item.quantity += Number(quantity);
      await item.save();
    }

    res.status(created ? 201 : 200).json({
      message: created ? 'Đã thêm sản phẩm vào giỏ' : 'Đã cập nhật số lượng trong giỏ',
      data: item,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCartByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const items = await CartItem.findAll({
      where: { userId },
      order: [['createdAt', 'ASC']],
    });

    res.json({
      userId,
      items,
      totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
