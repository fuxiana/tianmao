<?php
include 'conn.php';
//获取前端的用户名和秘密
if(isset($_POST['user']) && isset($_POST['pass'])){
    $user = $_POST['user'];
    $pass = $_POST['pass'];
    //将用户名和密码放入数据库进行查询，查询到了可以登录，否则登录失败。
    $result=$conn->query("select * from dengru where username='$user' and password='$pass' ");
    if($result->fetch_assoc()){//登录成功
        echo true;
    }else{
        echo false;
    }
}
