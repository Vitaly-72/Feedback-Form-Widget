<?php
// telegram_simple.php - для отправки текстовых сообщений
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$botToken = '{{BOT_TOKEN}}';
$chatId = '{{CHAT_ID}}';

// Получаем данные
$input = json_decode(file_get_contents('php://input'), true);

if (!$input || empty($input['name']) || empty($input['phone'])) {
    echo json_encode(array('success' => false, 'error' => 'Invalid data'));
    exit;
}

// Формируем сообщение
$message = "🆕 НОВАЯ ЗАЯВКА\n";
$message .= "──────────────\n";
$message .= "👤 Имя: " . (isset($input['name']) ? $input['name'] : '') . "\n";
$message .= "📞 Телефон: " . (isset($input['phone']) ? $input['phone'] : '') . "\n";

if (!empty($input['message'])) {
    $message .= "💬 Сообщение: " . $input['message'] . "\n";
}

if (!empty($input['filesCount'])) {
    $message .= "📎 Файлов: " . $input['filesCount'] . "\n";
    if (!empty($input['fileNames'])) {
        $message .= "📂 Файлы: " . implode(', ', $input['fileNames']) . "\n";
    }
}

$message .= "──────────────\n";
$message .= "🕒 " . date('d.m.Y H:i:s') . "\n";
$message .= "🌐 " . (isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : 'unknown');

// Отправляем в Telegram
$url = "https://api.telegram.org/bot{$botToken}/sendMessage";
$data = array('chat_id' => $chatId, 'text' => $message);

$ch = curl_init();
curl_setopt_array($ch, array(
    CURLOPT_URL => $url,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => $data,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 10,
    CURLOPT_SSL_VERIFYPEER => false
));

$result = curl_exec($ch);
curl_close($ch);

if ($result) {
    $resultData = json_decode($result, true);
    if ($resultData['ok']) {
        echo json_encode(array(
            'success' => true,
            'message' => 'Sent!',
            'message_id' => $resultData['result']['message_id'],
            'has_files' => !empty($input['filesCount'])
        ));
    } else {
        echo json_encode(array('success' => false, 'error' => 'Telegram error: ' . (isset($resultData['description']) ? $resultData['description'] : 'Unknown error')));
    }
} else {
    echo json_encode(array('success' => false, 'error' => 'Request failed'));
}

?>
