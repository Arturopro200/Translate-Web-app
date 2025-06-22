// Translation dictionary
const translations = {
    'hello': 'ආයුබෝවන්',
    'good morning': 'සුභ උදෑසනක්',
    'good afternoon': 'සුභ දවල්',
    'good evening': 'සුභ සන්ධ්‍යාවක්',
    'good night': 'සුභ රාත්‍රියක්',
    'thank you': 'ස්තූතියි',
    'please': 'කරුණාකර',
    'sorry': 'සමාවන්න',
    'how are you': 'ඔබට කොහොමද',
    'i am fine': 'මම හොඳින්',
    'what is your name': 'ඔබේ නම කුමක්ද',
    'my name is': 'මගේ නම',
    'goodbye': 'ආයුබෝවන්',
    'yes': 'ඔව්',
    'no': 'නැත',
    'family': 'පවුල',
    'friend': 'මිතුරා',
    'home': 'ගෙදර',
    'work': 'වැඩ',
    'school': 'පාසල',
    'food': 'ආහාර',
    'water': 'ජලය',
    'time': 'වේලාව',
    'day': 'දවස',
    'night': 'රාත්‍රිය',
    'today': 'අද',
    'tomorrow': 'හෙට',
    'yesterday': 'ඊයේ',
    'big': 'විශාල',
    'small': 'කුඩා',
    'hot': 'උණුසුම්',
    'cold': 'සීතල',
    'beautiful': 'සුන්දර',
    'good': 'හොඳ',
    'bad': 'නරක',
    'happy': 'සතුටු',
    'sad': 'දුක්ඛිත',
    'new': 'අලුත්',
    'old': 'පරණ',
    'fast': 'වේගවත්',
    'slow': 'මන්දගාමී',
    'easy': 'පහසු',
    'difficult': 'අපහසු',
    'important': 'වැදගත්',
    'right': 'හරි',
    'wrong': 'වැරදි',
    'open': 'විවෘත',
    'close': 'වසන්න',
    'start': 'ආරම්භ',
    'stop': 'නවත්වන්න',
    'first': 'පළමු',
    'last': 'අවසාන',
    'up': 'ඉහළ',
    'down': 'පහළ',
    'left': 'වම',
    'right': 'දකුණ',
    'here': 'මෙහි',
    'there': 'එහි',
    'now': 'දැන්',
    'always': 'සැමවිට',
    'never': 'කවදාවත්',
    'sometimes': 'සමහර විට',
    'all': 'සියල්ල',
    'some': 'සමහර',
    'many': 'බොහෝ',
    'few': 'ස්වල්ප',
    'more': 'තව',
    'less': 'අඩු',
    'same': 'එකම',
    'different': 'වෙනස්',
    'high': 'ඉහළ',
    'low': 'අඩු',
    'long': 'දිග',
    'short': 'කෙටි',
    'thick': 'තද',
    'thin': 'සිහින්',
    'heavy': 'බර',
    'light': 'සැහැල්ලු',
    'full': 'පිරී',
    'empty': 'හිස්',
    'clean': 'පිරිසිදු',
    'dirty': 'අපිරිසිදු',
    'wet': 'තෙත්',
    'dry': 'වියළි',
    'soft': 'මෘදු',
    'hard': 'කටුක',
    'bright': 'බැබළෙන',
    'dark': 'අඳුරු',
    'loud': 'ඝෝෂාකාරී',
    'quiet': 'නිහඬ',
    'sweet': 'මිහිරි',
    'sour': 'පුළුස්සන',
    'fresh': 'නැවුම්',
    'warm': 'උණුසුම්',
    'cool': 'සිසිල්',
    'alive': 'ජීවතුන්',
    'dead': 'මළ',
    'healthy': 'සෞඛ්‍ය සම්පන්න',
    'sick': 'අසනීප',
    'safe': 'ආරක්ෂිත',
    'dangerous': 'අනතුරුදායක',
    'ready': 'සූදානම්',
    'available': 'ලබාගත හැකි',
    'public': 'මහජන',
    'private': 'පෞද්ගලික',
    'free': 'නිදහස්',
    'busy': 'විශාල',
    'excited': 'උද්දීපිත',
    'interested': 'උනන්දු',
    'surprised': 'පුදුම',
    'worried': 'කරදර',
    'relaxed': 'සන්සුන්',
    'confident': 'ආත්ම විශ්වාසය',
    'brave': 'ධෛර්‍යවත්',
    'strong': 'ශක්තිමත්',
    'weak': 'දුබල',
    'tired': 'අවසාන',
    'energetic': 'ශක්තිමත්',
    'active': 'ක්‍රියාකාරී',
    'creative': 'ආකෘතිමත්',
    'intelligent': 'බුද්ධිමත්',
    'smart': 'බුද්ධිමත්',
    'expert': 'විශේෂඥ',
    'beginner': 'ආරම්භක',
    'basic': 'මූලික',
    'simple': 'සරල',
    'complex': 'සංකීර්ණ',
    'interesting': 'උනන්දුව',
    'fun': 'විනෝද',
    'useful': 'ප්‍රයෝජනවත්',
    'helpful': 'උපකාරී',
    'secure': 'ආරක්ෂිත',
    'hidden': 'සඟවා',
    'secret': 'රහස්',
    'locked': 'අගුළු',
    'moving': 'චලනය',
    'stationary': 'ස්ථාවර',
    'quick': 'වේගවත්',
    'gradual': 'ක්‍රමික',
    'sudden': 'එදිරිව',
    'early': 'ලබා',
    'late': 'ප්‍රමාද',
    'frequent': 'බොහෝ විට',
    'rare': 'අඩු විට',
    'regular': 'නිති',
    'constant': 'නිරන්තර',
    'temporary': 'තාවකාලික',
    'permanent': 'ස්ථිර',
    'flexible': 'සුවිශේෂී',
    'rigid': 'කටුක',
    'loose': 'ලිහිල්',
    'tight': 'තද',
    'smooth': 'මෘදු',
    'rough': 'එළි',
    'flat': 'පැතලි',
    'curved': 'වක්‍ර',
    'straight': 'සරල',
    'round': 'වට',
    'square': 'චතුරස්‍ර',
    'symmetrical': 'සමමිතික',
    'balanced': 'සමතුලිත',
    'stable': 'ස්ථාවර',
    'steady': 'ස්ථාවර',
    'solid': 'ඝන',
    'liquid': 'දියර',
    'gas': 'වායු',
    'boiling': 'උතුරන',
    'freezing': 'අයිස්',
    'growing': 'වර්ධනය',
    'increasing': 'වැඩිවන',
    'decreasing': 'අඩුවන',
    'rising': 'ඉහළයන',
    'falling': 'පහළයන',
    'running': 'දුවන',
    'walking': 'ඇවිදින',
    'standing': 'නැගී සිටින',
    'sitting': 'ඉඳගෙන',
    'sleeping': 'නිදාගෙන',
    'awake': 'අවදි',
    'conscious': 'සංවේදී',
    'living': 'ජීවත්',
    'natural': 'ස්වාභාවික',
    'real': 'සැබෑ',
    'genuine': 'සැබෑ',
    'original': 'මුල්',
    'copy': 'පිටපත',
    'example': 'උදාහරණය',
    'situation': 'තත්වය',
    'position': 'ස්ථානය',
    'place': 'ස්ථානය',
    'area': 'ප්‍රදේශය',
    'city': 'නගරය',
    'town': 'නගරය',
    'village': 'ගම',
    'country': 'රට',
    'world': 'ලෝකය',
    'sky': 'අහස',
    'space': 'අවකාශය',
    'air': 'ගුවන්',
    'fire': 'ගින්න',
    'wind': 'සුළඟ',
    'rain': 'වැසි',
    'snow': 'හිම',
    'ice': 'අයිස්',
    'dust': 'දූවිලි',
    'sand': 'වැලි',
    'stone': 'ගල',
    'metal': 'ලෝහ',
    'wood': 'ලී',
    'plastic': 'ප්ලාස්ටික්',
    'glass': 'වීදුරු',
    'paper': 'කඩදාසි',
    'cloth': 'රෙදි',
    'gold': 'රන්',
    'silver': 'රිදී',
    'iron': 'යකඩ',
    'steel': 'වානේ',
    'carbon': 'කාබන්',
    'oxygen': 'ඔක්සිජන්',
    'water': 'ජලය',
    'sun': 'සූර්‍යයා',
    'moon': 'චන්ද්‍රයා',
    'star': 'තරුව',
    'earth': 'පෘථිවිය'
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
const translationHistory = document.getElementById('translationHistory');
const charCounter = document.getElementById('charCounter');

// Modal Elements
const aboutBtn = document.getElementById('aboutBtn');
const aboutModal = document.getElementById('aboutModal');
const closeModalSpan = document.querySelector('.close-modal-span');
const closeModalBtn = document.getElementById('closeModalBtn');

// Translation history
let history = JSON.parse(localStorage.getItem('translationHistory')) || [];

// Initialize the app
function init() {
    loadHistory();
    setupEventListeners();
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

    // Modal events
    aboutBtn.addEventListener('click', openModal);
    closeModalSpan.addEventListener('click', closeModal);
    closeModalBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (event) => {
        if (event.target == aboutModal) {
            closeModal();
        }
    });

    // Auto-translate on input
    sourceText.addEventListener('input', debounce(translate, 500));
    
    // Language change
    sourceLanguage.addEventListener('change', translate);
    targetLanguage.addEventListener('change', translate);
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
function translate() {
    const sourceTextValue = sourceText.value.trim();
    const sourceLang = sourceLanguage.value;
    const targetLang = targetLanguage.value;
    
    if (!sourceTextValue) {
        targetText.value = '';
        return;
    }
    
    // Show loading state
    translateBtn.innerHTML = '<span class="loading"></span> Translating...';
    translateBtn.disabled = true;
    
    // Simulate API delay
    setTimeout(() => {
        const translatedText = performTranslation(sourceTextValue, sourceLang, targetLang);
        targetText.value = translatedText;
        
        // Add to history
        addToHistory(sourceTextValue, translatedText, sourceLang, targetLang);
        
        // Reset button
        translateBtn.innerHTML = '<i class="fas fa-language"></i> Translate';
        translateBtn.disabled = false;
    }, 1000);
}

// Perform translation using dictionary
function performTranslation(text, sourceLang, targetLang) {
    const words = text.toLowerCase().split(' ');
    const translatedWords = words.map(word => {
        if (sourceLang === 'en' && targetLang === 'si') {
            return translations[word] || word;
        } else if (sourceLang === 'si' && targetLang === 'en') {
            return sinhalaToEnglish[word] || word;
        }
        return word;
    });
    
    return translatedWords.join(' ');
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
            showNotification('Translation copied to clipboard!');
        });
    }
}

// Text-to-speech
function speakText(text, lang) {
    if ('speechSynthesis' in window && text) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang === 'si' ? 'si-LK' : 'en-US';
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
    
    localStorage.setItem('translationHistory', JSON.stringify(history));
    loadHistory();
}

// Load and display history
function loadHistory() {
    translationHistory.innerHTML = '';
    
    if (history.length === 0) {
        translationHistory.innerHTML = '<p style="text-align: center; color: #999; font-style: italic;">No translation history yet</p>';
        return;
    }
    
    history.forEach(item => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.innerHTML = `
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
    const maxLength = sourceText.maxLength;
    charCounter.textContent = `${currentLength} / ${maxLength}`;
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init); 