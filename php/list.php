<?php
include "conn.php";//引入数据库连接代码。
$result = $conn->query("select * from list"); //获取数据的结果集(记录集)
$num = $result->num_rows; //记录集的总条数  22


$pagesize = 10; //单个页面展示的数据条数

$pagenum = ceil($num / $pagesize); //获取页数，一定选择向上取整。 3页


//获取前端的传来的页码，根据页码查询对应的数据，返回给前端。
if (isset($_GET['page'])) {//判断前端传入的页面是否存在，
    $pagevalue = $_GET['page'];//获取页面
} else {
    $pagevalue = 1;//默认为1
}


//根据传入的页码，计算起始的偏移值。
$page = ($pagevalue - 1) * $pagesize;
//$pagevalue=1   $page=0    
//$pagevalue=2   $page=10    
//$pagevalue=3   $page=20    

//limit
//limit接收一个或者两个数字参数(整数)进行数据的截取。
//参1：数据开始位置的索引(从0开始)，偏移量。
//参2：返回的记录集数目。
//limit 0,10  从偏移量0开始 取10条
//limit 10,10  从偏移量10开始 取10条
//limit 20,10 从偏移量20开始 取10条

$sql1 = "select * from list limit $page,$pagesize";
$res = $conn->query($sql1);


//通过二维数组输出
// $result->num_rows; //记录集的条数
// $result->fetch_assoc(); //逐条获取记录集的值，结果是数组。
$arr = array();
for ($i = 0; $i < $res->num_rows; $i++) {
    $arr[$i] = $res->fetch_assoc();
}
echo json_encode($arr);//输出接口
