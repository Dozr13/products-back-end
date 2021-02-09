import React, { Component } from 'react'

export default class Create extends Component {
  constructor() {
    super()

    this.state = {
      id: 0,
      name: '',
      description: '',
      image_url: '',
      price: 0
    }
  }


  updateState = ( prop, val ) => {
    this.setState({
      [prop]: val
    })
  }


render() {
  

  return (
    <section className="main">
      <div className='main-products'>
        <h3>Name: </h3><input type='text' value={ this.state.name } onChange={ (e) => this.updateState( 'name', e.target.value ) } placeholder="Name" />
        <h3>Description: </h3><input type='text' value={ this.state.description } onChange={ (e) => this.updateState( 'description', e.target.value ) } placeholder="Description" />
        <h3>Image Link: </h3><input type='text' value={ this.state.image_url } onChange={ (e) => this.updateState( 'image_url', e.target.value ) } placeholder="Image Link" />
        <h3>Item Price: </h3><input type='number' value={ this.state.price } onChange={ (e) => this.updateState( 'price', e.target.value ) } placeholder="Item Price" />
        <br />
        <button className='btn create-btn' onClick={ () => this.props.add( this.state ) }>Create</button>
      </div>
    </section>
    )
  }
}
