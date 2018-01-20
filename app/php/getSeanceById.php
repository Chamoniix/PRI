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

$sql = "select *
from Seance_Exo AS s
JOIN Exercice AS e
ON s.exercice_id=e.exercice_id
WHERE seance_id=".$seanceId.";";

$result = $conn->query($sql);

if ($result->num_rows>0) {
   // output data of each row
   while($row[] = $result->fetch_assoc()) {
       $list = $row;
       $json = json_encode($list);
   }

} else {
    echo "0 results";
}
echo $json;
$conn->close();
?>
