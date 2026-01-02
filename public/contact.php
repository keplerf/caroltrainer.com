<?php
header("Access-Control-Allow-Origin: http://localhost:5173"); 
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");   
header("Access-Control-Allow-Headers: Content-Type");  


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);


// Validation function
function validateForm($data) {
    $errors = [];

    if (empty($data['firstName']))
         $errors[] = "First name is required.";

    if (empty($data['lastName']))
         $errors[] = "Last name is required.";

    if (empty($data['service']))
         $errors[] = "Service is required.";

    if (empty($data['phone']) || !preg_match("/^[0-9]{10}$/", $data['phone']))
         {
        $errors[] = "Phone number must be 10 digits.";
      }
    if (empty($data['email']) || !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Valid email is required.";
    }
    if (empty($data['message'])) $errors[] = "Message is required.";

    return $errors;
}

$errors = validateForm($data);

if (!empty($errors)) {
    echo json_encode([
        "success" => false,
        "errors" => $errors   
    ]);
    exit;
}

$to = "contact@keplerweb.com";
$subject = "New Contact Form Message";
$body = "Name: {$data['firstName']} {$data['lastName']}\n".
        "Phone: {$data['phone']}\n".
        "Email: {$data['email']}\n".
        "Service: {$data['service']}\n".
        "Message:\n{$data['message']}";
$headers = "From: {$data['email']}";

$mailSent = mail($to, $subject, $body, $headers);  

if ($mailSent) {
    echo json_encode(["success" => true, "message" => "Thank you, we have received your message!"]);
} else {
    echo json_encode(["success" => false, "error" => "Failed to send email."]);
}
?>