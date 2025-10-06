const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  // Разрешаем CORS
  const headers = {
    'Access-Control-Allow-Origin': 'https://vitaly-72.github.io',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Обработка preflight запросов
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Только POST запросы
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const data = JSON.parse(event.body);
    const { name, phone, email, message, pageUrl } = data;

    // Ваши секреты из переменных окружения
    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!BOT_TOKEN || !CHAT_ID) {
      throw new Error('Telegram credentials not configured');
    }

    // Формируем сообщение для Telegram
    const telegramMessage = `
📧 Новое сообщение из формы обратной связи:

👤 Имя: ${name || 'Не указано'}
📞 Телефон: ${phone || 'Не указано'}
📧 Email: ${email || 'Не указано'}
📝 Сообщение: ${message || 'Не указано'}
🌐 Страница: ${pageUrl || 'Не указано'}
    `.trim();

    // Отправляем в Telegram
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: telegramMessage,
        parse_mode: 'HTML'
      })
    });

    const result = await response.json();

    if (!result.ok) {
      throw new Error(result.description || 'Telegram API error');
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        message: 'Сообщение отправлено!' 
      })
    };

  } catch (error) {
    console.error('Error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        success: false, 
        error: error.message || 'Internal server error' 
      })
    };
  }
};
