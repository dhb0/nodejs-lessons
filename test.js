const mongoose = require('mongoose')

const Post = require('./models/post')

mongoose.connect('mongodb://localhost/nodeblog_test_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})

Post.create({
    title: 'Benim ilk post başlığım',
    content: 'İlk başlığımın içeriği',

},(error,post)=>{
    console.log(error, post);
})