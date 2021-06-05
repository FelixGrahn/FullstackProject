const getdatabase = require('../database.js')
const db = getdatabase()
const express = require('express')
const router = express.Router()


router.get('/', async (req, res) => {
  console.log("enter router.get");
  const hamstersRef = db.collection('hamsters')
  const snapshot = await hamstersRef.get()

  if( snapshot.empty ) {
    res.send([])
    return
  }

  let items = []
  snapshot.forEach(doc => {
    const data = doc.data()
    data.id = doc.id
    items.push( data )

  })
  res.send(items)
})


router.get('/random', async (req, res) => {
  console.log("enter /random");
  const hamstersRef = db.collection('hamsters')
  const snapshot = await hamstersRef.get()


  let items = []
  snapshot.forEach(doc => {
    const data = doc.data()
    data.id = doc.id
    items.push( data )
  })
  var randomobject = items[Math.floor(Math.random() * items.length)];
  console.log(randomobject);
  res.send(randomobject)
})

router.get('/:id', async (req, res) => {
  console.log("enter get/:id");
  var searchid = req.params.id;
  console.log(searchid);

  const hamstersRef = db.collection('hamsters')
  const snapshot = await hamstersRef.get()

  let items = []
  snapshot.forEach(doc => {
    const data = doc.data()
    data.id = doc.id
    if (doc.id == searchid) {
      console.log(doc.id + " is equal to " + searchid);
      items.push( data )
      res.send(data)
    }
  })

  console.log(items);

  if (items == false) {
    console.log("404 logger");
    res.sendStatus(404)
  }
})

router.post('/', async (req, res) => {
  console.log("enter /post-page");
  console.log(req.body);
  const posthamsterobject = req.body;

      if(fullhamster(posthamsterobject) == true){
        console.log("reached the post point");

          const docRef = await db.collection('hamsters').add(posthamsterobject);
          res.send({ id: docRef.id });
      }
      else {
        console.log("inside second if statement");
          res.sendStatus(400);
          return;
      }

})

function fullhamster(hamob) {
  console.log("the beginning of the fullhamster function");

  if (hamob == {}) {
    console.log("first false");
    return false
  }
  else if( !hamob.name || !hamob.age || !hamob.favFood || !hamob.loves || !hamob.imgName || !hamob.wins || !hamob.defeats || !hamob.games )
  {
    console.log("second true");
    return true;
  }
  else {
    console.log(hamob);
    console.log("third false or hamob etc");
    return false
  }
console.log("it never escaped the fullhamster function");
}
  // else if(((hamob.name) && (hamob.age) && (hamob.favFood) && (hamob.loves) && (hamob.imgName) && (hamob.wins || hamob.wins === 0) && (hamob.defeats || hamob.defeats === 0) && (hamob.games || hamob.games === 0)) == true)

router.put('/:id', async (req, res) => {
  console.log("enter /post-put");
  console.log(" after /post-put req.body dvs package " + req.body);
  const bodycontent = req.body;
  var searchid = req.params.id;
  console.log("Searchid " + searchid);
  console.log("BodyContent " + bodycontent);

const docRef = await db.collection('hamsters').doc(searchid).get()

if (!docRef.exists) {
  console.log("inside the 404 if statement");
   return res.sendStatus(404)
}
else if ((bodycontent && Object.keys(bodycontent).length === 0 && bodycontent.constructor === Object)) {
  console.log("inside the 400 if statement");
   return res.sendStatus(400)
}
else {
  console.log("inside the status 200 else statement");
  await db.collection('hamsters').doc(searchid).set(bodycontent, {merge: true})
   return res.sendStatus(200)
}

})

router.delete('/:id', async (req, res) =>{
  console.log("enter delete:id");
  var searchid = req.params.id;
  console.log(searchid);
  const docRef = await db.collection('hamsters').doc(searchid).get();
  if (!docRef.exists) {
    res.sendStatus(404);
    return
  }
  else {
    await db.collection('hamsters').doc(searchid).delete()
      res.sendStatus(200);
  }

})



module.exports = router
