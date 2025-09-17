
/* global window */
$w.onReady(function () {

    // ============================================
    // VM LEADERS ACADEMY - VERSIÓN MODULAR COMPLETA
    // ============================================

    // ===== MÓDULO 1: CONFIGURACIÓN CENTRAL =====
    const GAME_CONFIG = {
        totalStages: 5,
        livesPerSession: 3,
        colors: {
            primary: '#5E4973',       // Púrpura principal
            secondary: '#C5ACD6',     // Púrpura claro  
            accent: '#BD4254',        // Rojo acento
            success: '#34D399',       // Verde éxito
            warning: '#FBBF24',       // Amarillo advertencia
            danger: '#EF4444',        // Rojo peligro
            background: '#FFFFFF',    // Blanco fondo
            text: '#422A59',         // Púrpura texto
            modalSuccess: '#D1FAE5',  // Verde tenue modal
            modalDanger: '#FEE2E2',   // Rojo tenue modal
            buttonSuccess: '#10B981', // Verde fuerte botón
            buttonDanger: '#EF4444'   // Rojo fuerte botón
        },
        animations: {
            duration: 300,            // Duración base animaciones
            bounceHeight: 20,         // Altura salto avatar
            modalFeedbackTime: 1500,  // Tiempo feedback modal
            progressTransition: '0.8s ease-in-out', // Transición barra progreso
            floatInterval: 2000       // Intervalo flotación avatar
        }
    };

    // ===== MÓDULO 2: DATOS DEL JUEGO =====
    const CHALLENGES = {
        1: {
            title: "Fundamentos Profesionales",
            emoji: "📚",
            question: "¿Cuál es la clave para una primera impresión exitosa en el ámbito corporativo?",
            options: [
                { text: "Memorizar un discurso perfecto y actuar con rigidez", correct: false },
                { text: "Mostrar autenticidad, preparación y escucha activa", correct: true },
                { text: "Hablar constantemente para demostrar conocimiento", correct: false }
            ],
            explanation: "La autenticidad, preparación y escucha activa son fundamentales para crear conexiones genuinas en el ámbito profesional."
        },
        2: {
            title: "Inteligencia Emocional",
            emoji: "🎯",
            question: "En VM Leaders Academy enseñamos que ante un conflicto laboral, ¿cuál es la mejor estrategia?",
            options: [
                { text: "Evitar completamente la situación hasta que se resuelva sola", correct: false },
                { text: "Confrontar directamente sin considerar emociones", correct: false },
                { text: "Aplicar escucha activa, comunicación asertiva y buscar soluciones ganar-ganar", correct: true }
            ],
            explanation: "La inteligencia emocional nos ayuda a resolver conflictos de manera constructiva y beneficiosa para todas las partes."
        },
        3: {
            title: "Liderazgo Efectivo",
            emoji: "👥",
            question: "¿Qué característica define a un líder que 'domina el juego corporativo'?",
            options: [
                { text: "Tomar todas las decisiones sin consultar al equipo", correct: false },
                { text: "Inspirar, empoderar y desarrollar el potencial de otros", correct: true },
                { text: "Competir agresivamente con colegas por reconocimiento", correct: false }
            ],
            explanation: "El verdadero liderazgo se basa en empoderar a otros y crear un impacto positivo duradero."
        },
        4: {
            title: "Estrategia Corporativa",
            emoji: "🚀",
            question: "Para acelerar tu crecimiento profesional, ¿cuál es la estrategia más efectiva?",
            options: [
                { text: "Enfocarse únicamente en tareas técnicas y evitar la política", correct: false },
                { text: "Construir relaciones estratégicas, ser visible y agregar valor constante", correct: true },
                { text: "Esperar que los logros hablen por sí solos sin promocionarlos", correct: false }
            ],
            explanation: "El crecimiento profesional requiere una combinación estratégica de competencia técnica y habilidades políticas positivas."
        },
        5: {
            title: "Maestría Ejecutiva",
            emoji: "👑",
            question: "Como líder senior, ¿cómo tomas las mejores decisiones estratégicas?",
            options: [
                { text: "Basándote únicamente en tu experiencia e intuición", correct: false },
                { text: "Combinando análisis de datos, experiencia, visión y feedback del equipo", correct: true },
                { text: "Siguiendo siempre las decisiones de la mayoría", correct: false }
            ],
            explanation: "Las decisiones estratégicas efectivas integran múltiples fuentes de información y perspectivas."
        }
    };

    // ===== MÓDULO 3: ESTADO DEL JUEGO =====
    class GameState {
        constructor() {
            console.log('📊 Inicializando estado del juego...');
            this.currentStage = 1;
            this.unlockedStages = 1;
            this.completedStages = [];
            this.currentLives = GAME_CONFIG.livesPerSession;
            this.isQuizActive = false;
            this.currentQuestion = null;
            this.score = 0;
            console.log('✅ Estado del juego inicializado');
        }

        /**
         * Desbloquea la siguiente etapa si es posible
         */
        unlockNextStage() {
            if (this.unlockedStages < GAME_CONFIG.totalStages) {
                this.unlockedStages++;
                console.log(`🔓 Stage ${this.unlockedStages} desbloqueado`);
            }
        }

        /**
         * Completa una etapa específica
         * @param {number} stageNumber - Número de etapa a completar
         */
        completeStage(stageNumber) {
            if (!this.completedStages.includes(stageNumber)) {
                this.completedStages.push(stageNumber);
                this.score += 100;
                this.unlockNextStage();
                this.currentStage = Math.min(this.currentStage + 1, GAME_CONFIG.totalStages);
                console.log(`✅ Stage ${stageNumber} completado. Score: ${this.score}`);
            }
        }

        /**
         * Reduce una vida
         * @returns {number} Vidas restantes
         */
        loseLife() {
            this.currentLives = Math.max(0, this.currentLives - 1);
            console.log(`💔 Vida perdida. Vidas restantes: ${this.currentLives}`);
            return this.currentLives;
        }

        /**
         * Calcula el progreso en porcentaje
         * @returns {number} Porcentaje de progreso (0-100)
         */
        getProgress() {
            const progress = (this.completedStages.length / GAME_CONFIG.totalStages) * 100;
            console.log(`📊 Progreso actual: ${Math.round(progress)}%`);
            return progress;
        }
    }

    // ===== MÓDULO 4: SISTEMA DE AUDIO =====
    class AudioSystem {
        constructor() {
            console.log('🔊 Inicializando sistema de audio...');
            this.sounds = {
                correct: '✅ ¡Respuesta correcta!',
                incorrect: '❌ Respuesta incorrecta',
                complete: '🎉 ¡Etapa completada!',
                jump: '🦘 Avatar saltando',
                unlock: '🔓 Nueva etapa desbloqueada',
                gameComplete: '👑 ¡Juego completado!'
            };
            console.log('✅ Sistema de audio inicializado');
        }

        /**
         * Reproduce un sonido específico
         * @param {string} soundName - Nombre del sonido a reproducir
         */
        play(soundName) {
            const message = this.sounds[soundName] || `🔊 Sonido: ${soundName}`;
            console.log(`🎵 AUDIO: ${message}`);

            // Simular duración del sonido
            if (soundName === 'correct') {
                this._playCorrectSequence();
            } else if (soundName === 'complete') {
                this._playCompleteSequence();
            }
        }

        /**
         * Secuencia de sonidos para respuesta correcta
         * @private
         */
        _playCorrectSequence() {
            console.log('🎵 ♪ Do ♪ (440Hz)');
            setTimeout(() => console.log('🎵 ♪ Mi ♪ (554Hz)'), 100);
            setTimeout(() => console.log('🎵 ♪ Sol ♪ (659Hz)'), 200);
        }

        /**
         * Secuencia de sonidos para completar etapa
         * @private
         */
        _playCompleteSequence() {
            console.log('🎵 ♪♪ FANFARE ♪♪');
            for (let i = 0; i < 4; i++) {
                setTimeout(() => {
                    console.log(`🎵 ♪ Nota ${i + 1} ♪`);
                }, i * 150);
            }
        }
    }

    // ===== MÓDULO 5: SISTEMA DE ANIMACIONES =====
    class AnimationSystem {
        /**
         * Aplica animación de temblor a un elemento
         * @param {Object} element - Elemento DOM a animar
         * @param {number} intensity - Intensidad del temblor (por defecto 10)
         */
        static shake(element, intensity = 10) {
            if (!element) {
                console.warn('⚠️ ANIMATION: Elemento no válido para shake');
                return;
            }

            console.log('🔥 ANIMATION: Iniciando shake');
            const originalTransform = element.style.transform || '';

            // Secuencia de temblor
            element.style.transform = `${originalTransform} translateX(-${intensity}px)`;

            setTimeout(() => {
                element.style.transform = `${originalTransform} translateX(${intensity}px)`;
                setTimeout(() => {
                    element.style.transform = `${originalTransform} translateX(-${intensity/2}px)`;
                    setTimeout(() => {
                        element.style.transform = originalTransform;
                        console.log('✅ ANIMATION: Shake completado');
                    }, 100);
                }, 100);
            }, 100);
        }

        /**
         * Aplica animación de pulso a un elemento
         * @param {Object} element - Elemento DOM a animar
         * @param {number} scale - Factor de escala (por defecto 1.2)
         */
        static pulse(element, scale = 1.2) {
            if (!element) {
                console.warn('⚠️ ANIMATION: Elemento no válido para pulse');
                return;
            }

            console.log('💗 ANIMATION: Iniciando pulse');
            const originalTransform = element.style.transform || '';

            // Aplicar escala
            element.style.transition = `transform ${GAME_CONFIG.animations.duration}ms ease-out`;
            element.style.transform = `${originalTransform} scale(${scale})`;

            setTimeout(() => {
                element.style.transform = originalTransform;
                setTimeout(() => {
                    element.style.transition = '';
                    console.log('✅ ANIMATION: Pulse completado');
                }, GAME_CONFIG.animations.duration);
            }, GAME_CONFIG.animations.duration);
        }

        /**
         * Aplica animación de salto/rebote a un elemento
         * @param {Object} element - Elemento DOM a animar
         * @param {number} height - Altura del salto (por defecto 20px)
         */
        static bounce(element, height = GAME_CONFIG.animations.bounceHeight) {
            if (!element) {
                console.warn('⚠️ ANIMATION: Elemento no válido para bounce');
                return;
            }

            console.log(`🦘 ANIMATION: Iniciando bounce (altura: ${height}px)`);
            const originalTransform = element.style.transform || '';

            // Fase 1: Salto hacia arriba
            element.style.transition = 'transform 400ms cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            element.style.transform = `${originalTransform} translateY(-${height}px) scale(1.1)`;

            setTimeout(() => {
                // Fase 2: Caída
                element.style.transform = `${originalTransform} translateY(0px) scale(1)`;

                setTimeout(() => {
                    // Fase 3: Rebote pequeño
                    element.style.transform = `${originalTransform} translateY(-${height/3}px) scale(1.05)`;

                    setTimeout(() => {
                        // Fase 4: Aterrizaje final
                        element.style.transform = originalTransform;

                        setTimeout(() => {
                            element.style.transition = '';
                            console.log('✅ ANIMATION: Bounce completado');
                        }, 100);
                    }, 150);
                }, 300);
            }, 200);
        }

        /**
         * Aplica animación flotante continua a un elemento
         * @param {Object} element - Elemento DOM a animar
         */
        static startFloating(element) {
            if (!element) {
                console.warn('⚠️ ANIMATION: Elemento no válido para floating');
                return;
            }

            console.log('🌊 ANIMATION: Iniciando flotación continua');
            let direction = 1;
            const originalTransform = element.style.transform || '';

            function animate() {
                direction *= -1;
                const offset = direction * 5; // 5px arriba/abajo

                element.style.transition = `transform ${GAME_CONFIG.animations.floatInterval}ms ease-in-out`;
                element.style.transform = `${originalTransform} translateY(${offset}px)`;

                console.log(`🌊 FLOAT: Moviendo ${offset > 0 ? 'abajo' : 'arriba'}`);
            }

            // Iniciar flotación
            animate();

            // Repetir cada 2 segundos
            return setInterval(animate, GAME_CONFIG.animations.floatInterval);
        }

        /**
         * Aplica animación de movimiento suave entre dos posiciones
         * @param {Object} element - Elemento a mover
         * @param {Object} fromPos - Posición inicial {x, y}
         * @param {Object} toPos - Posición final {x, y}
         * @param {number} duration - Duración en ms
         */
        static smoothMove(element, fromPos, toPos, duration = 1200) {
            if (!element) {
                console.warn('⚠️ ANIMATION: Elemento no válido para smoothMove');
                return;
            }

            console.log(`🚀 ANIMATION: Movimiento suave de (${fromPos.x}, ${fromPos.y}) a (${toPos.x}, ${toPos.y})`);

            // Configurar posición inicial
            element.style.position = 'absolute';
            element.style.left = fromPos.x + 'px';
            element.style.top = fromPos.y + 'px';

            // Aplicar transición
            element.style.transition = `all ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;

            // Mover a posición final
            setTimeout(() => {
                element.style.left = toPos.x + 'px';
                element.style.top = toPos.y + 'px';

                setTimeout(() => {
                    element.style.transition = '';
                    console.log('✅ ANIMATION: Movimiento suave completado');
                }, duration);
            }, 50);
        }
    }

    // ===== MÓDULO 6: SISTEMA DE CONFETTI =====
    class ConfettiSystem {
        constructor() {
            console.log('🎊 Inicializando sistema de confetti...');
            this.isActive = false;
            this.particles = [];
            this.colors = ['🔴', '🟠', '🟡', '🟢', '🔵', '🟣', '🟤'];
            this.emojis = ['🎉', '🎊', '✨', '⭐', '💫', '🌟'];
            console.log('✅ Sistema de confetti inicializado');
        }

        /**
         * Inicia la animación de confetti
         * @param {number} duration - Duración en ms (por defecto 3000)
         */
        start(duration = 3000) {
            if (this.isActive) {
                console.log('⚠️ CONFETTI: Ya está activo');
                return;
            }

            console.log('🎊 CONFETTI: ¡Iniciando celebración!');
            this.isActive = true;

            // Mostrar explosión inicial
            this._showExplosion();

            // Mostrar lluvia de confetti
            const interval = setInterval(() => {
                this._showRain();
            }, 200);

            // Detener después de la duración especificada
            setTimeout(() => {
                clearInterval(interval);
                this.stop();
            }, duration);
        }

        /**
         * Detiene la animación de confetti
         */
        stop() {
            this.isActive = false;
            console.log('🎊 CONFETTI: Celebración terminada');
        }

        /**
         * Muestra explosión inicial de confetti
         * @private
         */
        _showExplosion() {
            console.log('💥 CONFETTI EXPLOSIÓN:');
            const explosion = this.colors.concat(this.emojis).join('');
            console.log(`      ${explosion}`);
            console.log(`    ${explosion}${explosion}`);
            console.log(`  ${explosion}${explosion}${explosion}`);
            console.log(`    ${explosion}${explosion}`);
            console.log(`      ${explosion}`);
        }

        /**
         * Muestra lluvia de confetti
         * @private
         */
        _showRain() {
            if (!this.isActive) return;

            const line = [];
            for (let i = 0; i < 15; i++) {
                if (Math.random() < 0.3) {
                    const particle = Math.random() < 0.5 
                        ? this.colors[Math.floor(Math.random() * this.colors.length)]
                        : this.emojis[Math.floor(Math.random() * this.emojis.length)];
                    line.push(particle);
                } else {
                    line.push(' ');
                }
            }
            console.log(`🎊 ${line.join('')}`);
        }
    }

    // ===== MÓDULO 7: GESTIÓN DE ELEMENTOS UI =====
    class UIManager {
        constructor() {
            console.log('🖥️ Inicializando gestión de UI...');
            this.cache = new Map(); // Cache de elementos para performance
            console.log('✅ Gestión de UI inicializada');
        }

        /**
         * Obtiene un elemento de forma segura con cache
         * @param {string} selector - Selector del elemento
         * @returns {Object|null} Elemento encontrado o null
         */
        getElement(selector) {
            if (this.cache.has(selector)) {
                return this.cache.get(selector);
            }

            try {
                const element = $w(selector);
                this.cache.set(selector, element);
                return element;
            } catch (e) {
                console.warn(`⚠️ UI: Elemento ${selector} no encontrado`);
                this.cache.set(selector, null);
                return null;
            }
        }

        /**
         * Establece texto de forma segura
         * @param {string} selector - Selector del elemento
         * @param {string} text - Texto a establecer
         */
        setText(selector, text) {
            const element = this.getElement(selector);
            if (!element) return false;

            try {
                if (element.text !== undefined) {
                    element.text = text;
                } else if (element.label !== undefined) {
                    element.label = text;
                } else {
                    console.warn(`⚠️ UI: No se puede establecer texto en ${selector}`);
                    return false;
                }
                console.log(`📝 UI: Texto establecido en ${selector}: "${text}"`);
                return true;
            } catch (e) {
                console.warn(`⚠️ UI: Error estableciendo texto en ${selector}:`, e.message);
                return false;
            }
        }

        /**
         * Muestra un elemento de forma segura
         * @param {string} selector - Selector del elemento
         */
        show(selector) {
            const element = this.getElement(selector);
            if (!element) return false;

            try {
                if (element.show) {
                    element.show();
                    console.log(`👁️ UI: Elemento ${selector} mostrado`);
                    return true;
                }
            } catch (e) {
                console.warn(`⚠️ UI: Error mostrando ${selector}:`, e.message);
            }
            return false;
        }

        /**
         * Oculta un elemento de forma segura
         * @param {string} selector - Selector del elemento
         */
        hide(selector) {
            const element = this.getElement(selector);
            if (!element) return false;

            try {
                if (element.hide) {
                    element.hide();
                    console.log(`🙈 UI: Elemento ${selector} ocultado`);
                    return true;
                }
            } catch (e) {
                console.warn(`⚠️ UI: Error ocultando ${selector}:`, e.message);
            }
            return false;
        }

        /**
         * Aplica estilos CSS de forma segura
         * @param {string} selector - Selector del elemento
         * @param {Object} styles - Objeto con estilos CSS
         */
        applyStyles(selector, styles) {
            const element = this.getElement(selector);
            if (!element) return false;

            try {
                Object.assign(element.style, styles);
                console.log(`🎨 UI: Estilos aplicados a ${selector}`);
                return true;
            } catch (e) {
                console.warn(`⚠️ UI: Error aplicando estilos a ${selector}:`, e.message);
                return false;
            }
        }

        /**
         * Agrega event listener de forma segura
         * @param {string} selector - Selector del elemento
         * @param {string} event - Nombre del evento
         * @param {Function} handler - Función manejadora
         */
        addEventListener(selector, event, handler) {
            const element = this.getElement(selector);
            if (!element) return false;

            try {
                if (element[event]) {
                    element[event](handler);
                    console.log(`🔗 UI: Event listener ${event} agregado a ${selector}`);
                    return true;
                }
            } catch (e) {
                console.warn(`⚠️ UI: Error agregando listener a ${selector}:`, e.message);
            }
            return false;
        }
    }

    // ===== MÓDULO 8: BARRA DE PROGRESO ANIMADA =====
    class ProgressBarManager {
        constructor(uiManager) {
            console.log('📊 Inicializando barra de progreso...');
            this.ui = uiManager;
            this.currentProgress = 0;
            this.setupProgressBar();
            console.log('✅ Barra de progreso inicializada');
        }

        /**
         * Configura la barra de progreso inicial
         */
        setupProgressBar() {
            // Configurar contenedor externo
            this.ui.applyStyles('#progressContainer', {
                backgroundColor: GAME_CONFIG.colors.secondary,
                borderRadius: '10px',
                overflow: 'hidden',
                height: '20px',
                border: `2px solid ${GAME_CONFIG.colors.primary}`,
                position: 'relative'
            });

            // Configurar barra interna
            this.ui.applyStyles('#progressBar', {
                backgroundColor: GAME_CONFIG.colors.primary,
                height: '100%',
                width: '0%',
                borderRadius: 'inherit',
                transition: GAME_CONFIG.animations.progressTransition,
                position: 'absolute',
                top: '0',
                left: '0'
            });

            console.log('🎨 PROGRESS: Estilos iniciales aplicados');
        }

        /**
         * Actualiza la barra de progreso con animación
         * @param {number} newProgress - Nuevo porcentaje de progreso (0-100)
         */
        updateProgress(newProgress) {
            const progress = Math.max(0, Math.min(100, newProgress));

            if (progress !== this.currentProgress) {
                console.log(`📊 PROGRESS: Actualizando de ${this.currentProgress}% a ${progress}%`);

                // Aplicar nuevo ancho con animación
                this.ui.applyStyles('#progressBar', {
                    width: `${progress}%`
                });

                // Actualizar texto
                this.ui.setText('#progressText', `${Math.round(progress)}% Completado`);

                // Efecto de destello al aumentar
                if (progress > this.currentProgress) {
                    this._addGlowEffect();
                }

                this.currentProgress = progress;
                console.log('✅ PROGRESS: Actualización completada');
            }
        }

        /**
         * Añade efecto de destello a la barra
         * @private
         */
        _addGlowEffect() {
            console.log('✨ PROGRESS: Aplicando efecto de destello');

            this.ui.applyStyles('#progressBar', {
                boxShadow: `0 0 20px ${GAME_CONFIG.colors.primary}80`
            });

            setTimeout(() => {
                this.ui.applyStyles('#progressBar', {
                    boxShadow: 'none'
                });
                console.log('✅ PROGRESS: Efecto de destello completado');
            }, 800);
        }
    }

    // ===== MÓDULO 9: GESTOR DE AVATAR ANIMADO =====
    class AvatarManager {
        constructor(uiManager, audioSystem) {
            console.log('🎭 Inicializando gestor de avatar...');
            this.ui = uiManager;
            this.audio = audioSystem;
            this.isFloating = false;
            this.floatingInterval = null;
            this.currentPosition = { x: 0, y: 0 };
            console.log('✅ Gestor de avatar inicializado');
        }

        /**
         * Inicia la animación flotante del avatar
         */
        startFloating() {
            if (this.isFloating) {
                console.log('⚠️ AVATAR: Ya está flotando');
                return;
            }

            const mascot = this.ui.getElement('#mascot');
            if (!mascot) {
                console.log('⚠️ AVATAR: Elemento mascot no encontrado');
                return;
            }

            console.log('🌊 AVATAR: Iniciando flotación');
            this.isFloating = true;
            this.floatingInterval = AnimationSystem.startFloating(mascot);
        }

        /**
         * Detiene la animación flotante
         */
        stopFloating() {
            if (this.floatingInterval) {
                clearInterval(this.floatingInterval);
                this.floatingInterval = null;
            }
            this.isFloating = false;
            console.log('🛑 AVATAR: Flotación detenida');
        }

        /**
         * Hace que el avatar salte
         * @param {number} intensity - Intensidad del salto
         */
        jump(intensity = GAME_CONFIG.animations.bounceHeight) {
            const mascot = this.ui.getElement('#mascot');
            if (!mascot) return;

            console.log(`🦘 AVATAR: Saltando con intensidad ${intensity}`);
            this.audio.play('jump');
            AnimationSystem.bounce(mascot, intensity);
        }

        /**
         * Mueve el avatar a una nueva posición
         * @param {string} targetStageSelector - Selector del stage destino
         */
        moveToStage(targetStageSelector) {
            const mascot = this.ui.getElement('#mascot');
            const targetStage = this.ui.getElement(targetStageSelector);

            if (!mascot || !targetStage) {
                console.log('⚠️ AVATAR: No se puede mover - elementos no encontrados');
                return;
            }

            console.log(`🚀 AVATAR: Moviendo a ${targetStageSelector}`);

            // Salto antes de moverse
            this.jump(GAME_CONFIG.animations.bounceHeight);

            // Movimiento después del salto
            setTimeout(() => {
                try {
                    const rect = targetStage.getBoundingClientRect();
                    const newPos = {
                        x: rect.left + 100,
                        y: rect.top + 10
                    };

                    AnimationSystem.smoothMove(mascot, this.currentPosition, newPos);
                    this.currentPosition = newPos;

                    // Salto al llegar
                    setTimeout(() => {
                        this.jump(GAME_CONFIG.animations.bounceHeight / 2);
                    }, 1200);

                } catch (e) {
                    console.warn('⚠️ AVATAR: Error en movimiento:', e.message);
                }
            }, 400);
        }

        /**
         * Actualiza el emoji del avatar
         * @param {string} emoji - Nuevo emoji para el avatar
         */
        updateEmoji(emoji) {
            this.ui.setText('#mascot', emoji);
            console.log(`🎭 AVATAR: Emoji actualizado a ${emoji}`);
        }

        /**
         * Celebración del avatar (múltiples saltos)
         * @param {number} jumps - Número de saltos
         */
        celebrate(jumps = 3) {
            console.log(`🎉 AVATAR: Iniciando celebración con ${jumps} saltos`);

            for (let i = 0; i < jumps; i++) {
                setTimeout(() => {
                    this.jump(GAME_CONFIG.animations.bounceHeight);
                }, i * 400);
            }
        }
    }

    // ===== MÓDULO 10: GESTOR DE MODAL DE QUIZ =====
    class QuizModalManager {
        constructor(uiManager) {
            console.log('🎪 Inicializando gestor de modal de quiz...');
            this.ui = uiManager;
            this.isOpen = false;
            this.setupModal();
            console.log('✅ Gestor de modal de quiz inicializado');
        }

        /**
         * Configura el estilo inicial del modal
         */
        setupModal() {
            this.ui.applyStyles('#quizModal', {
                backgroundColor: GAME_CONFIG.colors.background,
                borderRadius: '15px',
                padding: '30px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                border: `3px solid ${GAME_CONFIG.colors.primary}`,
                transition: 'background-color 0.3s ease, transform 0.3s ease'
            });
            console.log('🎨 MODAL: Estilos iniciales aplicados');
        }

        /**
         * Abre el modal con el contenido del quiz
         * @param {Object} challenge - Datos del desafío
         * @param {number} stageNumber - Número de etapa
         */
        open(challenge, stageNumber) {
            console.log(`🎪 MODAL: Abriendo quiz para stage ${stageNumber}`);

            // Configurar contenido
            this.ui.setText('#quizTitle', challenge.title);
            this.ui.setText('#quizQuestion', challenge.question);

            // Configurar opciones
            challenge.options.forEach((option, index) => {
                const optionId = `#option${index + 1}`;
                const optionText = `${String.fromCharCode(65 + index)}. ${option.text}`;
                this.ui.setText(optionId, optionText);
                this._resetOptionStyle(optionId);
            });

            // Ocultar resultado
            this.ui.hide('#quizResult');

            // Resetear estilo del modal
            this._resetModalStyle();

            // Mostrar modal
            this.ui.show('#quizModal');
            this.isOpen = true;

            console.log('✅ MODAL: Quiz abierto correctamente');
        }

        /**
         * Cierra el modal
         */
        close() {
            if (!this.isOpen) return;

            console.log('🚪 MODAL: Cerrando quiz');
            this.ui.hide('#quizModal');
            this.isOpen = false;
            console.log('✅ MODAL: Quiz cerrado');
        }

        /**
         * Aplica feedback visual al modal (éxito o error)
         * @param {string} type - Tipo de feedback ('success' o 'error')
         */
        applyFeedback(type) {
            const bgColor = type === 'success' 
                ? GAME_CONFIG.colors.modalSuccess 
                : GAME_CONFIG.colors.modalDanger;

            console.log(`🎨 MODAL: Aplicando feedback ${type}`);

            this.ui.applyStyles('#quizModal', {
                backgroundColor: bgColor,
                transform: 'scale(1.02)'
            });

            // Volver al color normal después del tiempo de feedback
            setTimeout(() => {
                this._resetModalStyle();
            }, GAME_CONFIG.animations.modalFeedbackTime - 200);
        }

        /**
         * Resetea el estilo del modal al estado normal
         * @private
         */
        _resetModalStyle() {
            this.ui.applyStyles('#quizModal', {
                backgroundColor: GAME_CONFIG.colors.background,
                transform: 'scale(1)'
            });
        }

        /**
         * Aplica estilo a una opción del quiz
         * @param {string} optionSelector - Selector de la opción
         * @param {string} type - Tipo de estilo ('correct-strong', 'incorrect-strong', etc.)
         */
        styleOption(optionSelector, type) {
            let styles = {};

            switch (type) {
                case 'correct-strong':
                    styles = {
                        backgroundColor: GAME_CONFIG.colors.buttonSuccess,
                        color: GAME_CONFIG.colors.background,
                        borderColor: GAME_CONFIG.colors.buttonSuccess,
                        fontWeight: 'bold',
                        boxShadow: `0 0 15px ${GAME_CONFIG.colors.buttonSuccess}80`,
                        transform: 'scale(1.05)'
                    };
                    break;
                case 'incorrect-strong':
                    styles = {
                        backgroundColor: GAME_CONFIG.colors.buttonDanger,
                        color: GAME_CONFIG.colors.background,
                        borderColor: GAME_CONFIG.colors.buttonDanger,
                        fontWeight: 'bold',
                        boxShadow: `0 0 15px ${GAME_CONFIG.colors.buttonDanger}80`,
                        transform: 'scale(1.05)'
                    };
                    break;
                default:
                    styles = {
                        backgroundColor: GAME_CONFIG.colors.secondary,
                        color: GAME_CONFIG.colors.text,
                        borderColor: GAME_CONFIG.colors.secondary,
                        fontWeight: 'normal',
                        boxShadow: 'none',
                        transform: 'scale(1)'
                    };
            }

            styles.transition = 'all 0.3s ease';
            this.ui.applyStyles(optionSelector, styles);
            console.log(`🎨 MODAL: Estilo ${type} aplicado a ${optionSelector}`);
        }

        /**
         * Resetea el estilo de una opción
         * @param {string} optionSelector - Selector de la opción
         * @private
         */
        _resetOptionStyle(optionSelector) {
            this.styleOption(optionSelector, 'default');
        }

        /**
         * Muestra el resultado del quiz
         * @param {boolean} isCorrect - Si la respuesta fue correcta
         * @param {string} explanation - Explicación de la respuesta
         */
        showResult(isCorrect, explanation) {
            const resultText = isCorrect ? '¡Correcto!' : 'Incorrecto';
            this.ui.setText('#quizResult', `${resultText}\n${explanation}`);
            this.ui.show('#quizResult');
            console.log(`📝 MODAL: Resultado mostrado - ${resultText}`);
        }
    }

    // ===== MÓDULO 11: CLASE PRINCIPAL DEL JUEGO =====
    class VMLeadersGame {
        constructor() {
            console.log('🎮 Inicializando VM Leaders Academy Game...');

            // Inicializar todos los módulos
            this.gameState = new GameState();
            this.audioSystem = new AudioSystem();
            this.uiManager = new UIManager();
            this.progressBar = new ProgressBarManager(this.uiManager);
            this.avatar = new AvatarManager(this.uiManager, this.audioSystem);
            this.quizModal = new QuizModalManager(this.uiManager);
            this.confetti = new ConfettiSystem();

            this.isInitialized = false;
        }

        /**
         * Inicializa el juego completo
         */
        init() {
            console.log('🚀 GAME: Iniciando configuración completa...');

            try {
                this._setupEventListeners();
                this._setupBackground();
                this._updateUI();
                this.avatar.startFloating();

                this.isInitialized = true;
                console.log('✅ GAME: Juego inicializado correctamente');

                // Mostrar mensaje de bienvenida
                this._showWelcomeMessage();

            } catch (error) {
                console.error('❌ GAME: Error al inicializar:', error);
            }
        }

        /**
         * Configura todos los event listeners
         * @private
         */
        _setupEventListeners() {
            console.log('🔗 GAME: Configurando event listeners...');

            // Listeners para stages
            for (let i = 1; i <= GAME_CONFIG.totalStages; i++) {
                this.uiManager.addEventListener(`#stage${i}`, 'onClick', () => {
                    this._handleStageClick(i);
                });
            }

            // Listeners para opciones de quiz
            for (let i = 1; i <= 3; i++) {
                this.uiManager.addEventListener(`#option${i}`, 'onClick', () => {
                    this._handleAnswerSelect(i);
                });
            }

            // Otros listeners
            this.uiManager.addEventListener('#closeQuiz', 'onClick', () => {
                this.quizModal.close();
            });

            this.uiManager.addEventListener('#mascot', 'onClick', () => {
                this._handleMascotClick();
            });

            console.log('✅ GAME: Event listeners configurados');
        }

        /**
         * Configura el fondo del juego
         * @private
         */
        _setupBackground() {
            console.log('🎨 GAME: Configurando fondo...');

            this.uiManager.applyStyles('#gameArea', {
                background: `linear-gradient(135deg, 
                    ${GAME_CONFIG.colors.background} 0%, 
                    ${GAME_CONFIG.colors.secondary}30 50%, 
                    ${GAME_CONFIG.colors.primary}20 100%)`,
                minHeight: '600px',
                borderRadius: '20px',
                padding: '40px',
                boxShadow: '0 10px 30px rgba(94, 73, 115, 0.1)'
            });

            console.log('✅ GAME: Fondo configurado');
        }

        /**
         * Maneja el click en una etapa
         * @param {number} stageNumber - Número de etapa clickeada
         * @private
         */
        _handleStageClick(stageNumber) {
            console.log(`🎯 GAME: Click en stage ${stageNumber}`);

            // Verificar si está desbloqueada
            if (stageNumber > this.gameState.unlockedStages) {
                console.log(`🔒 GAME: Stage ${stageNumber} está bloqueado`);
                this._showLockedMessage(stageNumber);
                this._shakeStage(stageNumber);
                return;
            }

            // Verificar si ya está completada
            if (this.gameState.completedStages.includes(stageNumber)) {
                console.log(`✅ GAME: Stage ${stageNumber} ya completado`);
                this._showCompletedMessage(stageNumber);
                return;
            }

            // Iniciar quiz
            this._startQuiz(stageNumber);
        }

        /**
         * Inicia el quiz para una etapa
         * @param {number} stageNumber - Número de etapa
         * @private
         */
        _startQuiz(stageNumber) {
            const challenge = CHALLENGES[stageNumber];
            if (!challenge) {
                console.error(`❌ GAME: No se encontró challenge para stage ${stageNumber}`);
                return;
            }

            console.log(`📝 GAME: Iniciando quiz para stage ${stageNumber}: ${challenge.title}`);

            this.gameState.isQuizActive = true;
            this.gameState.currentQuestion = stageNumber;

            // Habilitar todas las opciones
            this._enableAllOptions();

            // Abrir modal con el contenido
            this.quizModal.open(challenge, stageNumber);
        }

        /**
         * Maneja la selección de una respuesta
         * @param {number} optionIndex - Índice de la opción seleccionada (1-3)
         * @private
         */
        _handleAnswerSelect(optionIndex) {
            if (!this.gameState.isQuizActive || !this.gameState.currentQuestion) {
                console.log('⚠️ GAME: Quiz no activo o pregunta no válida');
                return;
            }

            const challenge = CHALLENGES[this.gameState.currentQuestion];
            const selectedOption = challenge.options[optionIndex - 1];

            console.log(`💭 GAME: Opción ${optionIndex} seleccionada`);

            // Deshabilitar todas las opciones
            this._disableAllOptions();

            if (selectedOption.correct) {
                this._handleCorrectAnswer(optionIndex, challenge);
            } else {
                this._handleIncorrectAnswer(optionIndex, challenge);
            }
        }

        /**
         * Maneja una respuesta correcta
         * @param {number} optionIndex - Índice de la opción correcta
         * @param {Object} challenge - Datos del desafío
         * @private
         */
        _handleCorrectAnswer(optionIndex, challenge) {
            console.log('🎉 GAME: ¡Respuesta correcta!');

            // Aplicar estilos
            this.quizModal.styleOption(`#option${optionIndex}`, 'correct-strong');
            this.quizModal.applyFeedback('success');

            // Efectos
            this.audioSystem.play('correct');
            const optionElement = this.uiManager.getElement(`#option${optionIndex}`);
            if (optionElement) {
                AnimationSystem.pulse(optionElement);
            }

            // Mostrar resultado
            this.quizModal.showResult(true, challenge.explanation);

            // Confetti
            this.confetti.start();

            // Completar etapa después del feedback
            setTimeout(() => {
                this._completeCurrentStage();
            }, GAME_CONFIG.animations.modalFeedbackTime);
        }

        /**
         * Maneja una respuesta incorrecta
         * @param {number} optionIndex - Índice de la opción incorrecta
         * @param {Object} challenge - Datos del desafío
         * @private
         */
        _handleIncorrectAnswer(optionIndex, challenge) {
            console.log('❌ GAME: Respuesta incorrecta');

            // Aplicar estilos
            this.quizModal.styleOption(`#option${optionIndex}`, 'incorrect-strong');

            // Mostrar respuesta correcta
            const correctIndex = challenge.options.findIndex(opt => opt.correct) + 1;
            this.quizModal.styleOption(`#option${correctIndex}`, 'correct-strong');

            // Aplicar feedback al modal
            this.quizModal.applyFeedback('error');

            // Efectos
            this.audioSystem.play('incorrect');
            const optionElement = this.uiManager.getElement(`#option${optionIndex}`);
            if (optionElement) {
                AnimationSystem.shake(optionElement);
            }

            // Perder vida
            const remainingLives = this.gameState.loseLife();
            this._updateLivesDisplay();

            // Mostrar resultado
            this.quizModal.showResult(false, challenge.explanation);

            // Verificar game over o retry
            if (remainingLives === 0) {
                setTimeout(() => this._gameOver(), GAME_CONFIG.animations.modalFeedbackTime);
            } else {
                setTimeout(() => this._retryQuestion(), GAME_CONFIG.animations.modalFeedbackTime);
            }
        }

        /**
         * Completa la etapa actual
         * @private
         */
        _completeCurrentStage() {
            const stageNumber = this.gameState.currentQuestion;
            this.gameState.completeStage(stageNumber);

            console.log(`🎊 GAME: ¡Etapa ${stageNumber} completada!`);

            // Efectos de celebración
            this.audioSystem.play('complete');
            this.avatar.moveToStage(`#stage${this.gameState.currentStage}`);

            // Actualizar UI
            this._updateUI();

            // Cerrar modal
            this.quizModal.close();

            // Verificar si completó todo el juego
            if (this.gameState.completedStages.length === GAME_CONFIG.totalStages) {
                setTimeout(() => this._gameCompleted(), 1000);
            }
        }

        /**
         * Actualiza toda la interfaz de usuario
         * @private
         */
        _updateUI() {
            console.log('🔄 GAME: Actualizando UI completa...');

            this._updateStagesUI();
            this._updateProgressUI();
            this._updateMascotUI();
            this._updateStatsUI();
            this._updateHeaderUI();

            console.log('✅ GAME: UI actualizada');
        }

        /**
         * Actualiza la UI de las etapas
         * @private
         */
        _updateStagesUI() {
            for (let i = 1; i <= GAME_CONFIG.totalStages; i++) {
                const stageSelector = `#stage${i}`;

                if (this.gameState.completedStages.includes(i)) {
                    // Etapa completada
                    this.uiManager.applyStyles(stageSelector, {
                        backgroundColor: GAME_CONFIG.colors.success,
                        borderColor: GAME_CONFIG.colors.success,
                        boxShadow: `0 0 15px ${GAME_CONFIG.colors.success}60`
                    });
                    this.uiManager.show(`#check${i}`);
                    this.uiManager.hide(`#lock${i}`);

                } else if (i <= this.gameState.unlockedStages) {
                    // Etapa disponible
                    this.uiManager.applyStyles(stageSelector, {
                        backgroundColor: GAME_CONFIG.colors.primary,
                        borderColor: GAME_CONFIG.colors.primary,
                        boxShadow: `0 0 20px ${GAME_CONFIG.colors.primary}40`
                    });
                    this.uiManager.hide(`#check${i}`);
                    this.uiManager.hide(`#lock${i}`);

                } else {
                    // Etapa bloqueada
                    this.uiManager.applyStyles(stageSelector, {
                        backgroundColor: GAME_CONFIG.colors.secondary,
                        borderColor: GAME_CONFIG.colors.secondary,
                        boxShadow: 'none'
                    });
                    this.uiManager.hide(`#check${i}`);
                    this.uiManager.show(`#lock${i}`);
                }

                // Actualizar emoji
                this.uiManager.setText(stageSelector, CHALLENGES[i].emoji);
            }

            console.log('✅ UI: Stages actualizados');
        }

        /**
         * Actualiza la UI del progreso
         * @private
         */
        _updateProgressUI() {
            const progress = this.gameState.getProgress();
            this.progressBar.updateProgress(progress);
        }

        /**
         * Actualiza la UI del avatar
         * @private
         */
        _updateMascotUI() {
            const currentEmoji = CHALLENGES[this.gameState.currentStage]?.emoji || '🎓';
            this.avatar.updateEmoji(currentEmoji);
        }

        /**
         * Actualiza las estadísticas
         * @private
         */
        _updateStatsUI() {
            this.uiManager.setText('#livesCount', `❤️ ${this.gameState.currentLives}`);
            this.uiManager.setText('#scoreCount', `Puntos: ${this.gameState.score}`);
        }

        /**
         * Actualiza el header
         * @private
         */
        _updateHeaderUI() {
            this.uiManager.setText('#gameLogo', '🎓 VM Leaders Academy');
            this.uiManager.applyStyles('#gameLogo', {
                fontSize: '28px',
                fontWeight: 'bold',
                color: GAME_CONFIG.colors.primary,
                textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
            });

            this.uiManager.applyStyles('#gameHeader', {
                background: `linear-gradient(90deg, ${GAME_CONFIG.colors.primary} 0%, ${GAME_CONFIG.colors.secondary} 100%)`,
                padding: '20px',
                borderRadius: '15px 15px 0 0',
                boxShadow: '0 4px 15px rgba(94, 73, 115, 0.2)',
                color: GAME_CONFIG.colors.background
            });
        }

        /**
         * Actualiza el display de vidas
         * @private
         */
        _updateLivesDisplay() {
            this.uiManager.setText('#livesCount', `❤️ ${this.gameState.currentLives}`);
        }

        /**
         * Habilita todas las opciones del quiz
         * @private
         */
        _enableAllOptions() {
            for (let i = 1; i <= 3; i++) {
                const element = this.uiManager.getElement(`#option${i}`);
                if (element && element.enable) {
                    element.enable();
                }
                this.quizModal.styleOption(`#option${i}`, 'default');
            }
            console.log('🔓 GAME: Todas las opciones habilitadas');
        }

        /**
         * Deshabilita todas las opciones del quiz
         * @private
         */
        _disableAllOptions() {
            for (let i = 1; i <= 3; i++) {
                const element = this.uiManager.getElement(`#option${i}`);
                if (element && element.disable) {
                    element.disable();
                }
            }
            console.log('🔒 GAME: Todas las opciones deshabilitadas');
        }

        /**
         * Maneja el click en el avatar
         * @private
         */
        _handleMascotClick() {
            console.log('🎭 GAME: Click en mascot');

            const messages = [
                '¡Excelente progreso! 🚀',
                'Sigue adelante, lo estás haciendo genial 💪',
                '¡Tu futuro profesional está en tus manos! 👑',
                'Cada etapa te acerca más al éxito 🎯'
            ];

            const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            console.log(`💬 MASCOT: ${randomMessage}`);

            // Hacer que el avatar salte
            this.avatar.jump();
        }

        /**
         * Muestra mensaje de etapa bloqueada
         * @param {number} stageNumber - Número de etapa
         * @private
         */
        _showLockedMessage(stageNumber) {
            console.log(`🔒 GAME: Etapa ${stageNumber} bloqueada - completa las anteriores primero`);
        }

        /**
         * Muestra mensaje de etapa completada
         * @param {number} stageNumber - Número de etapa
         * @private
         */
        _showCompletedMessage(stageNumber) {
            console.log(`✅ GAME: Etapa ${stageNumber} ya completada - ¡Excelente trabajo!`);
        }

        /**
         * Hace temblar una etapa
         * @param {number} stageNumber - Número de etapa
         * @private
         */
        _shakeStage(stageNumber) {
            const element = this.uiManager.getElement(`#stage${stageNumber}`);
            if (element) {
                AnimationSystem.shake(element);
            }
        }

        /**
         * Reinicia la pregunta para un retry
         * @private
         */
        _retryQuestion() {
            console.log('🔄 GAME: Preparando retry...');
            this._enableAllOptions();
            this.gameState.isQuizActive = true;
            this.quizModal.showResult(false, 'Inténtalo de nuevo. ¡Tú puedes!');
        }

        /**
         * Maneja el game over
         * @private
         */
        _gameOver() {
            console.log('💀 GAME: Game Over - Se acabaron las vidas');
            this.quizModal.close();
            this.audioSystem.play('gameOver');
        }

        /**
         * Maneja la finalización del juego
         * @private
         */
        _gameCompleted() {
            console.log('🏆 GAME: ¡JUEGO COMPLETADO!');
            this.audioSystem.play('gameComplete');
            this.avatar.celebrate(5);
            this.confetti.start(5000); // Confetti por 5 segundos

            console.log('🎉 ¡FELICIDADES! Has dominado todos los aspectos del liderazgo corporativo');
        }

        /**
         * Muestra mensaje de bienvenida
         * @private
         */
        _showWelcomeMessage() {
            console.log('🎓 ========================================');
            console.log('🎓 BIENVENIDO A VM LEADERS ACADEMY GAME');
            console.log('🎓 ========================================');
            console.log('🎯 Objetivo: Completar las 5 etapas de liderazgo');
            console.log('💡 Tip: Haz click en el avatar para motivación');
            console.log('🔧 Debug: Usa vmGame.reset() para reiniciar');
            console.log('🎮 ¡Comienza haciendo click en la primera etapa!');
        }

        // ===== MÉTODOS PÚBLICOS PARA DEBUG =====

        /**
         * Reinicia el juego completo
         */
        reset() {
            console.log('🔄 GAME: Reiniciando juego completo...');
            this.gameState = new GameState();
            this.confetti.stop();
            this._updateUI();
            this.avatar.moveToStage('#stage1');
            console.log('✅ GAME: Juego reiniciado');
        }

        /**
         * Desbloquea todas las etapas (debug)
         */
        debugUnlockAll() {
            console.log('🔓 DEBUG: Desbloqueando todas las etapas');
            this.gameState.unlockedStages = GAME_CONFIG.totalStages;
            this._updateUI();
            console.log('✅ DEBUG: Todas las etapas desbloqueadas');
        }

        /**
         * Completa una etapa específica (debug)
         * @param {number} stageNumber - Número de etapa a completar
         */
        debugCompleteStage(stageNumber) {
            if (stageNumber >= 1 && stageNumber <= GAME_CONFIG.totalStages) {
                console.log(`🔧 DEBUG: Completando stage ${stageNumber}`);
                this.gameState.completeStage(stageNumber);
                this._updateUI();
                this.avatar.moveToStage(`#stage${this.gameState.currentStage}`);
                console.log(`✅ DEBUG: Stage ${stageNumber} completado`);
            } else {
                console.warn('⚠️ DEBUG: Número de stage inválido');
            }
        }

        /**
         * Muestra el estado actual del juego (debug)
         */
        debugShowState() {
            console.log('📊 DEBUG: Estado actual del juego:');
            console.log(`   Current Stage: ${this.gameState.currentStage}`);
            console.log(`   Unlocked Stages: ${this.gameState.unlockedStages}`);
            console.log(`   Completed Stages: [${this.gameState.completedStages.join(', ')}]`);
            console.log(`   Lives: ${this.gameState.currentLives}`);
            console.log(`   Score: ${this.gameState.score}`);
            console.log(`   Progress: ${Math.round(this.gameState.getProgress())}%`);
        }
    }

    // ===== INICIALIZACIÓN PRINCIPAL =====
    console.log('🚀 Iniciando VM Leaders Academy...');

    // Crear instancia global del juego
    const vmGame = new VMLeadersGame();

    // Inicializar el juego
    vmGame.init();

    // Exponer para debug en consola
    if (typeof window !== 'undefined') {
        window.vmGame = vmGame;
    }

    console.log('🎮 VM Leaders Academy listo para jugar!');
    console.log('🔧 Funciones de debug disponibles:');
    console.log('   vmGame.reset() - Reiniciar juego');
    console.log('   vmGame.debugUnlockAll() - Desbloquear todo');
    console.log('   vmGame.debugCompleteStage(n) - Completar stage n');
    console.log('   vmGame.debugShowState() - Mostrar estado');

});