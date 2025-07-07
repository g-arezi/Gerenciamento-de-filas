// Sistema de Gerenciamento de Filas - Atendimento Médico
class QueueManager {
    constructor() {
        this.currentPassword = 'AP 64';
        this.currentGuiche = '2';
        this.currentPatient = 'ADRIANA M DUARTE';
        this.currentOffice = '14 - DRA. ANA PAULA DE CAMPOS';
        
        this.passwordCounters = {
            AP: 64,
            CM: 159,
            EX: 1,
            RE: 1
        };
        
        this.queue = [
            { password: 'AP 65', name: 'CARLOS SILVA', type: 'AP', time: new Date(), status: 'waiting' },
            { password: 'CM 160', name: 'MARIA SANTOS', type: 'CM', time: new Date(), status: 'waiting' },
            { password: 'AP 66', name: 'JOSÉ OLIVEIRA', type: 'AP', time: new Date(), status: 'waiting' },
            { password: 'CM 161', name: 'ANA COSTA', type: 'CM', time: new Date(), status: 'waiting' }
        ];
        
        this.recentCalls = [
            { name: 'LUCIANA R.', code: 'CONS. 14 - DRA. ANA PAULA DE CAMPOS', time: '16:10' },
            { name: 'MARIA T.', code: 'CONS. 14 - DRA. ANA PAULA DE CAMPOS', time: '16:09' },
            { name: 'FRANCISCA F.', code: 'CONS. 10 - DRA. FRANCONI FERREIRA MACHADO', time: '16:08' },
            { name: 'RENATA M.', code: 'CONS. 9 - DRA. GABRIELA THAIS A SILVA', time: '16:07' },
            { name: 'CESAR S.', code: 'CONS. 3 - DR. NICOLAS PERIM', time: '16:06' }
        ];
        
        this.nextCalls = [
            { code: 'AP 61', guiche: 'GUICHÊ 2', time: '16:11' },
            { code: 'CM 159', guiche: 'GUICHÊ 3', time: '16:10' },
            { code: 'CM 158', guiche: 'GUICHÊ 3', time: '16:09' },
            { code: 'AP 63', guiche: 'GUICHÊ 4', time: '16:08' },
            { code: 'AP 62', guiche: 'GUICHÊ 2', time: '16:07' }
        ];
        
        this.offices = {
            '1': 'Dr. João Silva',
            '2': 'Dra. Maria Santos',
            '3': 'Dr. Nicolas Perim',
            '9': 'Dra. Gabriela Thais',
            '10': 'Dra. Franconi Ferreira',
            '14': 'Dra. Ana Paula de Campos'
        };
        
        this.init();
    }
    
    init() {
        this.updateDateTime();
        this.updateDisplay();
        this.setupEventListeners();
        this.updateQueue();
        
        // Atualizar horário a cada segundo
        setInterval(() => this.updateDateTime(), 1000);
        
        // Simular chamadas automáticas (para demonstração)
        setInterval(() => this.simulateAutomaticCall(), 30000);
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
        document.getElementById('current-password').textContent = this.currentPassword;
        document.getElementById('guiche-number').textContent = this.currentGuiche;
        document.getElementById('patient-name').textContent = this.currentPatient;
        document.getElementById('office-info').textContent = this.currentOffice;
        
        this.updateRecentCalls();
        this.updateNextCalls();
    }
    
    updateRecentCalls() {
        const container = document.getElementById('recent-calls');
        container.innerHTML = '';
        
        this.recentCalls.forEach(call => {
            const callElement = document.createElement('div');
            callElement.className = 'call-item';
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
        
        this.nextCalls.forEach(call => {
            const callElement = document.createElement('div');
            callElement.className = 'next-call-item';
            callElement.innerHTML = `
                <span class="next-code">${call.code}</span>
                <span class="next-guiche">${call.guiche}</span>
                <span class="next-time">${call.time}</span>
            `;
            container.appendChild(callElement);
        });
    }
    
    updateQueue() {
        const container = document.getElementById('queue-list');
        container.innerHTML = '';
        
        const waitingQueue = this.queue.filter(item => item.status === 'waiting');
        
        waitingQueue.forEach(item => {
            const queueElement = document.createElement('div');
            queueElement.className = 'queue-item';
            queueElement.innerHTML = `
                <div class="queue-item-info">
                    <div class="queue-item-password">${item.password}</div>
                    <div class="queue-item-name">${item.name}</div>
                    <div class="queue-item-time">${item.time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</div>
                </div>
            `;
            container.appendChild(queueElement);
        });
        
        if (waitingQueue.length === 0) {
            container.innerHTML = '<div style="text-align: center; opacity: 0.6; padding: 20px;">Nenhuma senha na fila</div>';
        }
    }
    
    setupEventListeners() {
        // Toggle admin panel
        const adminToggleBtn = document.getElementById('admin-toggle-btn');
        const adminPanel = document.getElementById('admin-panel');
        const toggleAdmin = document.getElementById('toggle-admin');
        
        adminToggleBtn.addEventListener('click', () => {
            adminPanel.classList.add('active');
        });
        
        toggleAdmin.addEventListener('click', () => {
            adminPanel.classList.remove('active');
        });
        
        // Chamar próxima senha
        document.getElementById('call-next').addEventListener('click', () => {
            this.callNext();
        });
        
        // Gerar nova senha
        document.getElementById('generate-password').addEventListener('click', () => {
            this.generatePassword();
        });
        
        // Fechar admin panel ao clicar fora
        document.addEventListener('click', (e) => {
            if (!adminPanel.contains(e.target) && !adminToggleBtn.contains(e.target)) {
                adminPanel.classList.remove('active');
            }
        });
    }
    
    callNext() {
        const officeSelect = document.getElementById('office-select');
        const guicheSelect = document.getElementById('guiche-select');
        
        if (!officeSelect.value || !guicheSelect.value) {
            alert('Por favor, selecione o consultório e o guichê antes de chamar a próxima senha.');
            return;
        }
        
        const waitingQueue = this.queue.filter(item => item.status === 'waiting');
        if (waitingQueue.length === 0) {
            alert('Não há senhas na fila de espera.');
            return;
        }
        
        // Pegar próxima senha prioritária (AP) ou primeira da fila
        let nextInQueue = waitingQueue.find(item => item.type === 'AP') || waitingQueue[0];
        
        // Atualizar informações atuais
        this.currentPassword = nextInQueue.password;
        this.currentGuiche = guicheSelect.value;
        this.currentPatient = nextInQueue.name;
        this.currentOffice = `${officeSelect.value} - ${this.offices[officeSelect.value]}`;
        
        // Marcar como chamado
        nextInQueue.status = 'called';
        
        // Adicionar à lista de chamadas recentes
        const now = new Date();
        const timeString = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        
        this.recentCalls.unshift({
            name: nextInQueue.name,
            code: this.currentOffice,
            time: timeString
        });
        
        // Manter apenas as 5 chamadas mais recentes
        if (this.recentCalls.length > 5) {
            this.recentCalls.pop();
        }
        
        // Adicionar à lista de próximas chamadas
        this.nextCalls.unshift({
            code: nextInQueue.password,
            guiche: `GUICHÊ ${this.currentGuiche}`,
            time: timeString
        });
        
        // Manter apenas as 5 próximas chamadas
        if (this.nextCalls.length > 5) {
            this.nextCalls.pop();
        }
        
        // Atualizar displays
        this.updateDisplay();
        this.updateQueue();
        
        // Efeito sonoro (simulado)
        this.playCallSound();
        
        // Mostrar notificação
        this.showNotification(`Senha ${nextInQueue.password} chamada para o ${this.currentOffice}`);
    }
    
    generatePassword() {
        const passwordType = document.getElementById('password-type').value;
        const patientNameInput = document.getElementById('patient-name-input');
        const patientName = patientNameInput.value.trim().toUpperCase();
        
        if (!patientName) {
            alert('Por favor, digite o nome do paciente.');
            return;
        }
        
        // Incrementar contador
        this.passwordCounters[passwordType]++;
        const newPassword = `${passwordType} ${this.passwordCounters[passwordType]}`;
        
        // Adicionar à fila
        const newQueueItem = {
            password: newPassword,
            name: patientName,
            type: passwordType,
            time: new Date(),
            status: 'waiting'
        };
        
        this.queue.push(newQueueItem);
        
        // Limpar input
        patientNameInput.value = '';
        
        // Atualizar fila
        this.updateQueue();
        
        // Mostrar notificação
        this.showNotification(`Senha ${newPassword} gerada para ${patientName}`);
    }
    
    simulateAutomaticCall() {
        // Simular chegada de novos pacientes (para demonstração)
        const names = ['JOÃO SILVA', 'MARIA PEREIRA', 'PEDRO SANTOS', 'ANA LIMA', 'CARLOS FERREIRA'];
        const types = ['AP', 'CM', 'CM', 'AP', 'CM'];
        
        if (Math.random() > 0.7 && this.queue.filter(item => item.status === 'waiting').length < 10) {
            const randomName = names[Math.floor(Math.random() * names.length)];
            const randomType = types[Math.floor(Math.random() * types.length)];
            
            this.passwordCounters[randomType]++;
            const newPassword = `${randomType} ${this.passwordCounters[randomType]}`;
            
            this.queue.push({
                password: newPassword,
                name: randomName,
                type: randomType,
                time: new Date(),
                status: 'waiting'
            });
            
            this.updateQueue();
        }
    }
    
    playCallSound() {
        // Simular som de chamada (em uma implementação real, usaria Web Audio API)
        console.log('🔊 Tocando som de chamada...');
    }
    
    showNotification(message) {
        // Criar notificação toast
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(76, 175, 80, 0.9);
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            backdrop-filter: blur(10px);
            z-index: 9999;
            font-weight: 500;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            animation: slideInRight 0.3s ease;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Remover após 3 segundos
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Adicionar estilos de animação para notificações
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Inicializar sistema quando a página carrega
document.addEventListener('DOMContentLoaded', () => {
    const queueManager = new QueueManager();
    
    // Tornar disponível globalmente para debug
    window.queueManager = queueManager;
    
    console.log('🏥 Sistema de Gerenciamento de Filas Médicas inicializado!');
    console.log('📝 Para acessar o painel de controle, clique no ícone ⚙️ no lado direito da tela');
});
