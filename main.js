// Teachable Machine 모델 URL
const MODEL_URL = "https://teachablemachine.withgoogle.com/models/2U41RFTip/";

// 직장인 동물 유형 데이터
const animalData = {
    'Eagle': {
        emoji: '🦅',
        name: '칼퇴하는 독수리형',
        description: '정시 퇴근의 달인! 업무 시간에 집중해서 효율적으로 일하고, 칼같이 퇴근하는 프로 직장인입니다.',
        traits: ['효율적', '시간관리', '워라밸', '집중력'],
        gradient: 'linear-gradient(135deg, #434343 0%, #000000 100%)'
    },
    'Hyena': {
        emoji: '🦴',
        name: '회식좋아 하이에나형',
        description: '팀 분위기 메이커! 회식자리면 빠지지 않고, 동료들과 어울리는 것을 즐기는 사교적인 직장인입니다.',
        traits: ['사교적', '분위기메이커', '팀플레이어', '유쾌함'],
        gradient: 'linear-gradient(135deg, #c79081 0%, #dfa579 100%)'
    },
    'Koala': {
        emoji: '🐨',
        name: '휴게실 코알라형',
        description: '여유로운 힐링 담당! 급하게 일하기보다 차분하게 처리하며, 휴게실에서 재충전하는 것을 중요시합니다.',
        traits: ['여유로움', '힐링', '차분함', '휴식중시'],
        gradient: 'linear-gradient(135deg, #a8c0ff 0%, #3f2b96 100%)'
    },
    'Lion': {
        emoji: '🦁',
        name: '팀장감 사자형',
        description: '타고난 리더십의 소유자! 자신감 넘치는 태도로 프로젝트를 이끌고, 팀원들에게 신뢰를 주는 타입입니다.',
        traits: ['리더십', '자신감', '책임감', '카리스마'],
        gradient: 'linear-gradient(135deg, #f5af19 0%, #f12711 100%)'
    },
    'Meerkat': {
        emoji: '👀',
        name: '눈치보는 미어캣형',
        description: '회사 분위기 파악의 달인! 상사의 기분, 팀 분위기를 빠르게 읽고 상황에 맞게 행동하는 센스쟁이입니다.',
        traits: ['눈치빠름', '상황파악', '센스있음', '적응력'],
        gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
    },
    'MigratoryBird': {
        emoji: '🕊️',
        name: '이직준비 철새형',
        description: '더 나은 기회를 찾아 떠날 준비가 된 당신! 자기계발에 열심이고, 커리어 성장을 중요시합니다.',
        traits: ['자기계발', '성장지향', '도전적', '준비된자'],
        gradient: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)'
    },
    'Panda': {
        emoji: '🐼',
        name: '야근하는 판다형',
        description: '다크서클이 훈장! 묵묵히 일하다 보면 어느새 야근하고 있는 성실한 직장인입니다.',
        traits: ['성실함', '묵묵함', '책임감', '인내심'],
        gradient: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)'
    },
    'Squirrel': {
        emoji: '🐿️',
        name: '간식사냥 다람쥐형',
        description: '간식이 있는 곳에 내가 있다! 서랍에 간식을 쟁여두고, 간식으로 에너지를 충전하는 귀여운 직장인입니다.',
        traits: ['간식러버', '에너지충전', '귀여움', '부지런함'],
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    }
};

// 로딩 메시지
const loadingMessages = [
    "AI가 얼굴을 분석하고 있습니다...",
    "다크서클 농도 측정 중...",
    "눈치력 지수 계산 중...",
    "회식 참여도 분석 중...",
    "당신의 직장인 유형을 찾고 있어요...",
    "거의 다 됐어요!"
];

// 전역 변수
let model, maxPredictions;

// DOM 요소
const screens = {
    start: document.getElementById('start-screen'),
    loading: document.getElementById('loading-screen'),
    result: document.getElementById('result-screen'),
    preview: document.getElementById('preview-screen')
};

// 화면 전환 함수
function showScreen(screenName) {
    Object.values(screens).forEach(screen => {
        screen.classList.remove('active');
    });
    screens[screenName].classList.add('active');
}

// 모델 로드
async function loadModel() {
    const modelURL = MODEL_URL + "model.json";
    const metadataURL = MODEL_URL + "metadata.json";

    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();
}

// 이미지 예측
async function predict(imageElement) {
    if (!model) {
        await loadModel();
    }

    const predictions = await model.predict(imageElement);
    return predictions;
}

// 결과 표시
function displayResult(predictions) {
    // 확률순 정렬
    const sorted = [...predictions].sort((a, b) => b.probability - a.probability);
    const topResult = sorted[0];

    const data = animalData[topResult.className];
    const percentage = Math.round(topResult.probability * 100);

    // 결과 카드 업데이트
    document.getElementById('result-emoji').textContent = data.emoji;
    document.getElementById('result-title').textContent = data.name;
    document.getElementById('result-percentage').textContent = `일치율: ${percentage}%`;
    document.getElementById('result-description').textContent = data.description;

    // 특성 태그
    const traitsContainer = document.getElementById('result-traits');
    traitsContainer.innerHTML = data.traits.map(trait =>
        `<span class="trait-tag">#${trait}</span>`
    ).join('');

    // 결과 카드 배경색
    document.getElementById('result-card').style.background = data.gradient;

    // 전체 예측 결과 표시
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

// 로딩 메시지 애니메이션
function animateLoadingMessages() {
    let index = 0;
    const loadingText = document.getElementById('loading-text');

    const interval = setInterval(() => {
        loadingText.textContent = loadingMessages[index];
        index = (index + 1) % loadingMessages.length;
    }, 800);

    return interval;
}

// 업로드된 이미지 분석
async function analyzeUploadedImage() {
    showScreen('loading');
    const loadingInterval = animateLoadingMessages();

    try {
        const previewImage = document.getElementById('preview-image');

        // 이미지가 로드될 때까지 대기
        if (!previewImage.complete) {
            await new Promise((resolve, reject) => {
                previewImage.onload = resolve;
                previewImage.onerror = reject;
            });
        }

        // 이미지를 캔버스에 그려서 분석 (CORS 문제 방지)
        const canvas = document.createElement('canvas');
        canvas.width = previewImage.naturalWidth || previewImage.width;
        canvas.height = previewImage.naturalHeight || previewImage.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(previewImage, 0, 0);

        const predictions = await predict(canvas);
        clearInterval(loadingInterval);
        displayResult(predictions);
    } catch (error) {
        console.error('분석 오류:', error);
        clearInterval(loadingInterval);
        alert('분석 중 오류가 발생했습니다. 다시 시도해주세요.');
        showScreen('start');
    }
}

// 파일 처리 함수
function handleFile(file) {
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
            document.getElementById('preview-image').src = event.target.result;
            showScreen('preview');
        };
        reader.readAsDataURL(file);
    }
}

// 이벤트 리스너 설정
document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');

    // 드래그 앤 드롭 이벤트
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

    // 드롭존 클릭 시 파일 선택
    dropZone.addEventListener('click', (e) => {
        if (e.target.id !== 'upload-btn') {
            fileInput.click();
        }
    });

    // 사진 업로드 버튼
    document.getElementById('upload-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        fileInput.click();
    });

    // 파일 선택 시
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        handleFile(file);
    });

    // 분석하기 버튼 (미리보기)
    document.getElementById('analyze-btn').addEventListener('click', analyzeUploadedImage);

    // 취소 버튼 (미리보기)
    document.getElementById('cancel-btn').addEventListener('click', () => {
        document.getElementById('file-input').value = '';
        showScreen('start');
    });

    // 다시 테스트하기 버튼
    document.getElementById('retry-btn').addEventListener('click', () => {
        document.getElementById('file-input').value = '';
        showScreen('start');
    });

    // 모델 미리 로드
    loadModel().then(() => {
        console.log('모델 로드 완료');
    }).catch(err => {
        console.error('모델 로드 실패:', err);
    });
});
