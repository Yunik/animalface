// Teachable Machine Model URL
const MODEL_URL = "https://teachablemachine.withgoogle.com/models/2U41RFTip/";

// Office Worker Animal Types Data (Model classes: 독수리, 하이에나, 코알라, 사자, 미어캣, 철새, 판다, 다람쥐)
const animalData = {
    '독수리': {
        emoji: '🦅',
        name: 'The Clock-Out Eagle',
        description: 'Master of on-time departure! You focus intensely during work hours, work efficiently, and leave exactly on time like a true professional. Like an eagle surveying from above, you clearly identify work priorities and boldly refuse unnecessary overtime.',
        traits: ['Efficient', 'Time-management', 'Work-life balance', 'Focused', 'Decisive'],
        strengths: ['Maximum work efficiency', 'Master of time management', 'Clear work boundaries'],
        weaknesses: ['May lack flexibility for urgent requests', 'Low team dinner attendance'],
        advice: 'Sometimes spending time with colleagues matters too. Work-life balance is great, but don\'t forget about teamwork!',
        gradient: 'linear-gradient(135deg, #434343 0%, #000000 100%)'
    },
    '하이에나': {
        emoji: '🦴',
        name: 'The Team Dinner Hyena',
        description: 'The team mood maker! Never missing a team dinner, you\'re the social butterfly who loves hanging out with colleagues. You\'re the life of any gathering and the networking champion of the office.',
        traits: ['Social', 'Mood-maker', 'Team-player', 'Cheerful', 'Networker'],
        strengths: ['Excellent social skills', 'Creates great team atmosphere', 'Wide network'],
        weaknesses: ['Lack of personal time', 'Watch out for excessive drinking'],
        advice: 'Team dinners are fun, but take care of your health and personal time too!',
        gradient: 'linear-gradient(135deg, #c79081 0%, #dfa579 100%)'
    },
    '코알라': {
        emoji: '🐨',
        name: 'The Break Room Koala',
        description: 'The relaxed healer! Rather than rushing through tasks, you handle things calmly and value recharging in the break room. As a master of stress management, you always maintain peaceful energy.',
        traits: ['Relaxed', 'Healing', 'Calm', 'Rest-oriented', 'Peaceful'],
        strengths: ['Stress management ability', 'Calm judgment', 'Stable work performance'],
        weaknesses: ['Slow in emergency situations', 'Sometimes too laid-back'],
        advice: 'Being relaxed is good, but sometimes speed is necessary!',
        gradient: 'linear-gradient(135deg, #a8c0ff 0%, #3f2b96 100%)'
    },
    '사자': {
        emoji: '🦁',
        name: 'The Leader Lion',
        description: 'A natural-born leader! With confident attitude, you lead projects and earn trust from team members. With unwavering charisma even in difficult situations, you guide the team forward.',
        traits: ['Leadership', 'Confident', 'Responsible', 'Charismatic', 'Driven'],
        strengths: ['Strong leadership', 'Decisiveness', 'Team motivation'],
        weaknesses: ['May make unilateral decisions', 'May not accept others\' opinions'],
        advice: 'Leadership is great, but try listening to your team members too!',
        gradient: 'linear-gradient(135deg, #f5af19 0%, #f12711 100%)'
    },
    '미어캣': {
        emoji: '👀',
        name: 'The Office-Savvy Meerkat',
        description: 'Master of reading the room! You quickly sense the boss\'s mood and team atmosphere, acting appropriately for every situation. You have excellent ability to detect and handle potential crises.',
        traits: ['Perceptive', 'Situational-awareness', 'Tactful', 'Adaptable', 'Observant'],
        strengths: ['Quick situation assessment', 'Conflict avoidance', 'Flexible responses'],
        weaknesses: ['Stress from excessive awareness', 'Difficulty expressing own opinions'],
        advice: 'Being perceptive is good, but sometimes speak up confidently!',
        gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
    },
    '철새': {
        emoji: '🕊️',
        name: 'The Career Migrant Bird',
        description: 'Ready to fly toward better opportunities! You\'re passionate about self-improvement and prioritize career growth. Never settling for the status quo, you\'re an ambitious go-getter constantly seeking growth.',
        traits: ['Self-improvement', 'Growth-oriented', 'Challenging', 'Ambitious', 'Trendsetter'],
        strengths: ['High growth drive', 'Spotting new opportunities', 'Passion for development'],
        weaknesses: ['May lack focus on current work', 'Frequent job changes'],
        advice: 'New opportunities are great, but growth in your current position is valuable too!',
        gradient: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)'
    },
    '판다': {
        emoji: '🐼',
        name: 'The Overtime Panda',
        description: 'Dark circles are your badge of honor! Working diligently, you often find yourself staying late. As someone who finishes what they start, you\'re a reliable presence in the team.',
        traits: ['Diligent', 'Steady', 'Responsible', 'Patient', 'Persistent'],
        strengths: ['High responsibility', 'Meticulous work', 'Reliability'],
        weaknesses: ['Poor work-life balance', 'Burnout risk'],
        advice: 'Working hard is good, but health comes first. Take proper breaks!',
        gradient: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)'
    },
    '다람쥐': {
        emoji: '🐿️',
        name: 'The Snack Hunter Squirrel',
        description: 'Where there are snacks, there you are! Stocking up treats in your desk drawer, you recharge with snacks. You find happiness in little things and love sharing with colleagues.',
        traits: ['Snack-lover', 'Energy-booster', 'Adorable', 'Industrious', 'Sharing'],
        strengths: ['Positive energy', 'Good rapport with colleagues', 'Stress relief method'],
        weaknesses: ['Snack expenses add up', 'Watch out for food coma'],
        advice: 'Snacks are great, but how about switching to healthier options?',
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    }
};

// Loading messages
const loadingMessages = [
    "AI is analyzing your face...",
    "Measuring dark circle intensity...",
    "Calculating office awareness index...",
    "Analyzing team dinner participation...",
    "Finding your office worker type...",
    "Almost done!"
];

// Global variables
let model, maxPredictions;

// DOM elements
const screens = {
    start: document.getElementById('start-screen'),
    loading: document.getElementById('loading-screen'),
    result: document.getElementById('result-screen'),
    preview: document.getElementById('preview-screen')
};

// Screen transition function
function showScreen(screenName) {
    Object.values(screens).forEach(screen => {
        screen.classList.remove('active');
    });
    screens[screenName].classList.add('active');
}

// Load model
async function loadModel() {
    const modelURL = MODEL_URL + "model.json";
    const metadataURL = MODEL_URL + "metadata.json";

    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();
}

// Image prediction
async function predict(imageElement) {
    if (!model) {
        await loadModel();
    }

    const predictions = await model.predict(imageElement);
    return predictions;
}

// Display result
function displayResult(predictions) {
    // Debug: Check class names returned by model
    console.log('Model class list:', predictions.map(p => p.className));

    // Sort by probability
    const sorted = [...predictions].sort((a, b) => b.probability - a.probability);
    const topResult = sorted[0];

    // Find data by class name (exact match or contains)
    let data = animalData[topResult.className];
    if (!data) {
        // If class name doesn't match exactly, try partial match
        const classNameLower = topResult.className.toLowerCase();
        for (const key of Object.keys(animalData)) {
            if (classNameLower.includes(key.toLowerCase()) || key.toLowerCase().includes(classNameLower)) {
                data = animalData[key];
                break;
            }
        }
    }

    // If still not found, use default
    if (!data) {
        data = {
            emoji: '❓',
            name: topResult.className,
            description: 'Analysis result.',
            traits: ['Analyzed'],
            strengths: ['Analysis complete'],
            weaknesses: ['N/A'],
            advice: 'Please try again!',
            gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        };
    }

    const percentage = Math.round(topResult.probability * 100);

    // Update result card
    document.getElementById('result-emoji').textContent = data.emoji;
    document.getElementById('result-title').textContent = data.name;
    document.getElementById('result-percentage').textContent = `Match: ${percentage}%`;
    document.getElementById('result-description').textContent = data.description;

    // Trait tags
    const traitsContainer = document.getElementById('result-traits');
    traitsContainer.innerHTML = data.traits.map(trait =>
        `<span class="trait-tag">#${trait}</span>`
    ).join('');

    // Result card background
    document.getElementById('result-card').style.background = data.gradient;

    // Display detailed results
    const strengthsList = document.getElementById('result-strengths');
    strengthsList.innerHTML = data.strengths.map(s => `<li>${s}</li>`).join('');

    const weaknessesList = document.getElementById('result-weaknesses');
    weaknessesList.innerHTML = data.weaknesses.map(w => `<li>${w}</li>`).join('');

    document.getElementById('result-advice').textContent = data.advice;

    // Save current result data (for sharing)
    currentResultData = data;

    // Display all predictions
    const predictionsListHTML = sorted.map(pred => {
        const percent = Math.round(pred.probability * 100);
        const animalInfo = animalData[pred.className];
        return `
            <div class="prediction-item">
                <span class="prediction-name">${animalInfo ? animalInfo.emoji : ''} ${animalInfo ? animalInfo.name : pred.className}</span>
                <div class="prediction-bar-container">
                    <div class="prediction-bar" style="width: ${percent}%"></div>
                </div>
                <span class="prediction-percent">${percent}%</span>
            </div>
        `;
    }).join('');

    document.getElementById('predictions-list').innerHTML = predictionsListHTML;

    showScreen('result');
}

// Loading message animation
function animateLoadingMessages() {
    let index = 0;
    const loadingText = document.getElementById('loading-text');

    const interval = setInterval(() => {
        loadingText.textContent = loadingMessages[index];
        index = (index + 1) % loadingMessages.length;
    }, 800);

    return interval;
}

// Analyze uploaded image
async function analyzeUploadedImage() {
    showScreen('loading');
    const loadingInterval = animateLoadingMessages();

    try {
        const previewImage = document.getElementById('preview-image');

        // Load model if not loaded
        if (!model) {
            await loadModel();
        }

        // Draw image on canvas for analysis
        const canvas = document.createElement('canvas');
        const width = previewImage.naturalWidth || previewImage.width || 224;
        const height = previewImage.naturalHeight || previewImage.height || 224;
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(previewImage, 0, 0, width, height);

        const predictions = await model.predict(canvas);
        clearInterval(loadingInterval);
        displayResult(predictions);
    } catch (error) {
        console.error('Analysis error:', error);
        clearInterval(loadingInterval);
        alert('An error occurred during analysis: ' + error.message);
        showScreen('start');
    }
}

// File handling function
function handleFile(file) {
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const previewImage = document.getElementById('preview-image');
            previewImage.onload = () => {
                showScreen('preview');
            };
            previewImage.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
}

// Save current result data (for sharing)
let currentResultData = null;

// Download result card as image
async function downloadResultCard() {
    const downloadBtn = document.getElementById('download-btn');
    const originalText = downloadBtn.innerHTML;

    try {
        downloadBtn.disabled = true;
        downloadBtn.innerHTML = '<span class="btn-icon">⏳</span><span>Saving...</span>';

        const resultCard = document.getElementById('result-card');
        const canvas = await html2canvas(resultCard, {
            scale: 2,
            backgroundColor: null,
            useCORS: true
        });

        const link = document.createElement('a');
        link.download = `OfficeType_${currentResultData?.name || 'Result'}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();

        downloadBtn.innerHTML = '<span class="btn-icon">✅</span><span>Saved!</span>';
        setTimeout(() => {
            downloadBtn.innerHTML = originalText;
            downloadBtn.disabled = false;
        }, 2000);
    } catch (error) {
        console.error('Download error:', error);
        alert('An error occurred while saving the image.');
        downloadBtn.innerHTML = originalText;
        downloadBtn.disabled = false;
    }
}

// Site URL
const SITE_URL = 'https://animalworker.site/en/';

// Generate share text
function getShareText() {
    return `${currentResultData?.emoji || ''} My office worker type is "${currentResultData?.name || 'Unknown'}"!\n\n${currentResultData?.description || ''}\n\nTake the test too 👉`;
}

// Share image (image only)
async function shareImage() {
    const shareBtn = document.getElementById('share-image-btn');
    const originalText = shareBtn.innerHTML;

    if (!navigator.share) {
        alert('Sharing is not supported in this browser.\nPlease use the Save Image button.');
        return;
    }

    try {
        shareBtn.disabled = true;
        shareBtn.innerHTML = '<span class="btn-icon">⏳</span><span>Preparing...</span>';

        // Convert result card to image
        const resultCard = document.getElementById('result-card');
        const canvas = await html2canvas(resultCard, {
            scale: 2,
            backgroundColor: null,
            useCORS: true
        });

        // Convert Canvas to Blob
        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
        const file = new File([blob], `OfficeType_${currentResultData?.name || 'Result'}.png`, { type: 'image/png' });

        const shareData = { files: [file] };

        if (navigator.canShare && navigator.canShare(shareData)) {
            await navigator.share(shareData);
        } else {
            alert('Image sharing is not supported.\nPlease use the Save Image button.');
        }

        shareBtn.innerHTML = originalText;
        shareBtn.disabled = false;
    } catch (error) {
        shareBtn.innerHTML = originalText;
        shareBtn.disabled = false;
        if (error.name !== 'AbortError') {
            console.error('Image share error:', error);
            alert('An error occurred while sharing the image.');
        }
    }
}

// Share link (text + URL)
async function shareLink() {
    const shareBtn = document.getElementById('share-link-btn');
    const originalText = shareBtn.innerHTML;
    const shareText = getShareText();

    if (navigator.share) {
        try {
            shareBtn.disabled = true;
            shareBtn.innerHTML = '<span class="btn-icon">⏳</span><span>Preparing...</span>';

            await navigator.share({
                title: 'Office Worker Type Test Result',
                text: shareText,
                url: SITE_URL
            });

            shareBtn.innerHTML = originalText;
            shareBtn.disabled = false;
        } catch (error) {
            shareBtn.innerHTML = originalText;
            shareBtn.disabled = false;
            if (error.name !== 'AbortError') {
                console.error('Link share error:', error);
                fallbackShare(shareText + ' ' + SITE_URL);
            }
        }
    } else {
        fallbackShare(shareText + ' ' + SITE_URL);
    }
}

// Fallback when share API not supported
function fallbackShare(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            alert('Result copied to clipboard!\nPaste it wherever you want.');
        }).catch(() => {
            showCopyPrompt(text);
        });
    } else {
        showCopyPrompt(text);
    }
}

// Show copy prompt
function showCopyPrompt(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.select();

    try {
        document.execCommand('copy');
        alert('Result copied to clipboard!');
    } catch (err) {
        prompt('Copy the text below:', text);
    }

    document.body.removeChild(textArea);
}

// Event listener setup
document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');

    // Drag and drop events
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('drag-over');
    });

    dropZone.addEventListener('dragleave', (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
        const file = e.dataTransfer.files[0];
        handleFile(file);
    });

    // Click drop zone to select file
    dropZone.addEventListener('click', (e) => {
        if (e.target.id !== 'upload-btn') {
            fileInput.click();
        }
    });

    // Upload button
    document.getElementById('upload-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        fileInput.click();
    });

    // File selection
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        handleFile(file);
    });

    // Analyze button (preview)
    document.getElementById('analyze-btn').addEventListener('click', analyzeUploadedImage);

    // Cancel button (preview)
    document.getElementById('cancel-btn').addEventListener('click', () => {
        document.getElementById('file-input').value = '';
        showScreen('start');
    });

    // Retry button
    document.getElementById('retry-btn').addEventListener('click', () => {
        document.getElementById('file-input').value = '';
        showScreen('start');
    });

    // Download button
    document.getElementById('download-btn').addEventListener('click', downloadResultCard);

    // Image share button
    document.getElementById('share-image-btn').addEventListener('click', shareImage);

    // Link share button
    document.getElementById('share-link-btn').addEventListener('click', shareLink);

    // Preload model
    loadModel().then(() => {
        console.log('Model loaded');
    }).catch(err => {
        console.error('Model load failed:', err);
    });
});
