var posts=["post/ed232872.html","post/7517.html","post/79666db.html","post/2534.html"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };