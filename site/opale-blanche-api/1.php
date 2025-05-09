<?php
// Chemin absolu sur le serveur
echo "📂 Chemin absolu du fichier : " . __FILE__ . "<br>";

// Chemin du dossier
echo "📁 Dossier du fichier : " . __DIR__ . "<br>";

// Si tu veux afficher l'URL complète (en ligne uniquement)
$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? "https://" : "http://";
$full_url = $protocol . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];

echo "🌐 URL complète : " . $full_url;

