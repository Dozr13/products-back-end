let errorMessage = "Oops! Something went wrong. Our engineers have been informed!"



module.exports = {
  create: ( req, res, next ) => {
    // console.log(req.body)
    const dbInstance = req.app.get( 'db' );
    const { name, description, price, image_url } = req.body;

    dbInstance.create_product([ name, description, price, image_url ])
      .then( () => { dbInstance.read_products().then( products => res.status( 200 ).send( products ) )
      })
      .catch( err => {
        res.status( 500 ).send({ errorMessage })
        console.log( err )
      } )
  },

  getOne: ( req, res, next ) => {
    const dbInstance = req.app.get( 'db' );
    const { id } = req.params;

    dbInstance.read_product( +id )
      .then( product => res.status( 200 ).send( product ) )
      .catch( err => {
        res.status( 500 ).send({ errorMessage })
        console.log( err )
      })
  },

  getAll: ( req, res, next ) => {
    const dbInstance = req.app.get( 'db' );

    dbInstance.read_products()
      .then( products => res.status( 200 ).send( products ) )
      .catch( err => {
        res.status( 500 ).send({ errorMessage })
        console.log( err )
      })
  },

  update: ( req, res, next ) => {
    const dbInstance = req.app.get( 'db' );
    const { params, query } = req;

    console.log(params.id, query.desc)
    
    dbInstance.update_product([ params.id, query.desc ])
      .then( () => { dbInstance.read_products().then( products => res.status( 200 ).send( products ) )
      })
      .catch( err => {
        res.status( 500 ).send({ errorMessage })
        console.log( err )
      })
  },

  delete: ( req, res, next ) => {
    const dbInstance = req.app.get( 'db' );
    const { id } = req.params;
    // console.log( req.params )

    dbInstance.delete_product( +id )
      .then( () => { dbInstance.read_products().then( products => res.status( 200 ).send( products ) )
      })
      .catch( err => {
        res.status( 500 ).send({ errorMessage })
        console.log( err )
      })
  }
};