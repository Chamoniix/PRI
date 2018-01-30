<?php
include 'DBconfig.php';

$post = json_decode(file_get_contents('php://input'), TRUE);
$materielid = $post['materielid'];
$muscleid = $post['muscleid'];

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
   die("Connection failed: " . $conn->connect_error);
}

$sql =
"SELECT DISTINCT em.exercice_id,
  exercice_nom,
  exercice_info,
  exercice_video,
  createur_id,
  materiel_id
FROM (
  SELECT DISTINCT m.muscle_id,
    m.exercice_id,
    e.exercice_nom,
    e.exercice_info,
    e.exercice_video,
    e.createur_id
  FROM Muscle_Ex AS m
  JOIN Exercice AS e
  ON m.exercice_id=e.exercice_id) AS em
JOIN Materiel_Ex AS mat
ON em.exercice_id=mat.exercice_id
WHERE muscle_id" . $muscleid .
" AND materiel_id=" .$materielid;

/*
SELECT DISTINCT em.exercice_id,
  exercice_nom,
  exercice_info,
  exercice_video,
  createur_id,
  materiel_id
FROM (
  SELECT DISTINCT m.muscle_id,
    m.exercice_id,
    e.exercice_nom,
    e.exercice_info,
    e.exercice_video,
    e.createur_id
  FROM Muscle_Ex AS m
  JOIN Exercice AS e
  ON m.exercice_id=e.exercice_id) AS em
JOIN Materiel_Ex AS mat
ON em.exercice_id=mat.exercice_id
WHERE muscle_id=ANY(SELECT materiel_id FROM Materiel)
 AND materiel_id=2;
*/

$result = $conn->query($sql);

if ($result->num_rows > 0) {
   // output data of each row
   while($row[] = $result->fetch_assoc()) {
       $list = $row;
       $json = json_encode($list);
   }
} else {
   $json = json_encode("0 results");
}
echo $json;
$conn->close();
?>
