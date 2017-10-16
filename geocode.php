<?php


if (!empty($_GET['location'])) {
//    if (!empty($_REQUEST["location"])) {

    /**
     * Here we build the url we'll be using to access the google maps api
     */
    $maps_url = 'https://' .
        'maps.googleapis.com/' .
        'maps/api/geocode/json' .
        '?address=' . urlencode($_GET['location']) .
//        '?address=' . urlencode($_REQUEST["location"]) .
        '&key=AIzaSyCLsyDZdD3IbsgZwRyn8c9KcWsoGBJRN7I';
    $maps_json = file_get_contents($maps_url);
    $maps_array = json_decode($maps_json, true);
    $lat = $maps_array['results'][0]['geometry']['location']['lat'];
    $lng = $maps_array['results'][0]['geometry']['location']['lng'];
}

if (!empty($maps_array)) {
    $countln = count($maps_array['results']);
    foreach ($maps_array['results'] as $key => $result) {
        echo '<p id="countln" class="presult">'.'Record nr.: '.$countln.'</p>';
        echo '<p id="longname_'.$countln.'" class="presult">' .$result['address_components'][1]['long_name']. '</p>';
        echo '<p id="lat" class="presult">' .$result['geometry']['location']['lat']. '</p>';
        echo '<p id="lng" class="presult">' .$result['geometry']['location']['lng']. '</p>';
        $countln = $countln - 1;
        echo '<br/>';
    }
    echo '<button id="clearGeocode" onclick="clearGeocode()">Clear input</button>';
    echo '<br/><br/>';
}

?>
