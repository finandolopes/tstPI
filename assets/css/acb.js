function toggleMenu() {
    const menu = document.getElementById('accessibilityMenu');
    menu.classList.toggle('hidden');
}

function toggleHighContrast() {
    document.body.classList.toggle('high-contrast');
    Swal.fire('Alto Contraste', 'Modo de alto contraste ativado/desativado.', 'info');
    toggleMenu();
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    Swal.fire('Modo Escuro', 'Modo escuro ativado/desativado.', 'info');
    toggleMenu();
}

function increaseFont() {
    document.body.style.fontSize = 'larger';    
    toggleMenu();
}

function decreaseFont() {
    document.body.style.fontSize = 'smaller';    
    toggleMenu();
}

function resetSettings() {
    document.body.classList.remove('high-contrast', 'dark-mode');
    document.body.style.fontSize = '';
    Swal.fire('Resetar', 'Configurações de acessibilidade resetadas.', 'info');
    toggleMenu();
}

function toggleEpilepsyMode() {
    // Implementar funcionalidade de modo epilepsia
    Swal.fire('Epilepsia', 'Modo epilepsia ativado/desativado.', 'info');
    toggleMenu();
}

function toggleADHDMode() {
    // Implementar funcionalidade de modo TDAH
    Swal.fire('TDAH', 'Modo TDAH ativado/desativado.', 'info');
    toggleMenu();
}

function toggleDyslexiaMode() {
    // Implementar funcionalidade de modo dislexia
    Swal.fire('Dislexia', 'Modo dislexia ativado/desativado.', 'info');
    toggleMenu();
}

function toggleBlindMode() {
    // Implementar funcionalidade de modo cego
    Swal.fire('Modo Cego', 'Modo cego ativado/desativado.', 'info');
    toggleMenu();
}

function toggleReadingMode() {
    // Implementar funcionalidade de modo leitura
    Swal.fire('Modo Leitura', 'Modo leitura ativado/desativado.', 'info');
    toggleMenu();
}

function toggleMarker() {
    // Implementar funcionalidade de marcador
    Swal.fire('Marcador', 'Marcador ativado/desativado.', 'info');
    toggleMenu();
}

function toggleReadingRuler() {
    // Implementar funcionalidade de régua de leitura
    Swal.fire('Régua de Leitura', 'Régua de leitura ativada/desativada.', 'info');
    toggleMenu();
}

function toggleNegativeContrast() {
    // Implementar funcionalidade de contraste negativo
    Swal.fire('Contraste Negativo', 'Contraste negativo ativado/desativado.', 'info');
    toggleMenu();
}

function toggleColorBlindMode() {
    // Implementar funcionalidade de daltonismo
    Swal.fire('Daltonismo', 'Modo daltonismo ativado/desativado.', 'info');
    toggleMenu();
}

function toggleTextToSpeech() {
    // Implementar funcionalidade de leitura de textos
    Swal.fire('Leitura de Textos', 'Leitura de textos ativada/desativada.', 'info');
    toggleMenu();
}

function toggleLowVisionMode() {
    // Implementar funcionalidade de baixa visão
    Swal.fire('Baixa Visão', 'Modo baixa visão ativado/desativado.', 'info');
    toggleMenu();
}

function showHelp() {
    Swal.fire({
        title: 'Ajuda',
        html: `
            <p><strong>Alto Contraste (Alt+1):</strong> Ativa/desativa o modo de alto contraste.</p>
            <p><strong>Modo Escuro (Alt+2):</strong> Ativa/desativa o modo escuro.</p>
            <p><strong>Aumentar Fonte (Alt+3):</strong> Aumenta o tamanho da fonte.</p>
            <p><strong>Diminuir Fonte (Alt+4):</strong> Diminui o tamanho da fonte.</p>
            <p><strong>Resetar (Alt+5):</strong> Reseta todas as configurações de acessibilidade.</p>
            <p><strong>Epilepsia (Alt+6):</strong> Ativa/desativa o modo epilepsia.</p>
            <p><strong>TDAH (Alt+7):</strong> Ativa/desativa o modo TDAH.</p>
            <p><strong>Dislexia (Alt+8):</strong> Ativa/desativa o modo dislexia.</p>
            <p><strong>Modo Cego (Alt+9):</strong> Ativa/desativa o modo cego.</p>
            <p><strong>Modo Leitura (Alt+0):</strong> Ativa/desativa o modo leitura.</p>
            <p><strong>Marcador (Alt+Q):</strong> Ativa/desativa o marcador.</p>
            <p><strong>Régua de Leitura (Alt+W):</strong> Ativa/desativa a régua de leitura.</p>
            <p><strong>Contraste Negativo (Alt+E):</strong> Ativa/desativa o contraste negativo.</p>
            <p><strong>Daltonismo (Alt+R):</strong> Ativa/desativa o modo daltonismo.</p>
            <p><strong>Leitura de Textos (Alt+T):</strong> Ativa/desativa a leitura de textos.</p>
            <p><strong>Baixa Visão (Alt+Y):</strong> Ativa/desativa o modo baixa visão.</p>
        `,
        icon: 'info'
    });
}

document.addEventListener('keydown', function(event) {
    if (event.altKey) {
        switch (event.key) {
            case '1':
                toggleHighContrast();
                break;
            case '2':
                toggleDarkMode();
                break;
            case '3':
                increaseFont();
                break;
            case '4':
                decreaseFont();
                break;
            case '5':
                resetSettings();
                break;
            case '6':
                toggleEpilepsyMode();
                break;
            case '7':
                toggleADHDMode();
                break;
            case '8':
                toggleDyslexiaMode();
                break;
            case '9':
                toggleBlindMode();
                break;
            case '0':
                toggleReadingMode();
                break;
            case 'q':
                toggleMarker();
                break;
            case 'w':
                toggleReadingRuler();
                break;
            case 'e':
                toggleNegativeContrast();
                break;
            case 'r':
                toggleColorBlindMode();
                break;
            case 't':
                toggleTextToSpeech();
                break;
            case 'y':
                toggleLowVisionMode();
                break;
            case 'h':
                showHelp();
                break;
        }
    }
});

