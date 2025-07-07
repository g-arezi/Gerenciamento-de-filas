// Script para Painel de Controle
class ControlManager {
    constructor() {
        this.data = this.loadSharedData();
        this.init();
    }
    
    init() {
        this.updateDateTime();
        this.updateDisplay();
        this.updateQueue();
        this.updateStats();
        this.setupEventListeners();
        
        // Atualizar horário a cada segundo
        setInterval(() => this.updateDateTime(), 1000);
        
        // Salvar dados automaticamente a cada 5 segundos
        //setInterval(() => this.saveSharedData(), 5000);
    }
    
    loadSharedData() {
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
            passwordCounters: {
                AP: 64,
                CM: 159,
                EX: 1,
                RE: 1
            },
            queue: [
                { password: 'AP 65', name: 'CARLOS SILVA', type: 'AP', time: new Date(), status: 'waiting' },
                { password: 'CM 160', name: 'MARIA SANTOS', type: 'CM', time: new Date(), status: 'waiting' },
                { password: 'AP 66', name: 'JOSÉ OLIVEIRA', type: 'AP', time: new Date(), status: 'waiting' },
                { password: 'CM 161', name: 'ANA COSTA', type: 'CM', time: new Date(), status: 'waiting' }
            ],
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
            stats: {
                totalAttended: 89,
                waiting: 4,
                priority: 12,
                averageTime: '8m'
            },
            offices: {
                '1': 'Dr. João Silva',
                '2': 'Dra. Maria Santos',
                '3': 'Dr. Nicolas Perim',
                '9': 'Dra. Gabriela Thais',
                '10': 'Dra. Franconi Ferreira',
                '14': 'Dra. Ana Paula de Campos'
            },
            lastUpdate: new Date().getTime()
        };
    }
    
    saveSharedData() {
        this.data.lastUpdate = new Date().getTime();
        localStorage.setItem('queueSystemData', JSON.stringify(this.data));
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
        document.getElementById('display-current-password').textContent = this.data.currentPassword;
        document.getElementById('display-guiche').textContent = this.data.currentGuiche;
        document.getElementById('display-patient').textContent = this.data.currentPatient;
        document.getElementById('display-office').textContent = this.data.currentOffice;
    }
    
    updateQueue() {
        const container = document.getElementById('queue-list');
        container.innerHTML = '';
        
        const waitingQueue = this.data.queue.filter(item => item.status === 'waiting');
        
        // Atualizar contador
        const queueCount = document.getElementById('queue-count');
        queueCount.textContent = `${waitingQueue.length} ${waitingQueue.length === 1 ? 'pessoa na fila' : 'pessoas na fila'}`;
        
        if (waitingQueue.length === 0) {
            container.innerHTML = '<div style="text-align: center; opacity: 0.6; padding: 30px;">Nenhuma senha na fila</div>';
            return;
        }
        
        waitingQueue.forEach(item => {
            const queueElement = document.createElement('div');
            queueElement.className = 'queue-item';
            queueElement.innerHTML = `
                <div class="queue-item-info">
                    <div class="queue-item-password">${item.password}</div>
                    <div class="queue-item-name">${item.name}</div>
                    <div class="queue-item-time">${item.time instanceof Date ? item.time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : item.time}</div>
                </div>
                <div class="queue-item-type">${this.getTypeDescription(item.type)}</div>
            `;
            container.appendChild(queueElement);
        });
    }
    
    updateStats() {
        document.getElementById('stat-total').textContent = this.data.stats.totalAttended;
        document.getElementById('stat-waiting').textContent = this.data.stats.waiting;
        document.getElementById('stat-priority').textContent = this.data.stats.priority;
        document.getElementById('stat-average').textContent = this.data.stats.averageTime;
    }
    
    getTypeDescription(type) {
        const descriptions = {
            'AP': 'Prioritário',
            'CM': 'Consulta',
            'EX': 'Exames',
            'RE': 'Retorno'
        };
        return descriptions[type] || type;
    }
    
    setupEventListeners() {
        // Chamar próxima senha
        document.getElementById('call-next').addEventListener('click', () => {
            this.callNext();
        });
        
        // Gerar nova senha
        document.getElementById('generate-password').addEventListener('click', () => {
            this.generatePassword();
        });
        
        // Atualizar fila
        document.getElementById('refresh-queue').addEventListener('click', () => {
            this.updateQueue();
            this.showNotification('🔄 Fila atualizada');
        });
        
        // Enter para gerar senha
        document.getElementById('patient-name-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.generatePassword();
            }
        });
    }
    
    callNext() {
        const officeSelect = document.getElementById('office-select');
        const guicheSelect = document.getElementById('guiche-select');
        
        if (!officeSelect.value || !guicheSelect.value) {
            this.showNotification('⚠️ Selecione o consultório e o guichê', 'warning');
            return;
        }
        
        const waitingQueue = this.data.queue.filter(item => item.status === 'waiting');
        if (waitingQueue.length === 0) {
            this.showNotification('⚠️ Não há senhas na fila de espera', 'warning');
            return;
        }
        
        // Pegar próxima senha prioritária (AP) ou primeira da fila
        let nextInQueue = waitingQueue.find(item => item.type === 'AP') || waitingQueue[0];
        
        // Atualizar informações atuais
        this.data.currentPassword = nextInQueue.password;
        this.data.currentGuiche = guicheSelect.value;
        this.data.currentPatient = nextInQueue.name;
        this.data.currentOffice = `${officeSelect.value} - ${this.data.offices[officeSelect.value]}`;
        
        // Marcar como chamado
        nextInQueue.status = 'called';
        
        // Adicionar à lista de chamadas recentes
        const now = new Date();
        const timeString = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        
        this.data.recentCalls.unshift({
            name: nextInQueue.name,
            code: this.data.currentOffice,
            time: timeString
        });
        
        // Manter apenas as 5 chamadas mais recentes
        if (this.data.recentCalls.length > 5) {
            this.data.recentCalls.pop();
        }
        
        // Adicionar à lista de próximas chamadas
        this.data.nextCalls.unshift({
            code: nextInQueue.password,
            guiche: `GUICHÊ ${this.data.currentGuiche}`,
            time: timeString
        });
        
        // Manter apenas as 5 próximas chamadas
        if (this.data.nextCalls.length > 5) {
            this.data.nextCalls.pop();
        }
        
        // Atualizar estatísticas
        this.data.stats.totalAttended++;
        this.data.stats.waiting = this.data.queue.filter(item => item.status === 'waiting').length;
        
        // Atualizar displays
        this.updateDisplay();
        this.updateQueue();
        this.updateStats();
        
        // Salvar dados
        this.saveSharedData();
        
        // Mostrar notificação
        this.showNotification(`📢 Senha ${nextInQueue.password} chamada para ${this.data.currentOffice}`, 'success');
        
        // Limpar seleções
        officeSelect.value = '';
        guicheSelect.value = '';
    }
    
    generatePassword() {
        const passwordType = document.getElementById('password-type').value;
        const patientNameInput = document.getElementById('patient-name-input');
        const patientName = patientNameInput.value.trim().toUpperCase();
        
        if (!patientName) {
            this.showNotification('⚠️ Digite o nome do paciente', 'warning');
            patientNameInput.focus();
            return;
        }
        
        // Incrementar contador
        this.data.passwordCounters[passwordType]++;
        const newPassword = `${passwordType} ${this.data.passwordCounters[passwordType]}`;
        
        // Adicionar à fila
        const newQueueItem = {
            password: newPassword,
            name: patientName,
            type: passwordType,
            time: new Date(),
            status: 'waiting'
        };
        
        this.data.queue.push(newQueueItem);
        
        // Atualizar estatísticas
        this.data.stats.waiting = this.data.queue.filter(item => item.status === 'waiting').length;
        if (passwordType === 'AP') {
            this.data.stats.priority++;
        }
        
        // Limpar input
        patientNameInput.value = '';
        
        // Atualizar displays
        this.updateQueue();
        this.updateStats();
        
        // Salvar dados
        this.saveSharedData();
        
        // Mostrar notificação
        this.showNotification(`🎫 Senha ${newPassword} gerada para ${patientName}`, 'success');
        
        // Focar no input para próxima entrada
        setTimeout(() => patientNameInput.focus(), 100);
    }
    
    showNotification(message, type = 'info') {
        const colors = {
            'success': 'rgba(76, 175, 80, 0.9)',
            'warning': 'rgba(255, 152, 0, 0.9)',
            'error': 'rgba(244, 67, 54, 0.9)',
            'info': 'rgba(33, 150, 243, 0.9)'
        };
        
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${colors[type]};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            backdrop-filter: blur(10px);
            z-index: 9999;
            font-weight: 500;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            animation: slideInRight 0.3s ease;
            max-width: 300px;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Remover após 4 segundos
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 4000);
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

// Inicializar quando a página carrega
document.addEventListener('DOMContentLoaded', () => {
    const controlManager = new ControlManager();
    
    // Tornar disponível globalmente para debug
    window.controlManager = controlManager;
    
    console.log('⚙️ Painel de Controle inicializado!');
    console.log('📺 Para visualizar o painel, abra a Tela de Exibição');
});
