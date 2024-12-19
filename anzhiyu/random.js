var posts=["2024/12/20/冒泡排序/","2024/12/19/hello-world/","2024/12/19/专升本转段考试相关通知/","2024/12/20/交换排序/","2024/12/19/加密与解密/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };