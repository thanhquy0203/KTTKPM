const Redis = require('ioredis');
const redis = new Redis({
  host: '172.16.67.164', // Thay bằng IP máy cài Redis của nhóm
  port: 6379
});

async function dump() {

  
  console.log("✅ Đã dump dữ liệu mẫu vào Redis!");
  process.exit();
}

dump();