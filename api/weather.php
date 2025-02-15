<?php
include "config.php";
header('Content-Type: application/json');

// Get weather for Bangladesh (Default: Dhaka)
$city = isset($_GET['city']) ? $_GET['city'] : "Dhaka";
$url = "https://api.openweathermap.org/data/2.5/weather?q=$city,bangladesh&appid=" . OPENWEATHER_API_KEY . "&units=metric";

// Fetch and return data
$weather_data = file_get_contents($url);
if ($weather_data) {
    echo $weather_data;
} else {
    echo json_encode(["status" => "error", "message" => "Failed to fetch weather data"]);
}
?>