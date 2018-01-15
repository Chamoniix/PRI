<?php
include 'DBconfig.php';

// Create connection 
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT 	date_seance 
FROM Seance_Ut as s
JOIN Utilisateur as u
ON s.user_id = u.user_id
WHERE u.user_identifiant = 'hugo';";

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