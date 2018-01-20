<?php
include 'DBconfig.php';
$post = json_decode(file_get_contents('php://input'), TRUE);

$seanceId = $post['seanceid'];
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "select exercice_nom, nbr_repetiion, nbr_serie from Exercice as ex join Seance_Exo as se on ex.exercice_id = se.exercice_id where seance_id = ".$seanceId.";";



$result = $conn->query($sql);

if ($result->num_rows > 0) {
   // output data of each row
   while($row[] = $result->fetch_assoc()) {
       $list = $row;
       $json = json_encode($list);
   }
} else {
   $msg = "0 result";
    $json = json_encode($msg);
}
echo $json;
$conn->close();
?>
