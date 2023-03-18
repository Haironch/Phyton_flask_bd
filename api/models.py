from app import db

class Productos(db.Model):
    idproductos = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(80), nullable=False)
    descripcion = db.Column(db.String(256), nullable=False)
    cantidad = db.Column(db.Integer, nullable=False)
    precio = db.Column(db.Integer, default=False)

    @staticmethod
    def get_all():
        return Productos.query.all()
    
    @staticmethod
    def get_by_id(id):
        return Productos.query.filter_by(idproductos=id).first()