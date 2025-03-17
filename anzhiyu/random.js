var posts=["2025/03/16/1/","2025/03/02/复习/","2024/12/19/hello-world/","2025/01/01/客观题/","2025/01/05/数据结构/","2024/12/30/编程题/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };