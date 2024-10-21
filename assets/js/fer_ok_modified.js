document.addEventListener('DOMContentLoaded', function () {
    const state = {
        fontSize: 100,
        letterSpacing: 0,
        lineSpacing: 0,
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
        backgroundColor: '#ffffff',
        fontColor: '#000000',
        fontFamily: 'Arial'
    };

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
        adjustLineSpacing(state.lineSpacing);
        document.body.style.filter = `saturate(${state.saturationLevel})`;
        document.body.style.backgroundColor = state.backgroundColor;
        document.body.style.color = state.fontColor;
        document.body.style.fontFamily = state.fontFamily;
        if (state.isDarkModeActive) toggleDarkMode(true);
        if (state.isHighContrastActive) toggleHighContrast(true);
        if (state.isGrayScaleActive) toggleGrayScale(true);
        if (state.isNegativeContrastActive) toggleNegativeContrast(true);
        if (state.isReadingRulerActive) toggleReadingRuler(true);
        if (state.isReadingMaskActive) toggleReadingMask(true);
        if (state.isMotorSkillsModeActive) toggleMotorSkillsMode(true);
        if (state.isTextReaderActive) toggleTextReader(true);
        if (state.tdaMode) toggleTDAMode(); // Ativa o modo TDAH se estiver no estado
    }

    function toggleMenu() {
        const menu = document.getElementById('accessibilityMenu');
        menu.classList.toggle('hidden');
    }

    function createAccessibilityButton() {
        const button = document.createElement('button');
        button.innerHTML = '<i class="fas fa-universal-access fa-3x"></i>';
        button.className = 'btn btn-primary accessibility-toggle';
        button.setAttribute('aria-label', 'Open Accessibility Menu');
        button.title = 'Open Accessibility Menu';
        document.body.appendChild(button);
        button.onclick = toggleMenu;
        button.style.position = 'fixed';
        button.style.top = '50%';
        button.style.right = '10px';
        button.style.transform = 'translateY(-50%)';
        button.style.zIndex = '10000';
        button.style.borderRadius = '50%';
        button.style.width = '60px';
        button.style.height = '60px';
        button.style.display = 'flex';
        button.style.justifyContent = 'center';
        button.style.alignItems = 'center';
    }

    function createAccessibilityMenu() {
        const menu = document.createElement('div');
        menu.id = 'accessibilityMenu';
        menu.className = 'accessibility-menu hidden';
        menu.innerHTML = `
            <div class="container-fluid h-100">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h3 class="text-primary">Acessibilidade</h3>
                    <button class="btn btn-outline-secondary" onclick="showHelp()">
                        <i class="fas fa-question-circle"></i>
                    </button>
                </div>
                <div class="row">
                   <!--   <!-- Ajustes de Fonte -->
                    <div class="col-12 mb-3">
                        <div class="card">
                            <div class="card-body text-center">
                                <h5 class="card-title">Ajustes de Fonte</h5>
                                <div class="mb-3">
                                    <label class="form-label">Tamanho da Fonte</label>
                                    <div class="d-flex align-items-center justify-content-center">
                                        <button class="btn btn-outline-secondary" onclick="decreaseFont()">-</button>
                                        <input type="range" min="80" max="200" value="${state.fontSize}" id="fontSizeSlider" class="form-range mx-2" onchange="adjustFontSize(this.value)">
                                        <button class="btn btn-outline-secondary" onclick="increaseFont()">+</button>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">EspaÃ§amento entre Caracteres</label>
                                    <div class="d-flex align-items-center justify-content-center">
                                        <button class="btn btn-outline-secondary" onclick="decreaseLetterSpacing()">-</button>
                                        <input type="range" min="0" max="10" value="${state.letterSpacing}" id="letterSpacingSlider" class="form-range mx-2" onchange="adjustLetterSpacing(this.value)">
                                        <button class="btn btn-outline-secondary" onclick="increaseLetterSpacing()">+</button>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">EspaÃ§amento entre Linhas</label>
                                    <div class="d-flex align-items-center justify-content-center">
                                        <button class="btn btn-outline-secondary" onclick="decreaseLineSpacing()">-</button>
                                        <input type="range" min="0" max="10" value="${state.lineSpacing}" id="lineSpacingSlider" class="form-range mx-2" onchange="adjustLineSpacing(this.value)">
                                        <button class="btn btn-outline-secondary" onclick="increaseLineSpacing()">+</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>-->
                    <!-- Modos Visuais -->
                    <div class="col-12 mb-3">
                        <div class="card">
                            <div class="card-body text-center">
                                <h5 class="card-title">Contrastes e Modos</h5>
                                <div class="d-flex justify-content-around mb-3">
                                    <div class="text-center icon-button" onclick="toggleDarkMode()">
                                        <i id="darkModeIcon" class="fas fa-moon fa-2x text-primary"></i>
                                        <p class="icon-label">Modo Escuro</p>
                                    </div>
                                    <div class="text-center" onclick="toggleHighContrast()">
                                        <i id="highContrastIcon" class="fas fa-adjust fa-2x text-warning"></i>
                                        <p>Alto Contraste</p>
                                    </div> 
                                    <div class="text-center icon-button" onclick="toggleNegativeContrast()">
                                        <i id="negativeContrastIcon" class="fas fa-exclamation-triangle fa-2x text-danger"></i>
                                        <p class="icon-label">Contraste Negativo</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Ferramentas de Leitura -->
                    <div class="col-12 mb-3">
                        <div class="card">
                            <div class="card-body text-center">
                                <h5 class="card-title">Ferramentas de Leitura</h5>
                                <div class="d-flex justify-content-between">
                                    <div class="text-center icon-button" onclick="toggleReadingRulerMode()">
                                        <i id="readingRulerIcon" class="fas fa-grip-lines fa-lg text-info"></i>
                                        <p class="icon-label">RÃ©gua</p>
                                    </div>
                                    <div class="text-center icon-button" onclick="toggleReadingMask()">
                                        <i id="readingMaskIcon" class="fas fa-mask fa-lg text-info"></i>
                                        <p class="icon-label">MÃ¡scara</p>
                                    </div>
                                    <div class="text-center" onclick="toggleMagnifier()">
                                        <i id="Magnifier" class="fas fa-search-plus fa-lg text-info"></i>
                                        <p>Lupa</p>
                                    </div>
                                </div>
                                <div class="text-center mt-2 icon-button">
                                    <i id="textReaderIcon" class="fas fa-volume-up fa-lg" onclick="toggleTextReader()"></i>
                                    <p class="icon-label">Leitura de Texto <span id="textReaderSpeedLabel">(Normal)</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- SaturaÃ§Ã£o -->
                    <div class="col-12 mb-3">
                        <div class="card">
                            <div class="card-body text-center">
                                <h5 class="card-title">SaturaÃ§Ã£o</h5>
                                                                <button class="btn btn-outline-info w-100" onclick="toggleSaturation()">Ajustar SaturaÃ§Ã£o</button>
                            </div>
                        </div>
                    </div>
                    <!-- Modos Especiais -->
<div class="col-12">
    <button class="btn btn-outline-warning w-100 mb-1 btn-sm" onclick="toggleDyslexiaMode()">
        <i class="fas fa-book-reader"></i> Dislexia
    </button>
    <button class="btn btn-outline-success w-100 mb-1 btn-sm" onclick="toggleTDAMode()">
        <i class="fas fa-brain"></i> TDAH
    </button>
    <button class="btn btn-outline-danger w-100 mb-1 btn-sm" onclick="toggleEpilepsyMode()">
        <i class="fas fa-exclamation-triangle"></i> Modo Anti-Epilepsia
    </button>
</div>
<!-- Habilidades Motoras -->
<div class="col-12"> 
    <button class="btn btn-outline-primary w-100 mb-1 btn-sm" onclick="toggleMotorSkillsMode()">
        <i class="fas fa-wheelchair"></i> Habilidades Motoras
    </button>
    <button class="btn btn-outline-secondary w-100 mb-1 btn-sm" onclick="toggleDaltonismMode()">
        <i class="fas fa-eye"></i> Daltonismo <span id="daltonismModeLabel">(Nenhum)</span>
    </button>
</div>
<!-- Resetar ConfiguraÃ§Ãµes -->
<div class="col-12">
    <button class="btn btn-danger w-100 mt-3" onclick="resetSettings()">
        <i class="fas fa-undo"></i> Resetar
    </button>
</div>

        `;
        document.body.appendChild(menu);
    }

    // Aqui Adicionei os estilos CSS diretamente no JavaScript para manter tudo acoplado
    const style = document.createElement('style');
    style.innerHTML = `
        .accessibility-menu {
            background-color: #f8f9fa;
            border: 1px solid #dee2e6;
            border-radius: 8px;
            padding: 20px;
            max-width: 600px;
            margin: auto;
        }
        .accessibility-menu h3 {
            font-size: 1.5rem;
            color: #007bff;
        }
        .accessibility-menu .card {
            border: none;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .accessibility-menu .card-body {
            padding: 15px;
        }
        .accessibility-menu .btn {
            border-radius: 20px;
            transition: background-color 0.3s, color 0.3s;
        }
        .accessibility-menu .btn:hover {
            background-color: #007bff;
            color: #fff;
        }
        .accessibility-menu .btn-outline-secondary:hover {
            background-color: #6c757d;
            color: #fff;
        }
        .accessibility-menu .btn-outline-info:hover {
            background-color: #17a2b8;
            color: #fff;
        }
        .accessibility-menu .btn-outline-warning:hover {
            background-color: #ffc107;
            color: #fff;
        }
        .accessibility-menu .btn-outline-success:hover {
            background-color: #28a745;
            color: #fff;
        }
        .accessibility-menu .btn-outline-danger:hover {
            background-color: #dc3545;
            color: #fff;
        }
        .accessibility-menu .btn-outline-primary:hover {
            background-color: #007bff;
            color: #fff;
        }
        .accessibility-menu .btn-outline-secondary:hover {
            background-color: #6c757d;
            color: #fff;
        }
        .accessibility-menu .icon-button {
            cursor: pointer;
            transition: transform 0.3s, color 0.3s;
        }
        .accessibility-menu .icon-button:hover {
            transform: scale(1.1);
            color: #007bff;
        }
        .accessibility-menu .icon-label {
            font-size: 0.85rem;
        }
        .accessibility-menu .icon-button.selected i {
            color: #007bff;
        }
        .accessibility-menu .icon-button.selected {
            transform: scale(1.1);
        }
    `;
    document.head.appendChild(style);
    
    // FunÃ§Ãµes para ajustes de cor e fonte
 window.changeBackgroundColor = function(color) {
    state.backgroundColor = color;
    document.body.style.backgroundColor = color;
    saveSettings();
};

window.changeFontColor = function(color) {
    state.fontColor = color;
    document.body.style.color = color;
    saveSettings();
};

window.changeFontFamily = function(font) {
    state.fontFamily = font;
    document.body.style.fontFamily = font;
    saveSettings();
};
    
    // FunÃ§Ãµes para Contrastes e Modos
    // Modo Escuro
    window.toggleDarkMode = function() {
        state.isDarkModeActive = !state.isDarkModeActive;
        document.body.classList.toggle('dark-mode', state.isDarkModeActive);
        saveSettings();
        
    };

   // Alto Contraste
   window.toggleHighContrast = function() {
    state.isHighContrastActive = !state.isHighContrastActive;
    document.body.classList.toggle('high-contrast', state.isHighContrastActive);
    saveSettings();
};


    // Tons de Cinza
    window.toggleGrayScale = function() {
        state.isGrayScaleActive = !state.isGrayScaleActive;
        document.body.classList.toggle('grayscale', state.isGrayScaleActive);
        saveSettings();
    };
    
    // FunÃ§Ã£o para Contraste Negativo
    window.toggleNegativeContrast = function () {
        state.isNegativeContrastActive = !state.isNegativeContrastActive;
        document.body.classList.toggle('negative-contrast', state.isNegativeContrastActive);
        saveSettings();
    };

// FunÃ§Ã£o para ajustar o tamanho da fonte
// FunÃ§Ã£o para ajustar o tamanho da fonte proporcionalmente
// Estado inicial
//const state = {
 //   fontSize: 1,
 //   letterSpacing: 0,
 //   lineSpacing: 0,
//    daltonismType: null
//};

// Função para ajustar o tamanho da fonte
//window.adjustFontSize = function (value) {
 //   state.fontSize = value;
 //   document.querySelectorAll('body *:not(.accessibility-menu *, .accessibility-toggle)').forEach(function (el) {
  //      const originalFontSize = el.getAttribute('data-original-font-size') || window.getComputedStyle(el).fontSize;
     //   if (!el.getAttribute('data-original-font-size')) {
    //        el.setAttribute('data-original-font-size', originalFontSize);
    //    }
    //    const newSize = parseFloat(originalFontSize) * state.fontSize;
   //     el.style.fontSize = `${newSize}px`;
  //  });
//};

// Funções para aumentar e diminuir o tamanho da fonte
//window.increaseFont = function () {
   // if (state.fontSize < 10) {
   //     state.fontSize += 0.1;
   //     adjustFontSize(state.fontSize);
   //     document.getElementById('fontSizeSlider').value = state.fontSize;
   // }
//};

//window.decreaseFont = function () {
   // if (state.fontSize > 1) {
    //    state.fontSize -= 0.1;
     //   adjustFontSize(state.fontSize);
     //   document.getElementById('fontSizeSlider').value = state.fontSize;
    //}
//};

// Função para ajustar o espaçamento entre letras
window.adjustLetterSpacing = function (value) {
    state.letterSpacing = value;
    document.querySelectorAll('body *:not(.accessibility-menu *, .accessibility-toggle)').forEach(function (el) {
        el.style.letterSpacing = `${state.letterSpacing}px`;
    });
};

// Funções para aumentar e diminuir o espaçamento entre letras
window.increaseLetterSpacing = function () {
    if (state.letterSpacing < 10) {
        state.letterSpacing += 1;
        adjustLetterSpacing(state.letterSpacing);
        document.getElementById('letterSpacingSlider').value = state.letterSpacing;
    }
};

window.decreaseLetterSpacing = function () {
    if (state.letterSpacing > 0) {
        state.letterSpacing -= 1;
        adjustLetterSpacing(state.letterSpacing);
        document.getElementById('letterSpacingSlider').value = state.letterSpacing;
    }
};

// Função para ajustar o espaçamento entre linhas
window.adjustLineSpacing = function (value) {
    state.lineSpacing = value;
    document.querySelectorAll('body *:not(.accessibility-menu *, .accessibility-toggle)').forEach(function (el) {
        el.style.lineHeight = `${1 + state.lineSpacing / 10}`;
    });
};

// Funções para aumentar e diminuir o espaçamento entre linhas
window.increaseLineSpacing = function () {
    if (state.lineSpacing < 10) {
        state.lineSpacing += 1;
        adjustLineSpacing(state.lineSpacing);
        document.getElementById('lineSpacingSlider').value = state.lineSpacing;
    }
};

window.decreaseLineSpacing = function () {
    if (state.lineSpacing > 0) {
        state.lineSpacing -= 1;
        adjustLineSpacing(state.lineSpacing);
        document.getElementById('lineSpacingSlider').value = state.lineSpacing;
    }
};

// FunÃ§Ãµes de contraste
window.toggleNegativeContrast = function () {
    state.isNegativeContrastActive = !state.isNegativeContrastActive;
    document.body.classList.toggle('negative-contrast', state.isNegativeContrastActive);
    saveSettings();
};

     // Ferramentas de leitura     
    // FunÃ§Ã£o para RÃ©gua de Leitura
    let readingRulerMode = 'static'; // 'static' ou 'follow'

window.toggleReadingRulerMode = function() {
    readingRulerMode = readingRulerMode === 'static' ? 'follow' : 'static';
    toggleReadingRuler(); // Atualiza a rÃ©gua de acordo com o modo
};

function toggleReadingRuler() {
    // Se for modo seguidor
    if (readingRulerMode === 'follow') {
        document.addEventListener('mousemove', moveRuler);
    } else {
        document.removeEventListener('mousemove', moveRuler);
    }
}

function moveRuler(event) {
    const ruler = document.getElementById('readingRuler');
    if (ruler) {
        ruler.style.top = `${event.clientY - 25}px`;
    }
}

    // FunÃ§Ã£o que altera o tipo de Fonte
    window.changeFontFamily = function(font) {
        document.body.style.fontFamily = font;  // Altera a famÃ­lia da fonte do conteÃºdo
    };

     // FunÃ§Ã£o para MÃ¡scara de Leitura
    // FunÃ§Ã£o de MÃ¡scara de Leitura
    window.toggleReadingMask = function () {
        const mask = document.getElementById('readingMask') || document.createElement('div');
        if (!mask.id) {
            mask.id = 'readingMask';
            mask.style.position = 'fixed';
            mask.style.width = '100%';
            mask.style.height = '150px';
            mask.style.backgroundColor = 'rgba(0, 0, 255, 0.8)';
            mask.style.border = '3px solid rgba(255, 255, 255, 0.5)';
            mask.style.pointerEvents = 'none';
            mask.style.zIndex = '1000';

            const center = document.createElement('div');
            center.style.height = '50px';
            center.style.backgroundColor = 'transparent'; // Faixa transparente no centro
            mask.appendChild(center);

            document.body.appendChild(mask);

            document.addEventListener('mousemove', event => {
                mask.style.top = `${event.pageY - 75}px`; // Segue o cursor
            });
        } else {
            mask.remove();
        }
    };

     // FunÃ§Ã£o que cria a Lupa    
    // FunÃ§Ã£o da Lupa com modos de clique e fixo
    let magnifierMode = 'fixed';

    window.toggleMagnifierMode = function () {
        magnifierMode = magnifierMode === 'fixed' ? 'click' : 'fixed';
    };

    window.toggleMagnifier = function () {
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
            if (magnifierMode === 'click') {
                zoomedElement.style.transform = zoomedElement.style.transform === 'scale(1.5)' ? 'none' : 'scale(1.5)';
            } else {
                zoomedElement.style.transform = 'scale(1.5)';
                zoomedElement.style.transition = 'transform 0.2s ease';
            }
        }
    }
    
   // Leitura de Texto
   let isTextReaderActive = false;
   let textReaderSpeed = 'normal'; // PadrÃ£o: normal
   
   window.toggleTextReader = function () {
    isTextReaderActive = !isTextReaderActive;
    
    const textReaderIcon = document.getElementById('textReaderIcon');
    textReaderIcon.classList.toggle('icon-active', isTextReaderActive);

    const textReaderButton = document.querySelector('.icon-button[onclick="toggleTextReader()"]');
    toggleButtonVisual(textReaderButton, isTextReaderActive);
    
    // Continua a funcionalidade da leitura de texto
    if (isTextReaderActive) {
        document.addEventListener('mouseup', handleTextSelection);
    } else {
        document.removeEventListener('mouseup', handleTextSelection);
        speechSynthesis.cancel();
    }
};
   
   // FunÃ§Ã£o para lidar com a seleÃ§Ã£o de texto
   function handleTextSelection() {
       const selection = window.getSelection().toString();
       if (selection) {
           const utterance = new SpeechSynthesisUtterance(selection);
           setReaderSpeed(utterance); // Define a velocidade de leitura
           speechSynthesis.speak(utterance); // Inicia a leitura
       }
   }
   
   // FunÃ§Ã£o para definir a velocidade de leitura
   function setReaderSpeed(utterance) {
       switch (textReaderSpeed) {
           case 'slow':
               utterance.rate = 0.75;
               break;
           case 'fast':
               utterance.rate = 1.5;
               break;
           default:
               utterance.rate = 1; // Velocidade normal
               break;
       }
   } 
// FunÃ§Ã£o para alterar a velocidade de leitura
window.toggleTextReaderSpeed = function () {
    if (state.textReaderSpeed === 'normal') {
        state.textReaderSpeed = 'slow';
        document.getElementById('textReaderSpeedLabel').innerText = 'Lento';
    } else if (state.textReaderSpeed === 'slow') {
        state.textReaderSpeed = 'fast';
        document.getElementById('textReaderSpeedLabel').innerText = 'RÃ¡pido';
    } else {
        state.textReaderSpeed = 'normal';
        document.getElementById('textReaderSpeedLabel').innerText = 'Normal';
    }
};
// FunÃ§Ã£o reposnsÃ¡vel por exibir a alteraÃ§Ã£o do modo de leitura
window.toggleTextReaderSpeed = function () {
    const speedMap = {
        'normal': 'slow',
        'slow': 'fast',
        'fast': 'normal'
    };
    state.textReaderSpeed = speedMap[state.textReaderSpeed];

    // Atualizar o rÃ³tulo
    const speedLabel = document.getElementById('textReaderSpeedLabel');
    speedLabel.innerText = state.textReaderSpeed.charAt(0).toUpperCase() + state.textReaderSpeed.slice(1);

    // Atualizar o estilo visual com base na velocidade de leitura
    const textReaderButton = document.querySelector('.icon-button[onclick="toggleTextReader()"]');
    if (state.textReaderSpeed === 'normal') {
        textReaderButton.style.backgroundColor = '#007bff'; // Azul para "normal"
    } else if (state.textReaderSpeed === 'slow') {
        textReaderButton.style.backgroundColor = '#ffc107'; // Amarelo para "lento"
    } else {
        textReaderButton.style.backgroundColor = '#28a745'; // Verde para "rÃ¡pido"
    }

    saveSettings();
};


   // FunÃ§Ã£o de SaturaÃ§Ã£o
   window.toggleSaturation = function() {
    if (state.saturationLevel < 10) {
        state.saturationLevel += 1;
    } else {
        state.saturationLevel = 1;
    }
    document.body.style.filter = `saturate(${state.saturationLevel})`;
    saveSettings();
};

// FunÃ§Ãµes para modos especÃ­ficos (Dislexia, TDAH, Epilepsia, Daltonismo, Habilidades Motoras)
// Modo Dislexia
window.toggleDyslexiaMode = function() {
    state.dyslexiaMode = !state.dyslexiaMode;

    if (state.dyslexiaMode) {
        // Aplica o modo dislexia
        document.body.classList.add('dyslexia-mode');
        document.body.style.fontFamily = "'OpenDyslexic', Arial, sans-serif"; // Alterar para a fonte dislexia
        document.body.style.letterSpacing = "0.12em"; // Aumenta espaÃ§amento entre letras
        document.body.style.lineHeight = "1.6"; // Aumenta espaÃ§amento entre linhas

        // Estilo de sublinhado em links e palavras destacadas
        let links = document.querySelectorAll('a');
        links.forEach(link => {
            link.style.textDecoration = 'underline';
        });

        // Desativar animaÃ§Ãµes
        const styles = document.createElement('style');
        styles.innerHTML = `
            * {
                animation: none !important;
                transition: none !important;
            }
        `;
        document.head.appendChild(styles);
    } else {
        // Remove o modo dislexia
        document.body.classList.remove('dyslexia-mode');
        document.body.style.fontFamily = ""; // Volta para a fonte padrÃ£o
        document.body.style.letterSpacing = ""; // Reseta o espaÃ§amento entre letras
        document.body.style.lineHeight = ""; // Reseta o espaÃ§amento entre linhas

        let links = document.querySelectorAll('a');
        links.forEach(link => {
            link.style.textDecoration = ''; // Remove sublinhado extra
        });
    }

    saveSettings();
};

// FunÃ§Ã£o para Modo TDAH
let tdaTimer; // Timer Pomodoro para modo TDAH

function toggleTDAMode() {
    state.tdaMode = !state.tdaMode; // Atualiza o estado global
    document.body.classList.toggle('tda-mode', state.tdaMode);
    if (state.tdaMode) {
        // Ativar rÃ©gua de leitura
        toggleReadingRuler();
        // Bloquear animaÃ§Ãµes e distraÃ§Ãµes
        blockDistractions();
        // Simplificar a interface visual
        simplifyInterface();
        // Ativar Timer Pomodoro (25 min de foco, 5 min de pausa)
        tdaTimer = setInterval(() => {
            alert('Hora de fazer uma pausa! Volte em 5 minutos.');
            setTimeout(() => {
                alert('Hora de voltar ao trabalho!');
            }, 300000); // 5 minutos de pausa
        }, 1500000); // 25 minutos de foco
        // Ativar Leitura de Texto (se necessÃ¡rio)
        toggleTextReader(true);
    } else {
        // Desativar tudo ao sair do modo TDAH
        toggleReadingRuler(); // Desativa a rÃ©gua de leitura
        unblockDistractions();
        resetInterface();
        clearInterval(tdaTimer); // Cancela o Pomodoro se o modo for desativado
        toggleTextReader(false);
    }
    saveSettings(); // Salva o estado no localStorage
}

// FunÃ§Ã£o para ativar/desativar a rÃ©gua de leitura
function toggleReadingRuler() {
    if (!state.isReadingRulerActive) {
        const ruler = document.createElement('div');
        ruler.id = 'readingRuler';
        ruler.style.position = 'fixed';
        ruler.style.width = '100%';
        ruler.style.height = '50px';
        ruler.style.backgroundColor = 'rgba(255, 255, 0, 0.6)'; // Amarelo com transparÃªncia
        ruler.style.border = '2px solid rgba(0, 0, 0, 0.5)';
        ruler.style.zIndex = '1000';
        ruler.style.pointerEvents = 'none';
        document.body.appendChild(ruler);

        document.addEventListener('mousemove', moveRuler);
        state.isReadingRulerActive = true;
    } else {
        const ruler = document.getElementById('readingRuler');
        if (ruler) ruler.remove();
        document.removeEventListener('mousemove', moveRuler);
        state.isReadingRulerActive = false;
    }
}

function moveRuler(event) {
    const ruler = document.getElementById('readingRuler');
    if (ruler) {
        ruler.style.top = `${event.clientY - 25}px`; // Segue o cursor
    }
}

// FunÃ§Ã£o para bloquear distraÃ§Ãµes (como pop-ups e animaÃ§Ãµes)
function blockDistractions() {
    document.querySelectorAll('video, .banner, .popup').forEach(el => {
        el.style.display = 'none';
    });
    document.querySelectorAll('*').forEach(el => {
        if (getComputedStyle(el).animation !== 'none') {
            el.style.animation = 'none';
        }
    });
}

// FunÃ§Ã£o para simplificar a interface (remover bordas e gradientes)
function simplifyInterface() {
    document.querySelectorAll('*').forEach(el => {
        el.style.border = 'none';
        el.style.background = 'none';
    });
}

// FunÃ§Ã£o para reverter as mudanÃ§as do modo TDAH
function unblockDistractions() {
    document.querySelectorAll('video, .banner, .popup').forEach(el => {
        el.style.display = '';
    });
}

function resetInterface() {
    document.querySelectorAll('*').forEach(el => {
        el.style.border = '';
        el.style.background = '';
        el.style.animation = '';
    });
}

// FunÃ§Ã£o modo Anti-Epilepsia
window.toggleEpilepsyMode = function() {
    // Alterna o estado do modo epilepsia
    state.epilepsyMode = !state.epilepsyMode; 
    document.body.classList.toggle('epilepsy-mode', state.epilepsyMode);

    if (state.epilepsyMode) {
        // FunÃ§Ãµes que sÃ£o ativadas no modo epilepsia
        disableAnimations();
        blockFlashingContent();
        reduceBrightnessAndContrast();
        
        alert('Modo Epilepsia Ativado');
    } else {
        // FunÃ§Ãµes que sÃ£o desativadas quando o modo epilepsia Ã© desligado
        restoreVisualSettings();
        
        alert('Modo Epilepsia Desativado');
    }

    saveSettings(); // Salva o estado no localStorage
};

// FunÃ§Ã£o para desabilitar animaÃ§Ãµes e transiÃ§Ãµes
function disableAnimations() {
    document.querySelectorAll('*').forEach(el => {
        el.style.animation = 'none';
        el.style.transition = 'none';
    });
}

// FunÃ§Ã£o para bloquear conteÃºdo piscante ou de alto risco
function blockFlashingContent() {
    document.querySelectorAll('video, .flash, .banner, .popup').forEach(el => {
        el.style.display = 'none'; // Ocultar esses elementos
    });
}

// FunÃ§Ã£o para reduzir brilho e contraste, diminuindo estÃ­mulos visuais
function reduceBrightnessAndContrast() {
    document.body.style.filter = 'brightness(0.9) contrast(0.9)'; // Ajusta brilho e contraste
}

// FunÃ§Ã£o para restaurar as configuraÃ§Ãµes visuais originais
function restoreVisualSettings() {
    document.body.style.filter = ''; // Remove os filtros aplicados
    document.querySelectorAll('*').forEach(el => {
        el.style.animation = '';
        el.style.transition = '';
        el.style.display = ''; // Restaurar a visibilidade dos elementos bloqueados
    });
}


/// FunÃ§Ã£o para ativar o modo de habilidades motoras
window.toggleMotorSkillsMode = function() {
    state.isMotorSkillsModeActive = !state.isMotorSkillsModeActive;
    document.body.classList.toggle('motor-skills-mode', state.isMotorSkillsModeActive);

    if (state.isMotorSkillsModeActive) {
        // Ativar recursos para facilitar navegaÃ§Ã£o por teclado
        enhanceFocusVisibility();
        enableKeyboardShortcuts();
        enableSliderNavigation();
        scrollToFocusedElement();
    } else {
        // Desativar modificaÃ§Ãµes de navegaÃ§Ã£o por teclado ao desativar o modo
        removeEnhancedFocus();
        disableKeyboardShortcuts();
        disableSliderNavigation();
        removeScrollToFocus();
    }

    saveSettings(); // Salva o estado no localStorage
};

// FunÃ§Ã£o para melhorar a visibilidade do foco
function enhanceFocusVisibility() {
    const style = document.createElement('style');
    style.id = 'focus-enhanced-style'; // Atribuir um ID para poder remover o estilo
    style.innerHTML = `
        *:focus {
            outline: 3px solid #007bff; /* Borda azul visÃ­vel ao focar */
            outline-offset: 2px;
        }
        button:focus, a:focus, input:focus {
            background-color: #e0f7fa; /* Cor de fundo clara ao focar */
        }
    `;
    document.head.appendChild(style);
}

// FunÃ§Ã£o para remover o foco visÃ­vel personalizado
function removeEnhancedFocus() {
    const style = document.getElementById('focus-enhanced-style');
    if (style) style.remove();
}

// FunÃ§Ã£o para atalhos de teclado
function enableKeyboardShortcuts() {
    document.addEventListener('keydown', keyboardShortcutHandler);
}

// FunÃ§Ã£o para remover atalhos de teclado
function disableKeyboardShortcuts() {
    document.removeEventListener('keydown', keyboardShortcutHandler);
}

// FunÃ§Ã£o que define os atalhos de teclado
function keyboardShortcutHandler(event) {
    if (event.altKey) { // Usando Alt como modificador
        switch (event.key) {
            case '1':
                document.querySelector('#menu')?.focus(); // Foca no menu principal
                break;
            case '2':
                document.querySelector('#search')?.focus(); // Foca na barra de busca
                break;
            case '3':
                document.querySelector('#footer')?.focus(); // Foca no rodapÃ©
                break;
            case 'h':
                toggleHighContrast(); // Alterna o modo de alto contraste
                break;
            case 'd':
                toggleDarkMode(); // Alterna o modo escuro
                break;
        }
    }
}

// FunÃ§Ã£o para navegaÃ§Ã£o em sliders usando teclado
function enableSliderNavigation() {
    const sliders = document.querySelectorAll('.slider');
    sliders.forEach(slider => {
        slider.setAttribute('tabindex', '0'); // Torna o slider focÃ¡vel
        slider.addEventListener('keydown', sliderKeyboardHandler);
    });
}

// FunÃ§Ã£o para remover o controle do teclado nos sliders
function disableSliderNavigation() {
    const sliders = document.querySelectorAll('.slider');
    sliders.forEach(slider => {
        slider.removeEventListener('keydown', sliderKeyboardHandler);
    });
}

// FunÃ§Ã£o para controle dos sliders via teclado
function sliderKeyboardHandler(event) {
    const slider = event.target;
    if (event.key === 'ArrowLeft') {
        slider.value = parseInt(slider.value) - 1; // Diminui o valor do slider
    } else if (event.key === 'ArrowRight') {
        slider.value = parseInt(slider.value) + 1; // Aumenta o valor do slider
    }
}

// FunÃ§Ã£o para rolar automaticamente atÃ© o elemento focado
function scrollToFocusedElement() {
    document.addEventListener('focusin', scrollToFocusHandler);
}

// FunÃ§Ã£o para parar o scroll automÃ¡tico quando o foco muda
function removeScrollToFocus() {
    document.removeEventListener('focusin', scrollToFocusHandler);
}

// FunÃ§Ã£o que rola atÃ© o elemento focado
function scrollToFocusHandler(event) {
    event.target.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
}



// FunÃ§Ã£o para alternar entre modos de daltonismo
window.toggleDaltonismMode = function() {
    // Alternar entre 4 estados de daltonismo (0: Nenhum, 1: Protanopia, 2: Deuteranopia, 3: Tritanopia)
    state.daltonismMode = (state.daltonismMode + 1) % 4; // Ciclo entre os modos
    // Remover qualquer filtro anterior
    document.body.style.filter = '';
    // Aplicar o filtro adequado de acordo com o estado de daltonismo
    if (state.daltonismMode === 1) {
        document.body.classList.add('protanopia');
    } else if (state.daltonismMode === 2) {
        document.body.classList.add('deuteranopia');
    } else if (state.daltonismMode === 3) {
        document.body.classList.add('tritanopia');
    }
    // Atualizar o texto do botÃ£o de daltonismo
    const daltonismLabel = document.getElementById('daltonismModeLabel');
    if (daltonismLabel) {
        let modeText = 'Nenhum';
        if (state.daltonismMode === 1) modeText = 'Protanopia';
        else if (state.daltonismMode === 2) modeText = 'Deuteranopia';
        else if (state.daltonismMode === 3) modeText = 'Tritanopia';
        daltonismLabel.innerText = `(${modeText})`;
    }
    // Salvar o estado no localStorage
    saveSettings();
};

// Resetar ConfiguraÃ§Ãµes
window.resetSettings = function() {
    state.fontSize = 100;
    state.letterSpacing = 0;
    state.lineSpacing = 0;
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

    document.body.style.fontSize = '100%';
    document.body.style.letterSpacing = '0px';
    document.body.style.lineHeight = 'normal';
    document.body.style.filter = 'none';
    document.body.classList.remove('dark-mode', 'high-contrast', 'grayscale', 'negative-contrast', 
                                     'protanopia', 'deuteranopia', 'tritanopia', 'tda-mode', 'dyslexia-mode', 
                                     'epilepsy-mode', 'motor-skills-mode');

    const ruler = document.getElementById('readingRuler');
    if (ruler) ruler.remove();

    const mask = document.getElementById('readingMask');
    if (mask) mask.remove();

    document.body.style.cursor = 'default';

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
                    <li><strong>RÃ©gua de Leitura:</strong> Mostra uma rÃ©gua que segue o cursor do mouse para ajudar na leitura.</li>
                    <li><strong>MÃ¡scara de Leitura:</strong> Adiciona uma mÃ¡scara opaca com uma faixa para destacar o texto.</li>
                    <li><strong>Lupa:</strong> Amplia o conteÃºdo sob o cursor para melhor visualizaÃ§Ã£o.</li>
                    <li><strong>Leitura de Texto:</strong> LÃª em voz alta o texto selecionado ou sob o cursor.</li>
                    <li><strong>Dislexia:</strong> Ajusta a fonte e sublinha links para melhorar a legibilidade.</li>
                    <li><strong>TDAH:</strong> Bloqueia animaÃ§Ãµes e ativa a rÃ©gua de leitura e leitura de texto.</li>
                    <li><strong>Epilepsia:</strong> Desativa animaÃ§Ãµes e sons para evitar gatilhos.</li>
                    <li><strong>Habilidades Motoras:</strong> Ativa a navegaÃ§Ã£o por teclado com maior visibilidade.</li>
                    <li><strong>Daltonismo:</strong> Alterna entre modos de daltonismo (Protanopia, Deuteranopia, Tritanopia).</li>
                </ul>
            `,
            icon: 'info',
            confirmButtonText: 'Ok'
        });
    };

// Atalhos de Teclado
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
            case 'e':
                toggleNegativeContrast();
                break;
            case 'r':
                toggleColorBlindMode();
                break;
            case 'g':
                toggleGrayScale();
                break;
            case 'u':
                toggleUnderlineLinks();
                break;
        }
    }
});

    // CriaÃ§Ã£o do botÃ£o e menu de acessibilidade
    createAccessibilityButton();
    createAccessibilityMenu();
    loadSettings();
});

// Estilo CSS para o menu
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
     body.high-contrast {
    /* This stylesheet based on 0WonB.css generated by Accessibility CSS Generator, (c) Silas S. Brown 2006-2015.  Version 0.9844 */
  }
  body.contrast .placebo {
    line-height: normal;
  }
  body.contrast * {
    -webkit-box-shadow: none !important;
    box-shadow: none !important;
  }
  body.high-contrast a,
  body.high-contrast abbr,
  body.high-contrast acronym,
  body.high-contrast address,
  body.high-contrast article,
  body.high-contrast aside,
  body.high-contrast b,
  body.high-contrast basefont,
  body.high-contrast bdi,
  body.high-contrast big,
  body.high-contrast blink,
  body.high-contrast blockquote,
  body.high-contrast body,
  body.high-contrast button,
  body.high-contrast canvas,
  body.high-contrast caption,
  body.high-contrast center,
  body.high-contrast cite,
  body.high-contrast code,
  body.high-contrast col,
  body.high-contrast colgroup,
  body.high-contrast command,
  body.high-contrast dd,
  body.high-contrast del,
  body.high-contrast details,
  body.high-contrast dfn,
  body.high-contrast dir,
  body.high-contrast div,
  body.high-contrast dl,
  body.high-contrast dt,
  body.high-contrast em,
  body.high-contrast embed,
  body.high-contrast fieldset,
  body.high-contrast figcaption,
  body.high-contrast figure,
  body.high-contrast font,
  body.high-contrast footer,
  body.high-contrast form,
  body.high-contrast h1,
  body.high-contrast h1 a,
  body.high-contrast h1 a b,
  body.high-contrast h1 abbr,
  body.high-contrast h1 b,
  body.high-contrast h1 center,
  body.high-contrast h1 em,
  body.high-contrast h1 i,
  body.high-contrast h1 span,
  body.high-contrast h1 strong,
  body.high-contrast h2,
  body.high-contrast h2 a,
  body.high-contrast h2 a b,
  body.high-contrast h2 abbr,
  body.high-contrast h2 b,
  body.high-contrast h2 center,
  body.high-contrast h2 em,
  body.high-contrast h2 i,
  body.high-contrast h2 span,
  body.high-contrast h2 strong,
  body.high-contrast h3,
  body.high-contrast h3 a,
  body.high-contrast h3 a b,
  body.high-contrast h3 abbr,
  body.high-contrast h3 b,
  body.high-contrast h3 center,
  body.high-contrast h3 em,
  body.high-contrast h3 i,
  body.high-contrast h3 span,
  body.high-contrast h3 strong,
  body.high-contrast h4,
  body.high-contrast h4 a,
  body.high-contrast h4 a b,
  body.high-contrast h4 abbr,
  body.high-contrast h4 b,
  body.high-contrast h4 center,
  body.high-contrast h4 em,
  body.high-contrast h4 i,
  body.high-contrast h4 span,
  body.high-contrast h4 strong,
  body.high-contrast h5,
  body.high-contrast h5 a,
  body.high-contrast h5 a b,
  body.high-contrast h5 abbr,
  body.high-contrast h5 b,
  body.high-contrast h5 center,
  body.high-contrast h5 em,
  body.high-contrast h5 i,
  body.high-contrast h5 span,
  body.high-contrast h5 strong,
  body.high-contrast h6,
  body.high-contrast h6 a,
  body.high-contrast h6 a b,
  body.high-contrast h6 abbr,
  body.high-contrast h6 b,
  body.high-contrast h6 center,
  body.high-contrast h6 em,
  body.high-contrast h6 i,
  body.high-contrast h6 span,
  body.high-contrast h6 strong,
  body.high-contrast header,
  body.high-contrast hgroup,
  body.high-contrast html,
  body.high-contrast i,
  body.high-contrast iframe,
  body.high-contrast img,
  body.high-contrast input,
  body.high-contrast ins,
  body.high-contrast kbd,
  body.high-contrast label,
  body.high-contrast legend,
  body.high-contrast li,
  body.high-contrast listing,
  body.high-contrast main,
  body.high-contrast mark,
  body.high-contrast marquee,
  body.high-contrast menu,
  body.high-contrast meter,
  body.high-contrast multicol,
  body.high-contrast nav,
  body.high-contrast nobr,
  body.high-contrast object,
  body.high-contrast ol,
  body.high-contrast option,
  body.high-contrast output,
  body.high-contrast p,
  body.high-contrast plaintext,
  body.high-contrast pre,
  body.high-contrast progress,
  body.high-contrast q,
  body.high-contrast rb,
  body.high-contrast rp,
  body.high-contrast rt,
  body.high-contrast ruby,
  body.high-contrast s,
  body.high-contrast samp,
  body.high-contrast section,
  body.high-contrast select,
  body.high-contrast small,
  body.high-contrast span,
  body.high-contrast strike,
  body.high-contrast strong,
  body.high-contrast sub,
  body.high-contrast summary,
  body.high-contrast sup,
  body.high-contrast svg,
  body.high-contrast table,
  body.high-contrast tbody,
  body.high-contrast td,
  body.high-contrast text,
  body.high-contrast textarea,
  body.high-contrast th,
  body.high-contrast thead,
  body.high-contrast time,
  body.high-contrast tr,
  body.high-contrast tt,
  body.high-contrast u,
  body.high-contrast ul,
  body.high-contrast var,
  body.high-contrast video,
  body.high-contrast xmp {
    -moz-appearance: none !important;
    -moz-user-select: text !important;
    -webkit-user-select: text !important;
    background-image: none !important;
    text-shadow: none !important;
    user-select: text !important;
  }
  body.high-contrast a,
  body.high-contrast abbr,
  body.high-contrast acronym,
  body.high-contrast address,
  body.high-contrast article,
  body.high-contrast aside,
  body.high-contrast b,
  body.high-contrast basefont,
  body.high-contrast bdi,
  body.high-contrast big,
  body.high-contrast blink,
  body.high-contrast blockquote,
  body.high-contrast body,
  body.high-contrast canvas,
  body.high-contrast caption,
  body.high-contrast center,
  body.high-contrast cite,
  body.high-contrast code,
  body.high-contrast col,
  body.high-contrast colgroup,
  body.high-contrast command,
  body.high-contrast dd,
  body.high-contrast del,
  body.high-contrast details,
  body.high-contrast dfn,
  body.high-contrast dir,
  body.high-contrast div,
  body.high-contrast dl,
  body.high-contrast dt,
  body.high-contrast em,
  body.high-contrast embed,
  body.high-contrast fieldset,
  body.high-contrast figcaption,
  body.high-contrast figure,
  body.high-contrast font,
  body.high-contrast footer,
  body.high-contrast form,
  body.high-contrast h1,
  body.high-contrast h1 a,
  body.high-contrast h1 a b,
  body.high-contrast h1 abbr,
  body.high-contrast h1 b,
  body.high-contrast h1 center,
  body.high-contrast h1 em,
  body.high-contrast h1 i,
  body.high-contrast h1 span,
  body.high-contrast h1 strong,
  body.high-contrast h2,
  body.high-contrast h2 a,
  body.high-contrast h2 a b,
  body.high-contrast h2 abbr,
  body.high-contrast h2 b,
  body.high-contrast h2 center,
  body.high-contrast h2 em,
  body.high-contrast h2 i,
  body.high-contrast h2 span,
  body.high-contrast h2 strong,
  body.high-contrast h3,
  body.high-contrast h3 a,
  body.high-contrast h3 a b,
  body.high-contrast h3 abbr,
  body.high-contrast h3 b,
  body.high-contrast h3 center,
  body.high-contrast h3 em,
  body.high-contrast h3 i,
  body.high-contrast h3 span,
  body.high-contrast h3 strong,
  body.high-contrast h4,
  body.high-contrast h4 a,
  body.high-contrast h4 a b,
  body.high-contrast h4 abbr,
  body.high-contrast h4 b,
  body.high-contrast h4 center,
  body.high-contrast h4 em,
  body.high-contrast h4 i,
  body.high-contrast h4 span,
  body.high-contrast h4 strong,
  body.high-contrast h5,
  body.high-contrast h5 a,
  body.high-contrast h5 a b,
  body.high-contrast h5 abbr,
  body.high-contrast h5 b,
  body.high-contrast h5 center,
  body.high-contrast h5 em,
  body.high-contrast h5 i,
  body.high-contrast h5 span,
  body.high-contrast h5 strong,
  body.high-contrast h6,
  body.high-contrast h6 a,
  body.high-contrast h6 a b,
  body.high-contrast h6 abbr,
  body.high-contrast h6 b,
  body.high-contrast h6 center,
  body.high-contrast h6 em,
  body.high-contrast h6 i,
  body.high-contrast h6 span,
  body.high-contrast h6 strong,
  body.high-contrast header,
  body.high-contrast hgroup,
  body.high-contrast html,
  body.high-contrast i,
  body.high-contrast iframe,
  body.high-contrast input,
  body.high-contrast ins,
  body.high-contrast kbd,
  body.high-contrast label,
  body.high-contrast legend,
  body.high-contrast li,
  body.high-contrast listing,
  body.high-contrast main,
  body.high-contrast mark,
  body.high-contrast marquee,
  body.high-contrast menu,
  body.high-contrast meter,
  body.high-contrast multicol,
  body.high-contrast nav:not(#toolbar),
  body.high-contrast nobr,
  body.high-contrast object,
  body.high-contrast ol,
  body.high-contrast option,
  body.high-contrast output,
  body.high-contrast p,
  body.high-contrast plaintext,
  body.high-contrast pre,
  body.high-contrast progress,
  body.high-contrast q,
  body.high-contrast rb,
  body.high-contrast rp,
  body.high-contrast rt,
  body.high-contrast ruby,
  body.high-contrast s,
  body.high-contrast samp,
  body.high-contrast section,
  body.high-contrast small,
  body.high-contrast span,
  body.high-contrast strike,
  body.high-contrast strong,
  body.high-contrast sub,
  body.high-contrast summary,
  body.high-contrast sup,
  body.high-contrast svg,
  body.high-contrast table,
  body.high-contrast tbody,
  body.high-contrast td,
  body.high-contrast text,
  body.high-contrast textarea,
  body.high-contrast th,
  body.high-contrast thead,
  body.high-contrast time,
  body.high-contrast tr,
  body.high-contrast tt,
  body.high-contrast u,
  body.high-contrast ul,
  body.high-contrast var,
  body.high-contrast video,
  body.high-contrast xmp {
    background: black !important;
    background-color: black !important;
  }
  body.high-contrast a,
  body.high-contrast article,
  body.high-contrast aside,
  body.high-contrast basefont,
  body.high-contrast bdi,
  body.high-contrast big,
  body.high-contrast blink,
  body.high-contrast blockquote,
  body.high-contrast body,
  body.high-contrast button,
  body.high-contrast canvas,
  body.high-contrast caption,
  body.high-contrast center,
  body.high-contrast code,
  body.high-contrast col,
  body.high-contrast colgroup,
  body.high-contrast command,
  body.high-contrast dd,
  body.high-contrast del,
  body.high-contrast details,
  body.high-contrast dir,
  body.high-contrast div,
  body.high-contrast dl,
  body.high-contrast dt,
  body.high-contrast embed,
  body.high-contrast fieldset,
  body.high-contrast figcaption,
  body.high-contrast figure,
  body.high-contrast font,
  body.high-contrast footer,
  body.high-contrast form,
  body.high-contrast header,
  body.high-contrast hgroup,
  body.high-contrast html,
  body.high-contrast iframe,
  body.high-contrast img,
  body.high-contrast input,
  body.high-contrast ins,
  body.high-contrast kbd,
  body.high-contrast label,
  body.high-contrast legend,
  body.high-contrast li,
  body.high-contrast listing,
  body.high-contrast main,
  body.high-contrast mark,
  body.high-contrast marquee,
  body.high-contrast menu,
  body.high-contrast meter,
  body.high-contrast multicol,
  body.high-contrast nav,
  body.high-contrast nobr,
  body.high-contrast object,
  body.high-contrast ol,
  body.high-contrast option,
  body.high-contrast output,
  body.high-contrast p,
  body.high-contrast plaintext,
  body.high-contrast pre,
  body.high-contrast progress,
  body.high-contrast q,
  body.high-contrast rb,
  body.high-contrast rp,
  body.high-contrast rt,
  body.high-contrast ruby,
  body.high-contrast s,
  body.high-contrast samp,
  body.high-contrast section,
  body.high-contrast select,
  body.high-contrast small,
  body.high-contrast span,
  body.high-contrast strike,
  body.high-contrast sub,
  body.high-contrast summary,
  body.high-contrast sup,
  body.high-contrast svg,
  body.high-contrast table,
  body.high-contrast tbody,
  body.high-contrast td,
  body.high-contrast text,
  body.high-contrast textarea,
  body.high-contrast th,
  body.high-contrast thead,
  body.high-contrast time,
  body.high-contrast tr,
  body.high-contrast tt,
  body.high-contrast ul,
  body.high-contrast var,
  body.high-contrast video,
  body.high-contrast xmp {
    color: white !important;
  }
  body.high-contrast abbr,
  body.high-contrast acronym,
  body.high-contrast b,
  body.high-contrast b span,
  body.high-contrast h1 b,
  body.high-contrast h1 strong,
  body.high-contrast h2 b,
  body.high-contrast h2 strong,
  body.high-contrast h3 b,
  body.high-contrast h3 strong,
  body.high-contrast h4 b,
  body.high-contrast h4 strong,
  body.high-contrast h5 b,
  body.high-contrast h5 strong,
  body.high-contrast h6 b,
  body.high-contrast h6 strong,
  body.high-contrast strong,
  body.high-contrast strong span {
    color: yellow !important;
  }
  body.high-contrast address,
  body.high-contrast address span,
  body.high-contrast cite,
  body.high-contrast cite span,
  body.high-contrast dfn,
  body.high-contrast dfn span,
  body.high-contrast em,
  body.high-contrast em span,
  body.high-contrast h1 em,
  body.high-contrast h1 i,
  body.high-contrast h2 em,
  body.high-contrast h2 i,
  body.high-contrast h3 em,
  body.high-contrast h3 i,
  body.high-contrast h4 em,
  body.high-contrast h4 i,
  body.high-contrast h5 em,
  body.high-contrast h5 i,
  body.high-contrast h6 em,
  body.high-contrast h6 i,
  body.high-contrast i,
  body.high-contrast i span,
  body.high-contrast u,
  body.high-contrast u span {
    color: #FFFF80 !important;
  }
  body.high-contrast dt {
    border-top: thin solid grey !important;
  }
  body.high-contrast h1,
  body.high-contrast h1 a,
  body.high-contrast h1 a b,
  body.high-contrast h1 abbr,
  body.high-contrast h1 center,
  body.high-contrast h1 span,
  body.high-contrast h2,
  body.high-contrast h2 a,
  body.high-contrast h2 a b,
  body.high-contrast h2 abbr,
  body.high-contrast h2 center,
  body.high-contrast h2 span,
  body.high-contrast h3,
  body.high-contrast h3 a,
  body.high-contrast h3 a b,
  body.high-contrast h3 abbr,
  body.high-contrast h3 center,
  body.high-contrast h3 span,
  body.high-contrast h4,
  body.high-contrast h4 a,
  body.high-contrast h4 a b,
  body.high-contrast h4 abbr,
  body.high-contrast h4 center,
  body.high-contrast h4 span,
  body.high-contrast h5,
  body.high-contrast h5 a,
  body.high-contrast h5 a b,
  body.high-contrast h5 abbr,
  body.high-contrast h5 center,
  body.high-contrast h5 span,
  body.high-contrast h6,
  body.high-contrast h6 a,
  body.high-contrast h6 a b,
  body.high-contrast h6 abbr,
  body.high-contrast h6 center,
  body.high-contrast h6 span {
    color: #40C090 !important;
  }
  body.high-contrast img {
    background: #808080 !important;
    background-color: #808080 !important;
  }
  body.high-contrast abbr,
  body.high-contrast acronym {
    border-bottom: 1px dotted !important;
  }
  body.high-contrast :focus {
    outline: thin dotted !important;
  }
  body.high-contrast a.button,
  body.high-contrast a.button abbr,
  body.high-contrast a.button acronym,
  body.high-contrast a.button b,
  body.high-contrast a.button basefont,
  body.high-contrast a.button big,
  body.high-contrast a.button br,
  body.high-contrast a.button code,
  body.high-contrast a.button div,
  body.high-contrast a.button em,
  body.high-contrast a.button font,
  body.high-contrast a.button h1,
  body.high-contrast a.button h2,
  body.high-contrast a.button h3,
  body.high-contrast a.button h4,
  body.high-contrast a.button h5,
  body.high-contrast a.button h6,
  body.high-contrast a.button i,
  body.high-contrast a.button kbd,
  body.high-contrast a.button rb,
  body.high-contrast a.button rp,
  body.high-contrast a.button rt,
  body.high-contrast a.button ruby,
  body.high-contrast a.button samp,
  body.high-contrast a.button small,
  body.high-contrast a.button span,
  body.high-contrast a.button strong,
  body.high-contrast a.button tt,
  body.high-contrast a.button u,
  body.high-contrast a.button var,
  body.high-contrast a:link,
  body.high-contrast a:link abbr,
  body.high-contrast a:link acronym,
  body.high-contrast a:link b,
  body.high-contrast a:link basefont,
  body.high-contrast a:link big,
  body.high-contrast a:link br,
  body.high-contrast a:link code,
  body.high-contrast a:link div,
  body.high-contrast a:link em,
  body.high-contrast a:link font,
  body.high-contrast a:link h1,
  body.high-contrast a:link h2,
  body.high-contrast a:link h3,
  body.high-contrast a:link h4,
  body.high-contrast a:link h5,
  body.high-contrast a:link h6,
  body.high-contrast a:link i,
  body.high-contrast a:link kbd,
  body.high-contrast a:link rb,
  body.high-contrast a:link rp,
  body.high-contrast a:link rt,
  body.high-contrast a:link ruby,
  body.high-contrast a:link samp,
  body.high-contrast a:link small,
  body.high-contrast a:link span,
  body.high-contrast a:link strong,
  body.high-contrast a:link tt,
  body.high-contrast a:link u,
  body.high-contrast a:link var,
  body.high-contrast div#secondaryNav div#documentNavigation ul.navigationTabs li.tabItem {
    color: #0080FF !important;
  }
  body.high-contrast button,
  body.high-contrast input,
  body.high-contrast textarea,
  body.high-contrast select,
  body.high-contrast table,
  body.high-contrast td,
  body.high-contrast th,
  body.high-contrast tr,
  body.high-contrast tt {
    border: 1px solid #ffffff !important;
  }
  body.high-contrast button {
    background: #600040 !important;
    background-color: #600040 !important;
  }
  body.high-contrast select {
    -webkit-appearance: listbox !important;
    background: #600060 !important;
    background-color: #600060 !important;
  }
  body.high-contrast a:visited,
  body.high-contrast a:visited abbr,
  body.high-contrast a:visited acronym,
  body.high-contrast a:visited b,
  body.high-contrast a:visited basefont,
  body.high-contrast a:visited big,
  body.high-contrast a:visited br,
  body.high-contrast a:visited code,
  body.high-contrast a:visited div,
  body.high-contrast a:visited em,
  body.high-contrast a:visited font,
  body.high-contrast a:visited h1,
  body.high-contrast a:visited h2,
  body.high-contrast a:visited h3,
  body.high-contrast a:visited h4,
  body.high-contrast a:visited h5,
  body.high-contrast a:visited h6,
  body.high-contrast a:visited i,
  body.high-contrast a:visited kbd,
  body.high-contrast a:visited rb,
  body.high-contrast a:visited rp,
  body.high-contrast a:visited rt,
  body.high-contrast a:visited ruby,
  body.high-contrast a:visited samp,
  body.high-contrast a:visited small,
  body.high-contrast a:visited span,
  body.high-contrast a:visited strong,
  body.high-contrast a:visited tt,
  body.phigh-contrast a:visited u,
  body.high-contrast a:visited var,
  body.-contrast div#secondaryNav div#documentNavigation ul.navigationTabs li.tabItem.active {
    color: #00FFFF !important;
  }
  body.high-contrast ::selection,
  body.high-contrast ::-moz-selection {
    background: #4080c0 !important;
    background-color: #4080c0 !important;
  }
  body.high-contrast a.button:hover,
  body.high-contrast a.button:hover abbr,
  body.high-contrast a.button:hover acronym,
  body.high-contrast a.button:hover b,
  body.high-contrast a.button:hover basefont,
  body.high-contrast a.button:hover big,
  body.high-contrast a.button:hover br,
  body.high-contrast a.button:hover code,
  body.high-contrast a.button:hover div,
  body.high-contrast a.button:hover em,
  body.high-contrast a.button:hover font,
  body.high-contrast a.button:hover h1,
  body.high-contrast a.button:hover h2,
  body.high-contrast a.button:hover h3,
  body.high-contrast a.button:hover h4,
  body.high-contrast a.button:hover h5,
  body.high-contrast a.button:hover h6,
  body.high-contrast a.button:hover i,
  body.high-contrast a.button:hover kbd,
  body.high-contrast a.button:hover rb,
  body.high-contrast a.button:hover rp,
  body.high-contrast a.button:hover rt,
  body.high-contrast a.button:hover ruby,
  body.high-contrast a.button:hover samp,
  body.high-contrast a.button:hover small,
  body.high-contrast a.button:hover span,
  body.high-contrast a.button:hover strong,
  body.high-contrast a.button:hover tt,
  body.high-contrast a.button:hover u,
  body.high-contrast a.button:hover var,
  body.high-contrast a:link:hover,
  body.high-contrast a:link:hover abbr,
  body.high-contrast a:link:hover acronym,
  body.high-contrast a:link:hover b,
  body.high-contrast a:link:hover basefont,
  body.high-contrast a:link:hover big,
  body.high-contrast a:link:hover br,
  body.high-contrast a:link:hover code,
  body.high-contrast a:link:hover div,
  body.high-contrast a:link:hover em,
  body.high-contrast a:link:hover font,
  body.high-contrast a:link:hover h1,
  body.high-contrast a:link:hover h2,
  body.high-contrast a:link:hover h3,
  body.high-contrast a:link:hover h4,
  body.high-contrast a:link:hover h5,
  body.high-contrast a:link:hover h6,
  body.high-contrast a:link:hover i,
  body.high-contrast a:link:hover kbd,
  body.high-contrast a:link:hover rb,
  body.high-contrast a:link:hover rp,
  body.high-contrast a:link:hover rt,
  body.high-contrast a:link:hover ruby,
  body.high-contrast a:link:hover samp,
  body.high-contrast a:link:hover small,
  body.high-contrast a:link:hover span,
  body.high-contrast a:link:hover strong,
  body.high-contrast a:link:hover tt,
  body.high-contrast a:link:hover u,
  body.high-contrast a:link:hover var,
  body.high-contrast a:visited:hover,
  body.high-contrast a:visited:hover abbr,
  body.high-contrast a:visited:hover acronym,
  body.high-contrast a:visited:hover b,
  body.high-contrast a:visited:hover basefont,
  body.high-contrast a:visited:hover big,
  body.high-contrast a:visited:hover br,
  body.high-contrast a:visited:hover code,
  body.high-contrast a:visited:hover div,
  body.high-contrast a:visited:hover em,
  body.high-contrast a:visited:hover font,
  body.high-contrast a:visited:hover h1,
  body.high-contrast a:visited:hover h2,
  body.high-contrast a:visited:hover h3,
  body.high-contrast a:visited:hover h4,
  body.high-contrast a:visited:hover h5,
  body.high-contrast a:visited:hover h6,
  body.high-contrast a:visited:hover i,
  body.high-contrast a:visited:hover kbd,
  body.high-contrast a:visited:hover rb,
  body.high-contrast a:visited:hover rp,
  body.high-contrast a:visited:hover rt,
  body.high-contrast a:visited:hover ruby,
  body.high-contrast a:visited:hover samp,
  body.high-contrast a:visited:hover small,
  body.high-contrast a:visited:hover span,
  body.high-contrast a:visited:hover strong,
  body.high-contrast a:visited:hover tt,
  body.high-contrast a:visited:hover u,
  body.high-contrast a:visited:hover var {
    background: #400000 !important;
    background-color: #400000 !important;
  }
  body.high-contrast body > input#site + div#wrapper span.mk,
  body.high-contrast body > input#site + div#wrapper span.mk b,
  body.high-contrast input[type=reset] {
    background: #400060 !important;
    background-color: #400060 !important;
  }
  body.high-contrast div[role="button"],
  body.high-contrast input[type=button],
  body.high-contrast input[type=submit] {
    background: #600040 !important;
    background-color: #600040 !important;
  }
  body.high-contrast input[type=search] {
    -webkit-appearance: textfield !important;
  }
  body.high-contrast html button[disabled],
  body.high-contrast html input[disabled],
  body.high-contrast html select[disabled],
  body.high-contrast html textarea[disabled] {
    background: #404040 !important;
    background-color: #404040 !important;
  }
  body.high-contrast .menu li a span.label {
    text-transform: none !important;
  }
  body.high-contrast .menu li a span.label,
  body.high-contrast div.jwplayer span.jwcontrolbar,
  body.high-contrast div.jwplayer span.jwcontrols {
    display: inline !important;
  }
  body.high-contrast a:link.new,
  body.high-contrast a:link.new i,
  body.high-contrast a:link.new b,
  body.high-contrast span.Apple-style-span {
    color: #FFFF40 !important;
  }
  body.high-contrast body.mediawiki img.tex {
    background: white !important;
    background-color: white !important;
    border: white solid 3px !important;
  }
  body.high-contrast text > tspan:first-letter,
  body.high-contrast text > tspan:first-line {
    background: inherit !important;
    background-color: inherit !important;
    color: inherit !important;
  }
  body.high-contrast div.sbtc div.sbsb_a li.sbsb_d div,
  body.high-contrast table.gssb_c tr.gssb_i a,
  body.high-contrast table.gssb_c tr.gssb_i b,
  body.high-contrast table.gssb_c tr.gssb_i span,
  body.high-contrast table.gssb_c tr.gssb_i td {
    background: #003050 !important;
    background-color: #003050 !important;
  }
  body.high-contrast img[width="18"][height="18"] {
    height: 18px !important;
    width: 18px !important;
  }
  body.high-contrast a > span.iconHelp:empty:after {
    content: "Help" !important;
  }
  body.high-contrast div#gmap,
  body.high-contrast div#gmap * {
    background: initial !important;
  }
   body.dark-mode {
    background: #121212 !important;
    color: #655b5b !important;
  }
  
  body.dark-mode img {
    filter: grayscale(75%) contrast(90%);
  }
  
  body.dark-mode img:hover {
    filter: grayscale(0) contrast(100%);
  } 
    body.negative-contrast {
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
    .accessibility-menu {
        background-color: #f8f9fa;
        border: 1px solid #dee2e6;
        border-radius: 8px;
        padding: 20px;
        max-width: 600px;
        margin: auto;
    }
        .accessibility-menu h3 {
        font-size: 1.5rem;
        color: #007bff;
    }
    .accessibility-menu .card {
        border: none;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    .accessibility-menu .card-body {
        padding: 15px;
    }
    .accessibility-menu .btn {
        border-radius: 20px;
        transition: background-color 0.3s, color 0.3s;
    }
    .accessibility-menu .btn:hover {
        background-color: #007bff;
        color: #fff;
    }
    .accessibility-menu .btn-outline-secondary:hover {
        background-color: #6c757d;
        color: #fff;
    }
    .accessibility-menu .btn-outline-info:hover {
        background-color: #17a2b8;
        color: #fff;
    }
    .accessibility-menu .btn-outline-warning:hover {
        background-color: #ffc107;
        color: #fff;
    }
    .accessibility-menu .btn-outline-success:hover {
        background-color: #28a745;
        color: #fff;
    }
    .accessibility-menu .btn-outline-danger:hover {
        background-color: #dc3545;
        color: #fff;
    }
    .accessibility-menu .btn-outline-primary:hover {
        background-color: #007bff;
        color: #fff;
    }
    .accessibility-menu .btn-outline-secondary:hover {
        background-color: #6c757d;
        color: #fff;
    }
    .accessibility-menu .icon-button {
        cursor: pointer;
        transition: transform 0.3s, color 0.3s;
    }
    .accessibility-menu .icon-button:hover {
        transform: scale(1.1);
        color: #007bff;
    }
    .accessibility-menu .icon-label {
        font-size: 0.85rem;
    }
    .accessibility-menu .icon-button.selected i {
        color: #007bff;
    }
    .accessibility-menu .icon-button.selected {
        transform: scale(1.1);
    }
        .active-button {
    background-color: #28a745; /* Verde indicando ativo */
    color: white;
    border-color: #28a745;
    transition: background-color 0.3s ease, color 0.3s ease;
}
    .icon-active {
    color: #17a2b8; /* Um tom de azul para indicar ativo */
    transform: scale(1.2); /* Um leve aumento para destaque */
    transition: transform 0.3s ease, color 0.3s ease;
}
    .icon-button {
    cursor: pointer;
    transition: transform 0.3s, color 0.3s;
}

.icon-button:hover {
    transform: scale(1.1);
    color: #007bff;
}

.icon-button.selected i {
    color: #007bff;
}

.icon-button.selected {
    transform: scale(1.2);
    background-color: #28a745; /* Verde quando selecionado */
    color: white;
}
   .btn {
    border-radius: 20px;
    transition: background-color 0.3s, color 0.3s, box-shadow 0.3s;
}

.btn:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.btn-outline-warning {
    color: #ffc107;
    border-color: #ffc107;
}

.btn-outline-warning:hover {
    background-color: #ffc107;
    color: #fff;
}

.btn-outline-success {
    color: #28a745;
    border-color: #28a745;
}

.btn-outline-success:hover {
    background-color: #28a745;
    color: #fff;
}

.btn-outline-danger {
    color: #dc3545;
    border-color: #dc3545;
}

.btn-outline-danger:hover {
    background-color: #dc3545;
    color: #fff;
}

.btn-outline-primary {
    color: #007bff;
    border-color: #007bff;
}

.btn-outline-primary:hover {
    background-color: #007bff;
    color: #fff;
}

.btn-outline-secondary {
    color: #6c757d;
    border-color: #6c757d;
}

.btn-outline-secondary:hover {
    background-color: #6c757d;
    color: #fff;
}

.btn-danger {
    background-color: #dc3545;
    color: #fff;
    border-color: #dc3545;
}

.btn-danger:hover {
    background-color: #c82333;
    border-color: #bd2130;
}
 
`;
document.head.appendChild(style);

/// Filtros CSS para daltonismo
const daltonismStyles = document.createElement('style');
daltonismStyles.innerHTML = `
    .protanopia {
        filter: contrast(1.2) brightness(1.1) sepia(1) hue-rotate(-50deg) saturate(2);
    }
    .deuteranopia {
        filter: contrast(1.2) brightness(1.1) sepia(1) hue-rotate(-50deg) saturate(2);
    }
    .tritanopia {
        filter: contrast(1.2) brightness(1.1) sepia(1) hue-rotate(90deg) saturate(2);
    }
`;
document.head.appendChild(daltonismStyles);

loadSettings();
// Modo de Leitura Noturna
window.toggleNightReadingMode = function() {
    document.body.style.filter = state.isNightReadingMode ? 'none' : 'brightness(0.8) contrast(1.2)';
    state.isNightReadingMode = !state.isNightReadingMode;
    saveSettings();
};

// Ajuste de Velocidade de Animação
window.adjustAnimationSpeed = function(speed) {
    document.documentElement.style.setProperty('--animation-speed', speed);
    saveSettings();
};

// Modo de Foco
window.toggleFocusMode = function() {
    state.isFocusModeActive = !state.isFocusModeActive;
    if (state.isFocusModeActive) {
        document.body.classList.add('focus-mode');
    } else {
        document.body.classList.remove('focus-mode');
    }
    saveSettings();
};

// Personalização de Cores
window.changeUserColorPalette = function(bgColor, textColor) {
    state.backgroundColor = bgColor;
    state.fontColor = textColor;
    document.body.style.backgroundColor = bgColor;
    document.body.style.color = textColor;
    saveSettings();
};

// Leitor de Texto com Destaque
function handleTextSelection() {
    const selection = window.getSelection().toString();
    if (selection) {
        const utterance = new SpeechSynthesisUtterance(selection);
        utterance.onboundary = function(event) {
            highlightWord(event.charIndex, selection);
        };
        speechSynthesis.speak(utterance);
    }
}

function highlightWord(index, text) {
    // Function to highlight the word being spoken
    console.log("Highlighting word at index " + index);
}

// Modo de Alto Contraste Dinâmico
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    if (event.matches) {
        toggleHighContrast();
    }
});

// Ferramenta de Tradução
window.translatePage = function(language) {
    // Translation logic using an external API or library
    console.log('Translating page to ' + language);
};

// Modo de Leitura Simplificada
window.toggleSimplifiedReadingMode = function() {
    const nonEssentialElements = document.querySelectorAll('header, footer, nav, aside');
    nonEssentialElements.forEach(el => el.style.display = state.isSimplifiedMode ? '' : 'none');
    state.isSimplifiedMode = !state.isSimplifiedMode;
    saveSettings();
};

// Add these new features to the accessibility menu

// Adding new buttons to the accessibility menu for new features

// Adding Night Reading Mode
document.getElementById('accessibilityMenu').innerHTML += `
<div class="col-12 mb-3">
    <button class="btn btn-outline-dark w-100" onclick="toggleNightReadingMode()">Modo de Leitura Noturna</button>
</div>`;

// Adding Animation Speed Adjustment
document.getElementById('accessibilityMenu').innerHTML += `
<div class="col-12 mb-3">
    <label for="animationSpeedSlider">Velocidade da Animação</label>
    <input type="range" min="0" max="3" step="0.5" value="1" id="animationSpeedSlider" onchange="adjustAnimationSpeed(this.value)">
</div>`;

// Adding Focus Mode
document.getElementById('accessibilityMenu').innerHTML += `
<div class="col-12 mb-3">
    <button class="btn btn-outline-primary w-100" onclick="toggleFocusMode()">Modo de Foco</button>
</div>`;

// Adding Color Palette Customization
document.getElementById('accessibilityMenu').innerHTML += `
<div class="col-12 mb-3">
    <label for="bgColorPicker">Cor de Fundo</label>
    <input type="color" id="bgColorPicker" onchange="changeUserColorPalette(this.value, document.getElementById('textColorPicker').value)">
    <label for="textColorPicker">Cor do Texto</label>
    <input type="color" id="textColorPicker" onchange="changeUserColorPalette(document.getElementById('bgColorPicker').value, this.value)">
</div>`;

// Adding Simplified Reading Mode
document.getElementById('accessibilityMenu').innerHTML += `
<div class="col-12 mb-3">
    <button class="btn btn-outline-secondary w-100" onclick="toggleSimplifiedReadingMode()">Modo de Leitura Simplificada</button>
</div>`;
