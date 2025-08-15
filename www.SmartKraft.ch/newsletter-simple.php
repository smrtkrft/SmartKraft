<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Sadece POST isteklerini kabul et
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Email verilerini al
$input = json_decode(file_get_contents('php://input'), true);

if (!$input || !isset($input['email'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Email is required']);
    exit;
}

// Email doğrulama
$email = filter_var(trim($input['email']), FILTER_VALIDATE_EMAIL);

if (!$email) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email format']);
    exit;
}

// Data klasörü oluştur
$dataDir = __DIR__ . '/data';
if (!file_exists($dataDir)) {
    mkdir($dataDir, 0755, true);
}

$subscribersFile = $dataDir . '/subscribers.json';

// Mevcut aboneleri yükle
$subscribers = [];
if (file_exists($subscribersFile)) {
    $subscribers = json_decode(file_get_contents($subscribersFile), true) ?: [];
}

// Mevcut kayıtları gizlilik için normalize et: IP bilgilerinin tutulmaması
foreach ($subscribers as &$s) {
    if (is_array($s) && array_key_exists('ip', $s)) {
        unset($s['ip']);
    }
}
unset($s);

// Email zaten var mı kontrol et
foreach ($subscribers as $subscriber) {
    if ($subscriber['email'] === $email) {
        echo json_encode(['success' => false, 'message' => 'Email already subscribed']);
        exit;
    }
}

// Yeni abone ekle
$newSubscriber = [
    'email' => $email,
    'date' => date('Y-m-d H:i:s')
];

$subscribers[] = $newSubscriber;

// Dosyaya kaydet
if (file_put_contents($subscribersFile, json_encode($subscribers, JSON_PRETTY_PRINT))) {
    echo json_encode([
        'success' => true, 
        'message' => 'Successfully subscribed',
        'total' => count($subscribers)
    ]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to save subscription']);
}
?>
