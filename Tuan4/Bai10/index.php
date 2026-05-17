<?php
$appEnv = getenv('APP_ENV') ?: 'development';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP Docker App</title>
    <style>
        body {
            margin: 0;
            font-family: Arial, sans-serif;
            background: #f4f7fb;
            color: #333;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }
        .card {
            background: #fff;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            text-align: center;
            max-width: 500px;
        }
        h1 {
            margin-top: 0;
            color: #2a72d6;
        }
        p {
            margin: 10px 0;
        }
        .code {
            display: inline-block;
            background: #eef2fb;
            padding: 8px 12px;
            border-radius: 6px;
            font-family: monospace;
            color: #2c3e50;
        }
    </style>
</head>
<body>
    <div class="card">
        <h1>PHP Docker Container</h1>
        <p>Running with <span class="code">php:8.2-apache</span></p>
        <p>Source is mounted from the host into the container</p>
        <p>APP_ENV = <span class="code"><?= htmlspecialchars($appEnv) ?></span></p>
    </div>
</body>
</html>
