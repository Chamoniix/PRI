 <?php
include 'DBconfig.php';

$post = json_decode(file_get_contents('php://input'), TRUE);
$nom = "'".$post['nom']."'";
$duree = "'".$post['duree']."'";
$niveau = "'".$post['niveau']."'";
$obj = $post['obj'];
$info = "'".$post['info']."'";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "INSERT INTO Plan(plan_nom, plan_duree, plan_difficulte, objectif_id, plan_info) VALUES(".$nom.", ".$duree.", ".$niveau.", ".$obj.", ".$info.");";

$result = $conn->query($sql);

if ($result === TRUE){
        $msg = array("msg" => "Plan ajouté");
        $last_id = $conn->insert_id;
}else{
    $msg = array("msg" => "Pb d'ajout: ".$result);
}

echo json_encode($last_id);
$conn->close();
?> 