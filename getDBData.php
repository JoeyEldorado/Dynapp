<?php

$db = new SQLite3('joeydb.sq3');
$sql = "SELECT * FROM items";
$result = $db->query($sql);
$nr_db_records = count($result);

echo '<table style="width: 30%"">';
echo '<tr><th>Name</th><th>Price</th></tr>';
while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
    echo '<tr>';
    echo '<td>'.$row['name'].'</td>';
    echo '<td>'.$row['price'].'</td>';
    echo '</tr>';
//    echo $row['name'] . ': $' . $row['price'] . '<br/>';
}
echo '</table>';
unset($db);

?>