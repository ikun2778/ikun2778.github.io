var posts=["2024/12/19/1/","2024/12/19/hello-world/","2024/12/19/2/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };