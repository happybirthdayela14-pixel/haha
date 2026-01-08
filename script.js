const reasons = [
    "The way you make me smile through a screen.",
    "Your voice is my favorite notification.",
    "How you handle the distance with so much grace.",
    "The way you believe in me more than I do.",
    "You are the best thing that ever happened to me."
];

let hugs = 0;
let isPlaying = false;
let candles = [];
let audioContext, analyser, microphone;


function showPart(partNumber) {
    document.getElementById('part-1').style.display = 'none';
    document.getElementById('part-2').style.display = 'none';
    document.getElementById('part-3').style.display = 'none';
    document.getElementById('part-4').style.display = 'none';

    const selectedPart = document.getElementById('part-' + partNumber);
    selectedPart.style.display = 'block';
    
    
    if (partNumber === 4) {
        initCake();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}


function validatePassword() {
    const pass = document.getElementById('secret-code').value;
    if (pass === '011406') {
        document.getElementById('password-screen').style.display = 'none';
        document.getElementById('lock-screen').style.display = 'flex'; 
    } else {
        document.getElementById('error-msg').style.display = 'block';
    }
}

function openGift() {
    document.getElementById('lock-screen').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
    showPart(1);
    createConfetti();
    document.getElementById('bg-music').play();
    isPlaying = true;
}


function initCake() {
    const cake = document.querySelector('.cake');
    // Clear old candles
    candles.forEach(c => c.remove());
    candles = [];

    
    addCandle(125, 30);

    
    cake.onclick = (e) => {
        const rect = cake.getBoundingClientRect();
        addCandle(e.clientX - rect.left, e.clientY - rect.top);
    };

    // Request Mic Access
    if (!analyser) {
        navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            analyser = audioContext.createAnalyser();
            microphone = audioContext.createMediaStreamSource(stream);
            microphone.connect(analyser);
            analyser.fftSize = 256;
            detectBlow();
        }).catch(err => console.error("Mic error:", err));
    }
}

function addCandle(left, top) {
    const cake = document.querySelector('.cake');
    const candle = document.createElement('div');
    candle.className = 'candle';
    candle.style.left = left + 'px';
    candle.style.top = top + 'px';
    
    const flame = document.createElement('div');
    flame.className = 'flame';
    candle.appendChild(flame);
    
    cake.appendChild(candle);
    candles.push(candle);
}

function detectBlow() {
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(dataArray);

    let sum = 0;
    for (let i = 0; i < bufferLength; i++) sum += dataArray[i];
    let average = sum / bufferLength;

    if (average > 50) { 
        candles.forEach(candle => {
            if (!candle.classList.contains('out')) {
                candle.classList.add('out');
                triggerBlowConfetti();
            }
        });
    }
    requestAnimationFrame(detectBlow);
}

function triggerBlowConfetti() {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
}


function sendHug() {
    hugs++;
    document.getElementById('hug-count').innerText = `Hugs sent today: ${hugs}`;
    const btn = document.querySelector('.btn-hug');
    btn.innerText = "Hug Sent! ❤️";
    setTimeout(() => { btn.innerText = "Send a Virtual Hug 🫂"; }, 1000);
}

function revealScratch() {
    document.getElementById('scratch-overlay').style.opacity = '0';
    setTimeout(() => { document.getElementById('scratch-overlay').style.display = 'none'; }, 800);
}

function generateReason() {
    const text = document.getElementById('reason-text');
    text.innerText = reasons[Math.floor(Math.random() * reasons.length)];
}

function createBackgroundHearts() {
    const container = document.getElementById('bg-hearts');
    for(let i=0; i<15; i++) {
        const heart = document.createElement('div');
        heart.className = 'bg-heart';
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 5 + 's';
        container.appendChild(heart);
    }
}
createBackgroundHearts();

function createConfetti() {
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
}

function toggleMusic() {
    const music = document.getElementById('bg-music');
    if (isPlaying) music.pause();
    else music.play();
    isPlaying = !isPlaying;
}

function validatePassword() {
    const pass = document.getElementById('secret-code').value;
    const errorMsg = document.getElementById('error-msg');

    if (pass === '011406') {
        
        showBirthdaySurprise();
    } else {
        errorMsg.style.display = 'block';
    }
}

function showBirthdaySurprise() {
    const overlay = document.getElementById('birthday-overlay');
    overlay.style.display = 'flex';
    
    
    confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 }
    });

   
    overlay.onclick = function() {
        overlay.style.display = 'none';
        document.getElementById('password-screen').style.display = 'none';
        document.getElementById('lock-screen').style.display = 'flex';
    };
}