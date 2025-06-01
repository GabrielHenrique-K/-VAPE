document.addEventListener('DOMContentLoaded', () => {
    // Tab Navigation
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Project Modal Functionality
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('projectModal');
    const modalClose = document.querySelector('.modal-close');
    
    // Project data
    const projectData = {
        // Descartáveis Projects
        'monitor-ambiental': {
            title: 'Monitor Ambiental IoT',
            difficulty: 'Médio',
            time: '4-6h',
            impact: '78% redução emissões',
            description: 'Sistema de monitoramento ambiental que utiliza o sensor MEMS do vape para detectar partículas finas (PM2.5/PM10) no ar e enviar alertas automáticos para seu smartphone quando a qualidade do ar deteriora.',
            materials: [
                'Sensor MEMS do vape descartável',
                'Microcontrolador ESP8266 ou ESP32',
                'Bateria do vape (590-850mAh)',
                'Caixa impressa em 3D ou reciclada',
                'Jumper wires',
                'Resistores e capacitores básicos'
            ],
            benefits: 'Este projeto reduz a pegada de carbono em 78% quando comparado à compra de um novo monitor de qualidade do ar. Ajuda a prevenir problemas respiratórios ao alertar sobre níveis perigosos de poluentes.'
        },
        'irrigacao': {
            title: 'Sistema Irrigação Inteligente',
            difficulty: 'Fácil',
            time: '2-3h',
            impact: '40-60% economia água',
            description: 'Sistema de irrigação automatizado que utiliza componentes de vapes para criar um sensor de umidade do solo e uma bomba de água controlada eletronicamente, garantindo que suas plantas recebam a quantidade ideal de água.',
            materials: [
                'Circuito eletrônico do vape',
                'Bateria do vape',
                'Bomba de água pequena (5V DC)',
                'Sensor de umidade do solo (pode ser criado com pregos galvanizados)',
                'Tubos de irrigação',
                'Recipiente plástico para reservatório'
            ],
            benefits: 'Reduz o consumo de água entre 40-60% em comparação com irrigação manual. Elimina o desperdício e garante que as plantas recebam a quantidade certa de água, mesmo durante viagens.'
        },
        'carregador-solar': {
            title: 'Carregador Solar Portátil',
            difficulty: 'Médio',
            time: '3-4h',
            impact: '100% energia renovável',
            description: 'Transforme a bateria e o circuito de carregamento do vape em um power bank alimentado por energia solar, ideal para carregar dispositivos móveis em atividades ao ar livre.',
            materials: [
                'Bateria de lítio do vape',
                'Circuito de carregamento do vape',
                'Painel solar pequeno (5V/1-2W)',
                'Módulo boost converter (opcional)',
                'Diodo de proteção',
                'Carcaça do vape ou case reciclado',
                'Conector USB'
            ],
            benefits: 'Utiliza 100% energia renovável para carregar dispositivos. Evita o descarte inadequado de baterias de lítio e prolonga significativamente a vida útil dos componentes eletrônicos.'
        },
        'detector-vazamentos': {
            title: 'Detector de Vazamentos',
            difficulty: 'Fácil',
            time: '2-3h',
            impact: 'Prevenção acidentes',
            description: 'Sistema de segurança que utiliza o sensor MEMS do vape para detectar gases ou vazamentos de água em ambientes domésticos, emitindo alertas sonoros quando detecta anomalias.',
            materials: [
                'Sensor MEMS do vape',
                'Microcontrolador (Arduino Nano ou similar)',
                'Bateria do vape',
                'Buzzer pequeno',
                'LEDs indicadores',
                'Carcaça do vape modificada'
            ],
            benefits: 'Previne acidentes domésticos como vazamentos de gás ou inundações. Pode evitar danos materiais significativos e proteger vidas ao detectar precocemente situações perigosas.'
        },
        'difusor-aromas': {
            title: 'Difusor Aromas Automático',
            difficulty: 'Fácil',
            time: '1-2h',
            impact: 'Bem-estar mental',
            description: 'Aproveite o sistema de atomização do vape para criar um difusor de aromas programável, que libera essências naturais em intervalos ajustáveis para melhorar o ambiente.',
            materials: [
                'Sistema de atomização do vape',
                'Circuito eletrônico do vape',
                'Bateria do vape',
                'Recipiente para óleos essenciais',
                'Timer programável (pode usar o próprio circuito)',
                'Case decorativo reciclado'
            ],
            benefits: 'Promove bem-estar e relaxamento através da aromaterapia. Reduz o estresse e melhora o ambiente sem usar aerossóis químicos ou sistemas elétricos que consomem muita energia.'
        },
        
        // Pods Projects
        'dosador-automatico': {
            title: 'Dosador Automático de Precisão',
            difficulty: 'Médio',
            time: '2-3h',
            impact: '±0.1ml precisão',
            description: 'Transforme o pod recarregável em um sistema de dosagem micrométrica para líquidos como medicamentos, óleos essenciais ou reagentes químicos com controle preciso de volume.',
            materials: [
                'Pod transparente do sistema Vaporesso',
                'Circuito de controle do vape',
                'Bateria interna',
                'Microcontrolador pequeno (opcional)',
                'Seringa de precisão (para calibração)',
                'Tubo de silicone fino'
            ],
            benefits: 'Oferece precisão de ±0.1ml na dosagem de líquidos. Ideal para aplicações que exigem medições exatas, como cuidados de saúde domiciliares ou projetos científicos caseiros.'
        },
        'sensor-proximidade': {
            title: 'Sensor de Proximidade Magnético',
            difficulty: 'Fácil',
            time: '1-2h',
            impact: 'Automação residencial',
            description: 'Utilize o sistema magnético do pod para criar um sensor de proximidade para portas, gavetas ou janelas, integrável com sistemas de automação residencial.',
            materials: [
                'Sistema magnético do pod',
                'Circuito simples do vape',
                'Bateria do vape',
                'Fios condutores',
                'Adaptador para saídas digitais (opcional)',
                'Case para fixação'
            ],
            benefits: 'Aplicável em automação residencial, detecção de presença a 1-5cm de distância. Consumo mínimo de energia e pode ser integrado em sistemas IoT para segurança doméstica.'
        },
        'inalador-medicinal': {
            title: 'Inalador Medicinal Natural',
            difficulty: 'Médio',
            time: '3-4h',
            impact: 'Fitoterapia controlada',
            description: 'Transforme o sistema de vaporização do pod em um inalador controlado para óleos essenciais e extratos fitoterápicos, com controle preciso de temperatura e dosagem.',
            materials: [
                'Sistema de atomização do pod',
                'Circuito controlador do vape',
                'Bateria interna',
                'Recipiente para extratos medicinais',
                'Bocal sanitizado',
                'Controlador de temperatura'
            ],
            benefits: 'Permite tratamentos de fitoterapia controlada com vaporização entre 40-60°C. Ideal para inalação de óleos essenciais terapêuticos e extratos naturais com propriedades medicinais.'
        },
        'indicador-nivel': {
            title: 'Indicador de Nível Inteligente',
            difficulty: 'Fácil',
            time: '2h',
            impact: 'Controle automático',
            description: 'Aproveite o pod transparente e o circuito do vape para criar um indicador de nível para recipientes de líquidos ou grãos, com alertas quando atinge níveis mínimos.',
            materials: [
                'Pod transparente',
                'Sensores do vape',
                'Circuito controlador',
                'LEDs indicadores',
                'Bateria do vape',
                'Suporte para fixação'
            ],
            benefits: 'Automatiza o monitoramento de estoques de líquidos e grãos. Reduz desperdício e ajuda no gerenciamento de recursos domésticos como água, ração animal ou grãos.'
        },
        
        // Recarregáveis Projects
        'sistema-ups': {
            title: 'Sistema UPS Doméstico',
            difficulty: 'Avançado',
            time: '8-12h',
            impact: '100-200W proteção',
            description: 'Crie um sistema no-break caseiro utilizando múltiplas baterias 18650 recuperadas de vapes, capaz de manter dispositivos essenciais funcionando durante quedas de energia.',
            materials: [
                '4-8 baterias 18650 de vapes',
                'Módulo inversor DC-AC',
                'BMS (Battery Management System)',
                'Caixa para montagem',
                'Fios de conexão adequados',
                'Fusíveis de proteção',
                'Interruptor on/off'
            ],
            benefits: 'Oferece proteção de 100-200W para equipamentos essenciais como roteadores, lâmpadas de emergência ou dispositivos médicos durante quedas de energia, com custo muito inferior a sistemas comerciais.'
        },
        'estacao-solar': {
            title: 'Estação de Energia Solar',
            difficulty: 'Avançado', 
            time: '12-20h',
            impact: '10-50Ah independência',
            description: 'Desenvolva uma estação de energia solar completa usando baterias 18650/21700 de vapes, capaz de armazenar energia solar para uso posterior em diversos dispositivos.',
            materials: [
                '8-20 baterias 18650/21700',
                'Painéis solares (50-100W)',
                'Controlador de carga MPPT/PWM',
                'Inversor DC-AC',
                'BMS (Battery Management System)',
                'Case resistente a intempéries',
                'Conectores diversos (USB, DC)'
            ],
            benefits: 'Proporciona 10-50Ah de independência energética usando energia 100% renovável. Reduz a pegada de carbono e oferece energia em locais remotos ou durante emergências.'
        },
        'kit-soldagem': {
            title: 'Kit de Soldagem Portátil',
            difficulty: 'Médio',
            time: '4-6h',
            impact: '40-60W portátil',
            description: 'Monte um ferro de solda portátil alimentado por baterias 18650, ideal para trabalhos em campo ou reparos rápidos sem acesso à rede elétrica.',
            materials: [
                '2-3 baterias 18650 de vapes',
                'Módulo boost converter',
                'Ponta de solda e elemento aquecedor',
                'Controlador de temperatura PID',
                'Caixa resistente ao calor',
                'Display de temperatura (opcional)',
                'Suporte para ferro de solda'
            ],
            benefits: 'Fornece 40-60W de potência portátil para soldagem entre 200-450°C. Permite reparos eletrônicos em qualquer lugar, reduzindo a necessidade de substituição de equipamentos danificados.'
        },
        'monitor-industrial': {
            title: 'Monitor Industrial Multiparâmetro',
            difficulty: 'Avançado',
            time: '10-15h', 
            impact: 'IoT industrial',
            description: 'Crie um sistema de monitoramento industrial robusto utilizando baterias de alta capacidade e circuitos de vapes para medir múltiplos parâmetros ambientais em ambientes industriais.',
            materials: [
                'Baterias 18650/21700 de vapes',
                'Módulo LoRa/NB-IoT para comunicação',
                'Sensores diversos (temperatura, umidade, gases)',
                'Microcontrolador ESP32 ou similar',
                'Case industrial à prova d\'água',
                'Painel solar para recarga (opcional)',
                'Antena externa para melhor alcance'
            ],
            benefits: 'Implementa monitoramento IoT industrial a custo reduzido. Fornece dados em tempo real sobre condições ambientais, permitindo intervenções preventivas e redução de riscos.'
        },
        'fonte-alimentacao': {
            title: 'Fonte de Alimentação Regulável',
            difficulty: 'Médio',
            time: '6-8h',
            impact: '3-24V ajustável',
            description: 'Aproveite o circuito controlador e as baterias de vapes recarregáveis para criar uma fonte de alimentação variável para projetos eletrônicos, com voltagem e corrente ajustáveis.',
            materials: [
                '2-4 baterias 18650',
                'Circuito regulador de tensão',
                'Potenciômetro para ajuste',
                'Display digital (opcional)',
                'Conectores de saída diversos',
                'Case com dissipador de calor',
                'Interruptor on/off'
            ],
            benefits: 'Oferece fonte variável 3-24V ajustável para projetos eletrônicos. Reduz o custo e o impacto ambiental quando comparado à compra de fontes comerciais, além de reciclar componentes.'
        }
    };
    
    // Open modal with project details
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project');
            const project = projectData[projectId];
            
            if (project) {
                // Populate modal with project data
                document.getElementById('modalTitle').textContent = project.title;
                document.querySelector('.modal-difficulty').textContent = project.difficulty;
                document.querySelector('.modal-difficulty').className = `modal-difficulty difficulty ${project.difficulty.toLowerCase()}`;
                document.querySelector('.modal-time').textContent = project.time;
                document.querySelector('.modal-description').textContent = project.description;
                document.querySelector('.modal-impact').textContent = project.impact;
                
                // Add materials list
                const materialsList = document.getElementById('modalMaterials');
                materialsList.innerHTML = '';
                project.materials.forEach(material => {
                    const li = document.createElement('li');
                    li.textContent = material;
                    materialsList.appendChild(li);
                });
                
                // Add benefits
                document.getElementById('modalBenefits').textContent = project.benefits;
                
                // Show modal
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            }
        });
    });
    
    // Close modal
    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable scrolling
    });
    
    // Close modal when clicking outside of content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = ''; // Re-enable scrolling
        }
    });

    // Hero CTA button animation
    const heroCta = document.querySelector('.hero-cta');
    if (heroCta) {
        heroCta.addEventListener('click', () => {
            document.querySelector('.cleaning-section').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    // Add intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements that should animate when scrolled into view
    document.querySelectorAll('.component-card, .project-card, .step, .liquid-item, .stat-large, .benefit-item').forEach(element => {
        element.classList.add('animate-element');
        observer.observe(element);
    });
});