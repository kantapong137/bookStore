const router = require('express').Router();
const fetch = require('node-fetch');
require('dotenv').config()

router.get('/', (req, res) => {
  res.render('index', {
    city: null,
    des: null,
    icon: null,
    temp: null
  });
});

router.post('/', async (req, res) => {
  const city = req.body.city;
  const url_api = `https://api.itbook.store/1.0/search/${city}`;
  try {
    await fetch(url_api)
      .then(res => res.json())
      .then(data => {
        if (data.message === 'city not found') {
          res.render('index', {
            city: data.message,
            
          })
        } else {
          const city = data.books;
          for (const book in city) {
            console.log(`${book}: ${city[book].title}`);
          }
          console.log(city);

          res.render('index', {
            city
          });
        }
      });

  } catch (err) {
    console.log(err)
    res.render('index', {
      city: 'something wrong',
      
    })
  }

})


module.exports = router;