// Script para Painel de Controle
class ControlManager {
    constructor() {
        this.data = this.loadSharedData();
        this.init();
    }
    
    init() {
        console.log('🔄 Inicializando ControlManager...');
        try {
            this.updateDateTime();
            this.updateDisplay();
            this.updateQueue();
            this.updateStats();
            this.setupEventListeners();
            this.setupTabs();
            this.loadConfigData();
            
            // Atualizar horário a cada segundo
            setInterval(() => this.updateDateTime(), 1000);
            
            console.log('✅ ControlManager inicializado com sucesso!');
        } catch (error) {
            console.error('❌ Erro na inicialização:', error);
        }
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
            // Dados de configuração
            guiches: [
                { id: 1, numero: 1, descricao: 'Atendimento Geral', status: 'ativo' },
                { id: 2, numero: 2, descricao: 'Atendimento Prioritário', status: 'ativo' },
                { id: 3, numero: 3, descricao: 'Exames', status: 'ativo' },
                { id: 4, numero: 4, descricao: 'Retorno', status: 'ativo' }
            ],
            consultorios: [
                { id: 1, numero: 1, especialidade: 'Clínica Geral', andar: '1º Andar', status: 'ativo' },
                { id: 2, numero: 2, especialidade: 'Cardiologia', andar: '1º Andar', status: 'ativo' },
                { id: 3, numero: 3, especialidade: 'Neurologia', andar: '2º Andar', status: 'ativo' },
                { id: 9, numero: 9, especialidade: 'Pediatria', andar: '2º Andar', status: 'ativo' },
                { id: 10, numero: 10, especialidade: 'Dermatologia', andar: '2º Andar', status: 'ativo' },
                { id: 14, numero: 14, especialidade: 'Ginecologia', andar: '3º Andar', status: 'ativo' }
            ],
            tiposAtendimento: [
                { id: 1, sigla: 'AP', nome: 'Atendimento Prioritário', cor: '#FF5722', prioridade: 1, status: 'ativo' },
                { id: 2, sigla: 'CM', nome: 'Consulta Médica', cor: '#2196F3', prioridade: 5, status: 'ativo' },
                { id: 3, sigla: 'EX', nome: 'Exames', cor: '#4CAF50', prioridade: 3, status: 'ativo' },
                { id: 4, sigla: 'RE', nome: 'Retorno', cor: '#9C27B0', prioridade: 4, status: 'ativo' }
            ],
            profissionais: [
                { id: 1, nome: 'Dr. João Silva', especialidade: 'Clínica Geral', crm: 'CRM 12345', consultorio: 1, status: 'ativo' },
                { id: 2, nome: 'Dra. Maria Santos', especialidade: 'Cardiologia', crm: 'CRM 23456', consultorio: 2, status: 'ativo' },
                { id: 3, nome: 'Dr. Nicolas Perim', especialidade: 'Neurologia', crm: 'CRM 34567', consultorio: 3, status: 'ativo' },
                { id: 9, nome: 'Dra. Gabriela Thais', especialidade: 'Pediatria', crm: 'CRM 45678', consultorio: 9, status: 'ativo' },
                { id: 10, nome: 'Dra. Franconi Ferreira', especialidade: 'Dermatologia', crm: 'CRM 56789', consultorio: 10, status: 'ativo' },
                { id: 14, nome: 'Dra. Ana Paula de Campos', especialidade: 'Ginecologia', crm: 'CRM 67890', consultorio: 14, status: 'ativo' }
            ],
            lastUpdate: new Date().getTime()
        };
    }
    
    saveSharedData() {
        this.data.lastUpdate = new Date().getTime();
        localStorage.setItem('queueSystemData', JSON.stringify(this.data));
    }
    
    // Funções básicas de atualização
    updateDateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('pt-BR');
        const dateString = now.toLocaleDateString('pt-BR');
        
        const timeElement = document.getElementById('current-time');
        const dateElement = document.getElementById('current-date');
        
        if (timeElement) timeElement.textContent = timeString;
        if (dateElement) dateElement.textContent = dateString;
    }
    
    updateQueue() {
        // Atualizar lista de espera se o elemento existir
        const queueList = document.getElementById('queue-list');
        if (queueList && this.data.queue) {
            const waitingQueue = this.data.queue.filter(item => item.status === 'waiting');
            queueList.innerHTML = waitingQueue.length > 0 
                ? waitingQueue.map(item => `
                    <div class="queue-item">
                        <span class="password">${item.password}</span>
                        <span class="name">${item.name}</span>
                        <span class="time">${new Date(item.time).toLocaleTimeString('pt-BR')}</span>
                    </div>
                `).join('')
                : '<div class="empty-queue">Nenhuma senha na fila</div>';
        }
    }
    
    updateStats() {
        // Atualizar estatísticas se os elementos existirem
        const totalElement = document.getElementById('total-senhas');
        const waitingElement = document.getElementById('senhas-espera');
        const calledElement = document.getElementById('senhas-chamadas');
        
        if (this.data.queue) {
            const total = this.data.queue.length;
            const waiting = this.data.queue.filter(item => item.status === 'waiting').length;
            const called = this.data.queue.filter(item => item.status === 'called').length;
            
            if (totalElement) totalElement.textContent = total;
            if (waitingElement) waitingElement.textContent = waiting;
            if (calledElement) calledElement.textContent = called;
        }
    }
    
    setupTabs() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');
        
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetTab = btn.getAttribute('data-tab');
                
                // Remove active class from all tabs and contents
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked tab and corresponding content
                btn.classList.add('active');
                document.getElementById(targetTab).classList.add('active');
            });
        });
    }
    
    loadConfigData() {
        console.log('📊 Carregando dados de configuração...');
        try {
            this.updateGuichesSelect();
            this.updateConsultoriosSelect();
            this.updateTiposSelect();
            this.updateProfissionalConsultorioSelect();
            this.renderGuichesList();
            this.renderConsultoriosList();
            this.renderTiposList();
            this.renderProfissionaisList();
            console.log('✅ Dados de configuração carregados');
        } catch (error) {
            console.error('❌ Erro ao carregar configurações:', error);
        }
    }
    
    updateGuichesSelect() {
        const select = document.getElementById('guiche-select');
        if (!select) {
            console.warn('⚠️ Elemento guiche-select não encontrado');
            return;
        }
        
        const activeGuiches = this.data.guiches.filter(g => g.status === 'ativo');
        
        select.innerHTML = '<option value="">Selecione o Guichê</option>';
        activeGuiches.forEach(guiche => {
            const option = document.createElement('option');
            option.value = guiche.numero;
            option.textContent = `Guichê ${guiche.numero}${guiche.descricao ? ' - ' + guiche.descricao : ''}`;
            select.appendChild(option);
        });
    }
    
    updateConsultoriosSelect() {
        const select = document.getElementById('office-select');
        if (!select) {
            console.warn('⚠️ Elemento office-select não encontrado');
            return;
        }
        
        const activeConsultorios = this.data.consultorios.filter(c => c.status === 'ativo');
        
        select.innerHTML = '<option value="">Selecione o Consultório</option>';
        activeConsultorios.forEach(consultorio => {
            const profissional = this.data.profissionais.find(p => p.consultorio === consultorio.id && p.status === 'ativo');
            const option = document.createElement('option');
            option.value = consultorio.numero;
            option.textContent = `Consultório ${consultorio.numero}${profissional ? ' - ' + profissional.nome : ' - ' + consultorio.especialidade}`;
            select.appendChild(option);
        });
    }
    
    updateTiposSelect() {
        const select = document.getElementById('password-type');
        if (!select) {
            console.warn('⚠️ Elemento password-type não encontrado');
            return;
        }
        
        const activeTipos = this.data.tiposAtendimento.filter(t => t.status === 'ativo')
                                                        .sort((a, b) => a.prioridade - b.prioridade);
        
        select.innerHTML = '';
        activeTipos.forEach(tipo => {
            const option = document.createElement('option');
            option.value = tipo.sigla;
            option.textContent = `${tipo.nome} (${tipo.sigla})`;
            select.appendChild(option);
        });
    }
    
    updateProfissionalConsultorioSelect() {
        const select = document.getElementById('profissional-consultorio');
        if (!select) {
            console.warn('⚠️ Elemento profissional-consultorio não encontrado');
            return;
        }
        
        const activeConsultorios = this.data.consultorios.filter(c => c.status === 'ativo');
        
        select.innerHTML = '<option value="">Selecione um consultório</option>';
        activeConsultorios.forEach(consultorio => {
            const option = document.createElement('option');
            option.value = consultorio.id;
            option.textContent = `Consultório ${consultorio.numero} - ${consultorio.especialidade}`;
            select.appendChild(option);
        });
    }
    
    
    renderGuichesList() {
        const container = document.getElementById('guiches-list');
        if (!container) {
            console.warn('⚠️ Elemento guiches-list não encontrado');
            return;
        }
        
        container.innerHTML = '';
        
        if (this.data.guiches.length === 0) {
            container.innerHTML = '<div class="empty-state"><div class="empty-state-icon">🏢</div>Nenhum guichê cadastrado</div>';
            return;
        }
        
        this.data.guiches.forEach(guiche => {
            const item = document.createElement('div');
            item.className = 'list-item';
            item.innerHTML = `
                <div class="item-info">
                    <div class="item-title">Guichê ${guiche.numero}</div>
                    <div class="item-details">
                        ${guiche.descricao ? guiche.descricao + '<br>' : ''}
                        <span class="status-badge status-${guiche.status}">${guiche.status}</span>
                    </div>
                </div>
                <div class="item-actions">
                    <button class="btn-edit" onclick="controlManager.editGuiche(${guiche.id})">✏️ Editar</button>
                    <button class="btn-delete" onclick="controlManager.deleteGuiche(${guiche.id})">🗑️ Excluir</button>
                </div>
            `;
            container.appendChild(item);
        });
    }
    
    renderConsultoriosList() {
        const container = document.getElementById('consultorios-list');
        if (!container) {
            console.warn('⚠️ Elemento consultorios-list não encontrado');
            return;
        }
        
        container.innerHTML = '';
        
        if (this.data.consultorios.length === 0) {
            container.innerHTML = '<div class="empty-state"><div class="empty-state-icon">🏥</div>Nenhum consultório cadastrado</div>';
            return;
        }
        
        this.data.consultorios.forEach(consultorio => {
            const profissional = this.data.profissionais.find(p => p.consultorio === consultorio.id);
            const item = document.createElement('div');
            item.className = 'list-item';
            item.innerHTML = `
                <div class="item-info">
                    <div class="item-title">Consultório ${consultorio.numero}</div>
                    <div class="item-details">
                        Especialidade: ${consultorio.especialidade}<br>
                        ${consultorio.andar ? 'Local: ' + consultorio.andar + '<br>' : ''}
                        ${profissional ? 'Profissional: ' + profissional.nome + '<br>' : ''}
                        <span class="status-badge status-${consultorio.status}">${consultorio.status}</span>
                    </div>
                </div>
                <div class="item-actions">
                    <button class="btn-edit" onclick="controlManager.editConsultorio(${consultorio.id})">✏️ Editar</button>
                    <button class="btn-delete" onclick="controlManager.deleteConsultorio(${consultorio.id})">🗑️ Excluir</button>
                </div>
            `;
            container.appendChild(item);
        });
    }
    
    renderTiposList() {
        const container = document.getElementById('tipos-list');
        if (!container) {
            console.warn('⚠️ Elemento tipos-list não encontrado');
            return;
        }
        
        container.innerHTML = '';
        
        if (this.data.tiposAtendimento.length === 0) {
            container.innerHTML = '<div class="empty-state"><div class="empty-state-icon">📋</div>Nenhum tipo de atendimento cadastrado</div>';
            return;
        }
        
        this.data.tiposAtendimento.sort((a, b) => a.prioridade - b.prioridade).forEach(tipo => {
            const item = document.createElement('div');
            item.className = 'list-item';
            item.innerHTML = `
                <div class="item-info">
                    <div class="item-title">
                        <span class="tipo-color-badge" style="background-color: ${tipo.cor}"></span>
                        ${tipo.sigla} - ${tipo.nome}
                    </div>
                    <div class="item-details">
                        Prioridade: ${tipo.prioridade}<br>
                        <span class="status-badge status-${tipo.status}">${tipo.status}</span>
                    </div>
                </div>
                <div class="item-actions">
                    <button class="btn-edit" onclick="controlManager.editTipo(${tipo.id})">✏️ Editar</button>
                    <button class="btn-delete" onclick="controlManager.deleteTipo(${tipo.id})">🗑️ Excluir</button>
                </div>
            `;
            container.appendChild(item);
        });
    }
    
    renderProfissionaisList() {
        const container = document.getElementById('profissionais-list');
        if (!container) {
            console.warn('⚠️ Elemento profissionais-list não encontrado');
            return;
        }
        
        container.innerHTML = '';
        
        if (this.data.profissionais.length === 0) {
            container.innerHTML = '<div class="empty-state"><div class="empty-state-icon">👨‍⚕️</div>Nenhum profissional cadastrado</div>';
            return;
        }
        
        this.data.profissionais.forEach(profissional => {
            const consultorio = this.data.consultorios.find(c => c.id === profissional.consultorio);
            const item = document.createElement('div');
            item.className = 'list-item';
            item.innerHTML = `
                <div class="item-info">
                    <div class="item-title">${profissional.nome}</div>
                    <div class="item-details">
                        ${profissional.especialidade} - ${profissional.crm}<br>
                        ${consultorio ? 'Consultório: ' + consultorio.numero + '<br>' : ''}
                        <span class="status-badge status-${profissional.status}">${profissional.status}</span>
                    </div>
                </div>
                <div class="item-actions">
                    <button class="btn-edit" onclick="controlManager.editProfissional(${profissional.id})">✏️ Editar</button>
                    <button class="btn-delete" onclick="controlManager.deleteProfissional(${profissional.id})">🗑️ Excluir</button>
                </div>
            `;
            container.appendChild(item);
        });
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
        const tipoAtendimento = this.data.tiposAtendimento.find(t => t.sigla === type);
        return tipoAtendimento ? tipoAtendimento.nome : type;
    }
    
    setupEventListeners() {
        // Chamar próxima senha
        const callNextBtn = document.getElementById('call-next');
        if (callNextBtn) {
            callNextBtn.addEventListener('click', () => {
                this.callNext();
            });
        }
        
        // Gerar nova senha
        const generatePasswordBtn = document.getElementById('generate-password');
        if (generatePasswordBtn) {
            generatePasswordBtn.addEventListener('click', () => {
                this.generatePassword();
            });
        }
        
        // Atualizar fila
        const refreshQueueBtn = document.getElementById('refresh-queue');
        if (refreshQueueBtn) {
            refreshQueueBtn.addEventListener('click', () => {
                this.updateQueue();
                this.showNotification('🔄 Fila atualizada');
            });
        }
        
        // Enter para gerar senha
        const patientNameInput = document.getElementById('patient-name-input');
        if (patientNameInput) {
            patientNameInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.generatePassword();
                }
            });
        }
        
        // Event listeners para configurações
        const addGuicheBtn = document.getElementById('add-guiche');
        if (addGuicheBtn) {
            addGuicheBtn.addEventListener('click', () => {
                this.addGuiche();
            });
        }
        
        const addConsultorioBtn = document.getElementById('add-consultorio');
        if (addConsultorioBtn) {
            addConsultorioBtn.addEventListener('click', () => {
                this.addConsultorio();
            });
        }
        
        const addTipoBtn = document.getElementById('add-tipo');
        if (addTipoBtn) {
            addTipoBtn.addEventListener('click', () => {
                this.addTipo();
            });
        }
        
        const addProfissionalBtn = document.getElementById('add-profissional');
        if (addProfissionalBtn) {
            addProfissionalBtn.addEventListener('click', () => {
                this.addProfissional();
            });
        }
        
        // Event listeners para limpeza e manutenção
        const clearQueueBtn = document.getElementById('clear-queue');
        if (clearQueueBtn) {
            clearQueueBtn.addEventListener('click', () => {
                this.clearQueue();
            });
        }
        
        const clearWaitingQueueBtn = document.getElementById('clear-waiting-queue');
        if (clearWaitingQueueBtn) {
            clearWaitingQueueBtn.addEventListener('click', () => {
                this.clearWaitingQueue();
            });
        }
        
        const clearCallHistoryBtn = document.getElementById('clear-call-history');
        if (clearCallHistoryBtn) {
            clearCallHistoryBtn.addEventListener('click', () => {
                this.clearCallHistory();
            });
        }
        
        const resetCountersBtn = document.getElementById('reset-counters');
        if (resetCountersBtn) {
            resetCountersBtn.addEventListener('click', () => {
                this.resetCounters();
            });
        }
        
        const resetSystemBtn = document.getElementById('reset-system');
        if (resetSystemBtn) {
            resetSystemBtn.addEventListener('click', () => {
                this.resetSystem();
            });
        }
        
        // Formatação automática para sigla de tipo
        const tipoSiglaInput = document.getElementById('tipo-sigla');
        if (tipoSiglaInput) {
            tipoSiglaInput.addEventListener('input', (e) => {
                e.target.value = e.target.value.toUpperCase();
            });
        }
        
        console.log('✅ Event listeners configurados');
    }
    
    // Métodos CRUD para Tipos de Atendimento
    addTipo() {
        const sigla = document.getElementById('tipo-sigla').value.trim().toUpperCase();
        const nome = document.getElementById('tipo-nome').value.trim();
        const cor = document.getElementById('tipo-cor').value;
        const prioridade = parseInt(document.getElementById('tipo-prioridade').value);
        const status = document.getElementById('tipo-status').value;
        
        if (!sigla || sigla.length < 2) {
            this.showNotification('⚠️ Digite uma sigla válida (2-3 letras)', 'warning');
            return;
        }
        
        if (!nome) {
            this.showNotification('⚠️ Digite o nome do tipo de atendimento', 'warning');
            return;
        }
        
        // Verificar se já existe
        const exists = this.data.tiposAtendimento.find(t => t.sigla === sigla);
        if (exists) {
            this.showNotification('⚠️ Já existe um tipo com esta sigla', 'warning');
            return;
        }
        
        const newTipo = {
            id: Date.now(),
            sigla,
            nome,
            cor,
            prioridade,
            status
        };
        
        this.data.tiposAtendimento.push(newTipo);
        
        // Atualizar contador se não existir
        if (!this.data.passwordCounters[sigla]) {
            this.data.passwordCounters[sigla] = 0;
        }
        
        this.saveSharedData();
        this.renderTiposList();
        this.updateTiposSelect();
        
        // Limpar formulário
        document.getElementById('tipo-sigla').value = '';
        document.getElementById('tipo-nome').value = '';
        document.getElementById('tipo-cor').value = '#2196F3';
        document.getElementById('tipo-prioridade').value = '5';
        document.getElementById('tipo-status').value = 'ativo';
        
        this.showNotification(`✅ Tipo ${sigla} adicionado com sucesso`, 'success');
    }
    
    editTipo(id) {
        const tipo = this.data.tiposAtendimento.find(t => t.id === id);
        if (!tipo) return;
        
        // Preencher formulário
        document.getElementById('tipo-sigla').value = tipo.sigla;
        document.getElementById('tipo-nome').value = tipo.nome;
        document.getElementById('tipo-cor').value = tipo.cor;
        document.getElementById('tipo-prioridade').value = tipo.prioridade;
        document.getElementById('tipo-status').value = tipo.status;
        
        // Remover o tipo atual
        this.deleteTipo(id, false);
        
        document.getElementById('tipo-sigla').focus();
        this.showNotification('📝 Editando tipo. Modifique os dados e clique em Adicionar', 'info');
    }
    
    deleteTipo(id, showConfirm = true) {
        if (showConfirm && !confirm('Tem certeza que deseja excluir este tipo de atendimento?')) return;
        
        const tipo = this.data.tiposAtendimento.find(t => t.id === id);
        if (!tipo) return;
        
        // Verificar se há senhas na fila com este tipo
        const senhasNaFila = this.data.queue.filter(q => q.type === tipo.sigla && q.status === 'waiting');
        if (senhasNaFila.length > 0 && showConfirm) {
            if (!confirm(`Existem ${senhasNaFila.length} senhas na fila com este tipo. Deseja continuar?`)) return;
        }
        
        this.data.tiposAtendimento = this.data.tiposAtendimento.filter(t => t.id !== id);
        this.saveSharedData();
        this.renderTiposList();
        this.updateTiposSelect();
        
        if (showConfirm) {
            this.showNotification('🗑️ Tipo de atendimento excluído com sucesso', 'success');
        }
    }
    
    // Métodos CRUD para Profissionais
    addProfissional() {
        const nome = document.getElementById('profissional-nome').value.trim();
        const especialidade = document.getElementById('profissional-especialidade').value.trim();
        const crm = document.getElementById('profissional-crm').value.trim();
        const consultorio = parseInt(document.getElementById('profissional-consultorio').value) || null;
        const status = document.getElementById('profissional-status').value;
        
        if (!nome) {
            this.showNotification('⚠️ Digite o nome do profissional', 'warning');
            return;
        }
        
        if (!especialidade) {
            this.showNotification('⚠️ Digite a especialidade do profissional', 'warning');
            return;
        }
        
        const newProfissional = {
            id: Date.now(),
            nome,
            especialidade,
            crm,
            consultorio,
            status
        };
        
        this.data.profissionais.push(newProfissional);
        this.saveSharedData();
        this.renderProfissionaisList();
        this.updateConsultoriosSelect();
        
        // Limpar formulário
        document.getElementById('profissional-nome').value = '';
        document.getElementById('profissional-especialidade').value = '';
        document.getElementById('profissional-crm').value = '';
        document.getElementById('profissional-consultorio').value = '';
        document.getElementById('profissional-status').value = 'ativo';
        
        this.showNotification(`✅ Profissional ${nome} adicionado com sucesso`, 'success');
    }
    
    editProfissional(id) {
        const profissional = this.data.profissionais.find(p => p.id === id);
        if (!profissional) return;
        
        // Preencher formulário
        document.getElementById('profissional-nome').value = profissional.nome;
        document.getElementById('profissional-especialidade').value = profissional.especialidade;
        document.getElementById('profissional-crm').value = profissional.crm;
        document.getElementById('profissional-consultorio').value = profissional.consultorio || '';
        document.getElementById('profissional-status').value = profissional.status;
        
        // Remover o profissional atual
        this.deleteProfissional(id, false);
        
        document.getElementById('profissional-nome').focus();
        this.showNotification('📝 Editando profissional. Modifique os dados e clique em Adicionar', 'info');
    }
    
    deleteProfissional(id, showConfirm = true) {
        if (showConfirm && !confirm('Tem certeza que deseja excluir este profissional?')) return;
        
        this.data.profissionais = this.data.profissionais.filter(p => p.id !== id);
        this.saveSharedData();
        this.renderProfissionaisList();
        this.updateConsultoriosSelect();
        
        if (showConfirm) {
            this.showNotification('🗑️ Profissional excluído com sucesso', 'success');
        }
    }
    
    // Métodos de Limpeza e Manutenção
    clearQueue() {
        if (!confirm('⚠️ Tem certeza que deseja limpar toda a fila de espera? Esta ação não pode ser desfeita.')) return;
        
        this.clearWaitingQueue(false);
    }
    
    clearWaitingQueue(showConfirm = true) {
        if (showConfirm && !confirm('⚠️ Tem certeza que deseja limpar a fila de espera? Esta ação não pode ser desfeita.')) return;
        
        // Manter apenas as senhas que já foram chamadas
        this.data.queue = this.data.queue.filter(item => item.status === 'called');
        
        // Atualizar estatísticas
        this.data.stats.waiting = 0;
        
        // Atualizar displays
        this.updateQueue();
        this.updateStats();
        
        // Salvar dados
        this.saveSharedData();
        
        this.showNotification('🗑️ Fila de espera limpa com sucesso', 'success');
    }
    
    clearCallHistory() {
        if (!confirm('⚠️ Tem certeza que deseja limpar o histórico de chamadas? Esta ação não pode ser desfeita.')) return;
        
        this.data.recentCalls = [];
        this.data.nextCalls = [];
        
        // Salvar dados
        this.saveSharedData();
        
        this.showNotification('📜 Histórico de chamadas limpo com sucesso', 'success');
    }
    
    resetCounters() {
        if (!confirm('⚠️ Tem certeza que deseja zerar todos os contadores de senhas? Esta ação não pode ser desfeita.')) return;
        
        // Resetar todos os contadores
        Object.keys(this.data.passwordCounters).forEach(key => {
            this.data.passwordCounters[key] = 0;
        });
        
        // Salvar dados
        this.saveSharedData();
        
        this.showNotification('🔄 Contadores de senhas zerados com sucesso', 'success');
    }
    
    resetSystem() {
        const confirmMessage = `⚠️ ATENÇÃO! Esta ação irá:
        
• Limpar toda a fila de espera
• Remover histórico de chamadas
• Zerar todos os contadores
• Resetar informações de atendimento atual

Esta ação NÃO irá remover suas configurações (guichês, consultórios, tipos e profissionais).

Tem certeza que deseja continuar?`;
        
        if (!confirm(confirmMessage)) return;
        
        // Confirmar novamente
        if (!confirm('⚠️ ÚLTIMA CONFIRMAÇÃO: Tem certeza que deseja reiniciar o sistema?')) return;
        
        // Manter apenas as configurações
        const configData = {
            guiches: this.data.guiches,
            consultorios: this.data.consultorios,
            tiposAtendimento: this.data.tiposAtendimento,
            profissionais: this.data.profissionais
        };
        
        // Resetar contadores baseado nos tipos ativos
        const resetCounters = {};
        this.data.tiposAtendimento.forEach(tipo => {
            resetCounters[tipo.sigla] = 0;
        });
        
        // Criar dados limpos
        this.data = {
            currentPassword: '-- --',
            currentGuiche: '--',
            currentPatient: 'AGUARDANDO PRÓXIMO PACIENTE',
            currentOffice: '-- SELECIONE UM CONSULTÓRIO --',
            passwordCounters: resetCounters,
            queue: [],
            recentCalls: [],
            nextCalls: [],
            stats: {
                totalAttended: 0,
                waiting: 0,
                priority: 0,
                averageTime: '0m'
            },
            ...configData,
            lastUpdate: new Date().getTime()
        };
        
        // Salvar dados
        this.saveSharedData();
        
        // Atualizar displays
        this.updateDisplay();
        this.updateQueue();
        this.updateStats();
        this.loadConfigData();
        
        this.showNotification('🔄 Sistema reiniciado com sucesso! Configurações mantidas.', 'success');
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
        
        // Ordenar fila por prioridade dos tipos de atendimento
        waitingQueue.sort((a, b) => {
            const tipoA = this.data.tiposAtendimento.find(t => t.sigla === a.type);
            const tipoB = this.data.tiposAtendimento.find(t => t.sigla === b.type);
            const prioridadeA = tipoA ? tipoA.prioridade : 10;
            const prioridadeB = tipoB ? tipoB.prioridade : 10;
            return prioridadeA - prioridadeB;
        });
        
        const nextInQueue = waitingQueue[0];
        
        // Buscar informações do consultório e profissional
        const consultorio = this.data.consultorios.find(c => c.numero === parseInt(officeSelect.value));
        const profissional = this.data.profissionais.find(p => p.consultorio === consultorio?.id && p.status === 'ativo');
        
        // Atualizar informações atuais
        this.data.currentPassword = nextInQueue.password;
        this.data.currentGuiche = guicheSelect.value;
        this.data.currentPatient = nextInQueue.name;
        this.data.currentOffice = `${officeSelect.value} - ${profissional ? profissional.nome : consultorio?.especialidade || 'Consultório'}`;
        
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
        
        if (!passwordType) {
            this.showNotification('⚠️ Selecione o tipo de atendimento', 'warning');
            return;
        }
        
        if (!patientName) {
            this.showNotification('⚠️ Digite o nome do paciente', 'warning');
            patientNameInput.focus();
            return;
        }
        
        // Verificar se o tipo está ativo
        const tipoAtendimento = this.data.tiposAtendimento.find(t => t.sigla === passwordType && t.status === 'ativo');
        if (!tipoAtendimento) {
            this.showNotification('⚠️ Tipo de atendimento não está disponível', 'warning');
            return;
        }
        
        // Incrementar contador
        if (!this.data.passwordCounters[passwordType]) {
            this.data.passwordCounters[passwordType] = 0;
        }
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
        if (tipoAtendimento.prioridade <= 2) {
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
    
    // Funções CRUD para Configurações
    addGuiche() {
        const numero = document.getElementById('guiche-numero').value;
        const descricao = document.getElementById('guiche-descricao').value || '';
        const status = document.getElementById('guiche-status').value;
        
        if (!numero) {
            this.showNotification('⚠️ Digite o número do guichê', 'warning');
            return;
        }
        
        // Verificar se já existe
        if (this.data.guiches.find(g => g.numero === parseInt(numero))) {
            this.showNotification('⚠️ Já existe um guichê com este número', 'warning');
            return;
        }
        
        const novoGuiche = {
            id: Date.now(),
            numero: parseInt(numero),
            descricao,
            status,
            criado: new Date()
        };
        
        this.data.guiches.push(novoGuiche);
        this.saveSharedData();
        this.renderGuichesList();
        
        // Limpar formulário
        document.getElementById('guiche-numero').value = '';
        document.getElementById('guiche-descricao').value = '';
        document.getElementById('guiche-status').value = 'ativo';
        
        this.showNotification('✅ Guichê adicionado com sucesso!', 'success');
    }
    
    addConsultorio() {
        const numero = document.getElementById('consultorio-numero').value;
        const especialidade = document.getElementById('consultorio-especialidade').value;
        const andar = document.getElementById('consultorio-andar').value || '';
        const status = document.getElementById('consultorio-status').value;
        
        if (!numero || !especialidade) {
            this.showNotification('⚠️ Preencha todos os campos obrigatórios', 'warning');
            return;
        }
        
        // Verificar se já existe
        if (this.data.consultorios.find(c => c.numero === parseInt(numero))) {
            this.showNotification('⚠️ Já existe um consultório com este número', 'warning');
            return;
        }
        
        const novoConsultorio = {
            id: Date.now(),
            numero: parseInt(numero),
            especialidade,
            andar,
            status,
            criado: new Date()
        };
        
        this.data.consultorios.push(novoConsultorio);
        this.saveSharedData();
        this.renderConsultoriosList();
        
        // Limpar formulário
        document.getElementById('consultorio-numero').value = '';
        document.getElementById('consultorio-especialidade').value = '';
        document.getElementById('consultorio-andar').value = '';
        document.getElementById('consultorio-status').value = 'ativo';
        
        this.showNotification('✅ Consultório adicionado com sucesso!', 'success');
    }
    
    addTipo() {
        const sigla = document.getElementById('tipo-sigla').value.toUpperCase();
        const nome = document.getElementById('tipo-nome').value;
        const prioridade = parseInt(document.getElementById('tipo-prioridade').value);
        const cor = document.getElementById('tipo-cor').value;
        const status = document.getElementById('tipo-status').value;
        
        if (!sigla || !nome || !prioridade) {
            this.showNotification('⚠️ Preencha todos os campos obrigatórios', 'warning');
            return;
        }
        
        // Verificar se já existe
        if (this.data.tiposAtendimento.find(t => t.sigla === sigla)) {
            this.showNotification('⚠️ Já existe um tipo com esta sigla', 'warning');
            return;
        }
        
        const novoTipo = {
            id: Date.now(),
            sigla,
            nome,
            prioridade,
            cor,
            status,
            criado: new Date()
        };
        
        this.data.tiposAtendimento.push(novoTipo);
        this.saveSharedData();
        this.renderTiposList();
        
        // Limpar formulário
        document.getElementById('tipo-sigla').value = '';
        document.getElementById('tipo-nome').value = '';
        document.getElementById('tipo-prioridade').value = '1';
        document.getElementById('tipo-cor').value = '#007bff';
        document.getElementById('tipo-status').value = 'ativo';
        
        this.showNotification('✅ Tipo de atendimento adicionado com sucesso!', 'success');
    }
    
    addProfissional() {
        const nome = document.getElementById('profissional-nome').value;
        const especialidade = document.getElementById('profissional-especialidade').value;
        const crm = document.getElementById('profissional-crm').value;
        const consultorio = parseInt(document.getElementById('profissional-consultorio').value);
        const status = document.getElementById('profissional-status').value;
        
        if (!nome || !especialidade || !crm) {
            this.showNotification('⚠️ Preencha todos os campos obrigatórios', 'warning');
            return;
        }
        
        // Verificar se já existe
        if (this.data.profissionais.find(p => p.crm === crm)) {
            this.showNotification('⚠️ Já existe um profissional com este CRM', 'warning');
            return;
        }
        
        const novoProfissional = {
            id: Date.now(),
            nome,
            especialidade,
            crm,
            consultorio: consultorio || null,
            status,
            criado: new Date()
        };
        
        this.data.profissionais.push(novoProfissional);
        this.saveSharedData();
        this.renderProfissionaisList();
        
        // Limpar formulário
        document.getElementById('profissional-nome').value = '';
        document.getElementById('profissional-especialidade').value = '';
        document.getElementById('profissional-crm').value = '';
        document.getElementById('profissional-consultorio').value = '';
        document.getElementById('profissional-status').value = 'ativo';
        
        this.showNotification('✅ Profissional adicionado com sucesso!', 'success');
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
    
    // Função de diagnóstico para debug
    diagnostic() {
        console.log('🔧 DIAGNÓSTICO DO SISTEMA:');
        console.log('DOM carregado:', document.readyState);
        console.log('Dados carregados:', this.data);
        
        // Verificar elementos críticos
        const elementos = [
            'add-guiche',
            'add-consultorio', 
            'add-tipo',
            'add-profissional',
            'call-next',
            'generate-password',
            'clear-queue',
            'clear-waiting-queue',
            'clear-call-history',
            'reset-counters'
        ];
        
        elementos.forEach(id => {
            const el = document.getElementById(id);
            console.log(`Elemento ${id}:`, el ? '✅ Encontrado' : '❌ Não encontrado');
            if (el) {
                console.log(`  - Event listeners:`, el.onclick ? 'Inline' : 'Sem inline');
            }
        });
        
        // Verificar tabs
        const tabs = document.querySelectorAll('.tab-button');
        console.log(`Tabs encontradas: ${tabs.length}`);
        tabs.forEach((tab, index) => {
            console.log(`  Tab ${index}:`, tab.textContent.trim(), tab.onclick ? 'Com evento' : 'Sem evento');
        });
        
        // Verificar botões de ação
        const buttons = document.querySelectorAll('button');
        console.log(`Total de botões encontrados: ${buttons.length}`);
        
        return {
            dom: document.readyState,
            data: this.data,
            elementos,
            tabs: tabs.length,
            buttons: buttons.length
        };
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
    
    // Executar diagnóstico após inicialização
    setTimeout(() => {
        if (controlManager.diagnostic) {
            controlManager.diagnostic();
        }
    }, 1000);
    
    console.log('⚙️ Painel de Controle inicializado!');
    console.log('📺 Para visualizar o painel, abra a Tela de Exibição');
    console.log('🔧 Para debug manual, use: controlManager.diagnostic()');
});
