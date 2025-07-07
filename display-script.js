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
            currentPassword: 'AP 64',
            currentGuiche: '2',
            currentPatient: 'ADRIANA M DUARTE',
            currentOffice: '14 - DRA. ANA PAULA DE CAMPOS',
            recentCalls: [
                { name: 'LUCIANA R.', code: 'CONS. 14 - DRA. ANA PAULA DE CAMPOS', time: '16:10' },
                { name: 'MARIA T.', code: 'CONS. 14 - DRA. ANA PAULA DE CAMPOS', time: '16:09' },
                { name: 'FRANCISCA F.', code: 'CONS. 10 - DRA. FRANCONI FERREIRA MACHADO', time: '16:08' },
                { name: 'RENATA M.', code: 'CONS. 9 - DRA. GABRIELA THAIS A SILVA', time: '16:07' },
                { name: 'CESAR S.', code: 'CONS. 3 - DR. NICOLAS PERIM', time: '16:06' }
            ],
            nextCalls: [
                { code: 'AP 61', guiche: 'GUICHÊ 2', time: '16:11' },
                { code: 'CM 159', guiche: 'GUICHÊ 3', time: '16:10' },
                { code: 'CM 158', guiche: 'GUICHÊ 3', time: '16:09' },
                { code: 'AP 63', guiche: 'GUICHÊ 4', time: '16:08' },
                { code: 'AP 62', guiche: 'GUICHÊ 2', time: '16:07' }
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
        // Atualizar informações principais
        document.getElementById('current-password').textContent = this.data.currentPassword;
        document.getElementById('guiche-number').textContent = this.data.currentGuiche;
        document.getElementById('patient-name').textContent = this.data.currentPatient;
        document.getElementById('office-info').textContent = this.data.currentOffice;
        
        this.updateRecentCalls();
        this.updateNextCalls();
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
    
    showUpdateNotification() {
        // Criar notificação visual de atualização
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(76, 175, 80, 0.9);
            color: white;
            padding: 10px 20px;
            border-radius: 25px;
            backdrop-filter: blur(10px);
            z-index: 9999;
            font-weight: 600;
            font-size: 14px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            animation: slideDown 0.3s ease;
        `;
        notification.textContent = '🔄 Informações atualizadas';
        
        document.body.appendChild(notification);
        
        // Remover após 2 segundos
        setTimeout(() => {
            notification.style.animation = 'slideUp 0.3s ease';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 2000);
    }
}

// Adicionar estilos de animação para notificações
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
`;
document.head.appendChild(style);

// Inicializar quando a página carrega
document.addEventListener('DOMContentLoaded', () => {
    const displayManager = new DisplayManager();
    
    // Tornar disponível globalmente para debug
    window.displayManager = displayManager;
    
    console.log('📺 Tela de Exibição inicializada!');
    console.log('🔗 Para gerenciar o sistema, abra o Painel de Controle');
});
