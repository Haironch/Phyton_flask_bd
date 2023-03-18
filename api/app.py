from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
db = SQLAlchemy()
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+mysqlconnector://root:12345678@localhost:3306/ingenieria"
db.init_app(app)
from models import Productos

@app.route("/api/products")
def index():
    products = Productos.get_all()
    all_products =[]
    for product in products:
        all_products.append(
            {
            "idproduct": product.idproductos,
            "nombre": product.nombre,
            "descripcion": product.descripcion,
            "precio": product.precio,
            "cantidad": product.cantidad
            }
            )
    return jsonify(products=all_products)

@app.route("/api/product", methods=['POST'])
def create():
    data = request.get_json()
    nombre = data["nombre"]
    
    descripcion = data["descripcion"]
    precio = data["precio"]
    cantidad = data["cantidad"]
    product = Productos(nombre=nombre, descripcion=descripcion, precio=precio, cantidad=cantidad)
    db.session.add(product)
    db.session.commit()
    return jsonify(nombre=nombre, descripcion = descripcion, cantidad = cantidad, precio=precio)

# get one
@app.route("/api/product/<id>")
def get_one(id=None):
    product = Productos.get_by_id(id)
    product = {
        "idproduct": product.idproductos,
        "nombre": product.nombre,
        "descripcion": product.descripcion,
        "precio": product.precio,
        "cantidad": product.cantidad,
    }
    return jsonify(product)

@app.route("/api/product/<id>", methods=["PUT"])
def update(id=None):
    data = request.get_json()
    product = Productos.get_by_id(id)
    product.nombre = data["nombre"]
    product.descripcion = data["descripcion"]
    product.precio = data["precio"]
    product.cantidad = data["cantidad"]
    db.session.commit()
    return jsonify(message="Product updated")

@app.route("/api/product/<id>", methods=["DELETE"])
def delete(id=None):
    product = Productos.get_by_id(id)
    db.session.delete(product)
    db.session.commit()
    return jsonify(message="Product deleted")

if __name__ == '__main__':
    app.run()