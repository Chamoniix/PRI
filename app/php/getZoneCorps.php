 <?php
include 'DBconfig.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM Zone_Corps;";
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