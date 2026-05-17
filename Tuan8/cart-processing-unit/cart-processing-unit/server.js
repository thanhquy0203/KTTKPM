const express = require('express');
const Redis = require('ioredis');
const cors = require('cors');

const app = express();
app.use(cors()); // Cực kỳ quan trọng để Frontend không bị lỗi CORS
app.use(express.json());

// Kết nối tới Data Grid (Redis) - IP máy Redis của nhóm bạn
const redis = new Redis({
  host: '172.16.67.164', 
  port: 6379
});

// 1. API: Thêm vào giỏ hàng (POST /cart/add)
// Frontend gửi: { "userId": "101", "id": "1", "quantity": 1 }
app.post('/cart/add', async (req, res) => {
    const { userId, productId, quantity } = req.body;
  
    try {
      // 1. Sửa lại Key cho đúng với bạn số 2: `product:ID`
      const productDataJSON = await redis.get(`product:${productId}`);
      
      if (!productDataJSON) {
        return res.status(404).json({ error: "Sản phẩm không tồn tại trên hệ thống!" });
      }
  
      // 2. Vì bạn số 2 lưu JSON.stringify, mình phải JSON.parse lại
      const product = JSON.parse(productDataJSON);
      const currentStock = parseInt(product.stock); // Lấy thuộc tính stock bên trong
  
      // 3. Kiểm tra tồn kho
      if (currentStock < quantity) {
        return res.status(400).json({ error: "Số lượng tồn kho không đủ!" });
      }
  
      // 4. Nếu ổn thì mới lưu vào giỏ hàng (Key giỏ hàng của bạn giữ nguyên)
      await redis.hincrby(`cart:${userId}`, productId, quantity);
      
      res.json({ message: "Đã cập nhật giỏ hàng thành công!", userId });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Lỗi xử lý dữ liệu từ Data Grid" });
    }
  });

// 2. API: Xem giỏ hàng (GET /cart)
// Frontend gọi: http://172.16.70.4:8082/cart?userId=101
app.get('/cart', async (req, res) => {
  const { userId } = req.query; // Lấy từ phần ?userId=...

  if (!userId) return res.status(400).json({ error: "Thiếu userId" });

  try {
    const items = await redis.hgetall(`cart:${userId}`);
    
    // Nếu giỏ hàng trống, Redis trả về {}, ta vẫn trả về để Frontend biết
    res.json({
      userId,
      items: items || {},
      note: "Data dạng { id: quantity }"
    });
  } catch (err) {
    res.status(500).json({ error: "Không thể lấy giỏ hàng" });
  }
});

const PORT = process.argv[2] || 8082; 
const MY_IP = '172.16.70.4'; 

app.listen(PORT, '0.0.0.0', () => {

    console.log(`CART RUNNING AT PORT ${PORT}`);
    console.log(`LAN: http://${MY_IP}:${PORT}`);

});