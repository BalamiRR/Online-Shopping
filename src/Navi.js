import React from 'react';
import CartSummary from './CartSummary';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import {Link} from "react-router-dom";

export default class Navi extends React.Component{
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render(){
        return (
            <div>
              <Navbar color="light" light expand="md">
                <NavbarBrand href="/">Northwind App</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                  <Nav className="ml-auto" navbar>
                    <NavItem>
                      <NavLink>
                        <Link to="form1">Form Demo 1 </Link>
                        <Link to="form2">Form Demo 2</Link>
                      </NavLink>
                    </NavItem>
                    <CartSummary 
                      removeFromCart={this.props.removeFromCart} 
                      cart={this.props.cart}/>
                  </Nav>
                </Collapse>
              </Navbar>
            </div>
          );
        }
    }