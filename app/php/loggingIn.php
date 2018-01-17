 <?php
include 'DBconfig.php';

$post = json_decode(file_get_contents('php://input'), TRUE);
$id = "'".$post['id']."'";
$password = "'".$post['password']."'";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    //die("Connection failed: " . $conn->connect_error);
    echo json_encode($conn->connect_error);
}
/*
$sql = "SELECT user_id FROM Utilisateur WHERE (user_pseudo=".$id." OR user_identifiant=".$id.") AND user_mdp=".$password.";";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row[] = $result->fetch_assoc()) {
        $res = $row;
    }
}else{
    $res = false;
}
echo json_encode($res);
$conn->close();*/
?>