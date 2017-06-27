<?php

    filter_var_array($_POST, FILTER_SANITIZE_STRING);

    if (empty($_POST['action'])) {
        exit;
    }

    $action = $_POST['action'];

    switch ($action) {
        case 'save_email':
            $email = $_POST['email'];

            file_put_contents('emails.txt', $email.PHP_EOL , FILE_APPEND | LOCK_EX);

            break;

        case 'save_phone':
            $phone = $_POST['phone'];

            file_put_contents('phones.txt', $phone.PHP_EOL , FILE_APPEND | LOCK_EX);

            break;

        default:
            exit;
    }