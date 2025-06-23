// Translation dictionary
const translations = {

};

// Reverse dictionary for Sinhala to English
const sinhalaToEnglish = {};
for (const [english, sinhala] of Object.entries(translations)) {
    sinhalaToEnglish[sinhala] = english;
}

// DOM Elements
const sourceLanguage = document.getElementById('sourceLanguage');
const targetLanguage = document.getElementById('targetLanguage');
const sourceText = document.getElementById('sourceText');
const targetText = document.getElementById('targetText');
const translateBtn = document.getElementById('translateBtn');
const swapLanguagesBtn = document.getElementById('swapLanguages');
const clearSourceBtn = document.getElementById('clearSource');
const copyTranslationBtn = document.getElementById('copyTranslation');
const speakSourceBtn = document.getElementById('speakSource');
const speakTargetBtn = document.getElementById('speakTarget');
const dictateBtn = document.getElementById('dictateBtn');
const translationHistory = document.getElementById('translationHistory');
const charCounter = document.getElementById('charCounter');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');

// Modal Elements
const aboutBtn = document.getElementById('aboutBtn');
const aboutModal = document.getElementById('aboutModal');
const closeModalSpan = document.querySelector('.close-modal-span');
const closeModalBtn = document.getElementById('closeModalBtn');

// Confirmation Modal Elements
const confirmModal = document.getElementById('confirmModal');
const closeConfirmModal = document.getElementById('closeConfirmModal');
const cancelClearBtn = document.getElementById('cancelClearBtn');
const confirmClearBtn = document.getElementById('confirmClearBtn');

// Settings Elements
const settingsBtn = document.getElementById('settingsBtn');
const settingsPanel = document.getElementById('settingsPanel');
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const voiceSpeedRadios = document.querySelectorAll('input[name="voiceSpeed"]');
const customSpeedSlider = document.getElementById('customSpeedSlider');
const customSpeedValue = document.getElementById('customSpeedValue');
const testCustomSpeedBtn = document.getElementById('testCustomSpeedBtn');

// --- PREMIUM FEATURE ELEMENTS ---
const unlockPremiumBtn = document.getElementById('unlockPremiumBtn');
const activationModal = document.getElementById('activationModal');
const closeActivationModal = document.getElementById('closeActivationModal');
const activationKeyInput = document.getElementById('activationKeyInput');
const submitActivationKey = document.getElementById('submitActivationKey');
const activationError = document.getElementById('activationError');
const headerTitle = document.querySelector('header h1');
const logoutPremiumBtn = document.getElementById('logoutPremiumBtn');

// Global state
let voiceSpeed = 1;
let history = []; 
let isPremium = false;
const ACTIVATION_KEY = '123456789';

// --- LANGUAGES OBJECT (without "Detect Language") ---
const LANGUAGES = {
    "af": "Afrikaans", "sq": "Albanian", "am": "Amharic", "ar": "Arabic", "hy": "Armenian", "az": "Azerbaijani",
    "eu": "Basque", "be": "Belarusian", "bn": "Bengali", "bs": "Bosnian", "bg": "Bulgarian", "ca": "Catalan", "ceb": "Cebuano", "ny": "Chichewa",
    "zh-CN": "Chinese (Simplified)", "zh-TW": "Chinese (Traditional)", "co": "Corsican", "hr": "Croatian", "cs": "Czech", "da": "Danish",
    "nl": "Dutch", "en": "English", "eo": "Esperanto", "et": "Estonian", "tl": "Filipino", "fi": "Finnish", "fr": "French", "fy": "Frisian",
    "gl": "Galician", "ka": "Georgian", "de": "German", "el": "Greek", "gu": "Gujarati", "ht": "Haitian Creole", "ha": "Hausa", "haw": "Hawaiian",
    "iw": "Hebrew", "he": "Hebrew", "hi": "Hindi", "hmn": "Hmong", "hu": "Hungarian", "is": "Icelandic", "ig": "Igbo", "id": "Indonesian",
    "ga": "Irish", "it": "Italian", "ja": "Japanese", "jw": "Javanese", "kn": "Kannada", "kk": "Kazakh", "km": "Khmer", "rw": "Kinyarwanda",
    "ko": "Korean", "ku": "Kurdish (Kurmanji)", "ky": "Kyrgyz", "lo": "Lao", "la": "Latin", "lv": "Latvian", "lt": "Lithuanian",
    "lb": "Luxembourgish", "mk": "Macedonian", "mg": "Malagasy", "ms": "Malay", "ml": "Malayalam", "mt": "Maltese", "mi": "Maori",
    "mr": "Marathi", "mn": "Mongolian", "my": "Myanmar (Burmese)", "ne": "Nepali", "no": "Norwegian", "or": "Odia (Oriya)", "ps": "Pashto",
    "fa": "Persian", "pl": "Polish", "pt": "Portuguese", "pa": "Punjabi", "ro": "Romanian", "ru": "Russian", "sm": "Samoan", "gd": "Scots Gaelic",
    "sr": "Serbian", "st": "Sesotho", "sn": "Shona", "sd": "Sindhi", "si": "Sinhala", "sk": "Slovak", "sl": "Slovenian", "so": "Somali",
    "es": "Spanish", "su": "Sundanese", "sw": "Swahili", "sv": "Swedish", "tg": "Tajik", "ta": "Tamil", "tt": "Tatar", "te": "Telugu",
    "th": "Thai", "tr": "Turkish", "tk": "Turkmen", "uk": "Ukrainian", "ur": "Urdu", "ug": "Uyghur", "uz": "Uzbek", "vi": "Vietnamese",
    "cy": "Welsh", "xh": "Xhosa", "yi": "Yiddish", "yo": "Yoruba", "zu": "Zulu"
};

const voiceGenderSection = document.querySelector('.voice-gender-section');
const voiceGenderRadios = document.getElementsByName('voiceGender');
let voiceGender = localStorage.getItem('voiceGender') || 'female';
let availableVoices = [];

const voiceSelectSection = document.querySelector('.voice-select-section');
const voiceSelect = document.getElementById('voiceSelect');
const voiceSelectDisabledText = document.querySelector('.voice-select-disabled-text');
let selectedVoiceId = localStorage.getItem('selectedVoiceId') || '';

// Load voices (browser TTS)
function loadVoices() {
    availableVoices = speechSynthesis.getVoices();
}
if ('speechSynthesis' in window) {
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
}

// Initialize the app
function init() {
    checkPremiumStatus();
    populateLanguageDropdowns();
    loadHistory();
    setupEventListeners();
    updateCharCounter(); // Set initial counter value
    loadSettings();
    sourceText.focus({ preventScroll: true });
}

// Populate Language Dropdowns
function populateLanguageDropdowns() {
    // Populate source language dropdown
    for (const code in LANGUAGES) {
        const option = document.createElement('option');
        option.value = code;
        option.textContent = LANGUAGES[code];
        sourceLanguage.appendChild(option.cloneNode(true));
        targetLanguage.appendChild(option);
    }
    
    // Set default values
    sourceLanguage.value = 'en';
    targetLanguage.value = 'si';
}

// Setup event listeners
function setupEventListeners() {
    translateBtn.addEventListener('click', translate);
    swapLanguagesBtn.addEventListener('click', swapLanguages);
    clearSourceBtn.addEventListener('click', clearSource);
    copyTranslationBtn.addEventListener('click', copyTranslation);
    speakSourceBtn.addEventListener('click', () => speakText(sourceText.value, sourceLanguage.value));
    speakTargetBtn.addEventListener('click', () => speakText(targetText.value, targetLanguage.value));
    
    // Character counter
    sourceText.addEventListener('input', updateCharCounter);

    // Clear History
    clearHistoryBtn.addEventListener('click', () => {
        confirmModal.style.display = 'block';
    });

    // Confirmation Modal Events
    closeConfirmModal.addEventListener('click', () => confirmModal.style.display = 'none');
    cancelClearBtn.addEventListener('click', () => confirmModal.style.display = 'none');
    confirmClearBtn.addEventListener('click', executeClearHistory);
    
    // Modal events
    aboutBtn.addEventListener('click', openModal);
    closeModalSpan.addEventListener('click', closeModal);
    closeModalBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (event) => {
        if (event.target == aboutModal || event.target == confirmModal) {
            closeModal();
            confirmModal.style.display = 'none';
        }
        // Close settings panel if clicked outside
        if (!settingsPanel.contains(event.target) && !settingsBtn.contains(event.target)) {
            settingsPanel.classList.remove('show');
        }
    });

    // Auto-translate on input
    sourceText.addEventListener('input', debounce(translate, 500));
    
    // Language change
    sourceLanguage.addEventListener('change', translate);
    targetLanguage.addEventListener('change', translate);

    // Settings Panel
    settingsBtn.addEventListener('click', () => {
        settingsPanel.classList.toggle('show');
    });

    // Theme Toggle
    themeToggleBtn.addEventListener('click', toggleTheme);

    // Voice Speed
    voiceSpeedRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            const speed = parseFloat(e.target.value)
            voiceSpeed = speed;
            localStorage.setItem('voiceSpeed', voiceSpeed);
            // Update slider to reflect preset
            customSpeedSlider.value = speed;
            customSpeedValue.textContent = `${speed.toFixed(1)}x`;
        });
    });

    // Custom Speed Slider
    customSpeedSlider.addEventListener('input', (e) => {
        const speed = parseFloat(e.target.value);
        voiceSpeed = speed;
        customSpeedValue.textContent = `${speed.toFixed(1)}x`;
        
        // Deselect all radio buttons
        voiceSpeedRadios.forEach(radio => radio.checked = false);
    });

    customSpeedSlider.addEventListener('change', () => {
        // Save to local storage only when user releases the slider
        localStorage.setItem('voiceSpeed', voiceSpeed);
    });
    
    // Custom Speed Test Button
    testCustomSpeedBtn.addEventListener('click', () => {
        testVoiceSpeed(voiceSpeed, sourceLanguage.value);
    });

    // Voice Speed Test Buttons
    const voiceSpeedTestBtns = document.querySelectorAll('.test-speed-btn');
    voiceSpeedTestBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const speed = parseFloat(e.currentTarget.dataset.speed);
            testVoiceSpeed(speed, sourceLanguage.value);
        });
    });

    // --- PREMIUM FEATURE LISTENERS ---
    unlockPremiumBtn.addEventListener('click', () => {
        activationModal.style.display = 'block';
        activationKeyInput.focus();
    });

    closeActivationModal.addEventListener('click', () => {
        activationModal.style.display = 'none';
    });

    submitActivationKey.addEventListener('click', activatePremium);
    
    activationKeyInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            activatePremium();
        }
    });

    logoutPremiumBtn.addEventListener('click', logoutPremium);

    // --- SPEECH RECOGNITION (DICTATION) ---
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition;

    if (SpeechRecognition) {
        recognition = new SpeechRecognition();
        recognition.continuous = true; // Keep listening
        recognition.interimResults = true; // Get results as they come in

        dictateBtn.addEventListener('click', toggleDictation);

        recognition.onresult = (event) => {
            let interim_transcript = '';
            let final_transcript = '';

            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    final_transcript += event.results[i][0].transcript;
                } else {
                    interim_transcript += event.results[i][0].transcript;
                }
            }
            
            // Update the text area with the final transcript
            if(final_transcript) {
                sourceText.value = final_transcript;
                translate(); // Auto-translate after dictation
            }
        };

        recognition.onstart = () => {
            dictateBtn.classList.add('listening');
            dictateBtn.title = "Stop Dictation";
        };

        recognition.onend = () => {
            dictateBtn.classList.remove('listening');
            dictateBtn.title = "Speak to Type (Dictation)";
        };
        
        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
            dictateBtn.classList.remove('listening');
            dictateBtn.title = "Dictation not available";
        };

    } else {
        dictateBtn.style.display = 'none'; // Hide button if API not supported
        console.warn("Speech Recognition API not supported in this browser.");
    }

    function toggleDictation() {
        if (!isPremium) {
            activationModal.style.display = 'block';
            activationKeyInput.focus();
            showToastNotification('This is a premium feature. Please activate.');
            return;
        }

        if (dictateBtn.classList.contains('listening')) {
            recognition.stop();
        } else {
            // Set the language for recognition based on the selected source language
            recognition.lang = sourceLanguage.value;
            recognition.start();
        }
    }

    // Show warning if free user tries to exceed 500 chars
    sourceText.addEventListener('keydown', function(e) {
        if (!isPremium && sourceText.value.length >= 500 && e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
            showCharLimitWarning();
            e.preventDefault();
        }
    });

    // Voice gender radio change event
    voiceGenderRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.checked) {
                voiceGender = e.target.value;
                localStorage.setItem('voiceGender', voiceGender);
            }
        });
    });

    const aiVoiceSourceBtn = document.getElementById('aiVoiceSource');
    const aiVoiceTargetBtn = document.getElementById('aiVoiceTarget');

    // ElevenLabs API conf
    const ELEVENLABS_API_KEY = 'sk_10d820e6a1714e06d26daccc8db6feac7c0b511d685d17f1'; 
    const ELEVENLABS_VOICE_ID = 'EXAVITQu4vr4xnSDxMaL'; 
    const ELEVENLABS_URL = `https://api.elevenlabs.io/v1/text-to-speech/${ELEVENLABS_VOICE_ID}`;

    async function playAIVoice(text) {
        if (!text || !ELEVENLABS_API_KEY) {
            showToastNotification('AI Voice unavailable.');
            return;
        }
        // Only support English for demo
        if (!/^[\x00-\x7F]+$/.test(text)) {
            showToastNotification('AI Voice: Only English supported in demo.');
            return;
        }
        try {
            const response = await fetch(ELEVENLABS_URL, {
                method: 'POST',
                headers: {
                    'xi-api-key': ELEVENLABS_API_KEY,
                    'Content-Type': 'application/json',
                    'Accept': 'audio/mpeg',
                },
                body: JSON.stringify({
                    text,
                    model_id: 'eleven_monolingual_v1',
                    voice_settings: { stability: 0.5, similarity_boost: 0.7 }
                })
            });
            if (!response.ok) throw new Error('AI Voice API error');
            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            audio.play();
        } catch (err) {
            showToastNotification('AI Voice error.');
        }
    }

    if (aiVoiceSourceBtn) {
        aiVoiceSourceBtn.addEventListener('click', async () => {
            if (!isPremium) {
                activationModal.style.display = 'block';
                activationKeyInput.focus();
                showToastNotification('This is a premium feature. Please activate.');
                return;
            }
            aiVoiceSourceBtn.disabled = true;
            aiVoiceSourceBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            await playAIVoice(sourceText.value);
            aiVoiceSourceBtn.innerHTML = '<i class="fas fa-robot"></i>';
            aiVoiceSourceBtn.disabled = false;
        });
    }
    if (aiVoiceTargetBtn) {
        aiVoiceTargetBtn.addEventListener('click', async () => {
            if (!isPremium) {
                activationModal.style.display = 'block';
                activationKeyInput.focus();
                showToastNotification('This is a premium feature. Please activate.');
                return;
            }
            aiVoiceTargetBtn.disabled = true;
            aiVoiceTargetBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            await playAIVoice(targetText.value);
            aiVoiceTargetBtn.innerHTML = '<i class="fas fa-robot"></i>';
            aiVoiceTargetBtn.disabled = false;
        });
    }

    const uploadFileBtn = document.getElementById('uploadFileBtn');
    if (uploadFileBtn) {
        uploadFileBtn.addEventListener('click', () => {
            if (!isPremium) {
                activationModal.style.display = 'block';
                activationKeyInput.focus();
                showToastNotification('This is a premium feature. Please activate.');
                return;
            }
            // Create file input dynamically
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = '.txt,application/pdf';
            fileInput.style.display = 'none';
            document.body.appendChild(fileInput);
            fileInput.addEventListener('change', async (e) => {
                const file = fileInput.files[0];
                if (!file) return;
                if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
                    // TXT file
                    const reader = new FileReader();
                    reader.onload = function(evt) {
                        sourceText.value = evt.target.result;
                        updateCharCounter();
                    };
                    reader.readAsText(file);
                } else if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
                    // PDF file
                    showToastNotification('PDF parsing requires internet. Please use TXT for now or integrate pdf.js.');
                    // Placeholder: You can integrate pdf.js here for real PDF parsing
                } else {
                    showToastNotification('Unsupported file type. Please upload a PDF or TXT file.');
                }
                document.body.removeChild(fileInput);
            });
            fileInput.click();
        });
    }
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Main translation function
async function translate() {
    const sourceTextValue = sourceText.value.trim();
    const sourceLang = sourceLanguage.value;
    const targetLang = targetLanguage.value;
    
    if (!sourceTextValue) {
        targetText.value = '';
        return;
    }
    
    translateBtn.innerHTML = '<span class="loading"></span> Translating...';
    translateBtn.disabled = true;
    targetText.value = 'Translating...';

    try {
        const translatedText = await performTranslation(sourceTextValue, sourceLang, targetLang);
        targetText.value = translatedText;
        
        // Add to history only if translation was successful
        if (translatedText && !translatedText.startsWith('Error:')) {
            addToHistory(sourceTextValue, translatedText, sourceLang, targetLang);
        }
    } catch (error) {
        console.error('Translation Error:', error);
        targetText.value = error.message.startsWith('Error:') ? error.message : 'Error: Could not translate.';
    } finally {
        translateBtn.innerHTML = '<i class="fas fa-language"></i> Translate';
        translateBtn.disabled = false;
    }
}

// Perform translation using MyMemory API
async function performTranslation(text, sourceLang, targetLang) {
    const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Network response was not ok. Status: ${response.status}`);
        }
        const data = await response.json();
        
        if (data.responseStatus !== 200 || !data.responseData) {
            const errorMessage = `Error: ${data.responseDetails || 'Translation failed.'}`;
            throw new Error(errorMessage);
        }
        
        return data.responseData.translatedText;
    } catch (error) {
        console.error("API Fetch Error:", error);
        throw new Error('Error: Could not connect to the translation service.');
    }
}

// Swap languages
function swapLanguages() {
    const tempLang = sourceLanguage.value;
    const tempText = sourceText.value;
    
    sourceLanguage.value = targetLanguage.value;
    targetLanguage.value = tempLang;
    
    sourceText.value = targetText.value;
    targetText.value = tempText;
    
    translate();
}

// Clear source text
function clearSource() {
    sourceText.value = '';
    targetText.value = '';
}

// Copy translation to clipboard
function copyTranslation() {
    if (targetText.value) {
        navigator.clipboard.writeText(targetText.value).then(() => {
            const icon = copyTranslationBtn.querySelector('i');
            const originalIcon = icon.className;

            // Give visual feedback
            icon.className = 'fas fa-check';
            copyTranslationBtn.classList.add('success');

            setTimeout(() => {
                icon.className = originalIcon;
                copyTranslationBtn.classList.remove('success');
            }, 2000);
            
            showToastNotification('Translation copied to clipboard!');
        });
    }
}

// Text-to-speech
function speakText(text, lang) {
    if ('speechSynthesis' in window && text) {
        speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        utterance.rate = voiceSpeed;
        if (isPremium && selectedVoiceId) {
            const v = pickVoiceById(selectedVoiceId);
            if (v) utterance.voice = v;
        }
        speechSynthesis.speak(utterance);
    }
}

// Add translation to history
function addToHistory(sourceText, targetText, sourceLang, targetLang) {
    const historyItem = {
        id: Date.now(),
        sourceText,
        targetText,
        sourceLang,
        targetLang,
        timestamp: new Date().toLocaleString()
    };
    
    history.unshift(historyItem);
    
    // Keep only last 50 translations
    if (history.length > 50) {
        history = history.slice(0, 50);
    }
    
    // Save history to a cookie
    setCookie('translationHistory', JSON.stringify(history), 30); // Saves for 30 days
    loadHistory();

    // Animate the new item
    const firstItem = translationHistory.querySelector('.history-item');
    if(firstItem) {
        firstItem.classList.add('new-item-animation');
    }
}

// Load and display history
function loadHistory() {
    const historyCookie = getCookie('translationHistory');
    history = historyCookie ? JSON.parse(historyCookie) : [];
    
    translationHistory.innerHTML = '';
    
    if (history.length === 0) {
        translationHistory.innerHTML = '<p style="text-align: center; color: #999; font-style: italic;">No translation history yet</p>';
        clearHistoryBtn.style.display = 'none';
        return;
    }
    
    clearHistoryBtn.style.display = 'inline-flex';
    history.forEach(item => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        
        // Get full language names from codes
        const sourceLangName = LANGUAGES[item.sourceLang] || 'Unknown';
        const targetLangName = LANGUAGES[item.targetLang] || 'Unknown';
        
        historyItem.innerHTML = `            <div class="lang-pair">${sourceLangName} → ${targetLangName}</div>
            <div class="source-text">${item.sourceText}</div>
            <div class="target-text">${item.targetText}</div>
            <div class="timestamp">${item.timestamp}</div>
        `;
        
        historyItem.addEventListener('click', () => {
            sourceText.value = item.sourceText;
            sourceLanguage.value = item.sourceLang;
            targetLanguage.value = item.targetLang;
            translate();
        });
        
        translationHistory.appendChild(historyItem);
    });
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #667eea;
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Modal functions
function openModal() {
    aboutModal.style.display = 'block';
}

function closeModal() {
    aboutModal.style.display = 'none';
}

// Character counter function
function updateCharCounter() {
    const currentLength = sourceText.value.length;
    const maxLength = isPremium ? 10000 : 500;
    sourceText.maxLength = maxLength;
    charCounter.textContent = `${currentLength} / ${maxLength}`;
    charCounter.classList.remove('limit-reached', 'premium');
    if (isPremium) {
        charCounter.classList.add('premium');
    } else if (currentLength >= maxLength) {
        charCounter.classList.add('limit-reached');
    }
}

// Show warning if free user tries to exceed 500 chars
sourceText.addEventListener('keydown', function(e) {
    if (!isPremium && sourceText.value.length >= 500 && e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        showCharLimitWarning();
        e.preventDefault();
    }
});

function showCharLimitWarning() {
    let warning = document.querySelector('.char-limit-warning');
    if (!warning) {
        warning = document.createElement('div');
        warning.className = 'char-limit-warning';
        warning.textContent = 'Free version: Maximum 500 characters allowed. Upgrade to Premium for 10,000!';
        document.body.appendChild(warning);
    }
    warning.classList.add('show');
    setTimeout(() => {
        warning.classList.remove('show');
    }, 2500);
}

// Clear history
function executeClearHistory() {
    history = [];
    eraseCookie('translationHistory'); // Erase the cookie
    loadHistory();
    confirmModal.style.display = 'none';
    showToastNotification('History cleared successfully!');
}

// Show Toast Notification
function showToastNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'toast-notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    // Hide and remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500); // Wait for fade out animation
    }, 3000);
}

// --- Settings Functions ---
function loadSettings() {
    // Load Theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }

    // Load Voice Speed
    const savedSpeed = parseFloat(localStorage.getItem('voiceSpeed')) || 1;
    voiceSpeed = savedSpeed;
    
    // Update slider
    customSpeedSlider.value = savedSpeed;
    customSpeedValue.textContent = `${savedSpeed.toFixed(1)}x`;

    // Check if the speed matches a preset radio button
    let presetMatch = false;
    voiceSpeedRadios.forEach(radio => {
        if (parseFloat(radio.value) === savedSpeed) {
            radio.checked = true;
            presetMatch = true;
        }
    });

    if (!presetMatch) {
        // If no preset matches, it's a custom speed, so uncheck all radios.
        voiceSpeedRadios.forEach(radio => radio.checked = false);
    }

    // Load Voice Gender
    voiceGender = localStorage.getItem('voiceGender') || 'female';
    voiceGenderRadios.forEach(r => r.checked = (r.value === voiceGender));

    // Load selected voice
    selectedVoiceId = localStorage.getItem('selectedVoiceId') || '';
    if (voiceSelect) {
        Array.from(voiceSelect.options).forEach(opt => {
            opt.selected = (opt.value === selectedVoiceId);
        });
    }
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
}

function testVoiceSpeed(speed, lang) {
    const testPhrase = lang === 'si' ? 'කටහඬ වේගය පරීක්ෂා කිරීම' : 'Testing voice speed';
    if ('speechSynthesis' in window) {
        speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(testPhrase);
        utterance.lang = lang;
        utterance.rate = speed;
        if (isPremium && selectedVoiceId) {
            const v = pickVoiceById(selectedVoiceId);
            if (v) utterance.voice = v;
        }
        speechSynthesis.speak(utterance);
    }
}

// --- COOKIE HELPER FUNCTIONS ---
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/; SameSite=Lax";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {   
    document.cookie = name+'=; Max-Age=-99999999; path=/;';
}

// --- PREMIUM FEATURE FUNCTIONS ---
function checkPremiumStatus() {
    if (localStorage.getItem('isPremium') === 'true') {
        isPremium = true;
    }
    updateUIForPremiumStatus();
}

function updateUIForPremiumStatus() {
    updateCharCounter();
    const aiVoiceSourceBtn = document.getElementById('aiVoiceSource');
    const aiVoiceTargetBtn = document.getElementById('aiVoiceTarget');
    const adBanner = document.getElementById('adBanner');
    if (isPremium) {
        dictateBtn.classList.remove('locked');
        dictateBtn.title = "Speak to Type (Dictation)";
        unlockPremiumBtn.style.display = 'none';
        logoutPremiumBtn.classList.remove('hidden');
        if (voiceGenderSection) voiceGenderSection.classList.remove('hidden');
        // Enable gender radios
        voiceGenderRadios.forEach(r => r.disabled = false);
        if (voiceSelectSection) {
            voiceSelectSection.classList.remove('hidden', 'disabled');
            if (voiceSelect) voiceSelect.disabled = false;
            if (voiceSelectDisabledText) voiceSelectDisabledText.style.display = 'none';
        }
        if (aiVoiceSourceBtn) {
            aiVoiceSourceBtn.title = "AI Voice (ElevenLabs)";
        }
        if (aiVoiceTargetBtn) {
            aiVoiceTargetBtn.title = "AI Voice (ElevenLabs)";
        }
        if (adBanner) adBanner.style.display = 'none';
    } else {
        dictateBtn.classList.add('locked');
        dictateBtn.title = "Unlock Premium to use Dictation";
        unlockPremiumBtn.style.display = 'block';
        logoutPremiumBtn.classList.add('hidden');
        if (voiceGenderSection) voiceGenderSection.classList.add('hidden');
        // Disable gender radios
        voiceGenderRadios.forEach(r => r.disabled = true);
        if (voiceSelectSection) {
            voiceSelectSection.classList.remove('hidden');
            voiceSelectSection.classList.add('disabled');
            if (voiceSelect) voiceSelect.disabled = true;
            if (voiceSelectDisabledText) voiceSelectDisabledText.style.display = 'block';
        }
        if (aiVoiceSourceBtn) {
            aiVoiceSourceBtn.title = "AI Voice (Premium Only)";
        }
        if (aiVoiceTargetBtn) {
            aiVoiceTargetBtn.title = "AI Voice (Premium Only)";
        }
        if (adBanner) adBanner.style.display = 'block';
    }
}

function activatePremium() {
    const enteredKey = activationKeyInput.value;
    if (enteredKey === ACTIVATION_KEY) {
        isPremium = true;
        localStorage.setItem('isPremium', 'true');
        updateUIForPremiumStatus();
        activationModal.style.display = 'none';
        activationKeyInput.value = '';
        activationError.textContent = '';
        showToastNotification('Premium features activated successfully! You can now translate up to 10,000 characters.');
    } else {
        activationError.textContent = 'Invalid activation key. Please try again.';
        activationKeyInput.value = '';
    }
}

function logoutPremium() {
    isPremium = false;
    localStorage.removeItem('isPremium');
    updateUIForPremiumStatus();
    showToastNotification('You have logged out from premium.');
}

// Pick a voice by language & gender
function pickVoice(lang, gender) {
    if (!availableVoices.length) return null;
    // Try to find exact match
    let voices = availableVoices.filter(v => v.lang.startsWith(lang) && v.gender === gender);
    if (!voices.length) {
        // Some browsers don't set gender, so try by name
        voices = availableVoices.filter(v => v.lang.startsWith(lang) && v.name.toLowerCase().includes(gender));
    }
    if (!voices.length) {
        // Fallback: any voice for lang
        voices = availableVoices.filter(v => v.lang.startsWith(lang));
    }
    return voices[0] || availableVoices[0];
}

// Pick a voice by voiceId
function pickVoiceById(voiceId) {
    if (!availableVoices.length) return null;
    return availableVoices.find(v => v.voiceURI === voiceId) || availableVoices[0];
}

// Load voices and populate select
function populateVoiceSelect() {
    if (!voiceSelect) return;
    voiceSelect.innerHTML = '';
    availableVoices.forEach((v, i) => {
        const option = document.createElement('option');
        option.value = v.voiceURI;
        let label = v.name;
        // Sinhala highlight
        if (v.lang === 'si-LK' || v.lang === 'si') {
            label += ' (සිංහල, Sri Lanka';
            if (v.gender) label += ', ' + v.gender;
            label += ')';
        } else {
            label += ` (${v.lang}`;
            if (v.gender) label += ', ' + v.gender;
            label += ')';
        }
        option.textContent = label;
        if (selectedVoiceId === v.voiceURI) option.selected = true;
        voiceSelect.appendChild(option);
    });
}
if ('speechSynthesis' in window) {
    loadVoices();
    window.speechSynthesis.onvoiceschanged = () => {
        loadVoices();
        populateVoiceSelect();
    };
    setTimeout(populateVoiceSelect, 500); // fallback for some browsers
}
if (voiceSelect) {
    voiceSelect.addEventListener('change', (e) => {
        selectedVoiceId = e.target.value;
        localStorage.setItem('selectedVoiceId', selectedVoiceId);
    });
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
