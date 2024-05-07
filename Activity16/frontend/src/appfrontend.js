import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { Button } from "bootstrap";

function App() {
  const [product, setProduct] = useState([]);
  const [oneProduct, setOneProduct] = useState([]);
  const { register, handleSubmit, formState: { errors} } = useForm();
  // new Product
  const [addNewProduct, setAddNewProduct] = useState({
    id: 0,
    title: "",
    price: 0.0,
    description: "",
    category: "",
    image: "",
    rating: 0.0,
  });

  const [viewer, setViewer] = useState(0);

  function updateHooks(i) {
    setViewer(i);
  }

  useEffect(() => {
    getAllProducts();
  }, []);
  function getAllProducts() {
    fetch("http://127.0.0.1:4000/catalog/", {
      method: "GET",
      headers: { "content-type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => setProduct(data));
  }

  function Browse() {
    const handleClick = (productID) => {
      setOneProduct(product[productID - 1]);
      updateHooks(1);
    }

    console.log(product)

    const render_products = (product) => {
      return (
      <div id="col" class="row row-cols-md-3 g-3">
        {product.map((el) => (
          <button key={el.id} id={el.id} className="card text-bg-dark shadow-sm mx-1" onClick={() => handleClick(el.id)}>
            <img src={el.image} className="card-img-top card-bottom" alt="image"/>
            <div class="card-body">
              <p class="card-text"> <strong>{el.title}</strong> ${el.price}</p>
              <p class="card-text">{el.rating.rate} ({el.rating.count})</p>
            </div>
          </button>
        ))}
      </div>);
    };

    return (<div class="text-bg-dark">
      <nav className="navbar fixed navbar-expand-md navbar-dark bg-gray shadow py-2">
        <div className="container-fluid">
          <h1>Catalog</h1>
          <div class="float-right">
          <nav class="nav nav-masthead justify-content-center float-md-end">
            <a class="nav-link fw-bold py-1 px-2 text-bg-dark" onClick={() => updateHooks(2)}>Add Product</a>
            <a class="nav-link fw-bold py-1 px-2 text-bg-dark" onClick={() => updateHooks(3)}>Remove Product</a>
            </nav>
          </div>
        </div>
      </nav>

      <div class="album py-5">
        <div className="container mx-auto">
            {render_products(product)}
        </div>
      </div>
    </div>);
  }

  function OneProduct() {

    console.log(oneProduct.id)


    const render_product = (oneProduct) => {


      return (<div class="container d-flex align-center py-10">
        <div>
          <img class="h-100 w-100 img-fluid"src={oneProduct.image} width="100" alt="image"/>
        </div>

        <div class="float-left px-5">
          <h2>{oneProduct.title}</h2>

          <h4>
            Rating: {oneProduct.rating.rate} <span class="text-muted">({oneProduct.rating.count})</span>
          </h4>

          <h4 class="text-green-600">${oneProduct.price}</h4>
          <p class="card-text-sm w-50">{oneProduct.description}</p>
        </div>
      </div>);
    }

    console.log(oneProduct.rating.rate)


    const onSubmit = (data) => {

      const newProduct = {
        "id" : oneProduct.id,
        "title" : oneProduct.title,
        "price" : Number(data.price),
        "description" : oneProduct.description,
        "category" : oneProduct.category,
        "image" : oneProduct.image,
        "rating" : {
        "rate" : oneProduct.rating.rate,
        "count" : oneProduct.rating.count
        }
      }

      fetch("http://127.0.0.1:4000/catalog/"+oneProduct.id, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newProduct),
        });
      

    }


    return(<div class="h-auto">
      <nav class="navbar fixed navbar-expand-md navbar-dark text-bg-dark shadow py-2">
        <div className="container-fluid">
          <h1>Review Product</h1>
          <div class="float-right">
            <a class="nav-link fw-bold py-1 px-2 text-bg-dark" onClick={() => updateHooks(0)}>Return</a>
          </div>
        </div>
      </nav>
      <div class="container">
        {render_product(oneProduct)}
      </div>
      <div class="container">
        <h4>Update Product Information:</h4>
        <form className="py-4 px-5" onSubmit={handleSubmit(onSubmit)}>
  <div className="form-group py-1">

  <input  {...register("price", { required : true })}placeholder="Price" type="number" className="form-control w-50"></input>

  </div>
<button type="submit" class="btn btn-primary py-1">Submit</button>
  </form>
      </div>
    </div>)
  }

  function AddProduct() {

    const onSubmit = (data) => {
      data.rating = {
        rate : data.rate,
        count : data.count
      }
      console.log(data);
      setAddNewProduct(data);

      fetch("http://127.0.0.1:4000/catalog/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
      });
    }

    return (<div>
      <nav class="navbar fixed navbar-expand-md navbar-dark text-bg-dark shadow py-2">
        <div className="container-fluid">
          <h1>Update Products</h1>
          <div class="float-right">
            <a class="nav-link fw-bold py-1 px-2 text-bg-dark" onClick={() => updateHooks(0)}>Return</a>
          </div>
        </div>
      </nav>

      <form className="py-4 px-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group py-1">
          <input {...register("id", { required : true })}
            placeholder="ID" type="number" className="form-control w-50">
              {errors.id && (
                <p className="text-danger">ID is required.</p>
              )}
            </input>
        </div>
        <div className="form-group py-1">
          <input {...register("title", { required : true })}
            placeholder="Title" type="text" className="form-control w-50">
            {errors.title && (
              <p className="text-danger">Title is required.</p>
            )}
            </input>
        </div>
        <div className="form-group py-1">
          <input {...register("image", { required : true })} 
            placeholder="Image" type="url" className="form-control w-50">
            {errors.image && (
              <p className="text-danger">Image URL is required.</p>
            )}
            </input>
        </div>
        <div className="form-group py-1">
          <input {...register("price", { required : true })}
            placeholder="Price" type="number" className="form-control w-50" step=".01">
              {errors.price && (
                <p className="text-danger">Price is required.</p>
              )}
            </input>
        </div>
        <div className="form-group py-1">
          <input {...register("category", { required : true })}
            placeholder="Category" type="text" className="form-control w-50">
              {errors.category && (
                <p className="text-danger">Category is required.</p>
              )}
            </input>
        </div>
        <div className="form-group py-1">
          <input {...register("description", { required : true })}
            placeholder="Description" type="text" className="form-control w-50">
              {errors.description && (
                <p className="text-danger">Description is required.</p>
              )}
            </input>
        </div>
        <div className="form-group py-1">
          <input {...register("rate", { required : true })}
            placeholder="Rate" type="number" className="form-control w-50" step=".1">
              {errors.rate && (
                <p className="text-danger">Rate is required.</p>
              )}
            </input>
        </div>
        <div className="form-group py-1">
          <input {...register("count", { required : true })}
            placeholder="Count" type="number" className="form-control w-50">
              {errors.count && (
                <p className="text-danger">Count is required.</p>
              )}
            </input>
        </div>
      <button type="submit" class="btn btn-primary py-1">Submit</button>
      </form>
    </div>);
  }

  function RemoveProduct() {



    const onSubmit = (data) => {

      fetch("http://127.0.0.1:4000/catalog/"+data.id, {
        method: "DELETE",
        });

    }

    return (
      <div>
      <div class="text-bg-dark">
      <nav className="navbar fixed navbar-expand-md navbar-dark bg-gray shadow py-2">
        <div className="container-fluid">
          <h1>Remove Product</h1>
          <div class="float-right">
          <nav class="nav nav-masthead justify-content-center float-md-end">
            <a class="nav-link fw-bold py-1 px-2 text-bg-dark" onClick={() => updateHooks(0)}>Return</a>
            </nav>
          </div>
        </div>
      </nav>
  </div>
  <form className="py-4 px-5" onSubmit={handleSubmit(onSubmit)}>
  <div className="form-group py-1">

  <input  {...register("id", { required : true })}placeholder="ID" type="number" className="form-control w-50"></input>

  </div>
<button type="submit" class="btn btn-primary py-1">Submit</button>
  </form>

  
  </div>
    )

  }


//   function addAnotherProduct() {
//     // Fetch the value from the input field
//     fetch(`http://127.0.0.1:4000/catalog/`, {
//       method: "POST",
//       headers: { "content-type": "application/json" },
//       body: JSON.stringify({
//         id: 1,
//         title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
//         price: 109.95,
//         description:
//           "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
//         category: "men's clothing",
//         image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
//         rating: { rate: 3.9, count: 120 },
//       }),
//     });
//   }

//   function deleteOneProduct(id) {

//     console.log(id);
//     fetch(`http://127.0.0.1:4000/catalog/${id}`, {
//       method: "DELETE",
//       headers: { "content-type": "application/json" },
//       body: JSON.stringify({ id: id }),
//     }).then((response) => response.json());


//   }
  return (
    <div class="h-auto">
    {(viewer === 0) && <Browse />}
    {(viewer === 1) && <OneProduct />}
    {(viewer === 2) && <AddProduct />}
    {(viewer === 3) && <RemoveProduct />}
  </div>
  ); // return end
} // App end
export default App;
