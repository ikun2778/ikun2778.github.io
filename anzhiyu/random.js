var posts=["2024/12/20/bubbleSort/","2024/12/19/encode and decode/","2024/12/19/hello-world/","2024/12/20/pascal/","2024/12/20/swapSort/","2024/12/19/zsb/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };