import os
from flask import Flask

app = Flask(__name__)

# Read environment variables
APP_ENV = os.getenv('APP_ENV', 'unknown')
APP_NAME = os.getenv('APP_NAME', 'Python App')
APP_VERSION = os.getenv('APP_VERSION', '1.0.0')

@app.route('/')
def home():
    return f"""
<!DOCTYPE html>
<html>
<head>
    <title>Environment Variables</title>
    <style>
        body {{
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0;
        }}
        .container {{
            background: white;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            text-align: center;
            max-width: 600px;
        }}
        h1 {{
            color: #333;
            font-size: 2.5em;
            margin: 0 0 20px 0;
        }}
        .env-box {{
            background: #f0f0f0;
            padding: 20px;
            border-radius: 5px;
            margin: 15px 0;
            text-align: left;
        }}
        .env-item {{
            margin: 10px 0;
            padding: 10px;
            background: white;
            border-left: 4px solid #667eea;
            border-radius: 3px;
        }}
        .env-key {{
            color: #667eea;
            font-weight: bold;
        }}
        .env-value {{
            color: #333;
            font-family: monospace;
        }}
    </style>
</head>
<body>
    <div class="container">
        <h1>🐍 Python Docker App</h1>
        <p>Environment Variables</p>
        
        <div class="env-box">
            <div class="env-item">
                <span class="env-key">APP_ENV:</span>
                <span class="env-value">{APP_ENV}</span>
            </div>
            <div class="env-item">
                <span class="env-key">APP_NAME:</span>
                <span class="env-value">{APP_NAME}</span>
            </div>
            <div class="env-item">
                <span class="env-key">APP_VERSION:</span>
                <span class="env-value">{APP_VERSION}</span>
            </div>
        </div>
        
        <p>Running on Flask server with environment variables</p>
    </div>
</body>
</html>
    """

@app.route('/env')
def env_json():
    return {{
        'APP_ENV': APP_ENV,
        'APP_NAME': APP_NAME,
        'APP_VERSION': APP_VERSION
    }}

if __name__ == '__main__':
    print(f"Starting application...")
    print(f"APP_ENV: {APP_ENV}")
    print(f"APP_NAME: {APP_NAME}")
    print(f"APP_VERSION: {APP_VERSION}")
    print(f"Listening on port 5000...")
    app.run(host='0.0.0.0', port=5000, debug=False)
