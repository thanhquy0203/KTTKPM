package main

import (
	"fmt"
	"net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
	html := `
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Docker Go App</title>

	<style>
		*{
			margin:0;
			padding:0;
			box-sizing:border-box;
		}

		body{
			font-family: Arial, sans-serif;
			height:100vh;
			display:flex;
			justify-content:center;
			align-items:center;
			background: linear-gradient(135deg, #4facfe, #00f2fe);
		}

		.container{
			background:white;
			padding:50px;
			border-radius:20px;
			text-align:center;
			box-shadow:0 10px 30px rgba(0,0,0,0.2);
			width:400px;
		}

		h1{
			color:#333;
			margin-bottom:20px;
			font-size:36px;
		}

		p{
			color:#666;
			font-size:18px;
			margin-bottom:10px;
		}

		.badge{
			display:inline-block;
			margin-top:20px;
			padding:10px 20px;
			background:#15C91B;
			color:white;
			border-radius:30px;
			font-weight:bold;
		}
	</style>
</head>
<body>

	<div class="container">
		<h1>🐳 Hello, Docker Go!</h1>

		<p>Ứng dụng Go đang chạy trong Docker</p>
		<p>Server Port: 8080</p>

		<div class="badge">
			Go + Docker 🚀
		</div>
	</div>

</body>
</html>
`

	w.Header().Set("Content-Type", "text/html")
	fmt.Fprintf(w, html)
}

func main() {
	http.HandleFunc("/", handler)

	fmt.Println("Server running on port 8080")
	http.ListenAndServe(":8080", nil)
}