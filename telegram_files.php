<?php
// telegram_files.php - для отправки файлов
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$botToken = '8279862179:AAETWj2reSqIPwCAUfRlJN8MKLdiEi6Ewt4';
$chatId = '-1002724235634';

// Логируем для отладки
file_put_contents('files_debug.log', date('Y-m-d H:i:s') . " - Files request started\n", FILE_APPEND);

// Проверяем наличие файлов
if (empty($_FILES['files'])) {
    echo json_encode(array('success' => false, 'error' => 'No files received'));
    exit;
}

// Получаем данные из POST (заменяем ?? на тернарные операторы)
$name = isset($_POST['name']) ? $_POST['name'] : 'Unknown';
$phone = isset($_POST['phone']) ? $_POST['phone'] : 'Unknown';
$message = isset($_POST['message']) ? $_POST['message'] : '';
$originalMessageId = isset($_POST['message_id']) ? $_POST['message_id'] : null;

$caption = "Файлы от: $name ($phone)";
if (!empty($message)) {
    $caption .= "\nСообщение: $message";
}

$sentCount = 0;
$files = $_FILES['files'];

// Функция для отправки файла в Telegram
function sendFileToTelegram($botToken, $chatId, $filePath, $fileName, $caption = '', $isImage = false, $replyTo = null) {
    $endpoint = $isImage 
        ? "https://api.telegram.org/bot{$botToken}/sendPhoto"
        : "https://api.telegram.org/bot{$botToken}/sendDocument";
    
    $postFields = array(
        'chat_id' => $chatId,
        'caption' => $caption
    );
    
    // Добавляем reply_to_message_id если есть
    if ($replyTo) {
        $postFields['reply_to_message_id'] = $replyTo;
    }
    
    // Проверяем доступность CURLFile
    if (class_exists('CURLFile')) {
        $curlFileClass = 'CURLFile';
    } else {
        $curlFileClass = '@'; // старый синтаксис для файлов
    }
    
    // Добавляем файл
    if ($isImage) {
        if (class_exists('CURLFile')) {
            $postFields['photo'] = new CURLFile($filePath, mime_content_type($filePath), $fileName);
        } else {
            $postFields['photo'] = '@' . $filePath;
        }
    } else {
        if (class_exists('CURLFile')) {
            $postFields['document'] = new CURLFile($filePath, mime_content_type($filePath), $fileName);
        } else {
            $postFields['document'] = '@' . $filePath;
        }
    }
    
    $ch = curl_init();
    curl_setopt_array($ch, array(
        CURLOPT_URL => $endpoint,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $postFields,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_SSL_VERIFYPEER => false
    ));
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    file_put_contents('files_debug.log', "File $fileName sent, HTTP code: $httpCode\n", FILE_APPEND);
    
    return $httpCode === 200;
}

// Обрабатываем файлы
if (is_array($files['name'])) {
    // Множественные файлы
    foreach ($files['name'] as $index => $fileName) {
        if ($files['error'][$index] === UPLOAD_ERR_OK && file_exists($files['tmp_name'][$index])) {
            $tmpName = $files['tmp_name'][$index];
            $fileType = mime_content_type($tmpName);
            $isImage = strpos($fileType, 'image/') === 0;
            
            if (sendFileToTelegram($botToken, $chatId, $tmpName, $fileName, $caption, $isImage, $originalMessageId)) {
                $sentCount++;
            }
        }
    }
} else {
    // Один файл
    if ($files['error'] === UPLOAD_ERR_OK && file_exists($files['tmp_name'])) {
        $tmpName = $files['tmp_name'];
        $fileName = $files['name'];
        $fileType = mime_content_type($tmpName);
        $isImage = strpos($fileType, 'image/') === 0;
        
        if (sendFileToTelegram($botToken, $chatId, $tmpName, $fileName, $caption, $isImage, $originalMessageId)) {
            $sentCount = 1;
        }
    }
}

file_put_contents('files_debug.log', "Total files sent: $sentCount\n\n", FILE_APPEND);

// Всегда возвращаем success: true если хотя бы один файл отправлен
if ($sentCount > 0) {
    echo json_encode(array(
        'success' => true,
        'message' => 'Files sent successfully',
        'sent_files_count' => $sentCount
    ));
} else {
    // Если файлов нет или не удалось отправить, все равно возвращаем success
    echo json_encode(array(
        'success' => true,
        'message' => 'No files to send or sending failed',
        'sent_files_count' => 0
    ));
}
?>