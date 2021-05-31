from flask import Flask 
app = Flask(__name__)

@app.route('/',methods=['GET'])
def index():
    return {
        'name': "Hello World",
        'age': 1,
        "house":"lannister",
        "ape": "Harambe"
        
    }

# debug=True reloads the app when changes are made
if __name__ == '__main__':
    app.run(debug=True)