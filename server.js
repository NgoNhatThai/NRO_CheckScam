import colors from 'colors'
import app from './app'
require('dotenv').config()
app.set('port', process.env.PORT || 3000)

console.log('Starting server...')
console.log('PORT:', app.get('port'))
console.log('Environment:', process.env.NODE_ENV)

const server = app
  .listen(app.get('port'), () => {
    console.log(`Express running → PORT ${server.address().port}`.rainbow)
  })
  .on('error', (err) => {
    console.error(`Error starting server: ${err.message}`)
  })
