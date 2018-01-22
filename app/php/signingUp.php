 <?php
include 'DBconfig.php';

$post = json_decode(file_get_contents('php://input'), TRUE);
$mail = "'".$post['mail']."'";
$pseudo = "'".$post['pseudo']."'";
$mdp = "'".$post['mdp']."'";
$age = $post['age'];
$charge = $post['charge'];
$desc = "'".$post['desc']."'";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM Utilisateur WHERE user_pseudo=".$pseudo.";";

$result = $conn->query($sql);

$sql2 = "SELECT * FROM Utilisateur WHERE user_identifiant=".$mail.";";

$result2 = $conn->query($sql2);

if ($result2->num_rows > 0) {
    while($row = $result2->fetch_assoc()) {
        $res = "Email existe deja";
        echo json_encode($res);
    }
}elseif($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $res = "Pseudo existe deja";
        echo json_encode($res);
    }
}else{
    if($charge == NULL){
        if($desc == "''"){
            $sql = "INSERT INTO Utilisateur(user_pseudo, user_identifiant, user_mdp, user_age) VALUES (".$pseudo.", ".$mail.", PASSWORD(".$mdp."), ".$age.");";
        }else{
            $sql = "INSERT INTO Utilisateur(user_pseudo, user_identifiant, user_mdp, user_age, user_description) VALUES (".$pseudo.", ".$mail.", PASSWORD(".$mdp."), ".$age.", ".$desc.");";
        }
    }else{
        if($desc == "''"){
            $sql = "INSERT INTO Utilisateur(user_pseudo, user_identifiant, user_mdp, user_age, user_chargeMax) VALUES (".$pseudo.", ".$mail.", PASSWORD(".$mdp."), ".$age.", ".$charge.");";
        }else{
            $sql = "INSERT INTO Utilisateur(user_pseudo, user_identifiant, user_mdp, user_age, user_chargeMax, user_description)
        VALUES (".$pseudo.", ".$mail.", PASSWORD(".$mdp."), ".$age.", ".$charge.", ".$desc.");";
        }
    }
    $result = $conn->query($sql);

    if ($result === TRUE){
        $msg = array("msg" => "Plan ajouté");
        $last_id = $conn->insert_id;
    }else{
        $msg = array("msg" => "Pb d'ajout: ".$result);
    }

    echo json_encode($mail);
}
$conn->close();
?>
