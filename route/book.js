
const router = require('express').Router();
const fetch = require('node-fetch');

router.get("/secrets", (req, res) => {
  res.render("index", {
    title: null,
    subtitle: null,
    price: null,
    image: null,
  });
});

// app.route("/secrets")
//   .get(function (req, res) {
//     axios
//       .get("https://api.itbook.store/1.0/harry")
//       .then(function (result) {
//         res.render("posts", {
//           items: "ko"
//         });
//       })
//       .catch(function (error) {
//         // handle errors appropriately
//         res.render("error", { error });
//       });
//   });
router.post('/secrets', async (req, res) => {
  const city = req.body.city;
  const url_api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a3fa929a5a7fb4365ea46c103e2db342`;

  try {
    await fetch(url_api)
      .then(res => res.json())
      .then(data => {
        if (data.message === 'city not found') {
          res.render('index', {
            city: data.message,
            des: null,
            icon: null,
            temp: null
          })
        } else {
          const city = data.name;
          const des = data.weather[0].description;
          const icon = data.weather[0].icon;
          const temp = data.main.temp;

          res.render('index', {
            city, des, icon, temp
          });
        }
      });

  } catch (err) {
    res.render('index', {
      city: 'something wrong',
      des: null,
      icon: null,
      temp: null
    })
  }

})

router.post("/secrets", async (req, res) => {
  const book = req.body.book;
  const url_api = `https://api.openweathermap.org/data/2.5/weather?q=new&appid=a3fa929a5a7fb4365ea46c103e2db342`;
  try {
    await fetch(url_api)
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "city not found") {
          res.render("index", {
            title: data.message,
            subtitle: null,
            price: null,
            image: null,
          });
        } else {
          const title = data.book.title;
          const subtitle = data.book.subtitle;
          const price = data.book.subtitle;
          const image = data.book.subtitle;

          res.render("index", {
            title,
            subtitle,
            price,
            image,
          });
        }
      });
  } catch (err) {
    res.render("index", {
      title: "something wrong",
      subtitle,
      price,
      image,
    });
  }
});
