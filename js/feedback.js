// Создаем и добавляем стили
const feedbackStyles = `
.feedback-floating-btn {
    position: fixed;
    bottom: 20px;
    left: 20px;
    width: 60px;
    height: 60px;
    background: #650b10;
    color: white;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    z-index: 10000;
    transition: all 0.3s ease;
    animation: feedback-pulse 2s infinite;
    border: none;
}

.feedback-floating-btn:hover {
    transform: scale(1.1);
    background: #7a0d14;
}

@keyframes feedback-pulse {
    0% { box-shadow: 0 0 0 0 rgba(101, 11, 16, 0.7); }
    70% { box-shadow: 0 0 0 10px rgba(101, 11, 16, 0); }
    100% { box-shadow: 0 0 0 0 rgba(101, 11, 16, 0); }
}

.feedback-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: none;
    justify-content: center;
    align-items: flex-start; /* Изменено с center на flex-start */
    z-index: 10001;
    overflow-y: auto; /* Добавлено для прокрутки всего оверлея */
    padding: 20px 0; /* Добавлено отступов */
}

.feedback-modal-content {
    background: white;
    width: 90%;
    max-width: 500px;
    max-height: 90vh; /* Ограничение максимальной высоты */
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    animation: feedback-modalAppear 0.3s ease-out;
    margin: auto; /* Центрирование */
    display: flex;
    flex-direction: column;
}

@keyframes feedback-modalAppear {
    from { opacity: 0; transform: translateY(-50px); }
    to { opacity: 1; transform: translateY(0); }
}

.feedback-modal-header {
    background: #650b10;
    color: white;
    padding: 15px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0; /* Запрет уменьшения */
}

.feedback-modal-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0;
}

.feedback-close-btn {
    background: none;
    border: none;
    color: white;
    font-size: 24px;
    cursor: pointer;
    padding: 0;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.feedback-modal-body {
    padding: 20px;
    overflow-y: auto; /* Добавлена прокрутка внутри тела */
    flex-grow: 1; /* Занимает доступное пространство */
}

.feedback-form-group {
    margin-bottom: 20px;
}

.feedback-form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: #555;
}

.feedback-form-control {
    width: 100%;
    padding: 12px 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 16px;
    box-sizing: border-box;
}

.feedback-form-control:focus {
    border-color: #650b10;
    outline: none;
    box-shadow: 0 0 0 2px rgba(101, 11, 16, 0.2);
}

.feedback-textarea {
    min-height: 120px;
    resize: vertical;
    font-family: inherit;
}

.feedback-file-upload {
    position: relative;
    margin-bottom: 10px;
}

.feedback-file-upload-btn {
    background: #f8f9fa;
    color: #555;
    padding: 12px 15px;
    border: 2px dashed #ddd;
    border-radius: 8px;
    cursor: pointer;
    text-align: center;
    display: block;
}

.feedback-file-upload-btn:hover {
    background: #e9ecef;
    border-color: #650b10;
}

.feedback-file-upload input[type="file"] {
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
}

.feedback-file-info {
    font-size: 12px;
    color: #666;
    text-align: center;
    margin-bottom: 10px;
}

.feedback-files-count {
    font-size: 12px;
    color: #650b10;
    font-weight: 500;
}

.feedback-preview-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 10px;
}

.feedback-preview-item {
    position: relative;
    width: 80px;
    height: 80px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    border: 1px solid #ddd;
}

.feedback-preview-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.feedback-preview-file {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #f8f9fa;
    padding: 5px;
    text-align: center;
}

.feedback-preview-file .feedback-icon {
    width: 24px;
    height: 24px;
    color: #650b10;
    margin-bottom: 5px;
}

.feedback-preview-file span {
    font-size: 10px;
    word-break: break-all;
    line-height: 1.2;
    max-width: 100%;
}

.feedback-remove-preview {
    position: absolute;
    top: 3px;
    right: 3px;
    background: rgba(255, 255, 255, 0.9);
    border: none;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 12px;
    color: #ff0000;
    padding: 0;
    line-height: 1;
}

.feedback-checkbox-group {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 20px;
}

.feedback-checkbox-group input[type="checkbox"] {
    margin: 0;
}

.feedback-checkbox-group label {
    margin: 0;
    font-size: 14px;
}

.feedback-checkbox-group a {
    color: #650b10;
    text-decoration: none;
}

.feedback-checkbox-group a:hover {
    text-decoration: underline;
}

.feedback-submit-btn {
    background: #650b10;
    color: white;
    border: none;
    padding: 14px 20px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    width: 100%;
    transition: background 0.3s;
    flex-shrink: 0; /* Запрет уменьшения кнопки */
}

.feedback-submit-btn:hover {
    background: #7a0d14;
}

.feedback-submit-btn:disabled {
    background: #cccccc;
    cursor: not-allowed;
}

.feedback-success-message {
    background: #2ecc71;
    color: white;
    padding: 15px;
    border-radius: 8px;
    text-align: center;
    display: none;
}

.feedback-error-message {
    color: #e74c3c;
    font-size: 14px;
    margin-top: 5px;
    display: none;
}

/* Улучшенные стили для мобильных устройств */
@media (max-width: 576px) {
    .feedback-floating-btn {
        bottom: 80px;
        right: 20px;
        left: auto;
        width: 50px;
        height: 50px;
    }
    
    .feedback-modal-overlay {
        padding: 10px 0; /* Уменьшенные отступы на мобильных */
        align-items: flex-start; /* Выравнивание по верху */
    }
    
    .feedback-modal-content {
        width: 95%;
        margin: 10px;
        max-height: 85vh; /* Уменьшенная максимальная высота на мобильных */
    }
    
    .feedback-modal-body {
        padding: 15px;
        overflow-y: auto; /* Прокрутка на мобильных */
        -webkit-overflow-scrolling: touch; /* Плавная прокрутка на iOS */
    }
    
    .feedback-preview-item {
        width: 70px;
        height: 70px;
    }
    
    .feedback-form-control {
        font-size: 16px; /* Предотвращает масштабирование в iOS */
    }
    
    /* Исправление для iOS */
    @supports (-webkit-touch-callout: none) {
        .feedback-modal-content {
            max-height: -webkit-fill-available;
        }
    }
}

/* Дополнительные исправления для очень маленьких экранов */
@media (max-height: 600px) {
    .feedback-modal-content {
        max-height: 95vh;
    }
    
    .feedback-modal-body {
        padding: 10px;
    }
    
    .feedback-form-group {
        margin-bottom: 15px;
    }
}

/* Предотвращение скролла body когда модальное окно открыто */
body.feedback-modal-open {
    overflow: hidden;
    position: fixed;
    width: 100%;
    height: 100%;
}
`;

// SVG иконки (остаются без изменений)
const feedbackSVGIcons = {
    edit: `<svg viewBox="0 0 24 24" fill="currentColor" style="width: 24px; height: 24px;">
        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
    </svg>`,
    
    paperclip: `<svg viewBox="0 0 24 24" fill="currentColor" style="width: 18px; height: 18px;">
        <path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"/>
    </svg>`,
    
    check: `<svg viewBox="0 0 24 24" fill="currentColor" style="width: 20px; height: 20px;">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
    </svg>`,
    
    close: `<svg viewBox="0 0 24 24" fill="currentColor" style="width: 20px; height: 20px;">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
    </svg>`,
    
    file: `<svg viewBox="0 0 24 24" fill="currentColor" style="width: 24px; height: 24px;">
        <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
    </svg>`,
    
    image: `<svg viewBox="0 0 24 24" fill="currentColor" style="width: 24px; height: 24px;">
        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
    </svg>`
};

// HTML структура (остается без изменений)
const feedbackHTML = `
<div class="feedback-floating-btn" id="feedbackOpenModalBtn">
    ${feedbackSVGIcons.edit}
</div>

<div class="feedback-modal-overlay" id="feedbackModalOverlay">
    <div class="feedback-modal-content">
        <div class="feedback-modal-header">
            <div class="feedback-modal-title">Оформить заявку</div>
            <button class="feedback-close-btn" id="feedbackCloseModalBtn">
                ${feedbackSVGIcons.close}
            </button>
        </div>
        <div class="feedback-modal-body">
            <form id="feedbackForm">
                <div class="feedback-form-group">
                    <label for="feedbackName">Имя *</label>
                    <input type="text" id="feedbackName" class="feedback-form-control" placeholder="Введите ваше имя" required>
                    <div class="feedback-error-message" id="feedbackNameError">Пожалуйста, введите ваше имя</div>
                </div>
                
                <div class="feedback-form-group">
                    <label for="feedbackPhone">Телефон *</label>
                    <input type="tel" id="feedbackPhone" class="feedback-form-control" placeholder="+7 (999) 999-99-99" required>
                    <div class="feedback-error-message" id="feedbackPhoneError">Пожалуйста, введите корректный номер телефона</div>
                </div>
                
                <div class="feedback-form-group">
                    <label for="feedbackMessage">Сообщение</label>
                    <textarea id="feedbackMessage" class="feedback-form-control feedback-textarea" placeholder="Введите ваше сообщение"></textarea>
                </div>
                
                <div class="feedback-form-group">
                    <label>Прикрепить файлы</label>
                    <div class="feedback-file-upload">
                        <div class="feedback-file-upload-btn">
                            ${feedbackSVGIcons.paperclip}
                            <span>Выберите файлы</span>
                        </div>
                        <input type="file" id="feedbackFileInput" multiple accept="image/*,.pdf,.doc,.docx,.txt,.xls,.xlsx,.zip,.rar">
                    </div>
                    <div class="feedback-file-info">Максимальный размер файла: 10MB</div>
                    <div class="feedback-files-count" id="feedbackFilesCount"></div>
                    <div class="feedback-preview-container" id="feedbackPreviewContainer"></div>
                </div>
                
                <div class="feedback-checkbox-group">
                    <input type="checkbox" id="feedbackPrivacyPolicy" required>
                    <label for="feedbackPrivacyPolicy">
                        Я согласен с <a href="https://72parad.ru/политика-безопасности" target="_blank">политикой конфиденциальности</a> *
                    </label>
                </div>
                <div class="feedback-error-message" id="feedbackPolicyError">Необходимо согласие с политикой конфиденциальности</div>
                
                <button type="submit" class="feedback-submit-btn" id="feedbackSubmitBtn">Отправить заявку</button>
            </form>
            
            <div class="feedback-success-message" id="feedbackSuccessMessage">
                ${feedbackSVGIcons.check} Ваша заявка успешно отправлена!
            </div>
        </div>
    </div>
</div>
`;

// Функция для получения иконки файла по типу (остается без изменений)
function getFileIcon(file) {
    if (file.type.startsWith('image/')) {
        return feedbackSVGIcons.image;
    }
    return feedbackSVGIcons.file;
}

// Инициализация виджета
function initFeedbackWidget() {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = feedbackStyles;
    document.head.appendChild(styleSheet);
    
    document.body.insertAdjacentHTML('beforeend', feedbackHTML);
    initFeedbackFunctionality();
}

// Функционал виджета
function initFeedbackFunctionality() {
    const openModalBtn = document.getElementById('feedbackOpenModalBtn');
    const closeModalBtn = document.getElementById('feedbackCloseModalBtn');
    const modalOverlay = document.getElementById('feedbackModalOverlay');
    const feedbackForm = document.getElementById('feedbackForm');
    const fileInput = document.getElementById('feedbackFileInput');
    const filesCount = document.getElementById('feedbackFilesCount');
    const previewContainer = document.getElementById('feedbackPreviewContainer');
    const submitBtn = document.getElementById('feedbackSubmitBtn');
    const successMessage = document.getElementById('feedbackSuccessMessage');
    
    let selectedFiles = [];

    // 🔥 НОВЫЙ КОД - Netlify Functions URLs
    // Замените 'your-site-name' на реальное имя вашего Netlify сайта
    const API_BASE_URL = 'https://sparkly-quokka-0db72a.netlify.app/.netlify/functions';
    const telegramHandlerUrl = `${API_BASE_URL}/telegram-simple`;
    const filesHandlerUrl = `${API_BASE_URL}/telegram-files`;

    console.log('Text handler URL:', telegramHandlerUrl);
    console.log('Files handler URL:', filesHandlerUrl);

    // Открытие/закрытие модального окна
    openModalBtn.addEventListener('click', () => {
        modalOverlay.style.display = 'flex';
        document.body.classList.add('feedback-modal-open'); // Добавлен класс для блокировки скролла
    });
    
    closeModalBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });
    
    function closeModal() {
        modalOverlay.style.display = 'none';
        document.body.classList.remove('feedback-modal-open'); // Удален класс разблокировки скролла
        resetForm();
    }
    
    function resetForm() {
        feedbackForm.reset();
        selectedFiles = [];
        filesCount.textContent = '';
        previewContainer.innerHTML = '';
        successMessage.style.display = 'none';
        feedbackForm.style.display = 'block';
        submitBtn.disabled = false;
        submitBtn.textContent = 'Отправить заявку';
        
        document.querySelectorAll('.feedback-error-message').forEach(el => {
            el.style.display = 'none';
        });
    }
    
    // Обработка файлов с превью (остается без изменений)
    fileInput.addEventListener('change', function() {
        if (this.files.length > 0) {
            const newFiles = Array.from(this.files).filter(file => {
                if (file.size > 10 * 1024 * 1024) {
                    alert(`Файл "${file.name}" слишком большой. Максимальный размер: 10MB`);
                    return false;
                }
                return true;
            });
            
            selectedFiles = [...selectedFiles, ...newFiles];
            updatePreview();
            updateFilesCount();
        }
    });
    
    // Обновление превью файлов (остается без изменений)
    function updatePreview() {
        previewContainer.innerHTML = '';
        
        selectedFiles.forEach((file, index) => {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                const previewItem = document.createElement('div');
                previewItem.className = 'feedback-preview-item';
                previewItem.dataset.index = index;
                
                if (file.type.startsWith('image/')) {
                    previewItem.innerHTML = `
                        <img src="${e.target.result}" alt="${file.name}">
                        <button type="button" class="feedback-remove-preview">${feedbackSVGIcons.close}</button>
                    `;
                } else {
                    previewItem.classList.add('feedback-preview-file');
                    previewItem.innerHTML = `
                        ${getFileIcon(file)}
                        <span>${file.name.length > 15 ? file.name.substring(0, 12) + '...' : file.name}</span>
                        <button type="button" class="feedback-remove-preview">${feedbackSVGIcons.close}</button>
                    `;
                }
                
                previewContainer.appendChild(previewItem);
                
                // Удаление превью
                previewItem.querySelector('.feedback-remove-preview').addEventListener('click', function() {
                    selectedFiles.splice(index, 1);
                    updatePreview();
                    updateFilesCount();
                });
            };
            
            reader.readAsDataURL(file);
        });
    }
    
    function updateFilesCount() {
        filesCount.textContent = selectedFiles.length > 0 ? `Выбрано файлов: ${selectedFiles.length}` : '';
    }
    
    // Валидация и отправка формы (остается без изменений)
    feedbackForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        document.querySelectorAll('.feedback-error-message').forEach(el => {
            el.style.display = 'none';
        });
        
        let isValid = true;
        
        const name = document.getElementById('feedbackName').value.trim();
        if (!name) {
            document.getElementById('feedbackNameError').style.display = 'block';
            isValid = false;
        }
        
        const phone = document.getElementById('feedbackPhone').value.replace(/\D/g, '');
        if (phone.length < 11) {
            document.getElementById('feedbackPhoneError').style.display = 'block';
            isValid = false;
        }
        
        if (!document.getElementById('feedbackPrivacyPolicy').checked) {
            document.getElementById('feedbackPolicyError').style.display = 'block';
            isValid = false;
        }
        
        if (!isValid) return;
        
        submitBtn.disabled = true;
        submitBtn.textContent = 'Отправка...';
        
        try {
            const formData = {
                name: name,
                phone: document.getElementById('feedbackPhone').value,
                message: document.getElementById('feedbackMessage').value.trim(),
                filesCount: selectedFiles.length,
                fileNames: selectedFiles.map(file => file.name),
                pageUrl: window.location.href // Добавлен URL страницы
            };
            
            console.log('Отправка данных формы:', formData);
            
            // 1. Отправляем данные формы (текст) на Netlify Function
            const response = await fetch(telegramHandlerUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            console.log('Ответ сервера (форма):', result);
            
            if (result.success) {
                // 2. Если есть файлы, отправляем их отдельно на Netlify Function
                if (selectedFiles.length > 0) {
                    console.log('Отправка файлов...');
                    try {
                        const fileResult = await sendFilesToServer(selectedFiles, formData);
                        console.log('Результат отправки файлов:', fileResult);
                        
                        if (!fileResult.success) {
                            console.warn('Файлы не были отправлены, но форма отправлена успешно');
                        }
                    } catch (fileError) {
                        console.error('Ошибка отправки файлов:', fileError);
                        // Не прерываем процесс - показываем успех даже если файлы не отправились
                    }
                }
                
                // Успешная отправка (даже если файлы не отправились)
                feedbackForm.style.display = 'none';
                successMessage.style.display = 'block';
                
                setTimeout(() => {
                    closeModal();
                }, 2000);
            } else {
                throw new Error(result.error || 'Ошибка сервера');
            }
            
        } catch (error) {
            console.error('Ошибка:', error);
            alert('Ошибка отправки: ' + error.message);
            submitBtn.disabled = false;
            submitBtn.textContent = 'Отправить заявку';
        }
    });
    
    // Функция для отправки файлов (упрощена для Netlify Functions)
    async function sendFilesToServer(files, formData) {
        console.log('Starting file upload...', {
            filesCount: files.length
        });

        const formDataToSend = new FormData();
        
        formDataToSend.append('name', formData.name);
        formDataToSend.append('phone', formData.phone);
        formDataToSend.append('message', formData.message || '');
        formDataToSend.append('pageUrl', formData.pageUrl || '');
        
        files.forEach((file, index) => {
            console.log('Adding file to FormData:', file.name, file.type, file.size);
            formDataToSend.append('files[]', file, file.name);
        });

        console.log('Files handler URL:', filesHandlerUrl);

        try {
            const response = await fetch(filesHandlerUrl, {
                method: 'POST',
                body: formDataToSend
            });

            console.log('File upload response status:', response.status);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('File upload response:', result);

            if (result.success === true) {
                return result;
            } else {
                throw new Error(result.error || 'Unknown error uploading files');
            }
            
        } catch (error) {
            console.error('File upload error:', error);
            return { success: false, error: error.message };
        }
    }
    
    // Маска для телефона (остается без изменений)
    document.getElementById('feedbackPhone').addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.startsWith('7') || value.startsWith('8')) {
            value = '7' + value.substring(1);
        }
        
        let formattedValue = '+7';
        if (value.length > 1) formattedValue += ' (' + value.substring(1, 4);
        if (value.length >= 4) formattedValue += ') ' + value.substring(4, 7);
        if (value.length >= 7) formattedValue += '-' + value.substring(7, 9);
        if (value.length >= 9) formattedValue += '-' + value.substring(9, 11);
        
        e.target.value = formattedValue;
    });
}

// Запуск (остается без изменений)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFeedbackWidget);
} else {
    initFeedbackWidget();
}
