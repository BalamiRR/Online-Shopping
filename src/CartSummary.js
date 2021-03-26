import React, { Component} from 'react';
import {Link} from "react-router-dom";
import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Badge,
    NavLink,
    NavItem
  } from 'reactstrap';

export default class CartSummary extends Component {
    
    renderSummary(){
        return(
        <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
            Your Cart 
            </DropdownToggle>
            <DropdownMenu right>
                {this.props.cart.map(cartItem=>(
                    <DropdownItem key={cartItem.product.id}>
                        <Badge color="danger" onClick={()=>this.props.removeFromCart(cartItem.product)}>x</Badge>
                        {cartItem.product.productName}
                        <Badge color="success">{cartItem.quantity}</Badge>
                    </DropdownItem>
                ))}
                <DropdownItem>
                    Option 2
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                    <Link to="cart">Go to cart</Link>
                </DropdownItem>
            </DropdownMenu>
        </UncontrolledDropdown>
        );
    }
    
    renderEmptyCart(){
        return(
            <NavItem>
                <NavLink>Empty Cart</NavLink>
            </NavItem>
        );
    }

    render() {
    /* Bu asagisi bize sitemizde eger urun sayisi 0'sa cart'i gosterme, eger urun sayimiz 0'dan buyukse
    cart'i gostericek. Mesela asagidaki div'in icine doldur bisey yaz gorursun*/
        return (<div>{this.props.cart.length>0?this.renderSummary():this.renderEmptyCart()} </div>);
    }
}


                    