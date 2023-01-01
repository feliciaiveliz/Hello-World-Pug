const express = require('express');  // function to create an application object
const morgan = require('morgan');
const app = express();

const COUNTRY_DATA = [
  {
    path: "/english",
    flag: "flag-of-United-States-of-America.png",
    alt: "US Flag",
    title: "Go to US English site",
  },
  {
    path: "/french",
    flag: "flag-of-France.png",
    alt: "Drapeau de la france",
    title: "Aller sur le site français",
  },
  {
    path: "/serbian",
    flag: "flag-of-Serbia.png",
    alt: "Застава Србије",
    title: "Идите на српски сајт",
  },
  {
    path: '/egyptian',
    flag: 'flag-of-Egypt.png',
    alt: 'علم مصر',
    title: 'المتابعة إذهب إلى موقع مصر باللغة العربية'
  },
];

const LANGUAGE_CODES = {
  english: "en-US",
  french: "fr-FR",
  serbian: "sr-Cryl-rs",
  egyptian: 'ar-EG',
};

app.set('views', './views');   // express should look for views in views directory
app.set('view engine', 'pug'); // express should use pug engine

app.use(express.static('public')); // creates middleware function; tells express where to look for static assets; express calls the function everytime an HTTP request is made
// the middleware function takes care of returning the requested asset when the path includes one of the subdirs in public
// called in order

app.use(morgan('common'));

app.locals.currentPathClass = (path, currentPath) => {
  return path === currentPath ? 'current' : '';
}

app.get('/', (req, res) => {  // route handler that gets called when an HTTP request comes in
  res.redirect("/english");        // renders instead of send; renders view template file with arg by converting it to HTML and sending it to the client (browser)
});

app.get('/:language', (req, res) => {
  const language = req.params.language;
  const languageCode = LANGUAGE_CODES[language];

  if (!language) {
    next(new Error(`Language not supported: ${language}`));
  } else {
    res.render(`hello-world-${language}`, {
      countries: COUNTRY_DATA,
      currentPath: req.path,
      language: LANGUAGE_CODES[language],
    });
  }
});

app.use((err, req, res, _next) => {
  console.log(err);
  res.status(404).send(err.message);
});

app.listen(3000, 'localhost', () => {  // app will listen for HTTP requests on port from localhost
  console.log("Listening on port 3000!");
});

