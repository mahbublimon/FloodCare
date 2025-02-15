<?php
include "config.php";
header('Content-Type: application/json');

$text = isset($_POST['text']) ? $_POST['text'] : '';
if (!$text) {
    echo json_encode(["status" => "error", "message" => "No text provided"]);
    exit;
}

// Use LibreTranslate Free API
$data = [
    "q" => $text,
    "source" => "en",
    "target" => "bn",
    "format" => "text"
];

$options = [
    "http" => [
        "header" => "Content-Type: application/json",
        "method" => "POST",
        "content" => json_encode($data)
    ]
];

$context = stream_context_create($options);
$response = file_get_contents(LIBRETRANSLATE_URL, false, $context);

if ($response) {
    echo $response;
} else {
    echo json_encode(["status" => "error", "message" => "Translation failed"]);
}
?>