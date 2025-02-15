<?php
header('Content-Type: application/json');

// Free flood data from Bangladesh Water Development Board (BWDB) or ReliefWeb
$url = "https://reliefweb.int/updates/rss.xml?search=flood+bangladesh";

// Fetch and return data
$flood_data = file_get_contents($url);
if ($flood_data) {
    echo json_encode(["status" => "success", "data" => simplexml_load_string($flood_data)]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to fetch flood data"]);
}
?>