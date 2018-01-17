<?php
include 'DBconfig.php';

$post = json_decode(file_get_contents('php://input'), TRUE);
$userid = $post['userid'];

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
   die("Connection failed: " . $conn->connect_error);
}

//  select * from Muscle AS m JOIN Zone_Corps AS z WHERE z.zone_id=m.zone_id;
$sql = "
SELECT *
FROM (
  SELECT plan_id,
    pu.user_id,
    plan_enCours,
    date_debut, date_fin,
    user_com,
    user_note,
    user_pseudo,
    user_identifiant,
    user_mdp,
    user_age,
    user_chargeMax,
    user_description
  FROM
    Plan_Ut AS pu
    JOIN Utilisateur AS u
    ON u.user_id=pu.user_id
) AS jpu
JOIN Plan AS p
ON p.plan_id=jpu.plan_id
WHERE user_id=".
$userid;


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
