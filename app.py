from flask import Flask, send_from_directory, request, jsonify, make_response
from flask_restful import Api, Resource, reqparse
#from flask_cors import CORS #comment this on deployment
from api.HelloApiHandler import HelloApiHandler
from flask_sqlalchemy import SQLAlchemy
from marshmallow_sqlalchemy import ModelSchema
from marshmallow import fields
import pymysql

app = Flask(__name__, static_url_path='', static_folder='frontend/build')
#CORS(app) #comment this on deployment
api = Api(app)

app.config['SQLALCHEMY_DATABASE_URI']='mysql+pymysql://root:root@localhost:3306/library'
db = SQLAlchemy(app)


class Book(db.Model):
    __tablename__ = "books"
    ISBN = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50))
    author = db.Column(db.String(50))
    categories = db.Column(db.Integer)
    averageRating = db.Column(db.Float)
    yearPublished = db.Column(db.Integer)

    def create(self):
        db.session.add(self)
        db.session.commit()
        return self

    def __init__(self,ISBN,title,author,categories,averageRating,yearPublished):
        self.ISBN = ISBN
        self.title = title
        self.author = author
        self.categories = categories
        self.averageRating = averageRating
        self.yearPublished = yearPublished

    def __repr__(self):
        return '' % self.ISBN


class BookSchema(ModelSchema):
    class Meta(ModelSchema.Meta):
        model = Book
        sqla_session = db.session
    ISBN = fields.Number(dump_only=True)
    title = fields.String(required=True)
    author = fields.String(required=False)
    categories = fields.String(required=False)
    averageRating = fields.Number(required=False)
    yearPublished = fields.Number(required=False)


@app.route("/", defaults={'path':''})
def serve(path):
    return send_from_directory(app.static_folder,'index.html')


@app.route("/books", methods=['GET'])
def index():
    get_books = Book.query.all()
    book_schema = BookSchema(many=True)
    books = book_schema.dump(get_books)
    return make_response(jsonify({"books": books}))


api.add_resource(HelloApiHandler, '/flask/hello')



if __name__ == "__main__":
    app.run()