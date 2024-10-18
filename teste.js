document.addEventListener('DOMContentLoaded', function () {
    const state = {
        fontSize: 100,
        letterSpacing: 0,
        lineSpacing: 1.5,
        isDarkModeActive: false,
        isHighContrastActive: false,
        isGrayScaleActive: false,
        isNegativeContrastActive: false,
        isReadingRulerActive: false,
        isReadingMaskActive: false,
        isMagnifying: false,
        textReaderSpeed: 'normal', // 'normal', 'fast', 'slow'
        saturationLevel: 1,
        epilepsyMode: false,
        tdaMode: false,
        dyslexiaMode: false,
        daltonismMode: 0, // 0: None, 1: Protanopia, 2: Deuteranopia, 3: Tritanopia
        isMotorSkillsModeActive: false,
        isTextReaderActive: false,
        textReaderTimeout: null, // Para o timeout de leitura
    };

    // Função para abrir/fechar o menu de acessibilidade
    function toggleMenu() {
        const menu = document.getElementById('accessibilityMenu');
        if (menu.classList.contains('hidden')) {
            menu.classList.remove('hidden');
            menu.style.transform = 'translateX(0)';  // Mostra o menu
        } else {
            menu.classList.add('hidden');
            menu.style.transform = 'translateX(100%)';  // Esconde o menu
        }
    }

    // Efeitos visuais ao ativar/desativar funções
    function updateButtonState(buttonId, isActive) {
        const button = document.getElementById(buttonId);
        if (isActive) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    }

    // Carregar configurações salvas
    function loadSettings() {
        const savedState = JSON.parse(localStorage.getItem('accessibilityState'));
        if (savedState) Object.assign(state, savedState);
        applySettings();
    }

    function saveSettings() {
        localStorage.setItem('accessibilityState', JSON.stringify(state));
    }

    function applySettings() {
        adjustFontSize(state.fontSize);
        adjustLetterSpacing(state.letterSpacing);
        adjustLineHeight(state.lineSpacing);
        document.body.style.filter = `saturate(${state.saturationLevel})`;
        if (state.isDarkModeActive) toggleDarkMode(true);
        if (state.isHighContrastActive) toggleHighContrast(true);
        if (state.isGrayScaleActive) toggleGrayScale(true);
        if (state.isNegativeContrastActive) toggleNegativeContrast(true);
        if (state.isReadingRulerActive) toggleReadingRuler(true);
        if (state.isReadingMaskActive) toggleReadingMask(true);
        if (state.isMagnifying) toggleMagnifier(true);
        if (state.isTextReaderActive) toggleTextReader(true);
    }

    // Criação do botão de acessibilidade
    function createAccessibilityButton() {
        const button = document.createElement('button');
        button.innerHTML = '<i class="fas fa-universal-access fa-lg"></i>';
        button.className = 'btn btn-primary accessibility-toggle';
        button.setAttribute('aria-label', 'Abrir Menu de Acessibilidade');
        button.title = 'Abrir Menu de Acessibilidade';
        document.body.appendChild(button);
        button.onclick = toggleMenu;

        // Estilo do botão para visibilidade e fácil toque
        button.style.position = 'fixed';
        button.style.top = '50%';
        button.style.right = '10px';
        button.style.transform = 'translateY(-50%)';
        button.style.zIndex = '10000';
        button.style.borderRadius = '50%';
        button.style.width = '50px';
        button.style.height = '50px';
        button.style.display = 'flex';
        button.style.justifyContent = 'center';
        button.style.alignItems = 'center';
        button.style.backgroundColor = '#007bff'; // Cor de fundo
        button.style.color = 'white'; // Cor do ícone
        button.style.border = 'none'; // Remover borda
    }

    // Criação do menu de acessibilidade
    function createAccessibilityMenu() {
        const menu = document.createElement('div');
        menu.id = 'accessibilityMenu';
        menu.className = 'accessibility-menu hidden'; // Definir inicialmente como oculto
        menu.style.transform = 'translateX(100%)';  // Menu começa fora da tela

        menu.innerHTML = `
            <div class="container-fluid h-100">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h3 class="text-primary">Acessibilidade</h3>
                    <button class="btn btn-outline-secondary" onclick="showHelp()">
                        <i class="fas fa-question-circle"></i>
                    </button>
                </div>

                <div class="row">
                    <!-- Ajustes de Fonte -->
                    <div class="col-12">
                        <div class="card mb-3">
                            <div class="card-body text-center">
                                <h5 class="card-title">Ajustes de Fonte</h5>
                                <label for="fontSize">Tamanho da Fonte:</label>
                                <input type="range" id="fontSize" min="-10" max="50" value="0" onchange="adjustFontSize(this.value)" />
                                <span id="fontSizeLabel">Fonte: 100%</span>

                                <label for="letterSpacing">Espaçamento entre Letras:</label>
                                <input type="range" id="letterSpacing" min="0" max="20" value="0" onchange="adjustLetterSpacing(this.value)" />
                                <span id="letterSpacingLabel">Espaçamento: 0%</span>

                                <label for="lineHeight">Altura da Linha:</label>
                                <input type="range" id="lineHeight" min="1" max="2" step="0.1" value="1.5" onchange="adjustLineHeight(this.value)" />
                                <span id="lineHeightLabel">Altura: 1.5</span>
                            </div>
                        </div>
                    </div>

                    <!-- Modos Visuais -->
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body text-center">
                                <h5 class="card-title">Contrastes e Modos</h5>
                                <div class="d-flex justify-content-around mb-3">
                                    <div class="text-center" onclick="toggleDarkMode()">
                                        <i id="darkModeIcon" class="fas fa-moon fa-lg text-primary"></i>
                                        <p>Modo Escuro</p>
                                    </div>
                                    <div class="text-center" onclick="toggleHighContrast()">
                                        <i id="highContrastIcon" class="fas fa-adjust fa-lg text-warning"></i>
                                        <p>Alto Contraste</p>
                                    </div>
                                    <div class="text-center" onclick="toggleGrayScale()">
                                        <i id="grayScaleIcon" class="fas fa-palette fa-lg text-muted"></i>
                                        <p>Tons de Cinza</p>
                                    </div>
                                    <div class="text-center" onclick="toggleNegativeContrast()">
                                        <i id="negativeContrastIcon" class="fas fa-exclamation-triangle fa-lg text-danger"></i>
                                        <p>Contraste Negativo</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Ferramentas de Leitura -->
                    <div class="col-12">
                        <div class="card mb-3">
                            <div class="card-body text-center">
                                <h5 class="card-title">Ferramentas de Leitura</h5>
                                <div class="d-flex justify-content-between">
                                    <div class="text-center" onclick="toggleReadingRuler()">
                                        <i id="readingRulerIcon" class="fas fa-grip-lines fa-lg text-info"></i>
                                        <p>Régua</p>
                                    </div>
                                    <div class="text-center" onclick="toggleReadingMask()">
                                        <i id="readingMaskIcon" class="fas fa-mask fa-lg text-info"></i>
                                        <p>Máscara</p>
                                    </div>
                                    <div class="text-center" onclick="toggleMagnifier()">
                                        <i id="Magnifier" class="fas fa-search-plus fa-lg text-info"></i>
                                        <p>Lupa</p>
                                    </div>
                                </div>
                                <div class="text-center mt-2">
                                    <i id="textReaderIcon" class="fas fa-volume-up fa-lg" onclick="toggleTextReader()"></i>
                                    <p>Leitura de Texto (${state.textReaderSpeed.charAt(0).toUpperCase() + state.textReaderSpeed.slice(1)})</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Saturação -->
                    <div class="col-12">
                        <div class="card mb-3">
                            <div class="card-body text-center">
                                <h5 class="card-title">Saturação</h5>
                                <button class="btn btn-outline-info w-100" onclick="toggleSaturation()">Ajustar Saturação</button>
                            </div>
                        </div>
                    </div>

                    <!-- Modos Especiais -->
                    <div class="col-12">
                        <button class="btn btn-outline-warning w-100 mb-1 btn-sm" onclick="toggleDyslexiaMode()">Dislexia</button>
                        <button class="btn btn-outline-success w-100 mb-1 btn-sm" onclick="toggleTDAMode()">TDAH</button>
                        <button class="btn btn-outline-danger w-100 mb-1 btn-sm" onclick="toggleEpilepsyMode()">Epilepsia</button>
                    </div>

                    <!-- Habilidades Motoras -->
                    <div class="col-12">
                        <button class="btn btn-outline-primary w-100 mb-1 btn-sm" onclick="toggleMotorSkillsMode()">Habilidades Motoras</button>
                        <button class="btn btn-outline-secondary w-100 mb-1 btn-sm" onclick="toggleDaltonismMode()">Daltonismo</button>
                    </div>

                    <!-- Resetar Configurações -->
                    <div class="col-12">
                        <button class="btn btn-danger w-100 mt-3" onclick="resetSettings()">Resetar</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(menu);
    }

    // Função para ajustar tamanho da fonte
    window.adjustFontSize = function(value) {
        state.fontSize = value;
        document.body.style.fontSize = `${state.fontSize}%`;
        document.getElementById('fontSizeLabel').innerText = `Fonte: ${state.fontSize}%`;
        saveSettings();
    };

    // Função para ajustar o espaçamento entre letras
    window.adjustLetterSpacing = function(value) {
        state.letterSpacing = value;
        document.body.style.letterSpacing = `${state.letterSpacing}px`;
        document.getElementById('letterSpacingLabel').innerText = `Espaçamento: ${state.letterSpacing}px`;
        saveSettings();
    };

    // Função para ajustar a altura da linha
    window.adjustLineHeight = function(value) {
        state.lineSpacing = value;
        document.body.style.lineHeight = `${value}`;
        document.getElementById('lineHeightLabel').innerText = `Altura: ${value}`;
        saveSettings();
    };

    // Funções para modos visuais
    window.toggleDarkMode = function() {
        state.isDarkModeActive = !state.isDarkModeActive;
        document.body.classList.toggle('dark-mode', state.isDarkModeActive);
        updateButtonState('darkModeIcon', state.isDarkModeActive);
        saveSettings();
    };

    window.toggleHighContrast = function() {
        state.isHighContrastActive = !state.isHighContrastActive;
        document.body.classList.toggle('high-contrast', state.isHighContrastActive);
        updateButtonState('highContrastIcon', state.isHighContrastActive);
        saveSettings();
    };

    window.toggleGrayScale = function() {
        state.isGrayScaleActive = !state.isGrayScaleActive;
        document.body.classList.toggle('grayscale', state.isGrayScaleActive);
        updateButtonState('grayScaleIcon', state.isGrayScaleActive);
        saveSettings();
    };

    window.toggleNegativeContrast = function() {
        state.isNegativeContrastActive = !state.isNegativeContrastActive;
        document.body.classList.toggle('negative-contrast', state.isNegativeContrastActive);
        updateButtonState('negativeContrastIcon', state.isNegativeContrastActive);
        saveSettings();
    };

    // Ferramentas de leitura
    window.toggleReadingRuler = function() {
        state.isReadingRulerActive = !state.isReadingRulerActive;
        const ruler = document.getElementById('readingRuler');
        if (state.isReadingRulerActive) {
            const rulerDiv = document.createElement('div');
            rulerDiv.id = 'readingRuler';
            rulerDiv.style.position = 'fixed';
            rulerDiv.style.width = '100%';
            rulerDiv.style.height = '5px';
            rulerDiv.style.backgroundColor = 'rgba(255, 255, 0, 0.8)';
            rulerDiv.style.top = '50%';
            rulerDiv.style.zIndex = '1000';
            document.body.appendChild(rulerDiv);
            document.addEventListener('mousemove', moveRuler);
        } else {
            if (ruler) ruler.remove();
            document.removeEventListener('mousemove', moveRuler);
        }
    };

    function moveRuler(event) {
        const ruler = document.getElementById('readingRuler');
        if (ruler) {
            ruler.style.top = `${event.pageY - 2.5}px`;
        }
    }

    // Máscara de leitura
    window.toggleReadingMask = function() {
        state.isReadingMaskActive = !state.isReadingMaskActive;
        const mask = document.getElementById('readingMask');
        if (state.isReadingMaskActive) {
            const maskDiv = document.createElement('div');
            maskDiv.id = 'readingMask';
            maskDiv.style.position = 'fixed';
            maskDiv.style.top = '0';
            maskDiv.style.left = '0';
            maskDiv.style.width = '100%';
            maskDiv.style.height = '100%';
            maskDiv.style.pointerEvents = 'none';
            maskDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            maskDiv.style.zIndex = '1000';

            const hole = document.createElement('div');
            hole.id = 'readingHole';
            hole.style.position = 'absolute';
            hole.style.width = '100%';
            hole.style.height = '50px';
            hole.style.backgroundColor = 'transparent';
            hole.style.pointerEvents = 'none';
            maskDiv.appendChild(hole);

            document.body.appendChild(maskDiv);
            document.addEventListener('mousemove', moveMask);
        } else {
            if (mask) mask.remove();
            document.removeEventListener('mousemove', moveMask);
        }
    };

    function moveMask(event) {
        const hole = document.getElementById('readingHole');
        if (hole) {
            hole.style.top = `${event.pageY - 25}px`;
        }
    }

    // Lupa
    window.toggleMagnifier = function() {
        state.isMagnifying = !state.isMagnifying;
        if (state.isMagnifying) {
            document.body.style.cursor = 'zoom-in';
            document.addEventListener('mousedown', startMagnifying);
        } else {
            document.body.style.cursor = 'default';
            document.removeEventListener('mousedown', startMagnifying);
        }
    };

    function startMagnifying(event) {
        const zoomedElement = document.elementFromPoint(event.clientX, event.clientY);
        if (zoomedElement) {
            zoomedElement.style.transform = 'scale(1.5)';
            zoomedElement.style.transition = 'transform 0.2s ease';
        }
    }

    // Leitura de Texto
    window.toggleTextReader = function() {
        const icon = document.getElementById('textReaderIcon');
        if (state.textReaderSpeed === 'normal') {
            state.textReaderSpeed = 'fast';
            icon.classList.add('text-danger'); // Muda a cor do ícone para vermelho quando rápido
        } else if (state.textReaderSpeed === 'fast') {
            state.textReaderSpeed = 'slow';
            icon.classList.add('text-warning'); // Muda a cor do ícone para amarelo quando lento
            icon.classList.remove('text-danger');
        } else {
            state.textReaderSpeed = 'normal';
            icon.classList.remove('text-warning', 'text-danger'); // Remove as cores quando normal
        }
        document.querySelector(`#textReaderIcon + p`).innerText = `Leitura de Texto (${state.textReaderSpeed.charAt(0).toUpperCase() + state.textReaderSpeed.slice(1)})`;
        saveSettings();
    };

    // Função que faz a leitura do texto
    function readText(text) {
        if (text) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = state.textReaderSpeed === 'fast' ? 1.5 : state.textReaderSpeed === 'slow' ? 0.75 : 1;
            speechSynthesis.speak(utterance);
        }
    }

    // Função que ativa a leitura ao passar o mouse por mais de 3 segundos sobre um texto
    function handleTextReaderHover(event) {
        if (event.target.tagName === 'P' || event.target.tagName === 'SPAN' || event.target.tagName === 'DIV') {
            if (!state.textReaderTimeout) {
                state.textReaderTimeout = setTimeout(() => {
                    const selectedText = window.getSelection().toString();
                    const textToRead = selectedText || event.target.innerText;
                    readText(textToRead);
                }, 3000); // 3 segundos de hover
            }
        } else {
            clearTimeout(state.textReaderTimeout);
            state.textReaderTimeout = null;
        }
    }

    // Função para ativar a leitura de texto no texto selecionado ou após 3 segundos de hover
    window.toggleTextReaderAction = function() {
        state.isTextReaderActive = !state.isTextReaderActive;

        if (state.isTextReaderActive) {
            document.addEventListener('mousemove', handleTextReaderHover);
        } else {
            document.removeEventListener('mousemove', handleTextReaderHover);
            if (state.textReaderTimeout) {
                clearTimeout(state.textReaderTimeout);
            }
        }
    };

    // Função para ajustar a saturação
    window.toggleSaturation = function() {
        if (state.saturationLevel < 10) {
            state.saturationLevel += 1;
        } else {
            state.saturationLevel = 1;
        }
        document.body.style.filter = `saturate(${state.saturationLevel})`;
        saveSettings();
    };

    // Funções para modos específicos (Dislexia, TDAH, Epilepsia, Daltonismo, Habilidades Motoras)
    window.toggleDyslexiaMode = function() {
        state.dyslexiaMode = !state.dyslexiaMode;
        document.body.classList.toggle('dyslexia-mode', state.dyslexiaMode);
        saveSettings();
    };

    window.toggleTDAMode = function() {
        state.tdaMode = !state.tdaMode;
        document.body.classList.toggle('tda-mode', state.tdaMode);
        if (state.tdaMode) {
            toggleReadingRuler();
        }
        saveSettings();
    };

    window.toggleEpilepsyMode = function() {
        state.epilepsyMode = !state.epilepsyMode;
        document.body.classList.toggle('epilepsy-mode', state.epilepsyMode);
        alert('Modo Epilepsia ' + (state.epilepsyMode ? 'Ativado' : 'Desativado'));
        saveSettings();
    };

    window.toggleMotorSkillsMode = function() {
        state.isMotorSkillsModeActive = !state.isMotorSkillsModeActive;
        document.body.classList.toggle('motor-skills-mode', state.isMotorSkillsModeActive);
        saveSettings();
    };

    window.toggleDaltonismMode = function() {
        state.daltonismMode = (state.daltonismMode + 1) % 4;
        document.body.classList.remove('protanopia', 'deuteranopia', 'tritanopia');
        if (state.daltonismMode === 1) document.body.classList.add('protanopia');
        if (state.daltonismMode === 2) document.body.classList.add('deuteranopia');
        if (state.daltonismMode === 3) document.body.classList.add('tritanopia');
        saveSettings();
    };

    // Função para resetar configurações
    window.resetSettings = function() {
        state.fontSize = 100;
        state.letterSpacing = 0;
        state.lineSpacing = 1.5;
        state.isDarkModeActive = false;
        state.isHighContrastActive = false;
        state.isGrayScaleActive = false;
        state.isNegativeContrastActive = false;
        state.isReadingRulerActive = false;
        state.isReadingMaskActive = false;
        state.isMagnifying = false;
        state.saturationLevel = 1;
        state.tdaMode = false;
        state.dyslexiaMode = false;
        state.epilepsyMode = false;
        state.isMotorSkillsModeActive = false;
        state.daltonismMode = 0;
        state.isTextReaderActive = false;

        // Resetando estilos visuais aplicados ao corpo do documento
        document.body.style.fontSize = '100%';
        document.body.style.letterSpacing = '0px';
        document.body.style.lineHeight = 'normal';
        document.body.style.filter = 'none';
        document.body.classList.remove(
            'dark-mode', 
            'high-contrast', 
            'grayscale', 
            'negative-contrast', 
            'protanopia', 
            'deuteranopia', 
            'tritanopia', 
            'tda-mode', 
            'dyslexia-mode', 
            'epilepsy-mode', 
            'motor-skills-mode'
        );

        // Remover a régua de leitura se estiver ativa
        const ruler = document.getElementById('readingRuler');
        if (ruler) ruler.remove();

        // Remover a máscara de leitura se estiver ativa
        const mask = document.getElementById('readingMask');
        if (mask) mask.remove();

        // Restaurar o cursor padrão
        document.body.style.cursor = 'default';

        // Parar a leitura de texto
        speechSynthesis.cancel();

        // Salvar o estado resetado
        saveSettings();
    };

    // Exibir ajuda (integrado ao SweetAlert2)
    window.showHelp = function() {
        Swal.fire({
            title: 'Ajuda de Acessibilidade',
            html: `
                <ul style="text-align: left;">
                    <li><strong>Modo Escuro:</strong> Alterna o modo escuro.</li>
                    <li><strong>Alto Contraste:</strong> Aumenta o contraste do site.</li>
                    <li><strong>Tons de Cinza:</strong> Converte o site para tons de cinza.</li>
                    <li><strong>Contraste Negativo:</strong> Inverte as cores para contraste negativo.</li>
                    <li><strong>Régua de Leitura:</strong> Mostra uma régua que segue o cursor do mouse para ajudar na leitura.</li>
                    <li><strong>Máscara de Leitura:</strong> Adiciona uma máscara opaca com uma faixa para destacar o texto.</li>
                    <li><strong>Lupa:</strong> Amplia o conteúdo sob o cursor para melhor visualização.</li>
                    <li><strong>Leitura de Texto:</strong> Lê em voz alta o texto selecionado ou após passar o cursor sobre o texto por 3 segundos.</li>
                    <li><strong>Dislexia:</strong> Ajusta a fonte e sublinha links para melhorar a legibilidade.</li>
                    <li><strong>TDAH:</strong> Bloqueia animações e ativa a régua de leitura.</li>
                    <li><strong>Epilepsia:</strong> Desativa animações e sons para evitar gatilhos.</li>
                    <li><strong>Habilidades Motoras:</strong> Ativa a navegação por teclado com maior visibilidade.</li>
                    <li><strong>Daltonismo:</strong> Alterna entre modos de daltonismo (Protanopia, Deuteranopia, Tritanopia).</li>
                </ul>
            `,
            icon: 'info',
            confirmButtonText: 'Ok'
        });
    };

    // Criação do botão e menu de acessibilidade
    createAccessibilityButton();
    createAccessibilityMenu();

    // Carregar configurações salvas ao carregar a página
    loadSettings();

    // Estilo CSS para o menu e seus componentes
    const style = document.createElement('style');
    style.innerHTML = `
        .accessibility-menu {
            position: fixed;
            top: 10%;
            right: 0;
            width: 320px;
            background-color: #f8f9fa;
            border-radius: 15px 0 0 15px;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
            z-index: 1040;
            overflow-y: auto;
            max-height: 90vh;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        }
        .hidden {
            transform: translateX(0);
        }
        .accessibility-toggle {
            position: fixed;
            top: 50%;
            right: 0;
            z-index: 1050;
            border-radius: 50%;
            background-color: #007bff;
            color: white;
            border: none;
            padding: 10px;
        }
        .dark-mode {
            background-color: #121212;
            color: #ffffff;
        }
        .high-contrast {
            background-color: black;
            color: yellow;
        }
        .grayscale {
            filter: grayscale(100%);
        }
        .negative-contrast {
            filter: invert(100%);
        }
        .protanopia {
            filter: url(#protanopia);
        }
        .deuteranopia {
            filter: url(#deuteranopia);
        }
        .tritanopia {
            filter: url(#tritanopia);
        }
        .dyslexia-mode a, .dyslexia-mode h1, .dyslexia-mode h2, .dyslexia-mode h3, .dyslexia-mode h4, .dyslexia-mode h5, .dyslexia-mode h6 {
            text-decoration: underline;
            font-family: 'OpenDyslexic', sans-serif;
        }
        .tda-mode {
            animation: none !important;
            transition: none !important;
        }
    `;
    document.head.appendChild(style);

    // Filtros SVG para daltonismo
    const svg = document.createElement('svg');
    svg.style.display = 'none';
    svg.innerHTML = `
        <filter id="protanopia">
            <feColorMatrix type="matrix" values="0.56667 0.43333 0 0 0
                                                 0.55833 0.44167 0 0 0
                                                 0 0 0.24167 0 0
                                                 0 0 0 1 0"/>
        </filter>
        <filter id="deuteranopia">
            <feColorMatrix type="matrix" values="0.625 0.375 0 0 0
                                                 0.7 0.3 0 0 0
                                                 0 0.3 0.7 0 0
                                                 0 0 0 1 0"/>
        </filter>
        <filter id="tritanopia">
            <feColorMatrix type="matrix" values="0.95 0.05 0 0 0
                                                 0 0.43333 0.56667 0 0
                                                 0 0 0.24167 0 0
                                                 0 0 0 1 0"/>
        </filter>
    `;
    document.body.appendChild(svg);

    loadSettings();
});

