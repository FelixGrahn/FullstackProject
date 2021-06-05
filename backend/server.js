const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const hamsters = require(path.join(__dirname, './routes/hamsters.js'))


const PORT = process.env.PORT || 1338
const buildfolder = path.join(__dirname, '../build')
// const staticimgs = path.join(__dirname, 'img')


app.use((req, res, next) => {
  console.log(`${req.method}  ${req.url} `, req.params),
  next()
})

app.use( express.json() )
app.use( cors() )
app.use( express.static(buildfolder) )
// app.use( '/img', express.static(staticimgs) )


app.use('/hamsters', hamsters)

app.get('/', (req, res) => {
  res.send('hello from server')
})

app.get('*', (req, res) => {
  console.log("detta kommer från app.get * efter app.use");
  res.sendFile(path.join(__dirname, '../build/index.html'))
})


// app.use(errorHandler)
// function erroeHandler (err, req, res, next) {
//   console.log('error');
//
//   if (res.headersSent) {
//     return next(err)
//   }
//
//   res.status(500)
//   res.send({message: 'error', error: err})
// }


app.listen(PORT, () => (
  console.log('server is listening on port ' + PORT)
))
