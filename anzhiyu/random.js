var posts=["2024/12/30/编程题/","2024/12/19/hello-world/","2025/01/05/数据结构/","2025/01/01/客观题/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };