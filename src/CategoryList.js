import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

export default class CategoryList extends Component {
    state = {
        categories: []
    };

    componentDidMount(){
        this.getCategories();
    }

    getCategories = () =>{
        fetch("http://localhost:3000/categories")
        .then(response => response.json())
        .then(data => this.setState({categories:data}));;
    }

    render() {
        return (
            <div>
                <h3>{this.props.info.title}</h3>
                <ListGroup>
                    {/** Her bir kkategory icin uret diyoruz ve bizim iki tane category imiz var onlarin ciktisini alicaz 
                     bu active yazan kisim ise bize tikladigimizda buttonun ustunde mavi isik cikmasini saglar*/
                    this.state.categories.map(category => (
                        <ListGroupItem active={category.categoryName===this.props.currentCategory?true:false}
                            onClick={()=>this.props.changeCategory(category)} 
                            key={category.id}
                        > 
                            {category.categoryName}
                        </ListGroupItem>
                    ))}
                </ListGroup>
                {/*<h4>{this.props.currentCategory}</h4>*/}
            </div>
        )
    }
}