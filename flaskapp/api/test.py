from flask import Flask, jsonify, request
import logging
from flask_pymongo import PyMongo

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/mydb"
mongo = PyMongo(app)

logging.basicConfig(level=logging.DEBUG)

@app.route('/result', methods = ['POST'])
def result():
    # print(request.is_json)
    content = request.get_json()
    # print(content['semester'])
    mongo.db.users.insert_one({'username' : 'admin', 'password': 'password'})
    sem1 = mongo.db.subs1.find()
    s1subject = []
    subjects = []

    # symbol = [[ ['@' for col in range(2)] for col in range(2)] for row in range(3)] print(symbol)
    teach = mongo.db.teachers.find()
    teachid = mongo.db.teachers.find()
    returnteachername = []
    returnteacherid = []
    for i in teach:
        returnteachername.append(i['Staff_name'])
    for j in teachid:
        returnteacherid.append(j['Staff_Id'])    
    for x in range (1,9):
        for var in sem1:
            subjects.append(var['S'+str(x)+'name'])
    return jsonify({'s1': subjects,'teach':returnteachername,'teachid' : returnteacherid})

if __name__ == '__main__':
    app.run(debug = True)
    app.logger.info('testing')