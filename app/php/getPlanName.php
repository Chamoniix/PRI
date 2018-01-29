<?php
include 'DBconfig.php';

$post = json_decode(file_get_contents('php://input'), TRUE);
$id = $post['id'];

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
   die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT plan_nom FROM Plan WHERE plan_id=".$id." ;";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
   // output data of each row
   while($row = $result->fetch_assoc()) {
       $name = $row;
       $json = json_encode($name);
   }
} else {
   $json = json_encode("0 results");
}
echo $json;
$conn->close();
?>
