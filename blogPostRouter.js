const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const {BlogPosts} = require('./models');
const { json } = require('body-parser');

BlogPosts.create('mytitle','mycontent','myauthor',20200515)
BlogPosts.create('mytitle2','mycontent2','myauthor2',20200606)

router.get('/:id',(req,res)=>{
    console.log('Getting post ID: '+req.params.id);
    res.json(BlogPosts.get(req.params.id));
});


router.get('/',(req,res)=>{
    console.log('Getting all posts...');
    res.json(BlogPosts.get());
});


router.post('/',jsonParser,(req,res)=>{
    console.log('Publishing new post.');

    const requiredFields = ["title", "content", "author"];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }
    const post = BlogPosts.create(req.body.title,req.body.content,req.body.author,req.body.publishDate);
    res.status(201).json(post);
})


router.delete('/:id',(req,res)=>{
    console.log('Deleting post ID: '+req.params.id);
    BlogPosts.delete(req.params.id);
    res.status(204).end();
})


router.put('/:id',jsonParser,(req,res)=>{
    console.log('Updating post ID: '+req.params.id);
    const requiredFields = ['id','title','content','author','publishDate']
    for (i=0; i<requiredFields.length; i++){
        const field = requiredFields[i];
        if (!(field in req.body)){
            console.log('Fields missing')
            res.status(400).send('Must provide all the fields');
        }
    }
    if(req.params.id !== req.body.id){
        console.log('Variable path doesnt match body id field');
        res.status(400).send('Path variable must match body field id');
    }
    updatedPost = BlogPosts.update({
        id: req.params.id,
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        publishDate: req.body.publishDate
    });
    res.status(202).json(updatedPost).end();
})


module.exports = router;