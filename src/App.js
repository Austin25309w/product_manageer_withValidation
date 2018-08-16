import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import "react-router";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Routing extends Component {
  // const Routing = () => (
  constructor(props) {
    super(props);
    
  }

  render() {
    return (
      
      <Router>
        <div>
          <Link to="/">Home</Link>
          <span> | </span>
          <Link to="/list">Product List</Link>
          <span> | </span>
          <Link to="/create">Product Creation</Link>

          <hr />

          <Route exact path="/" component={Home} />

          <Route
            path="/list"
            render={props => <ProductList
              products={this.props.products} 
              editProduct={this.props.editProduct}
              deleteProduct={this.props.deleteProduct}/>}
          />

          <Route
            path="/create"
            render={props => <AddProduct 
              products={this.props.products} 
              addProduct={this.props.addProduct} />}
          />
        </div>
      </Router>
    );
  }
}

const Home = () => {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
};

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: '',
      productPrice: '',
      fields: {},
      errors: {}
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(e) {
    let changeField = this.state.fields;
    changeField[e.target.name] = e.target.value;
    this.setState({
      changeField,
      productName: e.target.value
    });
  }
  handlePriceChange(e) {
    let change = this.state.fields;
    console.log(change)
    change[e.target.name] = e.target.value;
    this.setState({
      change,
      productPrice: e.target.value
    });
    console.log("handlePriceChange" + this.state.value);
  }
  handleSubmit(e) {
    e.preventDefault();
    if(this.validateForm()){
      let submitField = {};
      submitField['productName'] = '';
      submitField['productPrice'] = '';

      console.log(this.props);
      this.props.addProduct(this.state.productName, this.state.productPrice);
      this.handleClear();
    }
  }

  validateForm() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;
    
    if(!fields['productName']){
      
      formIsValid = false;
      errors['productName'] = '* Please enter your product name'
    }

    if(typeof fields['productName'] !=='undefined'){
      if (fields['productName'].length < 3) {
      // if(!fields['productName'].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors['productName'] = '* Please enter more than 3 characters.'
      }
    }

    if(!fields['productPrice']){
      formIsValid = false;
      errors['productPrice'] ='* Please enter your product price'
    }

    // if(typeof fields['productPrice'] !== 'undefined'){
    //   if(typeof fields['productPrice'] !== 'number') {
    //     formIsValid = false;
    //     errors['productPrice'] = '* Please enter a number for the product price'
    //   }
    // }

    this.setState({
      errors: errors
    })
    return formIsValid;
  }

  handleClear() {
    const productName = "";
    const productPrice = "";
    this.setState({ productName });
    this.setState({ productPrice });
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="product name"
          name="productName"
          value={this.state.productName}
          onChange={this.handleNameChange}
        />
        <div style ={{color:'red'}} className = 'errorMsg'>{this.state.errors.productName}</div>
        <input
          type="number"
          placeholder="product price"
          name="productPrice"
          value={this.state.productPrice}
          onChange={this.handlePriceChange}
        />
        <div style ={{color:'red'}} className = 'errorMsg'>{this.state.errors.productPrice}</div>
        <input type="submit" />
      </form>
    )
  }
}

class EditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      price: props.price,
      id: props.id,
      field: {},
      error:{}
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  
  }

  handleNameChange(event) {
    let changeField= this.state.field;
    changeField[event.target.name] = event.target.value;
    this.setState({
      changeField,
      name: event.target.value
    });
    // console.log("handlenamechange" + event.target.name);
    
  }

  handlePriceChange(e) {
    let changeField = this.state.field;
    console.log(changeField);
    changeField[e.target.name] = e.target.value;
    this.setState({
      changeField,
      price: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if(this.validateEdit()) {
      let submitForm = {};
      submitForm['this.props.name'] = '';
      submitForm['this.props.price'] = '';
      console.log(this.state.id)
      this.props.editProduct(this.state.id, this.state.name, this.state.price);
      this.props.changeEditable();
    }
    
  }

  validateEdit() {
    let field = this.state.field;
    let error = {};
    let formIsValid = true;
    
    if(!field['name']){
      console.log(field)
      formIsValid = false;
      console.log(field)
      console.log(formIsValid)
      console.log('enter product name')
      error['name'] = '* Please enter your product name'
    }

    if(typeof field['this.props.name'] !=='undefined'){
      if (field['this.props.name'].length < 3) {
      // if(!fields['name'].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        error['name'] = '* Please enter more than 3 characters.'
      }
    }

    if(!field['this.props.price']){
      formIsValid = false;
      error['price'] ='* Please enter your product price'
    }



    this.setState({
      error: error
    })
    return formIsValid;
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            
            <input
              type="text"
              name='editName'
              value={this.state.name}
              onChange={this.handleNameChange}
            />
            <div style={{color: 'red'}} className='errorMsg'>{this.state.error.name}</div>
            <input
              type="number"
              name='editPrice'
              value={this.state.price}
              onChange={this.handlePriceChange}
            />
            <div style={{color: 'red'}} className='errorMsg'>{this.state.error.price}</div>

          </label>
          <input type="submit" value="save" />
        </form>
      </div>
    );
  }
}

//-----------------------------------------------------------
class ProductList extends Component {
  constructor(props) {
    super(props);
    
  }

  render() {
    
    return this.props.products.map((product, index) => {
      return (
        <ProductDetail 
        index = {index}
        product = { product }
        editProduct = {this.props.editProduct}
        deleteProduct = {this.props.deleteProduct}
        />
      )
    });
  }
}


//-----------------------------------------------------

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editable: false
    }
    this.changeEditable = this.changeEditable.bind(this);
  }

  changeEditable() {
    this.setState({
      editable: !this.state.editable
    })
  }
  render() {
    
    return (
    <div>
          {
            this.state.editable 
            ? 
            <EditForm 
              
              name={ this.props.product.name}
              price={this.props.product.price}
              id={this.props.product.id}
              editProduct={this.props.editProduct}
              deleteProduct={this.props.deleteProduct}
              changeEditable={this.changeEditable} />

          : 
            <li key={this.props.index}>
              {this.props.product.id}. {this.props.product.name} | {"$ " + this.props.product.price}
              {" | "}
              <button onClick={() => { this.setState({ editable: true });}}>Edit</button>{" "}
              {" | "}
              <button onClick={() => {this.props.deleteProduct(this.props.product.id);}}>Delete</button>
            </li>
          }
        </div>
    )
  }
}

//-----------------------------------------------------------
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [
        { id: 1, name: "Macbook", price: "1000" },
        { id: 2, name: "iPhone", price: "800" },
        { id: 3, name: "iPad", price: "500" }
      ]
    };
    this.addProduct = this.addProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.editProduct = this.editProduct.bind(this);
  }

  addProduct(name, price) {
    console.log(this.state.products)
    if(this.state.products[this.state.products.length - 1]){
      const id = this.state.products[this.state.products.length - 1].id + 1; 
      this.setState({
        products: [...this.state.products, { id: id, name: name, price: price }]
      });
    } else {
      this.setState({
        products: [...this.state.products, { id: 1, name: name, price: price }]
      });
    }

  }

  editProduct(productId, newName, newPrice, edit) {
    let newProducts = this.state.products; // create copy of the array
    for (var idx = 0; idx < newProducts.length; idx++) {
      // newProducts.map( (product) => {
      if (newProducts[idx].id === productId) {
        newProducts[idx]["name"] = newName;
        newProducts[idx]["price"] = newPrice;
        console.log("in edit product", newProducts);
        return this.setState({
          products: newProducts // set old product into new product
        });
      }
    }
  }

  deleteProduct(productId) {
    console.log(this.state.products);
    // this.state.products.map( (product, index) => {
    for (var idx = 0; idx < this.state.products.length; idx++) {
      if (this.state.products[idx].id === productId) {
        this.state.products.splice(idx, 1);
        return this.setState({
          products: this.state.products
        });
      }
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <h1>Product Manager</h1>
        <Routing products={this.state.products}  
                  addProduct={this.addProduct} 
                  editProduct={this.editProduct}
                  deleteProduct={this.deleteProduct}/>
      </div>
    );
  }
}

export default App;
