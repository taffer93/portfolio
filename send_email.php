<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Zbieramy dane z formularza
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);
    
    // Adres e-mail, na który mają być wysyłane wiadomości
    $to = "taffer93@gmail.com"; // Zastąp swoim adresem e-mail
    $subject = "Nowa wiadomość kontaktowa";

    // Treść e-maila
    $body = "Imię: $name\nE-mail: $email\nWiadomość:\n$message";

    // Nagłówki e-maila
    $headers = "From: $email";

    // Wysłanie e-maila
    if (mail($to, $subject, $body, $headers)) {
        echo "Dziękujemy za wiadomość. Skontaktujemy się z Tobą wkrótce.";
    } else {
        echo "Wystąpił problem podczas wysyłania wiadomości. Spróbuj ponownie.";
    }
}
?>
