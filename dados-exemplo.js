// Script de demonstração para carregar dados de exemplo
// Execute este script no console do navegador (F12) para carregar dados de teste

function carregarDadosDeExemplo() {
    const dadosExemplo = {
        currentPassword: 'AP 03',
        currentGuiche: '1',
        currentPatient: 'MARIA SILVA SANTOS',
        currentOffice: '1 - Dr. João Mendes',
        passwordCounters: {
            AP: 3,
            CM: 15,
            EX: 8,
            RE: 5,
            UR: 2
        },
        queue: [
            { password: 'AP 04', name: 'JOSÉ CARLOS OLIVEIRA', type: 'AP', time: new Date(), status: 'waiting' },
            { password: 'CM 16', name: 'ANA PAULA COSTA', type: 'CM', time: new Date(), status: 'waiting' },
            { password: 'EX 09', name: 'PEDRO HENRIQUE SILVA', type: 'EX', time: new Date(), status: 'waiting' },
            { password: 'CM 17', name: 'LÚCIA FERNANDES', type: 'CM', time: new Date(), status: 'waiting' },
            { password: 'RE 06', name: 'CARLOS AUGUSTO LIMA', type: 'RE', time: new Date(), status: 'waiting' }
        ],
        recentCalls: [
            { name: 'MARIA S.', code: 'CONS. 1 - DR. JOÃO MENDES', time: '14:35' },
            { name: 'ANTONIO L.', code: 'CONS. 2 - DRA. FERNANDA SILVA', time: '14:33' },
            { name: 'CLARA M.', code: 'CONS. 3 - DR. ROBERTO SANTOS', time: '14:31' },
            { name: 'PAULO R.', code: 'CONS. 1 - DR. JOÃO MENDES', time: '14:28' }
        ],
        nextCalls: [
            { code: 'AP 03', guiche: 'GUICHÊ 1', time: '14:35' },
            { code: 'CM 15', guiche: 'GUICHÊ 2', time: '14:33' },
            { code: 'EX 08', guiche: 'GUICHÊ 1', time: '14:31' },
            { code: 'AP 02', guiche: 'GUICHÊ 3', time: '14:28' }
        ],
        stats: {
            totalAttended: 156,
            waiting: 5,
            priority: 8,
            averageTime: '12m'
        },
        guiches: [
            { id: 1, numero: 1, descricao: 'Atendimento Geral', status: 'ativo' },
            { id: 2, numero: 2, descricao: 'Atendimento Prioritário', status: 'ativo' },
            { id: 3, numero: 3, descricao: 'Exames e Procedimentos', status: 'ativo' },
            { id: 4, numero: 4, descricao: 'Retornos', status: 'ativo' },
            { id: 5, numero: 5, descricao: 'Emergência', status: 'manutencao' }
        ],
        consultorios: [
            { id: 1, numero: 1, especialidade: 'Clínica Geral', andar: '1º Andar - Ala A', status: 'ativo' },
            { id: 2, numero: 2, especialidade: 'Cardiologia', andar: '1º Andar - Ala B', status: 'ativo' },
            { id: 3, numero: 3, especialidade: 'Neurologia', andar: '2º Andar - Ala A', status: 'ativo' },
            { id: 4, numero: 4, especialidade: 'Pediatria', andar: '2º Andar - Ala B', status: 'ativo' },
            { id: 5, numero: 5, especialidade: 'Ginecologia', andar: '3º Andar - Ala A', status: 'ativo' },
            { id: 6, numero: 6, especialidade: 'Dermatologia', andar: '3º Andar - Ala B', status: 'ativo' },
            { id: 7, numero: 7, especialidade: 'Ortopedia', andar: '1º Andar - Ala C', status: 'inativo' }
        ],
        tiposAtendimento: [
            { id: 1, sigla: 'AP', nome: 'Atendimento Prioritário', cor: '#FF5722', prioridade: 1, status: 'ativo' },
            { id: 2, sigla: 'UR', nome: 'Urgência', cor: '#F44336', prioridade: 2, status: 'ativo' },
            { id: 3, sigla: 'EX', nome: 'Exames', cor: '#4CAF50', prioridade: 3, status: 'ativo' },
            { id: 4, sigla: 'RE', nome: 'Retorno', cor: '#9C27B0', prioridade: 4, status: 'ativo' },
            { id: 5, sigla: 'CM', nome: 'Consulta Médica', cor: '#2196F3', prioridade: 5, status: 'ativo' },
            { id: 6, sigla: 'AG', nome: 'Agendamento', cor: '#FF9800', prioridade: 6, status: 'inativo' }
        ],
        profissionais: [
            { id: 1, nome: 'Dr. João Mendes Silva', especialidade: 'Clínica Geral', crm: 'CRM 12345-SP', consultorio: 1, status: 'ativo' },
            { id: 2, nome: 'Dra. Fernanda Silva Santos', especialidade: 'Cardiologia', crm: 'CRM 23456-SP', consultorio: 2, status: 'ativo' },
            { id: 3, nome: 'Dr. Roberto Santos Lima', especialidade: 'Neurologia', crm: 'CRM 34567-SP', consultorio: 3, status: 'ativo' },
            { id: 4, nome: 'Dra. Ana Carolina Pereira', especialidade: 'Pediatria', crm: 'CRM 45678-SP', consultorio: 4, status: 'ativo' },
            { id: 5, nome: 'Dra. Patrícia Oliveira Costa', especialidade: 'Ginecologia', crm: 'CRM 56789-SP', consultorio: 5, status: 'ativo' },
            { id: 6, nome: 'Dr. Marcos Antônio Ferreira', especialidade: 'Dermatologia', crm: 'CRM 67890-SP', consultorio: 6, status: 'ativo' },
            { id: 7, nome: 'Dr. Gabriel Rodrigues', especialidade: 'Ortopedia', crm: 'CRM 78901-SP', consultorio: 7, status: 'ferias' },
            { id: 8, nome: 'Dra. Juliana Martins', especialidade: 'Psicologia', crm: 'CRP 12345-SP', consultorio: null, status: 'ativo' }
        ],
        lastUpdate: new Date().getTime()
    };
    
    localStorage.setItem('queueSystemData', JSON.stringify(dadosExemplo));
    
    console.log('✅ Dados de exemplo carregados com sucesso!');
    console.log('📊 Resumo dos dados:');
    console.log(`- ${dadosExemplo.guiches.length} guichês cadastrados`);
    console.log(`- ${dadosExemplo.consultorios.length} consultórios cadastrados`);
    console.log(`- ${dadosExemplo.tiposAtendimento.length} tipos de atendimento`);
    console.log(`- ${dadosExemplo.profissionais.length} profissionais cadastrados`);
    console.log(`- ${dadosExemplo.queue.length} pacientes na fila`);
    console.log('');
    console.log('🔄 Recarregue a página para ver os dados aplicados.');
    
    return dadosExemplo;
}

// Para carregar os dados, execute no console: carregarDadosDeExemplo()
console.log('📋 Script de demonstração carregado!');
console.log('💡 Para carregar dados de exemplo, execute: carregarDadosDeExemplo()');
