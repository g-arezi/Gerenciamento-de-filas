<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Instruções para GitHub Copilot

Este é um projeto de Sistema de Gerenciamento de Filas para Atendimento Médico desenvolvido em HTML, CSS e JavaScript puro.

## Contexto do Projeto
- **Tipo**: Aplicação web para gerenciamento de filas médicas
- **Tecnologias**: HTML5, CSS3, JavaScript ES6+
- **Estilo**: Interface moderna com glassmorphism e design responsivo
- **Público-alvo**: Hospitais, clínicas e centros médicos

## Padrões de Código
- Use JavaScript moderno (ES6+) com classes e métodos
- Mantenha o código bem comentado em português
- Use nomes de variáveis e funções descritivos em português
- Implemente responsividade mobile-first
- Use animações CSS suaves para melhor UX

## Estrutura de Arquivos
- `index.html`: Estrutura principal da aplicação
- `styles.css`: Todos os estilos CSS organizados por seções
- `script.js`: Lógica principal do sistema em JavaScript
- `assets/`: Recursos como imagens e ícones
- `README.md`: Documentação completa do projeto

## Funcionalidades Principais
1. **Painel de Exibição**: Mostra senha atual, guichê, paciente e consultório
2. **Sistema de Filas**: Gerencia diferentes tipos de senhas (AP, CM, EX, RE)
3. **Painel Administrativo**: Interface para operadores chamarem senhas
4. **Tempo Real**: Atualização automática de horário e fila
5. **Responsividade**: Adaptação para desktop, tablet e mobile

## Diretrizes de Design
- Use cores consistentes com o tema médico/hospitalar
- Mantenha alta legibilidade com contraste adequado
- Implemente feedback visual para ações do usuário
- Use ícones e elementos visuais intuitivos
- Mantenha a interface limpa e profissional

## Boas Práticas
- Valide entradas do usuário
- Trate erros de forma elegante
- Use localStorage para persistência quando necessário
- Otimize performance para dispositivos móveis
- Mantenha acessibilidade (WCAG) em mente

## Convenções de Nomenclatura
- Classes CSS: kebab-case (ex: `admin-panel`, `call-item`)
- IDs HTML: kebab-case (ex: `current-password`, `admin-toggle-btn`)
- Variáveis JS: camelCase (ex: `currentPassword`, `queueManager`)
- Funções JS: camelCase descritivo (ex: `updateDisplay()`, `generatePassword()`)

## Comentários
- Adicione comentários explicativos para lógica complexa
- Use JSDoc para documentar funções principais
- Comente seções CSS por funcionalidade
- Explique algoritmos de priorização de filas
