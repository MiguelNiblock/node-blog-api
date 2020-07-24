express = require('express');

const app = express();

morgan = require('morgan');
app.use(morgan('common'));

const blogPostRouter = require('./blogPostRouter')

app.use('/blog-posts',blogPostRouter);

app.listen(process.env.PORT || 8080,()=>{
    console.log(`Listening to port ${process.env.PORT || 8080}`)
});