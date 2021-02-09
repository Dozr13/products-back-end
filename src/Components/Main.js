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

  delete = ( id ) => {
    axios.delete(`/api/products/${ id }`)
      .then( res => {
        // console.log(res)
        // console.log(res.data)

        const products = this.state.products.filter( product => product.id !== id)
        this.setState({ products })
      })
      .catch( err => {
        console.log( err )
      })

    // .then( res => {
    //   // console.log( res.data )
    //   this.setState(previousState => {
    //     return {
    //       products: previousState.products.filter( p => p.id !== this.products.id )
    //     }
    //   })
    // })
    // .catch( err => {
    //   console.log( err )
    // })
  }

  render() {

    let product = this.state.products.map(( p, i ) => <div key={ i }>
      <h2>{ p.name }</h2>
      <img src={ p.image_url } alt={ p.name } />
      <p>{ p.description }</p>
      <p>{ p.price }</p>
      <button className="btn remove-btn" onClick={ (e) => this.delete( product.id ) }>Remove Product</button>
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
