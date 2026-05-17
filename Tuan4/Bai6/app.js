const http = require("http");

const hostname = "0.0.0.0";
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");

  res.end(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Docker Multi-stage Build</title>

      <style>
        body{
          margin:0;
          font-family:Arial, sans-serif;
          height:100vh;
          display:flex;
          justify-content:center;
          align-items:center;
          background:linear-gradient(135deg,#667eea,#764ba2);
        }

        .container{
          background:white;
          padding:50px;
          border-radius:20px;
          text-align:center;
          box-shadow:0 10px 30px rgba(0,0,0,0.2);
        }

        h1{
          color:#333;
          margin-bottom:20px;
        }

        p{
          color:#666;
          font-size:18px;
        }

        .badge{
          margin-top:20px;
          display:inline-block;
          background:#15C91B;
          color:white;
          padding:10px 20px;
          border-radius:30px;
          font-weight:bold;
        }
      </style>
    </head>

    <body>
      <div class="container">
        <h1>🚀 Hello Docker Multi-stage Build</h1>

        <p>Ứng dụng Node.js đang chạy bằng Docker</p>

        <div class="badge">
          node:18 → node:18-alpine
        </div>
      </div>
    </body>
    </html>
  `);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});