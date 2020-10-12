<?php
include "conn.php";
if (isset($_GET['sid'])) {
    $sid = $_GET['sid']; //接收首页传入的sid
    $result = $conn->query("select * from list where sid=$sid");
    echo json_encode($result->fetch_assoc());
}
