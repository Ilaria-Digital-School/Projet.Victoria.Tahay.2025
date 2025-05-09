<?php
ini_set('session.cookie_samesite', 'None');
ini_set('session.cookie_secure', '1');

error_log("✅ config-clean.php appelé");
 
if (session_status() === PHP_SESSION_NONE) {
    session_set_cookie_params([
        'lifetime' => 0,
        'path' => '/',
        'secure' => true,
        'httponly' => true,
        'samesite' => 'None'
    ]);
    session_start();
}
