var posts=["post/7517.html","post/ed232872.html","post/2534.html","post/79666db.html"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };