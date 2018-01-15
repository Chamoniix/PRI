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

$sql = "SELECT * FROM Objectif o INNER JOIN Obj_Activite oa ON (o.objectif_id=oa.objectif_id) INNER JOIN Activite a ON (a.activite_id=oa.activite_id) WHERE a.activite_id=".$id." ;";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
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