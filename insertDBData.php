<?php


// Determine the primary key
$db = new SQLite3('joeydb.sq3');
$sql = "SELECT MAX(id) from items";
$result = $db->query($sql)->fetchArray(SQLITE3_ASSOC);
$pk = $result['MAX(id)'];
$pk += 1;

$DBRecordName = $_POST['DBRecordName'];
$DBRecordPrice = $_POST['DBRecordPrice'];


$sql = "INSERT INTO items VALUES($pk,'$DBRecordName',$DBRecordPrice)";
$result = $db->query($sql);
if(!false) {
echo 'Success!';
} else {
echo 'Failure!';
}
unset($db);


?>