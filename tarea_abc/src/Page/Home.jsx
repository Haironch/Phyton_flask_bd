import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import "../App.css";

const Conteinerhome = styled.div`
  display: block;
  width: 100vw;
  height: auto;
  box-sizing: border-box;
  margin: 10px 100px;
`;

const FormContainer = styled.div`
  * {
    padding: 0;
    box-sizing: border-box;
  }

  .contentform {
    width: 400px;
    height: 450px;
    background: #85929e;
    padding: 10px;
    margin: 0;
    margin-top: 10px;
    border-radius: 4px;
    font-family: "calibri";
    display: block;
    color: white;
  }
  .register {
    padding: 1em;
    font-size: 22px;
    margin-bottom: 20;
  }
  .contentdiv {
    width: 100%;
    background: #85929e;
    padding: 10px;
    border-radius: 4px;
    margin-bottom: 10px;
    border: 1px solid blue;
    font-family: "calibri";
    font-size: 15px;
    color: white;
  }
`;
const Bottonserch = styled.button`
  width: 100%;
  background: #1f53c5;
  border: none;
  padding: 12px;
  color: white;
  margin: 16px 0;
  border-radius: 4px;
  font: 12px;
  cursor: pointer;
`;

const Table = styled.div`
  margin: 0 0;
  margin-top: 50px;
  padding: 24px 10px;
  width: 70%;
  height: 700px;
  font-size: 15px;
  color: white;
  overflow-x: auto;
  background-color: #85929e;

  .bottonBA {
    width: 110px;
    background: #1f53c5;
    border: none;
    padding: 0;
    color: white;
    margin: 1px 2px;
    border-radius: 4px;
    font: 12px;
    cursor: pointer;
  }
  .trcolor {
    font-size: 17px;
    color: white;
  }
`;

const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  padding: 64px;
  width: 70%;
  height: auto;
  background-color: #85929e;
  color: white;
`;
const Chart = styled.div`
  width: 1200px;
  height: 700px;
  overflow-x: auto;
  background-color: #85929e;
`;
const ChartBar = styled.div`
  border: 1px dotted black;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 40px;
  height: 50px;
  width: 100%;
  box-sizing: border-box;
  font-size: 15px;
  color: white;
  .chartproduct-name {
    display: flex;
    align-items: center;
    padding-left: 32px;
    width: 200px;
    height: 100%;
  }
  .chartproduct-bar {
    width: ${({ width }) => `${width}px`};
    height: 100%;
    background-color: #1f53c5;
  }
`;

function Home() {
  const [flagUpdate, setFlagUpdate] = useState(false);
  // create product
  const [product, setProduct] = useState({
    id: "",
    nombre: "",
    descripcion: "",
    precio: "",
    cantidad: "",
  });
  // product list
  const [products, setProducts] = useState([]);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(flagUpdate);
    if (!flagUpdate) {
      const response = await axios.post("/api/product", product);
      console.log(response);
    } else {
      const { data } = await axios.put(`/api/product/${product.id}`, product);
      console.log(data);
      setFlagUpdate(false);
    }
    getData();
    setProduct({
      id: "",
      nombre: "",
      descripcion: "",
      precio: "",
      cantidad: "",
    });
  };
  const getData = async () => {
    const { data } = await axios.get("/api/products");
    setProducts(data.products);
  };

  useEffect(() => {
    getData();
  }, []);

  // delete product
  const deleteProduct = async (id) => {
    if (window.confirm("¿Estás seguro de querer eliminar el producto?")) {
      const { data } = await axios.delete(`/api/product/${id}`);
      console.log(data);
    }
    getData();
  };

  // get product
  const getProduct = async (product) => {
    setFlagUpdate(true);
    setProduct({
      id: product.idproduct,
      nombre: product.nombre,
      descripcion: product.descripcion,
      precio: product.precio,
      cantidad: product.cantidad,
    });
  };

  return (
    <Conteinerhome>
      <FormContainer>
        <form className="contentform" onSubmit={handleSubmit}>
          <h4 className="register">AGREGAR ARTICULOS</h4>
          <div>
            <input
              className="contentdiv"
              onChange={handleChange}
              value={product.nombre}
              placeholder="Nombre"
              type="text"
              name="nombre"
            />
          </div>
          <div>
            <input
              className="contentdiv"
              onChange={handleChange}
              value={product.descripcion}
              placeholder="Descripcion"
              type="text"
              name="descripcion"
            />
          </div>
          <div>
            <input
              className="contentdiv"
              onChange={handleChange}
              value={product.precio}
              placeholder="Precio"
              type="text"
              name="precio"
            />
          </div>
          <div>
            <input
              className="contentdiv"
              onChange={handleChange}
              value={product.cantidad}
              placeholder="Cantidad"
              type="text"
              name="cantidad"
            />
          </div>
          <Bottonserch type="submit">
            {flagUpdate ? "Actualizar" : "Agregar"}
          </Bottonserch>
        </form>
      </FormContainer>
      <Table>
        <h1>Productos</h1>
        <table className="table">
          <thead>
            <tr className="trcolor">
              <th scope="col">Id</th>
              <th scope="col">Nombre</th>
              <th scope="col">Descripcion</th>
              <th scope="col">Precio</th>
              <th scope="col">Cantidad</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody className="trcolor">
            {products.map((product) => (
              <tr key={product.idproduct}>
                <th scope="row">{product.idproduct}</th>
                <td>{product.nombre}</td>
                <td>{product.descripcion}</td>
                <td>{product.precio}</td>
                <td>{product.cantidad}</td>
                <td>
                  <div>
                    <button
                      className="bottonBA"
                      onClick={() => deleteProduct(product.idproduct)}
                    >
                      Borrar
                    </button>
                    <button
                      className="bottonBA"
                      onClick={() => getProduct(product)}
                    >
                      Actualizar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Table>

      <ChartContainer>
        <h1 color="white">Gráfica</h1>
        <Chart>
          {products.map((product) => {
            console.log(product.cantidad);
            // const width = 100 * (product.cantidad / 1000);
            return (
              <ChartBar width={product.cantidad}>
                <div className="chartproduct-name">{product.nombre}</div>
                <div className="chartproduct-bar"></div>
              </ChartBar>
            );
          })}
        </Chart>
      </ChartContainer>
    </Conteinerhome>
  );
}

export default Home;
