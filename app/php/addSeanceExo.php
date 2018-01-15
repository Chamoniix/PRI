<?php
include 'DBconfig.php';
$post = json_decode(file_get_contents('php://input'), TRUE);
//$id = $post['id'];
$sId = $post['sId'];
$idE = $post['idE']; 
$nRep = $post['nRep'];
$nSerie = $post['nSerie'];

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
$json = json_encode("connecte");
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "INSERT INTO Seance_Exo (seance_id, exercice_id, nbr_repetiion, nbr_serie) VALUES (".$sId.",".$idE.", ".$nRep.", ".$nSerie.");";

$result = $conn->query($sql);
if ($result === TRUE) {
    //echo "New record created successfully";
} else {
    //echo "Error: " . $sql . "<br>" . $conn->error;
	//echo "ca marche pas"
}

echo $json;
$conn->close();
?> 
