import Navi from './Navi';
import ProductList from './ProductList';
import React, { Component } from 'react';
import CategoryList from './CategoryList';
import { Container, Row, Col } from 'reactstrap';
import alertify from "alertifyjs";
import {Route, Switch} from 'react-router-dom';
import NotFound from "./NotFound";
import CartList from "./CartList";
import FormDemo1 from "./FormDemo1";
import FormDemo2 from "./FormDemo2";

export default class App extends Component {
  state = {
    currentCategory: "", 
    products:[],
    cart:[]
  };

  componentDidMount(){
    this.getProducts();
  }

  changeCategory = (category) => {
    this.setState({currentCategory: category});
    this.getProducts(category.id);
  };

  getProducts = (categoryId) =>{
    let url = "http://localhost:3000/products";
    if(categoryId){
      url += "?categoryId=" + categoryId;
    }
    fetch(url)
    .then(response => response.json())
    .then(data => this.setState({products:data}));;
  }; 

  addtoCart = (product) =>{
    /*Burada cart'a ekleme yapiyoruz..*/
    let newCart= this.state.cart;
    var addedItem = newCart.find(c=>c.product.id === product.id);
    if(addedItem){
      addedItem.quantity+=1;
    }else{
      newCart.push({product:product,quantity:1});
    }
    this.setState({cart:newCart});
    alertify.success(product.productName + "added to cart!",1);
    /*Bu yukaridaki kodda 1 yazmasi demek cart'a eklennleri 1 saniye olarak goster diye..*/
  }
  
  removeFromCart=(product)=>{
    let newCart=this.state.cart.filter(c=>c.product.id!==product.id)
    this.setState({cart:newCart})
    alertify.error(product.productName + "remove from cart!");
  }

  render() {
    let productInfo = { title: "ProducList"};
    let categoryInfo = { title: "CategoryList" };
    return (
      <div>
        <Container>
          <Navi removeFromCart={this.removeFromCart} cart={this.state.cart}/>
          <Row>
            <Col xs="3">
              <CategoryList 
                changeCategory={this.changeCategory}  /*Burasi bize Categoryi tiklayip, secmemizi saglar*/
                currentCategory={this.state.currentCategory}  /*Burasi bize en son tikladigimizi listede gosterir*/
                info={categoryInfo} /> {/*Bu kisim bize CategoryLisst yazdirir sol tablonun ustunde.*/}
            </Col>
            <Col xs="9">
              <Switch>
                <Route 
                  exact 
                  path="/"
                  render={props=> (
                    <ProductList 
                    {...props}
                    addtoCart={this.addtoCart}
                    products={this.state.products}   /*Burasi web sitenin Product kismi*/
                    currentCategory={this.state.currentCategory}   /*Burasi web sitenin Category kismi*/
                    info={productInfo} />
                  )}
                  />
                <Route 
                  exact 
                  path="/cart" 
                  render={props=> (
                    <CartList 
                    {...props}
                    cart={this.state.cart}   /*Burasi web sitenin Product kismi*/
                    removeFromCart={this.removeFromCart}
                    />
                  )} />
                  <Route path="/form1" component={FormDemo1}/>
                  <Route path="/form2" component={FormDemo2}/>
                <Route component={NotFound}/>
              </Switch>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}