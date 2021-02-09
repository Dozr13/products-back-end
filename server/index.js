require( 'dotenv' ).config()
const express = require( 'express' )
const massive = require( 'massive' );
const products_controller = require( './controllers/products_controller' );

const app = express();

const { SERVER_PORT, CONNECTION_STRING } = process.env;


app.use( express.json() )

// ! Every time install massive with DevMountain, will use massive function below in order to connect db
massive({
  connectionString: CONNECTION_STRING,
  ssl: { 
    rejectUnauthorized: false
  }
})
.then( dbInstance => {
  app.set( 'db', dbInstance )
  console.log("db connected")
})
.catch( err => console.log( err ) )


app.post( `/api/products`, products_controller.create )
app.get( `/api/products`, products_controller.getAll )
app.get( `/api/products/:id`, products_controller.getOne )
app.put( `/api/products/:id`, products_controller.update )
app.delete( `/api/products/:id`, products_controller.delete )



app.listen( SERVER_PORT, () => {
  console.log( `Hi! I'm your server, listening on port: ${ SERVER_PORT }` )
})