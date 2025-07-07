# Sistema de Gerenciamento de Filas - Atendimento Médico

Um sistema moderno e intuitivo para gerenciamento de filas de atendimento médico, com **duas telas separadas**: uma para exibição pública e outra para controle administrativo.

## 🏥 Estrutura do Sistema

### 📺 Tela de Exibição (`display.html`)
Interface pública para salas de espera e recepções:
- **Senha Atual**: Exibe a senha sendo chamada no momento
- **Guichê**: Mostra o número do guichê de atendimento
- **Últimas Chamadas**: Lista das chamadas recentes com informações do paciente e consultório
- **Paciente Atual**: Nome do paciente sendo atendido
- **Consultório**: Informações do médico e consultório
- **Atualização Automática**: Sincronização em tempo real com o painel de controle

### ⚙️ Painel de Controle (`control.html`)
Interface administrativa para operadores:
- **Status Atual**: Visão geral do atendimento em andamento
- **Chamar Próxima Senha**: Sistema para chamar a próxima senha da fila
- **Gerar Nova Senha**: Criação de senhas para diferentes tipos de atendimento
- **Fila de Espera**: Visualização e gerenciamento da fila de pacientes
- **Estatísticas**: Métricas do dia (total atendido, fila atual, etc.)

## 🚀 Como Usar

### Instalação
1. Clone ou baixe os arquivos do projeto
2. Abra o arquivo `index.html` em um navegador para escolher a tela desejada
3. Ou acesse diretamente:
   - `display.html` para a tela de exibição
   - `control.html` para o painel de controle

### Configuração Recomendada
1. **Tela de Exibição**: 
   - Abra em uma TV ou monitor na sala de espera
   - Configure em tela cheia (F11)
   - Mantenha sempre aberta para pacientes visualizarem

2. **Painel de Controle**:
   - Abra no computador da recepção/operador
   - Use para gerenciar senhas e chamadas
   - Pode ser usado simultaneamente por múltiplos operadores

### Operação

#### Gerar Nova Senha:
1. No painel de controle, selecione o tipo de atendimento
2. Digite o nome do paciente
3. Clique em "Gerar Nova Senha"
4. A senha aparecerá automaticamente na fila

#### Chamar Próxima Senha:
1. Selecione o consultório e guichê
2. Clique em "Chamar Próxima Senha"
3. A informação será atualizada automaticamente na tela de exibição
4. Senhas prioritárias (AP) têm prioridade automática

## 📋 Estrutura do Projeto

```
Gerenciamento de filas/
├── index.html              # Página de seleção de tela
├── display.html             # Tela de exibição pública
├── control.html             # Painel de controle administrativo
├── display-styles.css       # Estilos da tela de exibição
├── control-styles.css       # Estilos do painel de controle  
├── display-script.js        # Lógica da tela de exibição
├── control-script.js        # Lógica do painel de controle
├── styles.css               # Estilos originais (legado)
├── script.js                # Script original (legado)
├── assets/                  # Recursos (imagens, ícones)
└── README.md                # Documentação
```

## 🔄 Sincronização Entre Telas

O sistema utiliza **localStorage** do navegador para sincronizar os dados entre as duas telas:
- Dados são salvos automaticamente a cada ação
- Tela de exibição verifica atualizações a cada 2 segundos
- Funciona mesmo com as telas em computadores diferentes (mesmo domínio)
- Não requer servidor ou banco de dados

## 🎨 Características do Design

### Tela de Exibição:
- **Foco na Legibilidade**: Fontes grandes e contraste alto
- **Informações Centralizadas**: Layout otimizado para visualização à distância
- **Atualização Visual**: Animações suaves para chamar atenção
- **Responsividade**: Adapta-se a diferentes tamanhos de tela

### Painel de Controle:
- **Interface Administrativa**: Design focado em eficiência
- **Formulários Intuitivos**: Campos organizados e validação em tempo real
- **Feedback Visual**: Notificações para cada ação realizada
- **Estatísticas em Tempo Real**: Visão geral do fluxo de atendimento

## 🔧 Tipos de Senha Disponíveis

- **AP**: Atendimento Prioritário (idosos, gestantes, deficientes)
- **CM**: Consulta Médica (consultas gerais)
- **EX**: Exames (procedimentos diagnósticos)
- **RE**: Retorno (pacientes em acompanhamento)

## 📱 Compatibilidade

### Navegadores Suportados:
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### Dispositivos:
- **Desktop**: Experiência completa
- **Tablet**: Interface adaptada
- **Smartphone**: Layout responsivo
- **Smart TV**: Ideal para tela de exibição

## 🔊 Recursos Futuros

- [ ] Sistema de som automático para chamadas
- [ ] API para integração com sistemas hospitalares
- [ ] Relatórios detalhados de atendimento
- [ ] Sistema de autenticação para operadores
- [ ] Configurações personalizáveis por unidade
- [ ] Integração com impressoras de senha
- [ ] Modo noturno/alto contraste
- [ ] Suporte a múltiplos idiomas

## 💻 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica moderna
- **CSS3**: Estilos avançados com glassmorphism
- **JavaScript ES6+**: Programação orientada a objetos
- **LocalStorage API**: Sincronização entre telas
- **Responsive Design**: Layout adaptável

## ⚙️ Personalização

### Adicionar Consultórios:
Edite o objeto `offices` em `control-script.js`:
```javascript
offices: {
    '1': 'Dr. João Silva',
    '2': 'Dra. Maria Santos',
    // Adicione mais consultórios aqui
}
```

### Modificar Tipos de Senha:
Edite o objeto `passwordCounters` em `control-script.js`:
```javascript
passwordCounters: {
    AP: 64,  // Atendimento Prioritário
    CM: 159, // Consulta Médica
    // Adicione novos tipos aqui
}
```

### Personalizar Cores:
Modifique as variáveis CSS nos arquivos de estilo para adequar às cores da instituição.

## 🤝 Contribuição

Para contribuir com o projeto:
1. Faça um fork do repositório
2. Crie uma branch para sua feature
3. Teste em diferentes navegadores e dispositivos
4. Envie um pull request com descrição detalhada

## 📞 Suporte

Para dúvidas, sugestões ou relatos de problemas, entre em contato através dos canais de suporte do projeto.

---

**Desenvolvido com ❤️ para modernizar e otimizar o atendimento médico**
