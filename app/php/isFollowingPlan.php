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

$sql = "SELECT * FROM Plan_Ut WHERE user_id=".$id." ;";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
   echo json_encode(TRUE);
} else {
   echo json_encode(FALSE);
}
$conn->close();
?>
