 <?php
include 'DBconfig.php';

$post = json_decode(file_get_contents('php://input'), TRUE);
$nom = '"'.$post['nom'].'"';
$duree = '"'.$post['duree'].'"';
$niveau = '"'.$post['niveau'].'"';
$obj = $post['obj'];
$info = '"'.$post['info'].'"';
$id = $post['idUser'];

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "INSERT INTO Plan(plan_nom, plan_duree, plan_difficulte, objectif_id, plan_info, createur_id) VALUES(".$nom.", ".$duree.", ".$niveau.", ".$obj.", ".$info.", ".$id.");";

$result = $conn->query($sql);

if ($result === TRUE){
        $msg = array("msg" => "Plan ajouté");
        $last_id = $conn->insert_id;

        $sql = "INSERT INTO Plan_Ut(plan_id, user_id, plan_enCours) VALUES(".$last_id.", ".$id.", 0);";

        $result = $conn->query($sql);

        if($result !== TRUE){
          $last_id = "Pb d'ajout Plan_Ut";
        }
}else{
    $last_id = "Pb d'ajout Plan";
}

echo json_encode($last_id);
$conn->close();
?>
