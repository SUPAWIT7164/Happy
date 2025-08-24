// Happy Birthday Interactive Effects with Games
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all interactive features
    initCharacterInteractions();
    initFlowerInteractions();
    initCakeInteraction();
    initRandomFloatingElements();
    initBirthdayMusic();
    initConfettiOnLoad();
    initPhotoFrame();
    initCountdown();
    initBirthdayGirlInteraction();
    initCheerPhotosInteraction();
    
    // Set initial volume and setup audio
    const audio = document.getElementById('birthday-song');
    if (audio) {
        audio.volume = 0.8; // Set to 80% volume for better experience
        
        // Add event listeners for debugging
        audio.addEventListener('loadstart', () => {
            console.log('Audio loading started');
            showMessage('กำลังโหลดเพลง MP3... กรุณารอสักครู่ 🎵');
        });
        
        audio.addEventListener('canplay', () => {
            console.log('Audio can play');
            showMessage('เพลง MP3 พร้อมแล้ว! 🎵');
        });
        
        audio.addEventListener('canplaythrough', () => {
            console.log('Audio can play through');
            showMessage('เพลง MP3 โหลดเสร็จแล้ว! 🎵');
        });
        
        audio.addEventListener('error', (e) => {
            console.error('Audio error:', e);
            console.error('Error details:', e.target.error);
            showMessage('ไม่สามารถโหลดไฟล์ MP3 ได้ กรุณาตรวจสอบชื่อไฟล์ 🎵');
            
            // Show more detailed error message
            if (e.target.error) {
                switch(e.target.error.code) {
                    case e.target.error.MEDIA_ERR_ABORTED:
                        showMessage('การโหลดไฟล์ MP3 ถูกยกเลิก 🎵');
                        break;
                    case e.target.error.MEDIA_ERR_NETWORK:
                        showMessage('เกิดข้อผิดพลาดในการโหลดไฟล์ MP3 จากเครือข่าย 🎵');
                        break;
                    case e.target.error.MEDIA_ERR_DECODE:
                        showMessage('ไม่สามารถถอดรหัสไฟล์ MP3 ได้ กรุณาตรวจสอบไฟล์ 🎵');
                        break;
                    case e.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
                        showMessage('ไฟล์ MP3 ไม่รองรับ กรุณาตรวจสอบรูปแบบไฟล์ 🎵');
                        break;
                    default:
                        showMessage('เกิดข้อผิดพลาดในการโหลดไฟล์ MP3 🎵');
                }
            }
        });
        
        audio.addEventListener('play', () => {
            console.log('Audio started playing');
            showMessage('🎵 เพลงเริ่มเล่นแล้ว! 🎵');
        });
        
        audio.addEventListener('pause', () => {
            console.log('Audio paused');
        });
        
        audio.addEventListener('ended', () => {
            console.log('Audio ended, restarting...');
            audio.currentTime = 0;
            audio.play();
        });
    }
    
    // Start music after page loads
    setTimeout(() => {
        // Check if MP3 file exists and can be loaded
        const audio = document.getElementById('birthday-song');
        if (audio) {
            console.log('=== Audio Debug Info ===');
            console.log('Audio element:', audio);
            console.log('Audio src:', audio.src);
            console.log('Audio readyState:', audio.readyState);
            console.log('Audio networkState:', audio.networkState);
            console.log('Audio error:', audio.error);
            
            // Test if file can be loaded
            const testAudio = new Audio();
            testAudio.src = 'Happy Birthday song Romantic version romantic piano version.mp3';
            testAudio.addEventListener('loadstart', () => console.log('Test audio: loadstart'));
            testAudio.addEventListener('canplay', () => console.log('Test audio: canplay'));
            testAudio.addEventListener('error', (e) => console.error('Test audio error:', e));
        }
        
        startMusic();
    }, 2000); // Start after 2 seconds
    
    // Initialize Birthday Girl Interaction
    initBirthdayGirlInteraction();
    
    // Initialize Cheer Photos Interaction
    initCheerPhotosInteraction();
    
    // Character interactions
    function initCharacterInteractions() {
        const characters = document.querySelectorAll('.character');
        
        characters.forEach(character => {
            character.addEventListener('click', function() {
                // Add special animation on click
                this.style.transform = 'scale(1.2) rotate(360deg)';
                
                // Show character message
                showCharacterMessage(this);
                
                // Reset animation after 1 second
                setTimeout(() => {
                    this.style.transform = '';
                }, 1000);
                
                // Create floating hearts from character
                createFloatingHeartsFromElement(this);
            });
            
            // Add hover sound effect (visual feedback)
            character.addEventListener('mouseenter', function() {
                this.style.boxShadow = '0 20px 40px rgba(255, 107, 157, 0.3)';
            });
            
            character.addEventListener('mouseleave', function() {
                this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
            });
        });
    }
    
    // Birthday Girl Interaction
    function initBirthdayGirlInteraction() {
        const birthdayGirl = document.querySelector('.birthday-girl-photo');
        
        if (birthdayGirl) {
            birthdayGirl.addEventListener('click', function() {
                const messages = [
                    '🎂 สุขสันต์วันเกิด! ขอให้เธอมีความสุขมากๆ ในวันพิเศษนี้! 🌟',
                    '🎉 วันนี้เป็นวันของเธอ! ขอให้เต็มไปด้วยรอยยิ้ม เสียงหัวเราะ และความทรงจำดีๆ! ✨',
                    '🎁 ขอให้เธอได้รับของขวัญที่สวยงามที่สุดในชีวิต! ความรัก ความสุข และความสำเร็จ! 💖',
                    '🌈 วันที่สวยงามที่สุดในปี! ขอให้เธอได้ทำในสิ่งที่ชอบ และมีคนที่รักอยู่เคียงข้าง! 🥰',
                    '🎊 วันพิเศษของเธอ! ขอให้มีความสุขมากๆ และได้ทำในสิ่งที่ฝันไว้! 🌠'
                ];
                
                const randomMessage = messages[Math.floor(Math.random() * messages.length)];
                showMessage(randomMessage);
                
                // Trigger confetti
                createConfetti();
                
                // Add floating hearts
                createFloatingHearts();
            });
            
            // Add hover effects
            birthdayGirl.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
                this.style.cursor = 'pointer';
            });
            
            birthdayGirl.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        }
    }
    
    // Cheer Photos Interaction
    function initCheerPhotosInteraction() {
        const cheerItems = document.querySelectorAll('.cheer-item');
        
        cheerItems.forEach((item, index) => {
            item.addEventListener('click', function() {
                const messages = [
                    '📸 ภาพความสุขที่สวยงาม! ขอให้เธอมีความสุขมากๆ! 🌟',
                    '🎉 ภาพแห่งความทรงจำ! ขอให้วันนี้เป็นวันที่น่าจดจำที่สุด! ✨',
                    '💖 ภาพแห่งความรัก! ขอให้เธอได้รับความรักมากมายในวันเกิด! 🥰',
                    '🌈 ภาพแห่งความฝัน! ขอให้เธอได้ทำในสิ่งที่ฝันไว้! 🌠',
                    '🎊 ภาพแห่งการเฉลิมฉลอง! ขอให้วันนี้เป็นวันที่สนุกที่สุด! 🎈'
                ];
                
                const randomMessage = messages[index % messages.length];
                showMessage(randomMessage);
                
                // Trigger different effects based on photo index
                if (index % 2 === 0) {
                    createConfetti();
                } else {
                    createFloatingHearts();
                }
            });
            
            // Add hover effects
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
                this.style.cursor = 'pointer';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }
    
    // Show character specific messages
    function showCharacterMessage(character) {
        const messages = {
            'maruko': [
                'มารุโกะขอให้มีความสุขมากๆ นะคะ! ขอให้ทุกๆ วันเป็นวันที่สวยงามเหมือนดอกซากุระที่บานสะพรั่ง และขอให้มีเพื่อนดีๆ รอบข้างตลอดไป! 🌸💕',
                'วันเกิดนี้ขอให้เป็นวันที่พิเศษที่สุดเลย! มารุโกะหวังว่าเธอจะมีความสุขเยอะๆ มีรอยยิ้มสดใสและได้ทำในสิ่งที่ชอบทุกวัน! ขอให้โชคดีในทุกเรื่องนะ! 🌸✨'
            ],
            'reborn': [
                'รีบอร์นอวยพรให้เธอเป็นสาวที่น่ารักตลอดไป! ขอให้มีพลังอำนาจในการทำให้ความฝันเป็นจริง และมีความแข็งแกร่งในการเผชิญหน้ากับอุปสรรคทุกอย่าง! 👑💪',
                'ขอให้ทุกความฝันเป็นจริงนะคะ! รีบอร์นจะปกป้องความสุขของเธอเสมอ ขอให้มีผู้คนที่รักและเข้าใจอยู่รอบข้าง และขอให้ชีวิตเต็มไปด้วยการผจญภัยที่น่าตื่นเต้น! ✨🔥'
            ],
            'shinchan': [
                'ชินจังขอให้มีความสุขและรอยยิ้มสดใสตลอดไป! ขอให้ทุกวันเป็นวันที่สนุกสนาน มีเรื่องตลกๆ ให้หัวเราะ และมีขนมอร่อยๆ ให้กินทุกวัน! ชินจังรักเธอมากนะ! 😊🍭',
                'วันเกิดนี้ต้องสนุกและมีความสุขมากๆ นะ! ชินจังขอให้เธอมีครอบครัวที่อบอุ่น เพื่อนที่ดี และได้เล่นสนุกๆ ทุกวัน! ห้ามเศร้าเลยนะ ต้องยิ้มให้สดใสเหมือนชินจังเสมอ! 🎉🌈'
            ]
        };
        
        let characterType = 'maruko';
        if (character.classList.contains('reborn')) characterType = 'reborn';
        if (character.classList.contains('shinchan')) characterType = 'shinchan';
        
        const randomMessage = messages[characterType][Math.floor(Math.random() * messages[characterType].length)];
        
        // Create message popup using the global showMessage function for better visibility
        showMessage(randomMessage);
        
        // Also create a small popup above character for visual feedback
        const miniMessageDiv = document.createElement('div');
        miniMessageDiv.className = 'character-mini-message';
        miniMessageDiv.textContent = '💬';
        miniMessageDiv.style.cssText = `
            position: absolute;
            top: -30px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(255, 107, 157, 0.9);
            color: white;
            padding: 5px 10px;
            border-radius: 50%;
            font-size: 1.2rem;
            z-index: 1000;
            animation: messageSlideIn 0.5s ease-out;
            pointer-events: none;
        `;
        
        character.style.position = 'relative';
        character.appendChild(miniMessageDiv);
        
        // Remove mini message after 2 seconds
        setTimeout(() => {
            if (miniMessageDiv.parentNode) {
                miniMessageDiv.remove();
            }
        }, 2000);
    }
    
    // Flower interactions
    function initFlowerInteractions() {
        const flowers = document.querySelectorAll('.flower');
        
        flowers.forEach(flower => {
            flower.addEventListener('click', function() {
                // Create blooming effect
                this.style.transform = 'scale(1.5) rotate(360deg)';
                this.style.filter = 'brightness(1.5)';
                
                // Create petal explosion
                createPetalExplosion(this);
                
                // Reset after animation
                setTimeout(() => {
                    this.style.transform = '';
                    this.style.filter = '';
                }, 800);
            });
        });
    }
    
    // Create petal explosion effect
    function createPetalExplosion(element) {
        const petals = ['🌸', '🌺', '🌹', '🌻', '🌷'];
        const rect = element.getBoundingClientRect();
        
        for (let i = 0; i < 8; i++) {
            const petal = document.createElement('div');
            petal.textContent = petals[Math.floor(Math.random() * petals.length)];
            petal.style.cssText = `
                position: fixed;
                left: ${rect.left + rect.width/2}px;
                top: ${rect.top + rect.height/2}px;
                font-size: 1.5rem;
                pointer-events: none;
                z-index: 1000;
                animation: petalFly 2s ease-out forwards;
            `;
            
            // Random direction for each petal
            const angle = (360 / 8) * i;
            const distance = 100 + Math.random() * 50;
            petal.style.setProperty('--angle', angle + 'deg');
            petal.style.setProperty('--distance', distance + 'px');
            
            document.body.appendChild(petal);
            
            // Remove after animation
            setTimeout(() => petal.remove(), 2000);
        }
    }
    
    // Cake interaction - Enhanced with blow feature
    function initCakeInteraction() {
        const cake = document.querySelector('.birthday-cake');
        let candlesLit = true;
        
        cake.addEventListener('click', function() {
            if (candlesLit) {
                blowCandles();
            } else {
                lightCandles();
            }
        });
        
        // Keyboard support for blowing
        document.addEventListener('keydown', function(e) {
            if (e.key.toLowerCase() === 'b' && candlesLit) {
                blowCandles();
            }
        });
        
        // Set initial state
        window.candlesLit = true;
    }
    


    

    
    // Random floating elements continuously (reduced frequency)
    function initRandomFloatingElements() {
        setInterval(() => {
            // Only create element 50% of the time
            if (Math.random() < 0.5) {
                createRandomFloatingElement();
            }
        }, 5000); // Increased interval from 3s to 5s
    }
    
    function createRandomFloatingElement() {
        const elements = ['✨', '🌟', '💫', '🦋', '🌸']; // Removed heart
        const element = document.createElement('div');
        element.textContent = elements[Math.floor(Math.random() * elements.length)];
        element.style.cssText = `
            position: fixed;
            left: ${Math.random() * 100}vw;
            bottom: -50px;
            font-size: 1.2rem;
            pointer-events: none;
            z-index: 1;
            animation: floatUpSlow 8s linear forwards;
            opacity: 0.5;
        `;
        
        document.body.appendChild(element);
        
        setTimeout(() => element.remove(), 8000);
    }
    
    // Birthday music toggle (visual indication)
    function initBirthdayMusic() {
        const musicNote = document.createElement('div');
        musicNote.innerHTML = '🎵';
        musicNote.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            font-size: 2rem;
            cursor: pointer;
            z-index: 1000;
            animation: musicBounce 2s ease-in-out infinite;
            background: rgba(255, 255, 255, 0.9);
            border-radius: 50%;
            width: 60px;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        `;
        
        let isPlaying = false;
        musicNote.addEventListener('click', function() {
            isPlaying = !isPlaying;
            this.innerHTML = isPlaying ? '🎶' : '🎵';
            showMessage(isPlaying ? 'เปิดเพลง! 🎵' : 'ปิดเพลง 🔇');
        });
        
        document.body.appendChild(musicNote);
    }
    
    // Initial confetti on page load
    function initConfettiOnLoad() {
        setTimeout(() => {
            createConfetti();
        }, 1000);
    }
    
    // Add CSS animations dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes messageSlideIn {
            from { opacity: 0; transform: translateX(-50%) translateY(-50%) scale(0.5); }
            to { opacity: 1; transform: translateX(-50%) translateY(-50%) scale(1); }
        }
        
        @keyframes messageSlideOut {
            from { opacity: 1; transform: translateX(-50%) translateY(-50%) scale(1); }
            to { opacity: 0; transform: translateX(-50%) translateY(-50%) scale(0.5); }
        }
        
        @keyframes petalFly {
            to {
                transform: rotate(720deg) translate(var(--distance)) rotate(-720deg);
                opacity: 0;
            }
        }
        
        @keyframes confettiFall {
            to {
                transform: translateY(100vh) rotate(720deg);
                opacity: 0;
            }
        }
        
        @keyframes heartFloatUp {
            to {
                transform: translateY(-200px);
                opacity: 0;
            }
        }
        
        @keyframes floatUpSlow {
            to {
                transform: translateY(-100vh);
                opacity: 0;
            }
        }
        
        @keyframes musicBounce {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
    `;
    document.head.appendChild(style);
    
    // Add special birthday message on scroll
    let hasShownScrollMessage = false;
    window.addEventListener('scroll', function() {
        if (!hasShownScrollMessage && window.scrollY > 100) {
            hasShownScrollMessage = true;
            showMessage('เลื่อนลงไปดูของขวัญพิเศษนะคะ! 🎁✨');
        }
    });
    
    // Add click anywhere for hearts effect (reduced frequency)
    document.addEventListener('click', function(e) {
        // Don't trigger on interactive elements
        if (!e.target.classList.contains('character') && 
            !e.target.classList.contains('flower') && 
            !e.target.classList.contains('birthday-cake')) {
            
            // Lower chance for surprise hearts
            if (Math.random() < 0.1) {
                const heart = document.createElement('div');
                heart.textContent = '💕';
                heart.style.cssText = `
                    position: fixed;
                    left: ${e.clientX}px;
                    top: ${e.clientY}px;
                    font-size: 1.2rem;
                    pointer-events: none;
                    z-index: 1000;
                    animation: heartFloatUp 2s ease-out forwards;
                `;
                
                document.body.appendChild(heart);
                setTimeout(() => heart.remove(), 2000);
            }
        }
    });
});

// Show temporary messages
function showMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.innerHTML = `
        <div style="margin-bottom: 10px; font-size: 1.2rem; font-weight: 600;">💌 ข้อความพิเศษ</div>
        <div style="line-height: 1.6; font-size: 1rem;">${text}</div>
        <button onclick="this.parentElement.remove()" style="
            background: rgba(255,255,255,0.2);
            border: 1px solid rgba(255,255,255,0.3);
            color: white;
            padding: 8px 15px;
            border-radius: 15px;
            margin-top: 15px;
            cursor: pointer;
            font-size: 0.9rem;
            font-family: 'Kanit', sans-serif;
        ">ปิด ✨</button>
    `;
    messageDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(255, 107, 157, 0.95);
        color: white;
        padding: 20px 25px;
        border-radius: 25px;
        font-weight: 500;
        z-index: 10000;
        box-shadow: 0 15px 40px rgba(0,0,0,0.4);
        animation: messageSlideIn 0.5s ease-out;
        max-width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        text-align: center;
        font-family: 'Kanit', sans-serif;
        backdrop-filter: blur(10px);
        border: 2px solid rgba(255,255,255,0.2);
    `;
    
    document.body.appendChild(messageDiv);
    
    // Auto close after 8 seconds if not manually closed
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.style.animation = 'messageSlideOut 0.5s ease-in forwards';
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.remove();
                }
            }, 500);
        }
    }, 8000);
}

// Create confetti explosion
function createConfetti() {
    const confettiColors = ['🎊', '🎉', '✨', '🌟', '💫'];
    
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.textContent = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        confetti.style.cssText = `
            position: fixed;
            left: ${Math.random() * 100}vw;
            top: -50px;
            font-size: ${1 + Math.random() * 2}rem;
            pointer-events: none;
            z-index: 1000;
            animation: confettiFall ${2 + Math.random() * 3}s ease-out forwards;
        `;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 5000);
    }
}

// Create floating hearts from specific element
function createFloatingHeartsFromElement(element) {
    const hearts = ['💕', '💖'];
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < 2; i++) {
        const heart = document.createElement('div');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.cssText = `
            position: fixed;
            left: ${rect.left + Math.random() * rect.width}px;
            top: ${rect.top}px;
            font-size: 1.5rem;
            pointer-events: none;
            z-index: 1000;
            animation: heartFloatUp 3s ease-out forwards;
        `;
        
        document.body.appendChild(heart);
        
        setTimeout(() => heart.remove(), 3000);
    }
}

// Photo Frame Functions
function initPhotoFrame() {
    const photoArea = document.getElementById('photo-area');
    const photoInput = document.getElementById('photo-input');
    
    if (photoArea && photoInput) {
        photoArea.addEventListener('click', function() {
            photoInput.click();
        });
        
        photoInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    photoArea.innerHTML = `<img src="${e.target.result}" alt="Uploaded photo">`;
                };
                reader.readAsDataURL(file);
            }
        });
    }
}

// Countdown Timer
function initCountdown() {
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

function updateCountdown() {
    const now = new Date();
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    
    const timeLeft = endOfDay - now;
    
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    
    if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
    if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
    if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
}

// Global Game Functions (accessible from HTML onclick)
let memoryMoves = 0;
let memoryCards = [];
let flippedCards = [];
let isMemoryGameActive = false;

// Memory Card Game
function startMemoryGame() {
    memoryMoves = 0;
    flippedCards = [];
    
    const movesElement = document.getElementById('memory-moves');
    const gameBoard = document.getElementById('memory-board');
    
    if (movesElement) {
        movesElement.textContent = memoryMoves;
    }
    
    if (gameBoard) {
        gameBoard.innerHTML = '';
        
        // Create card pairs
        const emojis = ['🌸', '🌺', '🌹', '🌻', '🌷', '🌼', '💖', '✨'];
        memoryCards = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
        
        memoryCards.forEach((emoji, index) => {
            const card = document.createElement('div');
            card.className = 'memory-card';
            card.dataset.emoji = emoji;
            card.dataset.index = index;
            
            card.innerHTML = `
                <div class="card-front">❓</div>
                <div class="card-back">${emoji}</div>
            `;
            
            card.addEventListener('click', flipCard);
            gameBoard.appendChild(card);
        });
        
        isMemoryGameActive = true;
        showMessage('🧠 เกมจับคู่เริ่มแล้ว! คลิกการ์ดเพื่อพลิก! 🧠');
    } else {
        console.error('ไม่พบ memory game board');
    }
}

function flipCard() {
    if (!isMemoryGameActive || this.classList.contains('flipped') || this.classList.contains('matched')) return;
    
    this.classList.add('flipped');
    flippedCards.push(this);
    
    if (flippedCards.length === 2) {
        memoryMoves++;
        const movesElement = document.getElementById('memory-moves');
        if (movesElement) {
            movesElement.textContent = memoryMoves;
        }
        
        setTimeout(checkMatch, 1000);
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    
    if (card1 && card2 && card1.dataset.emoji === card2.dataset.emoji) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        
        // Check if all cards are matched
        if (document.querySelectorAll('.memory-card.matched').length === memoryCards.length) {
            setTimeout(() => {
                showMessage(`🎉 ยินดีด้วย! จับคู่ครบแล้วใน ${memoryMoves} ครั้ง! 🎉`);
                createConfetti();
            }, 500);
            isMemoryGameActive = false;
        }
    } else if (card1 && card2) {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
    }
    
    flippedCards = [];
}



// Surprise Box Functions
function openSurpriseBox(boxNumber) {
    const box = document.querySelectorAll('.surprise-box')[boxNumber - 1];
    
    if (box.classList.contains('opened')) return;
    
    box.classList.add('opened');
    
    const surprises = [
        { emoji: '🎂', message: 'เค้กวันเกิดพิเศษ! หวานเหมือนเธอ!' },
        { emoji: '💝', message: 'ของขวัญจากใจ! เต็มไปด้วยความรัก!' },
        { emoji: '🌟', message: 'ดวงดาวแห่งความหวัง! ขอให้เป็นจริงทุกความฝัน!' }
    ];
    
    const surprise = surprises[boxNumber - 1];
    box.querySelector('.box-content').textContent = surprise.emoji;
    
    setTimeout(() => {
        showMessage(surprise.message);
        createFloatingHeartsFromElement(box);
    }, 500);
}

// Photo Filter Functions
function triggerPhotoUpload() {
    document.getElementById('photo-input').click();
}

function addPhotoFilter(filter) {
    const img = document.querySelector('#photo-area img');
    if (!img) {
        showMessage('กรุณาเพิ่มรูปภาพก่อนนะคะ 📷');
        return;
    }
    
    switch(filter) {
        case 'sepia':
            img.style.filter = 'sepia(100%)';
            break;
        case 'blur':
            img.style.filter = 'blur(2px)';
            break;
        case 'brightness':
            img.style.filter = 'brightness(150%)';
            break;
    }
}

function clearPhotoFilters() {
    const img = document.querySelector('#photo-area img');
    if (img) {
        img.style.filter = 'none';
    }
}

// Fireworks Function
function triggerFireworks() {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => createFirework(), i * 1000);
    }
    showMessage('🎆 พลุฉลองวันเกิด! สุขสันต์วันเกิดนะคะ! 🎆');
}

function createFirework() {
    const colors = ['🎆', '🎇', '✨', '🌟', '💫'];
    const firework = document.createElement('div');
    firework.className = 'firework';
    firework.style.left = Math.random() * 100 + 'vw';
    firework.style.top = Math.random() * 50 + 'vh';
    
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.className = 'firework-particle';
        particle.textContent = colors[Math.floor(Math.random() * colors.length)];
        
        const angle = (360 / 12) * i;
        const distance = 50 + Math.random() * 50;
        
        particle.style.left = '50%';
        particle.style.top = '50%';
        particle.style.transform = `translate(-50%, -50%) rotate(${angle}deg) translateY(-${distance}px)`;
        
        firework.appendChild(particle);
    }
    
    document.body.appendChild(firework);
    
    setTimeout(() => firework.remove(), 2000);
}

// Global variables for cake and music
let candlesLit = true;
let musicPlaying = false;
let musicInterval = null;
let microphoneActive = false;

// Enhanced Cake Functions
function blowCandles() {
    if (!candlesLit) return;
    
    const flames = document.getElementById('flames');
    const blowMessage = document.getElementById('blow-message');
    
    if (flames) {
        flames.classList.add('blown-out');
        candlesLit = false;
        
        setTimeout(() => {
            flames.style.display = 'none';
        }, 500);
        
        // Show success message
        showMessage('🎉 เป่าเทียนสำเร็จ! ขอให้ความฝันเป็นจริง! ✨');
        createConfetti();
        
        // Update hint message
        if (blowMessage) {
            blowMessage.textContent = 'คลิกเค้กอีกครั้งเพื่อจุดเทียนใหม่!';
        }
        
        // Auto relight after 5 seconds
        setTimeout(() => {
            lightCandles();
        }, 5000);
    }
}

function lightCandles() {
    const flames = document.getElementById('flames');
    const blowMessage = document.getElementById('blow-message');
    
    if (flames) {
        flames.style.display = 'flex';
        flames.classList.remove('blown-out');
        candlesLit = true;
        
        if (blowMessage) {
            blowMessage.textContent = 'ลองกดปุ่ม B หรือกดที่ไมโครโฟนเพื่อเป่าจริงๆ!';
        }
        
        showMessage('🕯️ จุดเทียนใหม่แล้ว! ลองเป่าดูสิ! 🌬️');
    }
}

// Music Functions
function toggleMusic() {
    const audio = document.getElementById('birthday-song');
    const musicBtn = document.getElementById('music-toggle');
    
    if (musicPlaying) {
        // Stop music
        audio.pause();
        musicBtn.textContent = '🎵 เริ่มเพลง';
        musicBtn.classList.remove('playing');
        musicBtn.disabled = false;
        musicPlaying = false;
        showMessage('ปิดเพลง 🔇');
    } else {
        // Start music
        startMusic();
    }
}

// Start Music Function
function startMusic() {
    const audio = document.getElementById('birthday-song');
    const musicBtn = document.getElementById('music-toggle');
    
    if (audio && musicBtn) {
        console.log('Attempting to start music...');
        console.log('Audio readyState:', audio.readyState);
        console.log('Audio src:', audio.currentSrc || audio.src);
        
        // Try to play the audio
        audio.play().then(() => {
            console.log('Music started successfully!');
            musicBtn.textContent = '🎶 เล่นต่อเนื่อง';
            musicBtn.classList.add('playing');
            musicBtn.disabled = true;
            musicPlaying = true;
            showMessage('🎵 เพลง Happy Birthday เริ่มเล่นแล้ว! 🎵');
            
            // Set up loop when song ends
            audio.addEventListener('ended', function() {
                console.log('Song ended, restarting...');
                audio.currentTime = 0;
                audio.play();
            });
            
        }).catch(error => {
            console.error('Could not start music automatically:', error);
            showMessage('🎵 เพลงพร้อมแล้ว! คลิกที่ปุ่ม Play ใน audio player เพื่อเริ่มเล่น 🎵');
            
            // Enable the music button for manual start
            musicBtn.disabled = false;
            musicBtn.textContent = '🎵 เริ่มเพลง';
            musicBtn.onclick = function() {
                audio.play().then(() => {
                    musicBtn.textContent = '🎶 เล่นต่อเนื่อง';
                    musicBtn.classList.add('playing');
                    musicBtn.disabled = true;
                    musicPlaying = true;
                    showMessage('🎵 เพลงเริ่มเล่นแล้ว! 🎵');
                    
                    // Set up loop when song ends
                    audio.addEventListener('ended', function() {
                        audio.currentTime = 0;
                        audio.play();
                    });
                }).catch(error => {
                    console.error('Error starting music manually:', error);
                    showMessage('ไม่สามารถเล่นเพลงได้ กรุณาตรวจสอบไฟล์ MP3 🎵');
                });
            };
        });
    }
}

function playBirthdayTune() {
    // Simple birthday melody using oscillator
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const notes = [
        {freq: 261.63, duration: 0.5}, // C
        {freq: 261.63, duration: 0.5}, // C
        {freq: 293.66, duration: 1},   // D
        {freq: 261.63, duration: 1},   // C
        {freq: 349.23, duration: 1},   // F
        {freq: 329.63, duration: 2},   // E
    ];
    
    let currentTime = audioContext.currentTime;
    
    notes.forEach(note => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(note.freq, currentTime);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0, currentTime);
        gainNode.gain.linearRampToValueAtTime(0.1, currentTime + 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.001, currentTime + note.duration);
        
        oscillator.start(currentTime);
        oscillator.stop(currentTime + note.duration);
        
        currentTime += note.duration;
    });
    
    // Stop music automatically after the tune
    setTimeout(() => {
        if (musicPlaying) {
            const musicBtn = document.getElementById('music-toggle');
            musicBtn.textContent = '🎵 เพลง';
            musicBtn.classList.remove('playing');
            musicPlaying = false;
        }
    }, currentTime * 1000);
}

function setVolume(value) {
    const audio = document.getElementById('birthday-song');
    if (audio) {
        audio.volume = value;
    }
}

function adjustVolume(change) {
    const slider = document.getElementById('volume-slider');
    const newValue = Math.max(0, Math.min(1, parseFloat(slider.value) + change));
    slider.value = newValue;
    setVolume(newValue);
    
    // Show volume level
    const volumeText = newValue === 0 ? 'ปิดเสียง' : `เสียง: ${Math.round(newValue * 100)}%`;
    showMessage(volumeText + ' 🔊');
}

// Microphone Functions
function toggleMicrophone() {
    const micBtn = document.getElementById('mic-btn');
    
    if (!microphoneActive) {
        startMicrophone();
    } else {
        stopMicrophone();
    }
}

function startMicrophone() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(function(stream) {
                microphoneActive = true;
                const micBtn = document.getElementById('mic-btn');
                micBtn.classList.add('active');
                micBtn.textContent = '🎤 หยุด';
                
                showMessage('🎤 ไมโครโฟนเปิดแล้ว! ลองเป่าดูสิ! 🌬️');
                
                // Simple volume detection for blow simulation
                const audioContext = new AudioContext();
                const analyser = audioContext.createAnalyser();
                const microphone = audioContext.createMediaStreamSource(stream);
                const dataArray = new Uint8Array(analyser.frequencyBinCount);
                
                microphone.connect(analyser);
                
                function detectBlow() {
                    analyser.getByteFrequencyData(dataArray);
                    const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
                    
                    // If volume is high enough, simulate blowing
                    if (average > 50 && candlesLit) {
                        blowCandles();
                        stream.getTracks().forEach(track => track.stop());
                        stopMicrophone();
                        return;
                    }
                    
                    if (microphoneActive) {
                        requestAnimationFrame(detectBlow);
                    }
                }
                
                detectBlow();
                
                // Auto stop after 10 seconds
                setTimeout(() => {
                    if (microphoneActive) {
                        stream.getTracks().forEach(track => track.stop());
                        stopMicrophone();
                    }
                }, 10000);
            })
            .catch(function(err) {
                showMessage('ไม่สามารถเข้าถึงไมโครโฟนได้ กรุณาอนุญาตการใช้งาน 🎤');
            });
    } else {
        showMessage('เบราว์เซอร์ไม่รองรับไมโครโฟน ลองใช้ปุ่มเป่าแทน! 🌬️');
    }
}

function stopMicrophone() {
    microphoneActive = false;
    const micBtn = document.getElementById('mic-btn');
    micBtn.classList.remove('active');
    micBtn.textContent = '🎤 ไมค์';
}

// Welcome message when page loads
window.addEventListener('load', function() {
    setTimeout(() => {
        const welcomeDiv = document.createElement('div');
        welcomeDiv.innerHTML = `
            <div style="text-align: center;">
                <h2 style="color: #ff6b9d; margin-bottom: 15px;">🎉 ยินดีต้อนรับสู่วันเกิดที่พิเศษ! 🎉</h2>
                <p style="color: #666;">🎵 เพลง Happy Birthday (Romantic Piano) จะเล่นอัตโนมัติต่อเนื่อง!</p>
                <p style="color: #666;">คลิกที่ตัวการ์ตูน ดอกไม้ เค้ก และลองเล่นเกมสนุกๆ! ✨</p>
                <p style="color: #666;">ลองเป่าเทียนด้วยนะ! 🌬️</p>
                <p style="color: #999; font-size: 0.9rem;">* เพลงจะเล่นต่อเนื่องเพื่อสร้างบรรยากาศแห่งความสุข</p>
            </div>
        `;
        welcomeDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(255, 255, 255, 0.98);
            padding: 30px;
            border-radius: 20px;
            box-shadow: 0 15px 35px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: messageSlideIn 0.8s ease-out;
            max-width: 90%;
            border: 3px solid #ff6b9d;
        `;
        
        document.body.appendChild(welcomeDiv);
        
        // Add close button
        const closeBtn = document.createElement('button');
        closeBtn.textContent = '✨ เริ่มงานเลี้ยง ✨';
        closeBtn.style.cssText = `
            background: #ff6b9d;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 15px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            margin-top: 15px;
            font-family: 'Kanit', sans-serif;
        `;
        
        closeBtn.addEventListener('click', function() {
            welcomeDiv.style.animation = 'messageSlideOut 0.5s ease-in forwards';
            setTimeout(() => welcomeDiv.remove(), 500);
        });
        
        welcomeDiv.appendChild(closeBtn);
        
        // Auto close after 6 seconds
        setTimeout(() => {
            if (welcomeDiv.parentNode) {
                welcomeDiv.style.animation = 'messageSlideOut 0.5s ease-in forwards';
                setTimeout(() => welcomeDiv.remove(), 500);
            }
        }, 6000);
    }, 500);
    
    // Birthday Girl Interaction
    function initBirthdayGirlInteraction() {
        const birthdayGirlImg = document.querySelector('.birthday-girl-img, .birthday-girl-placeholder');
        const birthdayMessage = document.querySelector('.birthday-message');
        
        if (birthdayGirlImg) {
            birthdayGirlImg.addEventListener('click', function() {
                const messages = [
                    '🎂 Happy Birthday! ขอให้เป็นวันที่แสนพิเศษนะ! 🎂',
                    '🌟 เธอคือดาวดวงสว่างที่ส่องแสงให้ทุกคน! 🌟',
                    '🎈 วันนี้เป็นวันของเธอ ต้องมีความสุขเยอะๆ นะ! 🎈',
                    '💖 ขอให้ทุกความฝันของเธอเป็นจริงทุกประการ! 💖'
                ];
                
                const randomMessage = messages[Math.floor(Math.random() * messages.length)];
                showMessage(randomMessage);
                createConfetti();
                createFloatingHeartsFromElement(this);
            });
            
            birthdayGirlImg.addEventListener('mouseenter', function() {
                this.style.filter = 'brightness(1.1) saturate(1.2)';
            });
            
            birthdayGirlImg.addEventListener('mouseleave', function() {
                this.style.filter = '';
            });
        }
    }
    
    // Cheer Photos Interaction
    function initCheerPhotosInteraction() {
        const cheerItems = document.querySelectorAll('.cheer-item');
        
        cheerItems.forEach((item, index) => {
            const photo = item.querySelector('.cheer-photo, .cheer-placeholder');
            
            if (photo) {
                photo.addEventListener('click', function() {
                    const messages = [
                        '🎉 ความสุขเต็มเปี่ยม! มีแต่รอยยิ้มและเสียงหัวเราะ! 🎉',
                        '🎊 ช่วงเวลาแห่งความสุขที่ไม่มีวันลืม! 🎊',
                        '🎈 เต็มไปด้วยความสนุกสนานและความสุขใจ! 🎈',
                        '🎁 ของขวัญคือความทรงจำดีๆ ที่เก็บไว้ในใจ! 🎁'
                    ];
                    
                    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
                    showMessage(randomMessage);
                    
                    // Add special effect based on index
                    if (index === 0) createConfetti();
                    else if (index === 1) createFloatingHeartsFromElement(this);
                    else if (index === 2) {
                        createConfetti();
                        setTimeout(() => createFloatingHeartsFromElement(this), 500);
                    } else {
                        for (let i = 0; i < 3; i++) {
                            setTimeout(() => createConfetti(), i * 200);
                        }
                    }
                });
                
                photo.addEventListener('mouseenter', function() {
                    this.style.filter = 'brightness(1.1) contrast(1.1)';
                    item.style.transform = 'translateY(-15px) scale(1.02)';
                });
                
                photo.addEventListener('mouseleave', function() {
                    this.style.filter = '';
                    item.style.transform = '';
                });
            }
        });
    }
});
