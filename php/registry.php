<?php
include 'conn.php';
if(isset($_POST['name'])){
    $name=$_POST['name'];
    $result=$conn->query("select*from dengru  where username='$name'");
    $key=$result->num_rows;
    echo $key;
}else{
    echo '没有接收到name值';
};
if(isset($_POST['submit'])){//是否点击了提交按钮
    $user = $_POST['username'];
    $pass = $_POST['password'];
    $conn->query("insert dengru values(default,'$user','$pass')");
    header('location:http://192.168.11.11/tianmao/tianmao/src/login.html');
}
