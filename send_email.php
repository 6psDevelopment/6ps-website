<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    // Email settings
    $to = "youremail@example.com"; // Replace with your email address
    $subject = "New Contact Form Message";
    $headers = "From: " . $email . "\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

    // Email content
    $email_content = "<h2>Contact Form Message</h2>";
    $email_content .= "<strong>Name:</strong> " . $name . "<br>";
    $email_content .= "<strong>Email:</strong> " . $email . "<br>";
    $email_content .= "<strong>Message:</strong> <br>" . nl2br($message);

    // Send email
    if (mail($to, $subject, $email_content, $headers)) {
        echo "Message sent successfully!";
    } else {
        echo "There was an error sending your message.";
    }
}
?>
