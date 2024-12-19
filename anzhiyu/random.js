var posts=["2024/12/19/2/","2024/12/19/1/","2024/12/19/hello-world/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };