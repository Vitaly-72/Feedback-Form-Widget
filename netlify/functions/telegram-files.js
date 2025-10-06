const fetch = require('node-fetch');
const FormData = require('form-data');

exports.handler = async function(event, context) {
  const headers = {
    'Access-Control-Allow-Origin': 'https://vitaly-72.github.io',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!BOT_TOKEN || !CHAT_ID) {
      throw new Error('Telegram credentials not configured');
    }

    // Парсим multipart/form-data
    const boundary = event.headers['content-type'].split('boundary=')[1];
    const bodyBuffer = Buffer.from(event.body, 'base64');
    
    const parts = bodyBuffer.toString().split(`--${boundary}`);
    let fileBuffer = null;
    let filename = 'file';
    let message = '';

    for (const part of parts) {
      if (part.includes('name="file"') && part.includes('filename="')) {
        const filenameMatch = part.match(/filename="([^"]+)"/);
        if (filenameMatch) filename = filenameMatch[1];
        
        const fileMatch = part.match(/\r\n\r\n(.*)$/s);
        if (fileMatch) {
          fileBuffer = Buffer.from(fileMatch[1].trim(), 'binary');
        }
      }
      
      if (part.includes('name="message"')) {
        const messageMatch = part.match(/\r\n\r\n(.*)$/s);
        if (messageMatch) message = messageMatch[1].trim();
      }
    }

    if (!fileBuffer) {
      throw new Error('No file provided');
    }

    // Отправляем файл в Telegram
    const formData = new FormData();
    formData.append('chat_id', CHAT_ID);
    formData.append('document', fileBuffer, { filename });
    
    if (message) {
      formData.append('caption', `💌 Сообщение: ${message}`);
    }

    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendDocument`, {
      method: 'POST',
      body: formData
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
        message: 'Файл отправлен!' 
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
