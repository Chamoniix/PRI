 <?php
include 'DBconfig.php';

$post = json_decode(file_get_contents('php://input'), TRUE);
$zoneid = $post['zoneid'];

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

//  select * from Muscle AS m JOIN Zone_Corps AS z WHERE z.zone_id=m.zone_id;
$sql = "select * from Muscle AS m JOIN Zone_Corps AS z ON z.zone_id=m.zone_id WHERE m.zone_id=". $zoneid .";";

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

//$tab = array("zone" => $zoneid);

//echo json_encode($tab);

//echo ($zoneid);

// echo ("{zone_id: 'Test'}");
$conn->close();
?>
