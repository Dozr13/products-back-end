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
      this.setState({
        products: res.data
      })
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
      // console.log( res.data )
      this.setState({
        products: res.data
      })
    })
    .catch( err => {
      console.log( err )
    })
  }

  render() {

    let product = this.state.products.map(( p, i ) => {
      return (
      <div key={ i }>
      <h2>{ p.name }</h2>
      <img src={ p.image_url } alt={ p.name } />
      <p>{ p.price }</p>
      <p>{ p.description }</p>
      </div>
      )
    })

    return (
      <section className='main'>
        { product }
        <Create add={ this.create }  delete={ this.delete } />
      </section>
    )
  }
}
