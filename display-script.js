// Script para Tela de Exibição
class DisplayManager {
    constructor() {
        this.data = this.loadSharedData();
        this.init();
    }
    
    init() {
        this.updateDateTime();
        this.updateDisplay();
        
        // Atualizar horário a cada segundo
        setInterval(() => this.updateDateTime(), 1000);
        
        // Verificar atualizações dos dados a cada 5 segundos
        setInterval(() => this.checkForUpdates(), 2000);
    }
    
    loadSharedData() {
        // Dados compartilhados entre as telas via localStorage
        const savedData = localStorage.getItem('queueSystemData');
        if (savedData) {
            return JSON.parse(savedData);
        }
        
        // Dados padrão se não houver dados salvos
        return {
            currentPassword: '-- --',
            currentGuiche: '--',
            currentPatient: 'AGUARDANDO PRÓXIMO PACIENTE',
            currentOffice: '-- SELECIONE UM CONSULTÓRIO --',
            recentCalls: [
                { name: 'SISTEMA', code: 'AGUARDANDO PRIMEIRAS CHAMADAS', time: '--:--' }
            ],
            nextCalls: [
                { code: '-- --', guiche: 'GUICHÊ --', time: '--:--' }
            ],
            lastUpdate: new Date().getTime()
        };
    }
    
    checkForUpdates() {
        const savedData = localStorage.getItem('queueSystemData');
        if (savedData) {
            const newData = JSON.parse(savedData);
            if (newData.lastUpdate !== this.data.lastUpdate) {
                this.data = newData;
                this.updateDisplay();
                this.showUpdateNotification();
            }
        }
    }
    
    updateDateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('pt-BR', { 
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        const dateString = now.toLocaleDateString('pt-BR');
        
        document.getElementById('current-time').textContent = timeString;
        document.getElementById('current-date').textContent = dateString;
    }
    
    updateDisplay() {
        // Atualizar informações principais com elementos específicos
        const passwordElement = document.getElementById('current-password-text');
        const guicheElement = document.getElementById('guiche-number-text');
        
        if (passwordElement) passwordElement.textContent = this.data.currentPassword;
        if (guicheElement) guicheElement.textContent = this.data.currentGuiche;
        
        document.getElementById('patient-name').textContent = this.data.currentPatient;
        document.getElementById('office-info').textContent = this.data.currentOffice;
        
        this.updateRecentCalls();
        this.updateNextCalls();
        this.addInteractiveEffects();
    }
    
    updateRecentCalls() {
        const container = document.getElementById('recent-calls');
        container.innerHTML = '';
        
        this.data.recentCalls.forEach((call, index) => {
            const callElement = document.createElement('div');
            callElement.className = 'call-item';
            callElement.style.animationDelay = `${index * 0.1}s`;
            callElement.innerHTML = `
                <span class="call-name">${call.name}</span>
                <span class="call-code">${call.code}</span>
                <span class="call-time">${call.time}</span>
            `;
            container.appendChild(callElement);
        });
    }
    
    updateNextCalls() {
        const container = document.getElementById('next-calls');
        container.innerHTML = '';
        
        this.data.nextCalls.forEach((call, index) => {
            const callElement = document.createElement('div');
            callElement.className = 'next-call-item';
            callElement.style.animationDelay = `${index * 0.1}s`;
            callElement.innerHTML = `
                <span class="next-code">${call.code}</span>
                <span class="next-guiche">${call.guiche}</span>
                <span class="next-time">${call.time}</span>
            `;
            container.appendChild(callElement);
        });
    }
    
    addInteractiveEffects() {
        // Adicionar efeitos interativos aos cards
        const cards = document.querySelectorAll('.current-password-section, .guiche-section, .patient-section, .office-section, .recent-calls-section, .next-calls-section');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-4px) scale(1.01)';
                card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
        
        // Efeito de partículas nos cards principais
        this.addParticleEffect();
    }
    
    addParticleEffect() {
        const passwordSection = document.querySelector('.current-password-section');
        const guicheSection = document.querySelector('.guiche-section');
        
        [passwordSection, guicheSection].forEach((section, index) => {
            if (section && !section.querySelector('.particle-container')) {
                const particleContainer = document.createElement('div');
                particleContainer.className = 'particle-container';
                particleContainer.style.cssText = `
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    overflow: hidden;
                    border-radius: inherit;
                `;
                
                for (let i = 0; i < 5; i++) {
                    const particle = document.createElement('div');
                    particle.style.cssText = `
                        position: absolute;
                        width: 4px;
                        height: 4px;
                        background: ${index === 0 ? '#00ff88' : '#00d4ff'};
                        border-radius: 50%;
                        animation: float-particle ${3 + Math.random() * 2}s linear infinite;
                        animation-delay: ${Math.random() * 2}s;
                        left: ${Math.random() * 100}%;
                        top: ${Math.random() * 100}%;
                        opacity: 0.3;
                    `;
                    particleContainer.appendChild(particle);
                }
                
                section.appendChild(particleContainer);
            }
        });
    }
    
    showUpdateNotification() {
        // Criar notificação visual de atualização melhorada
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 24px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, rgba(0, 255, 136, 0.95) 0%, rgba(0, 212, 255, 0.95) 100%);
            color: white;
            padding: 16px 32px;
            border-radius: 50px;
            backdrop-filter: blur(20px);
            z-index: 9999;
            font-weight: 700;
            font-size: 15px;
            box-shadow: 0 8px 32px rgba(0, 255, 136, 0.3), 0 4px 16px rgba(0, 0, 0, 0.2);
            animation: slideDown 0.5s cubic-bezier(0.4, 1.6, 0.6, 1);
            border: 2px solid rgba(255, 255, 255, 0.2);
            display: flex;
            align-items: center;
            gap: 12px;
        `;
        
        notification.innerHTML = `
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" fill="white"/>
            </svg>
            <span>Informações atualizadas com sucesso!</span>
        `;
        
        document.body.appendChild(notification);
        
        // Remover após 3 segundos com animação
        setTimeout(() => {
            notification.style.animation = 'slideUp 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 500);
        }, 3000);
    }
}

// Adicionar estilos de animação para notificações e partículas
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from { transform: translateX(-50%) translateY(-100%); opacity: 0; }
        to { transform: translateX(-50%) translateY(0); opacity: 1; }
    }
    
    @keyframes slideUp {
        from { transform: translateX(-50%) translateY(0); opacity: 1; }
        to { transform: translateX(-50%) translateY(-100%); opacity: 0; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes float-particle {
        0% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
        50% { transform: translateY(-20px) rotate(180deg); opacity: 0.8; }
        100% { transform: translateY(0px) rotate(360deg); opacity: 0.3; }
    }
    
    /* Efeito de scan-line no header */
    .header::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: linear-gradient(90deg, transparent, rgba(0, 255, 136, 0.8), transparent);
        animation: scan-line-bottom 4s linear infinite;
    }
    
    @keyframes scan-line-bottom {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
    }
    
    /* Melhoria no scroll suave */
    .recent-calls, .next-calls {
        scroll-behavior: smooth;
    }
    
    /* Efeito de pulsação nos indicadores de tempo */
    .call-time::after, .next-time::after {
        content: '';
        position: absolute;
        right: -8px;
        top: 50%;
        width: 6px;
        height: 6px;
        background: #ffd700;
        border-radius: 50%;
        transform: translateY(-50%);
        animation: pulse-dot 2s ease-in-out infinite;
    }
    
    @keyframes pulse-dot {
        0%, 100% { opacity: 0.5; transform: translateY(-50%) scale(1); }
        50% { opacity: 1; transform: translateY(-50%) scale(1.2); }
    }
    
    /* Efeito de ripple nos cards ao clicar */
    .current-password-section, .guiche-section, .patient-section, .office-section {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        background-color: rgba(255, 255, 255, 0.2);
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    /* Indicadores de status para calls */
    .call-item::after, .next-call-item::after {
        content: '';
        position: absolute;
        right: 8px;
        top: 50%;
        width: 8px;
        height: 8px;
        background: #00ff88;
        border-radius: 50%;
        transform: translateY(-50%);
        animation: status-blink 3s ease-in-out infinite;
    }
    
    .next-call-item::after {
        background: #9b59b6;
    }
    
    @keyframes status-blink {
        0%, 80% { opacity: 0.3; }
        90%, 100% { opacity: 1; }
    }
    
    /* Variáveis CSS para brilho dinâmico */
    .current-password-section {
        --glow-intensity: 0.5;
        box-shadow: 
            0 16px 64px 0 rgba(0, 255, 136, calc(var(--glow-intensity) * 0.15)),
            0 4px 20px 0 rgba(0, 0, 0, 0.3),
            0 1px 0 rgba(255, 255, 255, 0.05) inset;
    }
    
    .guiche-section {
        --glow-intensity: 0.5;
        box-shadow: 
            0 12px 48px 0 rgba(0, 212, 255, calc(var(--glow-intensity) * 0.15)),
            0 4px 20px 0 rgba(0, 0, 0, 0.3),
            0 1px 0 rgba(255, 255, 255, 0.05) inset;
    }
    
    /* Efeito de loading nos cards */
    .loading-shimmer {
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
        animation: shimmer-loading 2s linear infinite;
    }
    
    @keyframes shimmer-loading {
        0% { left: -100%; }
        100% { left: 100%; }
    }
    
    /* Indicadores de conectividade */
    .connection-indicator {
        position: fixed;
        top: 50%;
        left: 24px;
        width: 12px;
        height: 12px;
        background: #00ff88;
        border-radius: 50%;
        z-index: 1000;
        animation: connection-pulse 2s ease-in-out infinite;
        box-shadow: 0 0 8px rgba(0, 255, 136, 0.5);
    }
    
    @keyframes connection-pulse {
        0%, 100% { opacity: 0.5; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.2); }
    }
    
    /* Melhorias no focus para acessibilidade */
    .control-btn:focus,
    .call-item:focus,
    .next-call-item:focus {
        outline: 2px solid #00d4ff;
        outline-offset: 2px;
    }
    
    /* Efeito de digitação no texto */
    .typing-effect {
        overflow: hidden;
        border-right: 2px solid #00d4ff;
        animation: typing 3s steps(40, end), blink-caret 0.75s step-end infinite;
    }
    
    @keyframes typing {
        from { width: 0; }
        to { width: 100%; }
    }
    
    @keyframes blink-caret {
        from, to { border-color: transparent; }
        50% { border-color: #00d4ff; }
    }
    
    /* Efeito de partículas no hover dos cards */
    .card-particles {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        overflow: hidden;
    }
    
    .particle {
        position: absolute;
        width: 3px;
        height: 3px;
        background: radial-gradient(circle, rgba(0, 255, 136, 0.8) 0%, transparent 70%);
        border-radius: 50%;
        animation: particle-rise 3s linear infinite;
    }
    
    @keyframes particle-rise {
        0% { transform: translateY(100vh) scale(0); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(-100px) scale(1); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Inicializar quando a página carrega
document.addEventListener('DOMContentLoaded', () => {
    const displayManager = new DisplayManager();
    
    // Adicionar efeito ripple aos cards principais
    const mainCards = document.querySelectorAll('.current-password-section, .guiche-section, .patient-section, .office-section');
    mainCards.forEach(card => {
        card.addEventListener('click', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            card.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Efeito de parallax suave no fundo
    let ticking = false;
    const parallaxElements = document.querySelectorAll('.current-password-section, .guiche-section');
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach((element, index) => {
            const yOffset = rate * (index + 1) * 0.1;
            element.style.transform = `translateY(${yOffset}px)`;
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
    
    // Detector de movimento do mouse para efeitos dinâmicos
    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        const moveX = (clientX - centerX) * 0.01;
        const moveY = (clientY - centerY) * 0.01;
        
        // Aplicar movimento sutil aos cards principais
        const passwordCard = document.querySelector('.current-password-section');
        const guicheCard = document.querySelector('.guiche-section');
        
        if (passwordCard) {
            passwordCard.style.transform = `translateX(${moveX}px) translateY(${moveY}px)`;
        }
        
        if (guicheCard) {
            guicheCard.style.transform = `translateX(${-moveX}px) translateY(${-moveY}px)`;
        }
    });
    
    // Adicionar efeito de brilho dinâmico baseado na hora
    function updateDynamicGlow() {
        const hour = new Date().getHours();
        let glowIntensity = 0.5;
        
        // Mais brilho durante o dia
        if (hour >= 6 && hour < 18) {
            glowIntensity = 0.8;
        } else if (hour >= 18 && hour < 22) {
            glowIntensity = 0.6;
        } else {
            glowIntensity = 0.4;
        }
        
        const passwordSection = document.querySelector('.current-password-section');
        const guicheSection = document.querySelector('.guiche-section');
        
        if (passwordSection) {
            passwordSection.style.setProperty('--glow-intensity', glowIntensity);
        }
        
        if (guicheSection) {
            guicheSection.style.setProperty('--glow-intensity', glowIntensity);
        }
    }
    
    // Atualizar brilho dinâmico a cada minuto
    updateDynamicGlow();
    setInterval(updateDynamicGlow, 60000);
    
    // Tornar disponível globalmente para debug
    window.displayManager = displayManager;
    
    console.log('🎨 Tela de Exibição Ultra Moderna inicializada!');
    console.log('✨ Efeitos visuais avançados ativados');
    console.log('🔗 Para gerenciar o sistema, abra o Painel de Controle');
    
    // Notificação de boas-vindas
    setTimeout(() => {
        const welcomeNotification = document.createElement('div');
        welcomeNotification.style.cssText = `
            position: fixed;
            top: 24px;
            right: 24px;
            background: linear-gradient(135deg, rgba(0, 212, 255, 0.95) 0%, rgba(155, 89, 182, 0.95) 100%);
            color: white;
            padding: 16px 24px;
            border-radius: 50px;
            backdrop-filter: blur(20px);
            z-index: 9999;
            font-weight: 600;
            font-size: 14px;
            box-shadow: 0 8px 32px rgba(0, 212, 255, 0.3);
            animation: slideIn 0.5s cubic-bezier(0.4, 1.6, 0.6, 1);
            border: 2px solid rgba(255, 255, 255, 0.2);
            display: flex;
            align-items: center;
            gap: 10px;
        `;
        
        welcomeNotification.innerHTML = `
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="white"/>
            </svg>
            <span>Sistema Ultra Moderno Ativo!</span>
        `;
        
        document.body.appendChild(welcomeNotification);
        
        setTimeout(() => {
            welcomeNotification.style.animation = 'slideOut 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            setTimeout(() => {
                if (document.body.contains(welcomeNotification)) {
                    document.body.removeChild(welcomeNotification);
                }
            }, 500);
        }, 4000);
    }, 1000);
});
