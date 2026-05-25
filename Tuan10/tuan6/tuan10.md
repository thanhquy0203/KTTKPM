Bài tuần 10 được phát triển từ bài tuần 5 Microservices Architecture:
- User Service: database user_db
- Product Service: database food_db
- Cart Service: database cart_db
- Order Service: database order_db
- Payment Service: database payment_db

Yêu cầu:
- Cart Service gồm 2 API:
  POST /cart/add
  GET /cart/{userId}

- Order Service:
  POST /orders
  Khi tạo đơn hàng, Order Service gọi Cart Service để lấy giỏ hàng,
  gọi Product Service để lấy giá sản phẩm, sau đó tạo order.