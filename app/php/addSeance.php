 <?php
include 'DBconfig.php';
$post = json_decode(file_get_contents('php://input'), TRUE);
//$id = $post['id'];
$name = $post['name'];
$info = $post['info'];
$obj = $post['obj'];
$num = $post['num'];
$nbRepos = $post['nbRepos'];
$date = $post['dateS'];
$planId = $post['planIdS'];

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "INSERT INTO Seance (seance_nom, seance_objectif, seance_numero, seance_jourRepos, seance_info, plan_id) VALUES ('".$name."','".$obj."', ".$num.", ".$nbRepos.",'".$info."',".$planId.");";

$result = $conn->query($sql);
if ($result === TRUE) {
   // echo "New record created successfully";
	$last_id = $conn->insert_id;
	
} else {
   // echo "Error: " . $sql . "<br>" . $conn->error;
}

$sql = "INSERT INTO Seance_Ut (seance_id, user_id, date_seance, seance_fait) VALUES (".$last_id.",1, '".$date."', false);";

if ($conn->query($sql) === TRUE) {
    //echo "New record created successfully";
	
} else {
    //echo "Error: " . $sql . "<br>" . $conn->error;
}

echo json_encode($last_id);
$conn->close();
?> 