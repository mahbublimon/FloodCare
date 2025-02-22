<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $text = $_POST['text'] ?? '';
    $to = $_POST['to'] ?? 'bn'; // Default to Bangla

    if (empty($text)) {
        echo json_encode(["error" => "No text provided"]);
        exit;
    }

    $api_url = "https://libretranslate.com/translate";
    $data = [
        'q' => $text,
        'source' => 'auto',
        'target' => $to,
        'format' => 'text'
    ];

    $options = [
        'http' => [
            'header'  => "Content-Type: application/x-www-form-urlencoded",
            'method'  => 'POST',
            'content' => http_build_query($data),
        ]
    ];
    $context  = stream_context_create($options);
    $response = file_get_contents($api_url, false, $context);

    echo $response;
}
?>