<?php
header('Content-Type: application/json');

// Get user location using IP-API.com (Free)
$url = "http://ip-api.com/json/";
$location_data = file_get_contents($url);
if ($location_data) {
    echo $location_data;
} else {
    echo json_encode(["status" => "error", "message" => "Failed to detect location"]);
}
?>