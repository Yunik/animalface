// Teachable Machine 모델 URL
const MODEL_URL = "https://teachablemachine.withgoogle.com/models/2U41RFTip/";

// 직장인 동물 유형 데이터 (모델 클래스: 독수리, 하이에나, 코알라, 사자, 미어캣, 철새, 판다, 다람쥐)
const animalData = {
    '독수리': {
        emoji: '🦅',
        name: '칼퇴하는 독수리형',
        description: '정시 퇴근의 달인! 업무 시간에 집중해서 효율적으로 일하고, 칼같이 퇴근하는 프로 직장인입니다. 높은 곳에서 전체를 조망하듯 업무의 우선순위를 명확히 파악하고, 불필요한 야근은 과감히 거부합니다.',
        traits: ['효율적', '시간관리', '워라밸', '집중력', '결단력'],
        strengths: ['업무 효율성 최고', '시간 관리의 달인', '명확한 업무 경계'],
        weaknesses: ['급한 요청에 융통성 부족할 수 있음', '팀 회식 참여율 낮음'],
        advice: '가끔은 동료들과 함께하는 시간도 소중해요. 워라밸도 좋지만 팀워크도 챙겨보세요!',
        gradient: 'linear-gradient(135deg, #434343 0%, #000000 100%)'
    },
    '하이에나': {
        emoji: '🦴',
        name: '회식러버 하이에나형',
        description: '팀 분위기 메이커! 회식자리면 빠지지 않고, 동료들과 어울리는 것을 즐기는 사교적인 직장인입니다. 어떤 자리든 분위기를 살리는 능력자로, 회사 내 인맥왕입니다.',
        traits: ['사교적', '분위기메이커', '팀플레이어', '유쾌함', '네트워커'],
        strengths: ['뛰어난 사교성', '팀 분위기 조성', '넓은 인맥'],
        weaknesses: ['개인 시간 부족', '음주 과다 주의'],
        advice: '즐거운 회식도 좋지만, 건강과 개인 시간도 챙기세요!',
        gradient: 'linear-gradient(135deg, #c79081 0%, #dfa579 100%)'
    },
    '코알라': {
        emoji: '🐨',
        name: '휴게실 코알라형',
        description: '여유로운 힐링 담당! 급하게 일하기보다 차분하게 처리하며, 휴게실에서 재충전하는 것을 중요시합니다. 스트레스 관리의 달인으로, 항상 평온한 에너지를 유지합니다.',
        traits: ['여유로움', '힐링', '차분함', '휴식중시', '평온함'],
        strengths: ['스트레스 관리 능력', '차분한 판단력', '안정적인 업무 처리'],
        weaknesses: ['긴급 상황 대처 느림', '가끔 너무 느긋함'],
        advice: '여유도 좋지만, 때로는 스피드가 필요한 순간도 있어요!',
        gradient: 'linear-gradient(135deg, #a8c0ff 0%, #3f2b96 100%)'
    },
    '사자': {
        emoji: '🦁',
        name: '팀장감 사자형',
        description: '타고난 리더십의 소유자! 자신감 넘치는 태도로 프로젝트를 이끌고, 팀원들에게 신뢰를 주는 타입입니다. 어려운 상황에서도 흔들리지 않는 카리스마로 팀을 이끕니다.',
        traits: ['리더십', '자신감', '책임감', '카리스마', '추진력'],
        strengths: ['강력한 리더십', '결단력', '팀원 동기부여'],
        weaknesses: ['독단적 결정 가능성', '다른 의견 수용 부족'],
        advice: '리더십도 좋지만, 팀원들의 의견에도 귀 기울여보세요!',
        gradient: 'linear-gradient(135deg, #f5af19 0%, #f12711 100%)'
    },
    '미어캣': {
        emoji: '👀',
        name: '눈치백단 미어캣형',
        description: '회사 분위기 파악의 달인! 상사의 기분, 팀 분위기를 빠르게 읽고 상황에 맞게 행동하는 센스쟁이입니다. 위기 상황을 미리 감지하고 대처하는 능력이 탁월합니다.',
        traits: ['눈치빠름', '상황파악', '센스있음', '적응력', '관찰력'],
        strengths: ['빠른 상황 판단', '갈등 회피 능력', '유연한 대처'],
        weaknesses: ['과도한 눈치로 스트레스', '자기 의견 표현 부족'],
        advice: '눈치도 좋지만, 때로는 당당하게 의견을 말해보세요!',
        gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
    },
    '철새': {
        emoji: '🕊️',
        name: '이직준비 철새형',
        description: '더 나은 기회를 찾아 떠날 준비가 된 당신! 자기계발에 열심이고, 커리어 성장을 중요시합니다. 현재에 안주하지 않고 끊임없이 성장하려는 야망가입니다.',
        traits: ['자기계발', '성장지향', '도전적', '야망가', '트렌드세터'],
        strengths: ['높은 성장 욕구', '새로운 기회 포착', '자기계발 열정'],
        weaknesses: ['현재 업무 집중도 저하', '잦은 이직 이력'],
        advice: '새로운 기회도 좋지만, 현재 자리에서의 성장도 가치있어요!',
        gradient: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)'
    },
    '판다': {
        emoji: '🐼',
        name: '야근요정 판다형',
        description: '다크서클이 훈장! 묵묵히 일하다 보면 어느새 야근하고 있는 성실한 직장인입니다. 맡은 일은 끝까지 해내는 책임감의 소유자로, 팀에서 믿음직한 존재입니다.',
        traits: ['성실함', '묵묵함', '책임감', '인내심', '끈기'],
        strengths: ['높은 책임감', '꼼꼼한 업무 처리', '신뢰성'],
        weaknesses: ['워라밸 부족', '번아웃 위험'],
        advice: '열심히 일하는 것도 좋지만, 건강이 최고예요. 적당한 휴식을 취하세요!',
        gradient: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)'
    },
    '다람쥐': {
        emoji: '🐿️',
        name: '간식헌터 다람쥐형',
        description: '간식이 있는 곳에 내가 있다! 서랍에 간식을 쟁여두고, 간식으로 에너지를 충전하는 귀여운 직장인입니다. 작은 것에서 행복을 찾고, 동료들과 나누는 것을 좋아합니다.',
        traits: ['간식러버', '에너지충전', '귀여움', '부지런함', '나눔정신'],
        strengths: ['긍정적 에너지', '동료와의 친화력', '스트레스 해소법 보유'],
        weaknesses: ['간식비 지출 과다', '식곤증 주의'],
        advice: '간식도 좋지만, 건강한 간식으로 바꿔보는 건 어떨까요?',
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
    // 디버깅: 모델이 반환한 클래스 이름 확인
    console.log('모델 클래스 목록:', predictions.map(p => p.className));

    // 확률순 정렬
    const sorted = [...predictions].sort((a, b) => b.probability - a.probability);
    const topResult = sorted[0];

    // 클래스 이름으로 데이터 찾기 (정확히 일치하거나 포함하는 경우)
    let data = animalData[topResult.className];
    if (!data) {
        // 클래스 이름이 정확히 일치하지 않으면 부분 일치로 찾기
        const classNameLower = topResult.className.toLowerCase();
        for (const key of Object.keys(animalData)) {
            if (classNameLower.includes(key.toLowerCase()) || key.toLowerCase().includes(classNameLower)) {
                data = animalData[key];
                break;
            }
        }
    }

    // 여전히 없으면 기본값 사용
    if (!data) {
        data = {
            emoji: '❓',
            name: topResult.className,
            description: '분석 결과입니다.',
            traits: ['분석완료'],
            strengths: ['분석 완료'],
            weaknesses: ['해당 없음'],
            advice: '다시 시도해보세요!',
            gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        };
    }

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

    // 상세 분석 결과 표시
    const strengthsList = document.getElementById('result-strengths');
    strengthsList.innerHTML = data.strengths.map(s => `<li>${s}</li>`).join('');

    const weaknessesList = document.getElementById('result-weaknesses');
    weaknessesList.innerHTML = data.weaknesses.map(w => `<li>${w}</li>`).join('');

    document.getElementById('result-advice').textContent = data.advice;

    // 현재 결과 데이터 저장 (공유용)
    currentResultData = data;

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

        // 모델이 로드되지 않았으면 먼저 로드
        if (!model) {
            await loadModel();
        }

        // 이미지를 캔버스에 그려서 분석
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
        console.error('분석 오류:', error);
        clearInterval(loadingInterval);
        alert('분석 중 오류가 발생했습니다: ' + error.message);
        showScreen('start');
    }
}

// 파일 처리 함수
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

// 현재 결과 데이터 저장 (공유용)
let currentResultData = null;

// 결과 카드 이미지로 다운로드
async function downloadResultCard() {
    const downloadBtn = document.getElementById('download-btn');
    const originalText = downloadBtn.innerHTML;

    try {
        downloadBtn.disabled = true;
        downloadBtn.innerHTML = '<span class="btn-icon">⏳</span><span>저장 중...</span>';

        const resultCard = document.getElementById('result-card');
        const canvas = await html2canvas(resultCard, {
            scale: 2,
            backgroundColor: null,
            useCORS: true
        });

        const link = document.createElement('a');
        link.download = `직장인유형_${currentResultData?.name || '결과'}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();

        downloadBtn.innerHTML = '<span class="btn-icon">✅</span><span>저장 완료!</span>';
        setTimeout(() => {
            downloadBtn.innerHTML = originalText;
            downloadBtn.disabled = false;
        }, 2000);
    } catch (error) {
        console.error('다운로드 오류:', error);
        alert('이미지 저장 중 오류가 발생했습니다.');
        downloadBtn.innerHTML = originalText;
        downloadBtn.disabled = false;
    }
}

// 사이트 URL
const SITE_URL = 'https://animalworker.site/';

// 공유 텍스트 생성
function getShareText() {
    return `${currentResultData?.emoji || ''} 나의 직장인 유형은 "${currentResultData?.name || '알 수 없음'}"!\n\n${currentResultData?.description || ''}\n\n나도 테스트 해보기 👉`;
}

// 이미지 공유 (이미지만)
async function shareImage() {
    const shareBtn = document.getElementById('share-image-btn');
    const originalText = shareBtn.innerHTML;

    if (!navigator.share) {
        alert('이 브라우저에서는 공유 기능을 지원하지 않습니다.\n이미지 저장 버튼을 사용해주세요.');
        return;
    }

    try {
        shareBtn.disabled = true;
        shareBtn.innerHTML = '<span class="btn-icon">⏳</span><span>준비 중...</span>';

        // 결과 카드를 이미지로 변환
        const resultCard = document.getElementById('result-card');
        const canvas = await html2canvas(resultCard, {
            scale: 2,
            backgroundColor: null,
            useCORS: true
        });

        // Canvas를 Blob으로 변환
        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
        const file = new File([blob], `직장인유형_${currentResultData?.name || '결과'}.png`, { type: 'image/png' });

        const shareData = { files: [file] };

        if (navigator.canShare && navigator.canShare(shareData)) {
            await navigator.share(shareData);
        } else {
            alert('이미지 공유가 지원되지 않습니다.\n이미지 저장 버튼을 사용해주세요.');
        }

        shareBtn.innerHTML = originalText;
        shareBtn.disabled = false;
    } catch (error) {
        shareBtn.innerHTML = originalText;
        shareBtn.disabled = false;
        if (error.name !== 'AbortError') {
            console.error('이미지 공유 오류:', error);
            alert('이미지 공유 중 오류가 발생했습니다.');
        }
    }
}

// 링크 공유 (텍스트 + URL)
async function shareLink() {
    const shareBtn = document.getElementById('share-link-btn');
    const originalText = shareBtn.innerHTML;
    const shareText = getShareText();

    if (navigator.share) {
        try {
            shareBtn.disabled = true;
            shareBtn.innerHTML = '<span class="btn-icon">⏳</span><span>준비 중...</span>';

            await navigator.share({
                title: '직장인 유형 테스트 결과',
                text: shareText,
                url: SITE_URL
            });

            shareBtn.innerHTML = originalText;
            shareBtn.disabled = false;
        } catch (error) {
            shareBtn.innerHTML = originalText;
            shareBtn.disabled = false;
            if (error.name !== 'AbortError') {
                console.error('링크 공유 오류:', error);
                fallbackShare(shareText + ' ' + SITE_URL);
            }
        }
    } else {
        fallbackShare(shareText + ' ' + SITE_URL);
    }
}

// 공유 API 미지원 시 대체 방법
function fallbackShare(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            alert('결과가 클립보드에 복사되었습니다!\n원하는 곳에 붙여넣기 하세요.');
        }).catch(() => {
            showCopyPrompt(text);
        });
    } else {
        showCopyPrompt(text);
    }
}

// 복사 프롬프트 표시
function showCopyPrompt(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.select();

    try {
        document.execCommand('copy');
        alert('결과가 클립보드에 복사되었습니다!');
    } catch (err) {
        prompt('아래 텍스트를 복사하세요:', text);
    }

    document.body.removeChild(textArea);
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

    // 다운로드 버튼
    document.getElementById('download-btn').addEventListener('click', downloadResultCard);

    // 이미지 공유 버튼
    document.getElementById('share-image-btn').addEventListener('click', shareImage);

    // 링크 공유 버튼
    document.getElementById('share-link-btn').addEventListener('click', shareLink);

    // 모델 미리 로드
    loadModel().then(() => {
        console.log('모델 로드 완료');
    }).catch(err => {
        console.error('모델 로드 실패:', err);
    });
});
