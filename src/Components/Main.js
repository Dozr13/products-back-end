import React, { Component } from 'react'
import axios from 'axios'

import Create from './Create'

export default class Main extends Component {
  constructor() {
    super()

    this.state = {
      products: []
    }

  }

  componentDidMount() {
    axios.get( '/api/products' )
    .then( ( res ) => { 
      const products = res.data;
      this.setState({ products })
     })
  }

  create = ( product ) => {
    axios.post('/api/products', product)
    .then( ( res ) => this.setState({
      products: res.data
    }))
    .catch( err => {
      console.log( err )
    })
  }

  updateText = ( id, val ) => {
    const editProducts = this.state.products.slice()
    // console.log(editProducts)
    const index = editProducts.findIndex( ( p ) => p.product_id === id )
    let product = editProducts[index]
    // console.log(index)
    product.description = val
    editProducts.splice(index, 1, product)
    this.setState({
      products: editProducts
    }, () => console.log(this.state.products))
  }

  updateBtn = ( id ) => {
    let index = this.state.products.findIndex( ( p ) => p.product_id === id )
    // console.log(index)
    let description = this.state.products[ index ].description
    // console.log(description)
    axios.put( `/api/products/${ id }?desc=${ description }` )
      .then( res => {
        this.setState({
        products: res.data
      })
    })
  }

  delete = ( id ) => {
    // console.log( `id = ${id}` )
    axios.delete( `/api/products/${ id }` )
      .then( res => {
        this.setState({ 
          products: res.data 
        })
      })
      .catch( err => {
        console.log( err )
      })

  }

  render() {
    // console.log(this.state)
    let product = this.state.products.map(( p, i ) => <div className="sectional-products" key={ i }>
      <h2>{ p.name }</h2>
      <img src={ p.image_url } alt={ p.name } />
      <p>{ p.price }</p>
      <h3>Description: </h3>
      <input className="update-input" type="text" value={ p.description } onChange={ (e) => this.updateText( p.product_id, e.target.value ) } />
      <button className="update-btn" onClick={ (e) => this.updateBtn( p.product_id ) }>Update Info</button>
      <br/>
      <button className="remove-btn" onClick={ (e) => this.delete( p.product_id ) }>Remove Product</button>
      </div>
    )

    return (
      <section className='main'>

        { product }

        <Create add={ this.create } />
      </section>
    )
  }
}
