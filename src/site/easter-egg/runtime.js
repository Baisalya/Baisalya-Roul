// Flutter Debug Mode Easter Egg Game
class FlutterBirdGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.gameRunning = false;
        this.score = 0;
        this.lives = 3;
        this.gameSpeed = 2;
        
        // Game objects
        this.bird = {
            x: 100,
            y: 200,
            width: 30,
            height: 30,
            velocity: 0,
            gravity: 0.5,
            jumpPower: -8,
            color: '#42A5F5'
        };
        
        this.obstacles = [];
        this.powerups = [];
        this.particles = [];
        this.animationFrameId = null;
        
        // Game messages
        this.funnyMessages = [
            "You're in a Stateless Relationship",
            "Too much Padding in life?",
            "Don't let null values bring you down",
            "Widget overflow detected in your heart",
            "Hot reload your attitude!",
            "setState() your mind",
            "Building... please wait",
            "Async/await for better days",
            "Your code is more stable than this game"
        ];
        
        this.currentMessage = '';
        this.messageTimer = 0;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.showRandomMessage();
    }
    
    setupEventListeners() {
        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && this.gameRunning) {
                e.preventDefault();
                this.jump();
            }
        });
        
        // Mouse/touch controls
        this.canvas.addEventListener('click', () => {
            if (this.gameRunning) {
                this.jump();
            }
        });
        
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            if (this.gameRunning) {
                this.jump();
            }
        });
    }
    
    jump() {
        this.bird.velocity = this.bird.jumpPower;
        this.createParticles(this.bird.x, this.bird.y, '#42A5F5');
    }
    
    update() {
        if (!this.gameRunning) return;
        
        // Update bird physics
        this.bird.velocity += this.bird.gravity;
        this.bird.y += this.bird.velocity;
        
        // Keep bird in bounds
        if (this.bird.y < 0) {
            this.bird.y = 0;
            this.bird.velocity = 0;
        }
        
        if (this.bird.y > this.canvas.height - this.bird.height) {
            this.bird.y = this.canvas.height - this.bird.height;
            this.takeDamage();
        }
        
        // Spawn obstacles
        if (Math.random() < 0.02) {
            this.spawnObstacle();
        }
        
        // Spawn powerups
        if (Math.random() < 0.005) {
            this.spawnPowerup();
        }
        
        // Update obstacles
        this.obstacles.forEach((obstacle, index) => {
            obstacle.x -= this.gameSpeed;
            
            // Remove off-screen obstacles
            if (obstacle.x + obstacle.width < 0) {
                this.obstacles.splice(index, 1);
                this.score += 10;
                this.updateScore();
            }
            
            // Collision detection
            if (this.checkCollision(this.bird, obstacle)) {
                this.takeDamage();
                this.obstacles.splice(index, 1);
                this.createParticles(obstacle.x, obstacle.y, obstacle.color);
            }
        });
        
        // Update powerups
        this.powerups.forEach((powerup, index) => {
            powerup.x -= this.gameSpeed;
            powerup.rotation += 0.1;
            
            // Remove off-screen powerups
            if (powerup.x + powerup.width < 0) {
                this.powerups.splice(index, 1);
            }
            
            // Collision detection
            if (this.checkCollision(this.bird, powerup)) {
                this.collectPowerup(powerup);
                this.powerups.splice(index, 1);
                this.createParticles(powerup.x, powerup.y, '#4CAF50');
            }
        });
        
        // Update particles
        this.particles.forEach((particle, index) => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life--;
            
            if (particle.life <= 0) {
                this.particles.splice(index, 1);
            }
        });
        
        // Update message timer
        this.messageTimer--;
        if (this.messageTimer <= 0) {
            this.showRandomMessage();
        }
        
        // Increase difficulty
        this.gameSpeed += 0.001;
    }
    
    spawnObstacle() {
        const types = ['error', 'warning', 'spinner'];
        const type = types[Math.floor(Math.random() * types.length)];
        
        let obstacle = {
            x: this.canvas.width,
            y: Math.random() * (this.canvas.height - 100) + 50,
            width: 40,
            height: 40,
            type: type
        };
        
        switch (type) {
            case 'error':
                obstacle.color = '#F44336';
                obstacle.symbol = '❌';
                break;
            case 'warning':
                obstacle.color = '#FF9800';
                obstacle.symbol = '⚠️';
                break;
            case 'spinner':
                obstacle.color = '#9C27B0';
                obstacle.symbol = '⭕';
                obstacle.rotation = 0;
                break;
        }
        
        this.obstacles.push(obstacle);
    }
    
    spawnPowerup() {
        const powerup = {
            x: this.canvas.width,
            y: Math.random() * (this.canvas.height - 100) + 50,
            width: 30,
            height: 30,
            color: '#4CAF50',
            symbol: '🔁',
            rotation: 0,
            type: 'hotreload'
        };
        
        this.powerups.push(powerup);
    }
    
    collectPowerup(powerup) {
        this.score += 50;
        this.updateScore();
        
        // Add temporary invincibility or other effects
        this.bird.color = '#4CAF50';
        setTimeout(() => {
            this.bird.color = '#42A5F5';
        }, 1000);
    }
    
    takeDamage() {
        this.lives--;
        this.updateLives();
        
        // Flash effect
        this.bird.color = '#F44336';
        setTimeout(() => {
            this.bird.color = '#42A5F5';
        }, 200);
        
        if (this.lives <= 0) {
            this.gameOver();
        }
    }
    
    checkCollision(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width &&
               rect1.x + rect1.width > rect2.x &&
               rect1.y < rect2.y + rect2.height &&
               rect1.y + rect1.height > rect2.y;
    }
    
    createParticles(x, y, color) {
        for (let i = 0; i < 8; i++) {
            this.particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 6,
                vy: (Math.random() - 0.5) * 6,
                life: 30,
                color: color
            });
        }
    }
    
    showRandomMessage() {
        this.currentMessage = this.funnyMessages[Math.floor(Math.random() * this.funnyMessages.length)];
        this.messageTimer = 180; // 3 seconds at 60fps
    }
    
    render() {
        // Clear canvas
        this.ctx.fillStyle = '#1A1A2E';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw grid background
        this.drawGrid();
        
        // Draw bird
        this.ctx.fillStyle = this.bird.color;
        this.ctx.fillRect(this.bird.x, this.bird.y, this.bird.width, this.bird.height);
        
        // Draw bird emoji
        this.ctx.font = '24px Arial';
        this.ctx.fillText('🐦', this.bird.x + 3, this.bird.y + 22);
        
        // Draw obstacles
        this.obstacles.forEach(obstacle => {
            this.ctx.fillStyle = obstacle.color;
            this.ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
            
            // Draw symbol
            this.ctx.font = '20px Arial';
            this.ctx.fillText(obstacle.symbol, obstacle.x + 10, obstacle.y + 25);
            
            if (obstacle.type === 'spinner') {
                obstacle.rotation += 0.1;
            }
        });
        
        // Draw powerups
        this.powerups.forEach(powerup => {
            this.ctx.save();
            this.ctx.translate(powerup.x + powerup.width/2, powerup.y + powerup.height/2);
            this.ctx.rotate(powerup.rotation);
            this.ctx.fillStyle = powerup.color;
            this.ctx.fillRect(-powerup.width/2, -powerup.height/2, powerup.width, powerup.height);
            this.ctx.font = '16px Arial';
            this.ctx.fillText(powerup.symbol, -8, 5);
            this.ctx.restore();
        });
        
        // Draw particles
        this.particles.forEach(particle => {
            this.ctx.fillStyle = particle.color;
            this.ctx.globalAlpha = particle.life / 30;
            this.ctx.fillRect(particle.x, particle.y, 3, 3);
            this.ctx.globalAlpha = 1;
        });
        
        // Draw funny message
        if (this.messageTimer > 0) {
            this.ctx.fillStyle = '#FFD700';
            this.ctx.font = '16px JetBrains Mono';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(this.currentMessage, this.canvas.width / 2, 50);
            this.ctx.textAlign = 'left';
        }
        
        // Draw debug info
        this.ctx.fillStyle = '#00FF00';
        this.ctx.font = '12px JetBrains Mono';
        this.ctx.fillText(`FPS: 60`, 10, 20);
        this.ctx.fillText(`Speed: ${this.gameSpeed.toFixed(2)}`, 10, 35);
        this.ctx.fillText(`Obstacles: ${this.obstacles.length}`, 10, 50);
    }
    
    drawGrid() {
        this.ctx.strokeStyle = '#333';
        this.ctx.lineWidth = 1;
        
        // Vertical lines
        for (let x = 0; x < this.canvas.width; x += 40) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
        }
        
        // Horizontal lines
        for (let y = 0; y < this.canvas.height; y += 40) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
        }
    }
    
    updateScore() {
        document.getElementById('score').textContent = this.score;
    }
    
    updateLives() {
        document.getElementById('lives').textContent = this.lives;
    }
    
    gameOver() {
        this.gameRunning = false;
        document.getElementById('finalScore').textContent = this.score;
        document.getElementById('gameOver').classList.remove('hidden');
    }
    
    start() {
        this.gameRunning = true;
        this.score = 0;
        this.lives = 3;
        this.gameSpeed = 2;
        this.bird.y = 200;
        this.bird.velocity = 0;
        this.obstacles = [];
        this.powerups = [];
        this.particles = [];
        
        this.updateScore();
        this.updateLives();
        document.getElementById('gameOver').classList.add('hidden');
        if (this.animationFrameId === null) this.gameLoop();
    }

    stop() {
        this.gameRunning = false;
        if (this.animationFrameId !== null) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }
    
    gameLoop() {
        if (!this.gameRunning) {
            this.animationFrameId = null;
            return;
        }
        this.update();
        this.render();
        this.animationFrameId = requestAnimationFrame(() => this.gameLoop());
    }
}

let game = null;
let previousFocus = null;
let consoleTimers = [];
let gameTimer = null;

const markup = `
  <div id="debug-mode" class="debug-mode hidden" role="dialog" aria-modal="true" aria-labelledby="debug-title" aria-hidden="true">
    <div class="debug-console">
      <div class="console-header">
        <span class="console-title" id="debug-title">Developer Mode Unlocked · BR Debug Run</span>
        <button class="console-close" type="button" data-easter-action="close" aria-label="Close developer mode">×</button>
      </div>
      <div class="console-content">
        <div class="error-messages">
          <div class="error-line">[ERROR:flutter/runtime] Widget overflow detected!</div>
          <div class="error-line">[WARNING] Too much padding in your life...</div>
          <div class="error-line">[INFO] Secret profile gesture accepted. Developer Mode Unlocked.</div>
          <div class="error-line">[DEBUG] Initializing BR Debug Run...</div>
        </div>
      </div>
    </div>
    <div class="game-container">
      <canvas id="gameCanvas" width="800" height="400" aria-label="BR Debug Run developer easter egg game"></canvas>
      <div class="game-ui">
        <div class="score">Score: <span id="score">0</span></div>
        <div class="lives">Lives: <span id="lives">3</span></div>
        <div class="game-tips">
          <div class="tip">Use SPACE or CLICK to fly.</div>
          <div class="tip">Avoid red errors and yellow warnings.</div>
          <div class="tip">Collect hot reload icons for points.</div>
        </div>
      </div>
      <div class="game-over hidden" id="gameOver">
        <h2>App Crashed in Production!</h2>
        <p>Time for a hot restart.</p>
        <div class="final-score">Final Score: <span id="finalScore">0</span></div>
        <div class="game-buttons">
          <button type="button" data-easter-action="restart" class="game-btn restart-btn">Hot Restart</button>
          <button type="button" data-easter-action="close" class="game-btn exit-btn">Return to site</button>
        </div>
      </div>
    </div>
  </div>`;

function ensureMarkup() {
  let overlay = document.getElementById('debug-mode');
  if (overlay) return overlay;
  document.body.insertAdjacentHTML('beforeend', markup);
  overlay = document.getElementById('debug-mode');
  overlay.addEventListener('click', (event) => {
    const action = event.target.closest('[data-easter-action]')?.dataset.easterAction;
    if (action === 'close') closeEasterEgg();
    if (action === 'restart') game?.start();
  });
  return overlay;
}

function clearTimers() {
  consoleTimers.forEach(clearTimeout);
  consoleTimers = [];
  if (gameTimer !== null) clearTimeout(gameTimer);
  gameTimer = null;
}

function showGlitch() {
  const glitch = document.createElement('div');
  glitch.className = 'glitch-overlay';
  glitch.setAttribute('aria-hidden', 'true');
  glitch.innerHTML = '<div class="glitch-text"><span>SYSTEM ERROR</span><span>WIDGET OVERFLOW DETECTED</span><span>REBOOTING...</span></div>';
  document.body.appendChild(glitch);
  window.setTimeout(() => glitch.remove(), 700);
}

function animateConsole(overlay) {
  overlay.querySelectorAll('.error-line').forEach((line, index) => {
    const timer = window.setTimeout(() => {
      line.style.opacity = '1';
      line.style.transform = 'translateX(0)';
    }, index * 140);
    consoleTimers.push(timer);
  });
}

export function openEasterEgg() {
  const overlay = ensureMarkup();
  if (!overlay.classList.contains('hidden')) return;
  clearTimers();
  previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  overlay.querySelectorAll('.error-line').forEach((line) => {
    line.style.opacity = '0';
    line.style.transform = 'translateX(-20px)';
  });
  overlay.classList.remove('hidden');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.classList.add('easter-egg-open', 'easter-egg-shake');
  window.setTimeout(() => document.body.classList.remove('easter-egg-shake'), 520);
  showGlitch();
  animateConsole(overlay);
  overlay.querySelector('.console-close')?.focus();

  if (!game) game = new FlutterBirdGame();
  gameTimer = window.setTimeout(() => {
    game?.start();
    gameTimer = null;
  }, 650);
}

export function closeEasterEgg() {
  const overlay = document.getElementById('debug-mode');
  if (!overlay || overlay.classList.contains('hidden')) return;
  clearTimers();
  game?.stop();
  overlay.classList.add('hidden');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('easter-egg-open', 'easter-egg-shake');
  previousFocus?.focus?.();
  previousFocus = null;
}

document.addEventListener('keydown', (event) => {
  const overlay = document.getElementById('debug-mode');
  if (!overlay || overlay.classList.contains('hidden')) return;

  if (event.key === 'Escape') {
    event.preventDefault();
    closeEasterEgg();
    return;
  }

  if (event.key !== 'Tab') return;
  const focusable = [...overlay.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex=\"-1\"])')]
    .filter((element) => !element.hasAttribute('disabled'));
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});
