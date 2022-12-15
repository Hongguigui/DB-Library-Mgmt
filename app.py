# import paginator as paginator
from flask import Flask, send_from_directory, request, jsonify, make_response
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS #comment this on deployment
# from api.HelloApiHandler import HelloApiHandler
from flask_sqlalchemy import SQLAlchemy
from marshmallow_sqlalchemy import ModelSchema
from marshmallow import fields
from flask_marshmallow import Marshmallow
from pprint import pprint
import pymysql
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity,unset_jwt_cookies, jwt_required, JWTManager
from datetime import datetime, timedelta, timezone

# from load_data import load_data

app = Flask(__name__)
CORS(app) #comment this on deployment
# api = Api(app)
# app.config['SQLALCHEMY_ECHO'] = True

app.config["JWT_SECRET_KEY"] = "key"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt = JWTManager(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:root@localhost:3306/library'
db = SQLAlchemy(app)
ma = Marshmallow(app)

# Session = sessionmaker(bind = engine)
# session = Session()
#
# conn = engine.connect()

# def Convert(lst):
#     res_dct = {lst[i]: lst[i + 1] for i in range(0, len(lst), 2)}
#     return res_dct


class Book(db.Model):
    __tablename__ = "books"
    isbn13 = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50))
    authors = db.Column(db.String(500))
    categories = db.Column(db.String(100))
    thumbnail = db.Column(db.String(500))
    averageRating = db.Column(db.Float)
    yearPublished = db.Column(db.Integer)

    def create(self):
        db.session.add(self)
        db.session.commit()
        return self

    # def __init__(self,isbn13,title,authors,categories,thumbnail,averageRating,yearPublished):
    #     self.isbn13 = isbn13
    #     self.title = title
    #     self.authors = authors
    #     self.categories = categories
    #     self.thumbnail = thumbnail
    #     self.averageRating = averageRating
    #     self.yearPublished = yearPublished

    def __repr__(self):
        return '' % self.isbn13


class Branch(db.Model):
    __tablename__ = "branch"
    Location = db.Column(db.String(100), primary_key=True)
    EID = db.Column(db.Integer, db.ForeignKey('employee.EID'))
    Name = db.Column(db.String(50))

    def create(self):
        db.session.add(self)
        db.session.commit()
        return self

    def __repr__(self):
        return '' % self.EID


class Employee(db.Model):
    __tablename__ = "employee"
    EID = db.Column(db.Integer, primary_key=True)
    UID = db.Column(db.Integer, db.ForeignKey('user.UID'))
    Name = db.Column(db.String(50))

    def create(self):
        db.session.add(self)
        db.session.commit()
        return self

    def __repr__(self):
        return '' % self.EID


class Salary(db.Model):
    __tablename__ = "salary"
    EID = db.Column(db.Integer, primary_key=True)
    Salary = db.Column(db.Integer)

    def create(self):
        db.session.add(self)
        db.session.commit()
        return self

    def __repr__(self):
        return '' % self.EID


class User(db.Model):
    __tablename__ = "user"
    UID = db.Column(db.Integer, primary_key=True)
    Email = db.Column(db.String(50))
    Password = db.Column(db.String(50))
    Fine = db.Column(db.Float)

    def create(self):
        db.session.add(self)
        db.session.commit()
        return self

    def __repr__(self):
        return '' % self.UID


class BookSchema(ma.Schema):
    class Meta(ModelSchema.Meta):
        fields = ("isbn13", "title", "authors", "categories", "categories", "thumbnail", "averageRating", "yearPublished")
    #     model = Book
    #     sqla_session = db.session
    # ISBN = fields.Number(dump_only=True)
    # title = fields.String(required=True)
    # authors = fields.String(required=False)
    # categories = fields.String(required=False)
    # thumbnail = fields.String(required=False)
    # averageRating = fields.Number(required=False)
    # yearPublished = fields.Number(required=False)


book_schema = BookSchema()
books_schema = BookSchema(many=True)


# class BookListResource(Resource):
#     def get(self):
#         books = Book.query.all()
#         return books_schema.dump(books)

    # def post(self):
    #     new_post = Post(
    #         title=request.json['title'],
    #         content=request.json['content']
    #     )
    #     db.session.add(new_post)
    #     db.session.commit()
    #     return post_schema.dump(new_post)


@app.route("/", defaults={'path':''})
def serve(path):
    return send_from_directory(app.static_folder,'index.html')


# @app.route("/books")
# def books():
#     books = Book.query.all()
#     return books_schema.dump(books)


@app.route("/books", methods=['Get'])
def paginateBooks():
    page = request.args.get('page', 1, type=int)
    bookQuery = Book.query.paginate(page=page, per_page=10, error_out=False)
    # # bookQuery = Book.query.paginate(page=currentPage, error_out=False, max_per_page=pgSize)
    # result = dict(datas=bookQuery.items, total=bookQuery.total, current_page=bookQuery.page, per_page=bookQuery.per_page)
    # print(page)
    return books_schema.dump(bookQuery)



# @app.route("/search/books/<keyword>", methods=['Get'])
# def searchByName(keyword):
#     page = request.args.get('page', 1, type=int)
#     bookSearchQuery = Book.query.filter(Book.title.contains(keyword) | Book.authors.contains(keyword) | Book.categories.contains(keyword)).paginate(page=page,per_page=5,error_out=False)
#     # bookQuery = Book.query.paginate(page=currentPage, error_out=False, max_per_page=pgSize)
#     # print(page)
#     return books_schema.dump(bookSearchQuery)
#     # return result


@app.route("/ratingHigh/books/<minRating>", methods=['Get'])
def sortHighRating(minRating):
    page = request.args.get('page', 1, type=int)
    bookSearchQuery = Book.query.filter(
        Book.averageRating > minRating).order_by(Book.averageRating.desc()).paginate(page=page, per_page=5, error_out=False)
    return books_schema.dump(bookSearchQuery)


@app.route("/ratingLow/books/<minRating>", methods=['Get'])
def sortLowRating(minRating):
    page = request.args.get('page', 1, type=int)
    bookSearchQuery = Book.query.filter(
        Book.averageRating > minRating).order_by(Book.averageRating.asc()).paginate(page=page, per_page=10, error_out=False)
    return books_schema.dump(bookSearchQuery)


@app.route("/search/books", methods=['Get'])
def searchByName():
    keyword = request.args.get('keyword', None)
    rating = request.args.get('rating', 0)
    print(keyword)
    print(rating)
    page = request.args.get('page', 1, type=int)

    bookSearchQuery = Book.query.filter((Book.averageRating > rating) & (Book.title.contains(keyword) | Book.authors.contains(keyword) | Book.categories.contains(keyword))).order_by(Book.averageRating.desc()).paginate(page=page,per_page=5,error_out=False)
    return books_schema.dump(bookSearchQuery)


# api.add_resource(HelloApiHandler, '/flask/hello')
# api.add_resource(BookListResource, '/books')


@app.route("/search/books/isbn/<ISBN13>", methods=['Get'])
def searchByISBN(ISBN13):
    page = request.args.get('page', 1, type=int)
    bookSearchQuery = Book.query.filter(Book.isbn13 == ISBN13).paginate(page=page,per_page=5,error_out=False)


    # bookQuery = Book.query.paginate(page=currentPage, error_out=False, max_per_page=pgSize)
    # print(page)
    return books_schema.dump(bookSearchQuery)


@app.route("/token", methods=['Get','POST'])
def create_token():

    # providedEmail = request.json.get("email", None)
    # providedPassword = request.json.get("password", None)

    providedEmail = request.json.get("email", None)
    providedPassword = request.json.get("password", None)

    userSearchQuery = User.query.with_entities(User.Email, User.Password).filter(User.Email == providedEmail)

    list1 = []
    for row in userSearchQuery:
        list1.append([x for x in row])

    if providedEmail != list1[0][0] or providedPassword != list1[0][1]:
        return {"msg": "Wrong email or password"}, 401

    access_token = create_access_token(identity=providedEmail)
    response = {"access_token": access_token}
    return response


    # bookQuery = Book.query.paginate(page=currentPage, error_out=False, max_per_page=pgSize)
    # print(page)







if __name__ == "__main__":
    #load_data()
    app.run()

