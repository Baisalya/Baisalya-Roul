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
        this.gameLoop();
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
    }
    
    gameLoop() {
        this.update();
        this.render();
        requestAnimationFrame(() => this.gameLoop());
    }
}

// Easter Egg Trigger System
class EasterEggManager {
    constructor() {
        this.clickCount = 0;
        this.clickTimer = null;
        this.game = null;
        this.debugMode = false;
        
        this.init();
    }
    
    init() {
        const logoTrigger = document.getElementById('logo-trigger');
        if (logoTrigger) {
            logoTrigger.addEventListener('click', () => this.handleLogoClick());
        }
    }
    
    handleLogoClick() {
        this.clickCount++;
        
        // Clear existing timer
        if (this.clickTimer) {
            clearTimeout(this.clickTimer);
        }
        
        // Check for triple click
        if (this.clickCount >= 3) {
            this.triggerEasterEgg();
            this.clickCount = 0;
            return;
        }
        
        // Reset click count after 1 second
        this.clickTimer = setTimeout(() => {
            this.clickCount = 0;
        }, 1000);
    }
    
    triggerEasterEgg() {
        if (this.debugMode) return;
        
        this.debugMode = true;
        
        // Screen shake effect
        document.body.style.animation = 'screenShake 0.5s ease-in-out';
        
        // Show glitch effect
        this.createGlitchEffect();
        
        // Show debug console with delay
        setTimeout(() => {
            this.showDebugConsole();
        }, 1000);
        
        // Start the game
        setTimeout(() => {
            this.startGame();
        }, 3000);
    }
    
    createGlitchEffect() {
        const glitch = document.createElement('div');
        glitch.className = 'glitch-overlay';
        glitch.innerHTML = `
            <div class="glitch-text">
                <span>SYSTEM ERROR</span>
                <span>WIDGET OVERFLOW DETECTED</span>
                <span>REBOOTING...</span>
            </div>
        `;
        document.body.appendChild(glitch);
        
        setTimeout(() => {
            glitch.remove();
        }, 2000);
    }
    
    showDebugConsole() {
        const debugMode = document.getElementById('debug-mode');
        debugMode.classList.remove('hidden');
        
        // Animate console messages
        const errorLines = document.querySelectorAll('.error-line');
        errorLines.forEach((line, index) => {
            setTimeout(() => {
                line.style.opacity = '1';
                line.style.transform = 'translateX(0)';
            }, index * 500);
        });
    }
    
    startGame() {
        if (!this.game) {
            this.game = new FlutterBirdGame();
        }
        this.game.start();
    }
}

// Global functions for game controls
function restartGame() {
    const easterEgg = window.easterEggManager;
    if (easterEgg && easterEgg.game) {
        easterEgg.game.start();
    }
}

function exitDebugMode() {
    const debugMode = document.getElementById('debug-mode');
    debugMode.classList.add('hidden');
    
    const easterEgg = window.easterEggManager;
    if (easterEgg) {
        easterEgg.debugMode = false;
        if (easterEgg.game) {
            easterEgg.game.gameRunning = false;
        }
    }
    
    // Remove screen shake
    document.body.style.animation = '';
}

// Initialize Easter Egg Manager
document.addEventListener('DOMContentLoaded', () => {
    window.easterEggManager = new EasterEggManager();
});

// Add CSS animations
const easterEggStyles = document.createElement('style');
easterEggStyles.textContent = `
    @keyframes screenShake {
        0%, 100% { transform: translateX(0); }
        10% { transform: translateX(-10px) rotate(1deg); }
        20% { transform: translateX(10px) rotate(-1deg); }
        30% { transform: translateX(-8px) rotate(1deg); }
        40% { transform: translateX(8px) rotate(-1deg); }
        50% { transform: translateX(-6px) rotate(1deg); }
        60% { transform: translateX(6px) rotate(-1deg); }
        70% { transform: translateX(-4px) rotate(1deg); }
        80% { transform: translateX(4px) rotate(-1deg); }
        90% { transform: translateX(-2px) rotate(1deg); }
    }
    
    .glitch-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: glitchFlicker 2s ease-in-out;
    }
    
    .glitch-text {
        color: #ff0000;
        font-family: 'JetBrains Mono', monospace;
        font-size: 2rem;
        text-align: center;
        animation: textGlitch 0.5s infinite;
    }
    
    .glitch-text span {
        display: block;
        margin: 10px 0;
    }
    
    @keyframes glitchFlicker {
        0%, 100% { opacity: 0; }
        10%, 90% { opacity: 1; }
        20% { opacity: 0.8; }
        30% { opacity: 1; }
        40% { opacity: 0.9; }
        50% { opacity: 1; }
        60% { opacity: 0.7; }
        70% { opacity: 1; }
        80% { opacity: 0.9; }
    }
    
    @keyframes textGlitch {
        0% { transform: translateX(0); }
        20% { transform: translateX(-2px); }
        40% { transform: translateX(2px); }
        60% { transform: translateX(-1px); }
        80% { transform: translateX(1px); }
        100% { transform: translateX(0); }
    }
`;

document.head.appendChild(easterEggStyles);