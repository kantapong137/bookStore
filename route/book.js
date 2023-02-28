const router = require('express').Router();
const fetch = require('node-fetch');
require('dotenv').config()

router.get('/', (req, res) => {
  res.render('index', {
    bookInfo: null,
  });
});

router.post('/', async (req, res) => {
  const bookInfo = req.body.bookInfo;
  const url_api = `https://api.itbook.store/1.0/search/${bookInfo}`;
  try {
    await fetch(url_api)
      .then(res => res.json())
      .then(data => {
        if (data.message === 'bookInfo not found') {
          res.render('index', {
            bookInfo: data.message,
            
          })
        } else {
          const bookInfo = data.books;
          for (const book in bookInfo) {
            console.log(`${book}: ${bookInfo[book].title}`);
          }
          console.log(bookInfo);

          res.render('index', {
            bookInfo
          });
        }
      });

  } catch (err) {
    console.log(err)
    res.render('index', {
      bookInfo: 'something wrong',
    })
  }

})


module.exports = router;