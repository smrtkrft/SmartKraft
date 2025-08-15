// Simple language switching system
let currentLanguage = 'de';

console.log('SmartKraft script loading...');

// Immediate language initialization (before DOM ready)
(function() {
    // Set HTML lang attribute immediately
    document.documentElement.lang = 'de';
    
    // Set greeting to German immediately when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        const greeting = document.getElementById('dynamicGreeting');
        if (greeting) {
            greeting.textContent = 'Bald geht es los!';
            // Remove any translation attributes if they exist
            greeting.removeAttribute('data-tr');
            greeting.removeAttribute('data-en');
            greeting.removeAttribute('data-de');
        }
    });
})();

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...');
    
    // Initialize language system
    initializeLanguage();
    
    // Initialize other features
    initializeNavigation();
    initializeScrollEffects();
    initializeInteractivity();
    initializeInteractiveBanner();
    initializeCopyButton();
    initializeNetworkAnimation();
    initializeProgressCircles();
    initializeNewsletter();
    
    // Ensure greeting is always German - final check
    const greeting = document.getElementById('dynamicGreeting');
    if (greeting && greeting.textContent !== 'Bald geht es los!') {
        greeting.textContent = 'Bald geht es los!';
    }
    
    console.log('All systems initialized');
});

// Language switching functionality
function initializeLanguage() {
    console.log('Initializing language system...');
    
    // Find all language buttons
    const langButtons = document.querySelectorAll('.lang-btn');
    console.log(`Found ${langButtons.length} language buttons`);
    
    // Add click event to each button
    langButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.getAttribute('data-lang');
            console.log(`Language button clicked: ${lang}`);
            switchLanguage(lang);
        });
    });
    
    // Set initial language
    const initialLang = document.documentElement.lang || 'de';
    console.log(`Setting initial language to: ${initialLang}`);
    switchLanguage(initialLang);
}

function switchLanguage(lang) {
    console.log(`Switching to language: ${lang}`);
    
    if (!['tr', 'en', 'de'].includes(lang)) {
        console.error(`Invalid language: ${lang}`);
        return;
    }
    
    currentLanguage = lang;
    
    // Update button states
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(button => {
        button.classList.remove('active');
        if (button.getAttribute('data-lang') === lang) {
            button.classList.add('active');
        }
    });
    
    // Update all text elements (excluding dynamicGreeting which is fixed German)
    const elements = document.querySelectorAll('[data-tr][data-en][data-de]:not(#dynamicGreeting)');
    console.log(`Found ${elements.length} elements to translate`);
    
    elements.forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = text;
            } else {
                element.innerHTML = text;
            }
            console.log(`Updated element: ${element.tagName}.${element.className} with text: ${text}`);
        }
    });
    
    // Update placeholder texts separately
    const placeholderElements = document.querySelectorAll('[data-tr-placeholder][data-en-placeholder][data-de-placeholder]');
    console.log(`Found ${placeholderElements.length} placeholder elements to translate`);
    
    placeholderElements.forEach(element => {
        const placeholderText = element.getAttribute(`data-${lang}-placeholder`);
        if (placeholderText) {
            element.placeholder = placeholderText;
            console.log(`Updated placeholder: ${element.id || element.className} with placeholder: ${placeholderText}`);
        }
    });
    
    // Keep dynamicGreeting always fixed as German
    const dynamicGreeting = document.getElementById('dynamicGreeting');
    if (dynamicGreeting) {
        dynamicGreeting.textContent = 'Bald geht es los!';
    }
    
    // Update page title
    const titles = {
        tr: 'SmartKraft - Açık Kaynak IoT Çözümleri',
        en: 'SmartKraft - Open Source IoT Solutions',
        de: 'SmartKraft - Open Source IoT-Lösungen'
    };
    document.title = titles[lang] || titles.tr;
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
    // Dispatch custom event for license page translations
    const languageEvent = new CustomEvent('languageChanged', {
        detail: { language: lang }
    });
    document.dispatchEvent(languageEvent);
    
    // Handle license page data-translate elements
    if (window.location.pathname.includes('license.html')) {
        translateLicenseElements(lang);
    }
    
    console.log(`Language switched to: ${lang}`);
}

// License page translation function
function translateLicenseElements(lang) {
    console.log(`Translating license page to: ${lang}`);
    
    // Simple license translations
    const licenseTexts = {
        'hero-title': {
            tr: 'Lisanslar ve Kullanım Hakları',
            en: 'Licenses and Usage Rights', 
            de: 'Lizenzen und Nutzungsrechte'
        },
        'hero-description': {
            tr: 'Bilginin özgürleşmesi ve emeğin korunması arasındaki dengeyi nasıl kurduğumuzu öğrenin. Hangi içerikleri nasıl kullanabileceğiniz, hangi kurallara uymanız gerektiği hakkında detaylı rehber.',
            en: 'Learn how we balance the liberation of knowledge with the protection of labor. A detailed guide on what content you can use and what rules you need to follow.',
            de: 'Erfahren Sie, wie wir das Gleichgewicht zwischen der Befreiung des Wissens und dem Schutz der Arbeit schaffen. Ein detaillierter Leitfaden darüber, welche Inhalte Sie nutzen können und welche Regeln Sie befolgen müssen.'
        },
        'philosophy-title': {
            tr: 'Felsefemiz ve Yaklaşımımız',
            en: 'Our Philosophy and Approach',
            de: 'Unsere Philosophie und Herangehensweise'
        },
        'footer-description': {
            tr: 'Açık kaynak IoT çözümleri ile geleceğe katkı sağlıyoruz.',
            en: 'Contributing to the future with open source IoT solutions.',
            de: 'Zur Zukunft beitragen mit Open-Source-IoT-Lösungen.'
        },
        'footer-privacy': {
            tr: 'Gizlilik',
            en: 'Privacy',
            de: 'Datenschutz'
        },
        'footer-license': {
            tr: 'Lisans ve Kullanım',
            en: 'License and Usage',
            de: 'Lizenz und Nutzung'
        },
        'philosophy-p1': {
            tr: 'SmartKraft olarak, <strong>bilginin ve gelişimin özgürce paylaşılması</strong> gerektiğine inanıyoruz. Açık kaynak felsefesi, teknolojinin demokratikleşmesi ve herkesin öğrenip geliştirebilmesi için temel bir araçtır. Ancak bu özgürlüğün, <strong>emek ve yaratıcılığın değerini koruyacak</strong> şekilde uygulanması gerektiğini de düşünüyoruz.',
            en: 'As SmartKraft, we believe that <strong>knowledge and development should be shared freely</strong>. Open source philosophy is a fundamental tool for democratizing technology and enabling everyone to learn and develop. However, we also think this freedom should be applied in a way that <strong>protects the value of labor and creativity</strong>.',
            de: 'Als SmartKraft glauben wir, dass <strong>Wissen und Entwicklung frei geteilt werden sollten</strong>. Die Open-Source-Philosophie ist ein grundlegendes Werkzeug zur Demokratisierung der Technologie und ermöglicht es jedem zu lernen und sich zu entwickeln. Wir denken jedoch auch, dass diese Freiheit so angewendet werden sollte, dass sie <strong>den Wert von Arbeit und Kreativität schützt</strong>.'
        },
        'philosophy-p2': {
            tr: 'Bu nedenle farklı içerik türleri için farklı lisans stratejileri benimsiyor, hem paylaşımı teşvik ediyor hem de yaratıcı emeği koruyoruz. Amacımız, toplulukla birlikte büyürken kimliğimizi ve değerlerimizi de korumaktır.',
            en: 'Therefore, we adopt different license strategies for different content types, both encouraging sharing and protecting creative labor. Our goal is to preserve our identity and values while growing together with the community.',
            de: 'Daher verfolgen wir unterschiedliche Lizenzstrategien für verschiedene Inhaltstypen, fördern das Teilen und schützen gleichzeitig die kreative Arbeit. Unser Ziel ist es, unsere Identität und Werte zu bewahren, während wir gemeinsam mit der Community wachsen.'
        },
        'philosophy-summary': {
            tr: '<strong>Özetle:</strong> Kodlarımız tamamen açık, teknik bilgilerimiz paylaşıma açık, markamız ve kimliğimiz korunmalı. Öğrenin, geliştirin, paylaşın - ama SmartKraft kimliğine saygı gösterin.',
            en: '<strong>In summary:</strong> Our codes are completely open, our technical knowledge is open to sharing, our brand and identity must be protected. Learn, develop, share - but respect the SmartKraft identity.',
            de: '<strong>Zusammenfassung:</strong> Unsere Codes sind völlig offen, unser technisches Wissen ist zum Teilen verfügbar, unsere Marke und Identität müssen geschützt werden. Lernen, entwickeln, teilen - aber respektieren Sie die SmartKraft-Identität.'
        },
        'opensource-title': {
            tr: 'Açık Kaynak Kodlarımız',
            en: 'Our Open Source Codes', 
            de: 'Unsere Open-Source-Codes'
        },
        'github-title': {
            tr: 'GitHub Repository\'leri - AGPL 3.0 Lisansı',
            en: 'GitHub Repositories - AGPL 3.0 License',
            de: 'GitHub-Repositories - AGPL 3.0 Lizenz'
        },
        'github-description': {
            tr: 'GitHub\'da yayınladığımız tüm kod <strong>AGPL 3.0 (GNU Affero General Public License)</strong> altında lisanslanmıştır. Bu güçlü bir copyleft lisansıdır ve şu hakları verir:',
            en: 'All code we publish on GitHub is licensed under <strong>AGPL 3.0 (GNU Affero General Public License)</strong>. This is a strong copyleft license that grants the following rights:',
            de: 'Aller Code, den wir auf GitHub veröffentlichen, ist unter <strong>AGPL 3.0 (GNU Affero General Public License)</strong> lizenziert. Dies ist eine starke Copyleft-Lizenz, die folgende Rechte gewährt:'
        },
        'agpl-rights-use': {
            tr: '<strong>Kullanabilirsiniz:</strong> Kodu istediğiniz amaçla kullanabilirsiniz',
            en: '<strong>Use:</strong> You can use the code for any purpose',
            de: '<strong>Nutzen:</strong> Sie können den Code für jeden Zweck verwenden'
        },
        'agpl-rights-modify': {
            tr: '<strong>Değiştirebilirsiniz:</strong> Kodda istediğiniz değişiklikleri yapabilirsiniz',
            en: '<strong>Modify:</strong> You can make any changes to the code',
            de: '<strong>Ändern:</strong> Sie können beliebige Änderungen am Code vornehmen'
        },
        'agpl-rights-distribute': {
            tr: '<strong>Dağıtabilirsiniz:</strong> Kodun kopyalarını başkalarıyla paylaşabilirsiniz',
            en: '<strong>Distribute:</strong> You can share copies of the code with others',
            de: '<strong>Verteilen:</strong> Sie können Kopien des Codes mit anderen teilen'
        },
        'agpl-rights-commercial': {
            tr: '<strong>Ticari kullanabilirsiniz:</strong> Kodu ticari projelerinizde kullanabilirsiniz',
            en: '<strong>Commercial use:</strong> You can use the code in your commercial projects',
            de: '<strong>Kommerzielle Nutzung:</strong> Sie können den Code in Ihren kommerziellen Projekten verwenden'
        },
        'agpl-obligations-title': {
            tr: '<strong>Karşılığında yapmanız gerekenler:</strong>',
            en: '<strong>In return, you must:</strong>',
            de: '<strong>Im Gegenzug müssen Sie:</strong>'
        },
        'agpl-obligations-source': {
            tr: '<strong>Kaynak kodu paylaşın:</strong> Türev çalışmalarınızın kaynak kodunu da AGPL ile paylaşmalısınız',
            en: '<strong>Share source code:</strong> You must also share the source code of your derivative works under AGPL',
            de: '<strong>Quellcode teilen:</strong> Sie müssen auch den Quellcode Ihrer abgeleiteten Werke unter AGPL teilen'
        },
        'agpl-obligations-license': {
            tr: '<strong>Lisans bilgisini koruyun:</strong> Telif hakkı ve lisans bilgilerini muhafaza edin',
            en: '<strong>Preserve license information:</strong> Maintain copyright and license information',
            de: '<strong>Lizenzinformationen bewahren:</strong> Urheberrechts- und Lizenzinformationen beibehalten'
        },
        'agpl-obligations-changes': {
            tr: '<strong>Değişiklikleri belirtin:</strong> Yaptığınız değişiklikleri açıkça belirtin',
            en: '<strong>State changes:</strong> Clearly indicate the changes you made',
            de: '<strong>Änderungen angeben:</strong> Geben Sie die von Ihnen vorgenommenen Änderungen klar an'
        },
        'agpl-obligations-network': {
            tr: '<strong>Ağ üzerinden kullanımda da paylaşın:</strong> Kodunuzu web servisi olarak sunuyorsanız da kaynak kodunu açmalısınız',
            en: '<strong>Share for network use too:</strong> If you offer your code as a web service, you must also open the source code',
            de: '<strong>Auch für Netzwerknutzung teilen:</strong> Wenn Sie Ihren Code als Webdienst anbieten, müssen Sie auch den Quellcode öffnen'
        },
        'agpl-reasoning': {
            tr: 'Bu yaklaşımın nedeni basit: Bizim açık kaynak emeğimizden yararlanan herkesin, kendi katkılarını da toplulukla paylaşmasını istiyoruz. Böylece ekosistem büyür ve herkes kazanır.',
            en: 'The reason for this approach is simple: We want everyone who benefits from our open source work to also share their contributions with the community. This way the ecosystem grows and everyone wins.',
            de: 'Der Grund für diesen Ansatz ist einfach: Wir möchten, dass jeder, der von unserer Open-Source-Arbeit profitiert, auch seine Beiträge mit der Community teilt. So wächst das Ökosystem und alle gewinnen.'
        },
        'agpl-link': {
            tr: 'AGPL 3.0 Tam Lisans Metni',
            en: 'AGPL 3.0 Full License Text',
            de: 'AGPL 3.0 Vollständiger Lizenztext'
        },
        'technical-title': {
            tr: 'Teknik İçerik ve Dokümantasyonlar',
            en: 'Technical Content and Documentation',
            de: 'Technische Inhalte und Dokumentation'
        },
        'cc-title': {
            tr: 'Creative Commons BY-SA 4.0 Lisansı',
            en: 'Creative Commons BY-SA 4.0 License',
            de: 'Creative Commons BY-SA 4.0 Lizenz'
        },
        'cc-description': {
            tr: 'Teknik yazılarımız, rehberlerimiz, şemalarımız ve dokümantasyonlarımız <strong>Creative Commons Attribution-ShareAlike 4.0</strong> lisansı ile paylaşılır. Bu lisans şu hakları verir:',
            en: 'Our technical articles, guides, schematics and documentation are shared under <strong>Creative Commons Attribution-ShareAlike 4.0</strong> license. This license grants the following rights:',
            de: 'Unsere technischen Artikel, Leitfäden, Schaltpläne und Dokumentation werden unter der <strong>Creative Commons Attribution-ShareAlike 4.0</strong> Lizenz geteilt. Diese Lizenz gewährt folgende Rechte:'
        },
        'cc-rights-share': {
            tr: '<strong>Paylaşabilirsiniz:</strong> İçeriği her formatta kopyalayıp dağıtabilirsiniz',
            en: '<strong>Share:</strong> You can copy and distribute the content in any format',
            de: '<strong>Teilen:</strong> Sie können den Inhalt in jedem Format kopieren und verteilen'
        },
        'cc-rights-adapt': {
            tr: '<strong>Uyarlayabilirsiniz:</strong> İçeriği değiştirip geliştirebilirsiniz',
            en: '<strong>Adapt:</strong> You can modify and improve the content',
            de: '<strong>Anpassen:</strong> Sie können den Inhalt ändern und verbessern'
        },
        'cc-rights-commercial': {
            tr: '<strong>Ticari kullanabilirsiniz:</strong> İçeriği ticari amaçlarla da kullanabilirsiniz',
            en: '<strong>Commercial use:</strong> You can also use the content for commercial purposes',
            de: '<strong>Kommerzielle Nutzung:</strong> Sie können den Inhalt auch für kommerzielle Zwecke verwenden'
        },
        'cc-obligations-title': {
            tr: '<strong>Karşılığında yapmanız gerekenler:</strong>',
            en: '<strong>In return, you must:</strong>',
            de: '<strong>Im Gegenzug müssen Sie:</strong>'
        },
        'cc-obligations-attribution': {
            tr: '<strong>Atıf yapın (Attribution):</strong> SmartKraft\'ı kaynak olarak belirtin',
            en: '<strong>Attribution:</strong> Credit SmartKraft as the source',
            de: '<strong>Namensnennung:</strong> Nennen Sie SmartKraft als Quelle'
        },
        'cc-obligations-sharealike': {
            tr: '<strong>Aynı lisansla paylaşın (ShareAlike):</strong> Türev çalışmalarınızı da CC BY-SA ile lisanslayın',
            en: '<strong>ShareAlike:</strong> License your derivative works under CC BY-SA as well',
            de: '<strong>Weitergabe unter gleichen Bedingungen:</strong> Lizenzieren Sie Ihre abgeleiteten Werke ebenfalls unter CC BY-SA'
        },
        'cc-obligations-changes': {
            tr: '<strong>Değişiklikleri belirtin:</strong> Orijinal içerikte değişiklik yaptıysanız bunu açık bir şekilde belirtin',
            en: '<strong>Indicate changes:</strong> If you modified the original content, clearly indicate this',
            de: '<strong>Änderungen angeben:</strong> Wenn Sie den ursprünglichen Inhalt geändert haben, geben Sie dies deutlich an'
        },
        'cc-reasoning': {
            tr: 'Bu yaklaşım, teknik bilginin serbestçe dolaşımını sağlarken, emeğimizin tanınmasını ve bilgi ekosisteminin büyümesini garanti eder.',
            en: 'This approach ensures the free circulation of technical knowledge while guaranteeing recognition of our work and growth of the knowledge ecosystem.',
            de: 'Dieser Ansatz gewährleistet die freie Zirkulation von technischem Wissen und garantiert gleichzeitig die Anerkennung unserer Arbeit und das Wachstum des Wissensökosystems.'
        },
        'cc-link': {
            tr: 'CC BY-SA 4.0 Detayları',
            en: 'CC BY-SA 4.0 Details',
            de: 'CC BY-SA 4.0 Details'
        },
        'brand-title': {
            tr: 'Marka ve Kimlik Koruması',
            en: 'Brand and Identity Protection',
            de: 'Marken- und Identitätsschutz'
        },
        'brand-smartkraft-title': {
            tr: 'SmartKraft Markası ve Logoları',
            en: 'SmartKraft Brand and Logos',
            de: 'SmartKraft Marke und Logos'
        },
        'brand-protection-desc': {
            tr: '<strong>"SmartKraft" adı, logosu ve görsel kimlik unsurları marka koruması altındadır.</strong> Bu, özgür yazılım felsefemizle çelişmez; aksine kimliğimizi koruyarak değerlerimizi sürdürmemizi sağlar.',
            en: '<strong>The "SmartKraft" name, logo and visual identity elements are under trademark protection.</strong> This does not conflict with our free software philosophy; rather, it enables us to sustain our values by protecting our identity.',
            de: '<strong>Der Name "SmartKraft", das Logo und die visuellen Identitätselemente stehen unter Markenschutz.</strong> Dies steht nicht im Widerspruch zu unserer freien Software-Philosophie; vielmehr ermöglicht es uns, unsere Werte durch den Schutz unserer Identität aufrechtzuerhalten.'
        },
        'brand-prohibited-title': {
            tr: '<strong>İzinsiz yapamayacaklarınız:</strong>',
            en: '<strong>What you cannot do without permission:</strong>',
            de: '<strong>Was Sie ohne Erlaubnis nicht tun können:</strong>'
        },
        'brand-prohibited-naming': {
            tr: 'Projenize "SmartKraft" adını vermek',
            en: 'Naming your project "SmartKraft"',
            de: 'Ihr Projekt "SmartKraft" zu nennen'
        },
        'brand-prohibited-logo': {
            tr: 'SmartKraft logounu kendi ürününüzde kullanmak',
            en: 'Using the SmartKraft logo in your own product',
            de: 'Das SmartKraft-Logo in Ihrem eigenen Produkt zu verwenden'
        },
        'brand-prohibited-representation': {
            tr: 'SmartKraft adına konuşmak veya SmartKraft\'ı temsil ettiğinizi ima etmek',
            en: 'Speaking on behalf of SmartKraft or implying that you represent SmartKraft',
            de: 'Im Namen von SmartKraft zu sprechen oder anzudeuten, dass Sie SmartKraft vertreten'
        },
        'brand-prohibited-marketing': {
            tr: 'SmartKraft ile resmi bir bağlantınız varmış gibi pazarlama yapmak',
            en: 'Marketing as if you have an official connection with SmartKraft',
            de: 'Marketing zu betreiben, als hätten Sie eine offizielle Verbindung zu SmartKraft'
        },
        'brand-design-title': {
            tr: 'Site Tasarımı ve İçerik Düzeni',
            en: 'Website Design and Content Layout',
            de: 'Website-Design und Inhaltslayout'
        },
        'brand-design-desc': {
            tr: 'Web sitemizin tasarımı, düzeni ve özgün içerikleri telif hakkı koruması altındadır. Kodlarımızdan ilham alabilirsiniz, ancak <strong>sitemizin birebir kopyasını yapmamanızı</strong> rica ediyoruz. Yaratıcılığınızı kullanın, kendi tasarımınızı oluşturun.',
            en: 'The design, layout and original content of our website are under copyright protection. You can be inspired by our code, but we ask that you <strong>do not make an exact copy of our site</strong>. Use your creativity and create your own design.',
            de: 'Das Design, Layout und die ursprünglichen Inhalte unserer Website stehen unter Urheberrechtsschutz. Sie können sich von unserem Code inspirieren lassen, aber wir bitten Sie, <strong>keine exakte Kopie unserer Website zu erstellen</strong>. Nutzen Sie Ihre Kreativität und erstellen Sie Ihr eigenes Design.'
        },
        'brand-permission-request': {
            tr: '<strong>İzin Talep Etmek:</strong> SmartKraft markasını meşru bir amaçla (akademik çalışma, atıf, işbirliği önerisi gibi) kullanmak istiyorsanız, lütfen bizimle iletişime geçin. Makul taleplerle işbirliği yapmaktan mutluluk duyarız.',
            en: '<strong>Requesting Permission:</strong> If you want to use the SmartKraft brand for a legitimate purpose (academic work, citation, collaboration proposal, etc.), please contact us. We are happy to cooperate with reasonable requests.',
            de: '<strong>Erlaubnis beantragen:</strong> Wenn Sie die SmartKraft-Marke für einen legitimen Zweck (akademische Arbeit, Zitat, Kooperationsvorschlag usw.) verwenden möchten, kontaktieren Sie uns bitte. Wir arbeiten gerne bei vernünftigen Anfragen zusammen.'
        },
        'attribution-title': {
            tr: 'Proje ve Ürün Atıfları',
            en: 'Project and Product Attributions',
            de: 'Projekt- und Produktzuordnungen'
        },
        'attribution-users-title': {
            tr: 'SmartKraft Projelerinden Yararlananlar İçin',
            en: 'For Those Who Benefit from SmartKraft Projects',
            de: 'Für diejenigen, die von SmartKraft-Projekten profitieren'
        },
        'attribution-users-desc': {
            tr: 'Kodlarımızı veya içeriklerimizi kullanarak bir proje geliştiriyorsanız, açık ve dürüst bir atıf yapmanızı bekliyoruz:',
            en: 'If you are developing a project using our code or content, we expect you to make a clear and honest attribution:',
            de: 'Wenn Sie ein Projekt unter Verwendung unseres Codes oder Inhalts entwickeln, erwarten wir von Ihnen eine klare und ehrliche Zuordnung:'
        },
        'attribution-correct': {
            tr: '<strong>Doğru atıf:</strong> "SmartKraft\'ın [proje adı] projesinden faydalanılmıştır" şeklinde',
            en: '<strong>Correct attribution:</strong> "Benefited from SmartKraft\'s [project name] project"',
            de: '<strong>Korrekte Zuordnung:</strong> "Profitiert von SmartKrafts [Projektname] Projekt"'
        },
        'attribution-link': {
            tr: '<strong>Kaynak linki:</strong> Mümkünse GitHub deposuna veya sitemize link verin',
            en: '<strong>Source link:</strong> If possible, link to our GitHub repository or website',
            de: '<strong>Quelllink:</strong> Verlinken Sie nach Möglichkeit auf unser GitHub-Repository oder unsere Website'
        },
        'attribution-compliance': {
            tr: '<strong>Lisans uyumluluğu:</strong> İlgili lisans şartlarına uygun davranın',
            en: '<strong>License compliance:</strong> Comply with the relevant license terms',
            de: '<strong>Lizenz-Compliance:</strong> Befolgen Sie die relevanten Lizenzbedingungen'
        },
        'attribution-collaboration-title': {
            tr: 'İşbirliği ve Ortaklık',
            en: 'Collaboration and Partnership',
            de: 'Zusammenarbeit und Partnerschaft'
        },
        'attribution-collaboration-desc': {
            tr: 'Projelerinizde SmartKraft teknolojilerini kullanıyorsanız ve bir işbirliği kurmak istiyorsanız, bundan mutluluk duyarız. <strong>Resmi ortaklık, sponsorluk veya endorsement</strong> durumları için önceden iletişime geçmeniz gerekir.',
            en: 'If you are using SmartKraft technologies in your projects and want to establish a collaboration, we would be happy to do so. For <strong>official partnership, sponsorship or endorsement</strong> situations, you need to contact us in advance.',
            de: 'Wenn Sie SmartKraft-Technologien in Ihren Projekten verwenden und eine Zusammenarbeit aufbauen möchten, würden wir uns darüber freuen. Für <strong>offizielle Partnerschaften, Sponsoring oder Endorsement</strong>-Situationen müssen Sie uns im Voraus kontaktieren.'
        },
        'attribution-acceptable-title': {
            tr: '<strong>Kabul edilebilir kullanımlar:</strong>',
            en: '<strong>Acceptable uses:</strong>',
            de: '<strong>Akzeptable Verwendungen:</strong>'
        },
        'attribution-acceptable-library': {
            tr: '"SmartKraft IoT kütüphanesi kullanılarak geliştirilmiştir"',
            en: '"Developed using SmartKraft IoT library"',
            de: '"Entwickelt mit der SmartKraft IoT-Bibliothek"'
        },
        'attribution-acceptable-docs': {
            tr: '"SmartKraft\'ın dokümantasyonlarından yararlanılmıştır"',
            en: '"Benefited from SmartKraft\'s documentation"',
            de: '"Profitiert von SmartKrafts Dokumentation"'
        },
        'attribution-acceptable-ecosystem': {
            tr: '"SmartKraft açık kaynak ekosisteminin bir parçasıdır"',
            en: '"Part of the SmartKraft open source ecosystem"',
            de: '"Teil des SmartKraft Open-Source-Ökosystems"'
        },
        'attribution-permission-title': {
            tr: '<strong>İzin gerektiren kullanımlar:</strong>',
            en: '<strong>Uses requiring permission:</strong>',
            de: '<strong>Verwendungen, die eine Genehmigung erfordern:</strong>'
        },
        'attribution-permission-supported': {
            tr: '"SmartKraft tarafından desteklenmektedir"',
            en: '"Supported by SmartKraft"',
            de: '"Unterstützt von SmartKraft"'
        },
        'attribution-permission-partner': {
            tr: '"SmartKraft resmi ortağıdır"',
            en: '"Official SmartKraft partner"',
            de: '"Offizieller SmartKraft-Partner"'
        },
        'attribution-permission-recommended': {
            tr: '"SmartKraft\'ın önerdiği çözümdür"',
            en: '"Solution recommended by SmartKraft"',
            de: '"Von SmartKraft empfohlene Lösung"'
        },

        // Sorumluluk ve Garanti Reddi
        'liability-title': {
            tr: 'Sorumluluk ve Garanti Reddi',
            en: 'Liability and Warranty Disclaimer',
            de: 'Haftung und Gewährleistungsausschluss'
        },
        'website-content-title': {
            tr: 'Web Sitesi İçeriklerinin Kullanımı',
            en: 'Use of Website Content',
            de: 'Nutzung der Website-Inhalte'
        },
        'website-content-desc': {
            tr: 'Bu web sitesindeki bilgiler, kodlar ve dokümantasyonlar "olduğu gibi" sunulmaktadır. SmartKraft, bu içeriklerin kullanımından doğabilecek herhangi bir sorun, zarar veya kayıptan sorumlu değildir.',
            en: 'The information, code, and documentation on this website are provided "as is". SmartKraft is not responsible for any problems, damages, or losses that may arise from the use of this content.',
            de: 'Die Informationen, Codes und Dokumentationen auf dieser Website werden "so wie sie sind" bereitgestellt. SmartKraft ist nicht verantwortlich für Probleme, Schäden oder Verluste, die durch die Nutzung dieser Inhalte entstehen können.'
        },
        'usage-risks-title': {
            tr: '<strong>Kullanım riskleri ve sorumluluklar:</strong>',
            en: '<strong>Usage risks and responsibilities:</strong>',
            de: '<strong>Nutzungsrisiken und Verantwortlichkeiten:</strong>'
        },
        'risk-technical': {
            tr: '<strong>Teknik doğruluk:</strong> İçeriklerin teknik doğruluğunu, güncelliğini veya eksiksizliğini garanti etmiyoruz',
            en: '<strong>Technical accuracy:</strong> We do not guarantee the technical accuracy, currency, or completeness of the content',
            de: '<strong>Technische Genauigkeit:</strong> Wir garantieren nicht die technische Richtigkeit, Aktualität oder Vollständigkeit der Inhalte'
        },
        'risk-production': {
            tr: '<strong>Üretim kullanımı:</strong> Kodları ve yöntemleri üretim ortamında kullanmadan önce kendi testlerinizi yapın',
            en: '<strong>Production usage:</strong> Conduct your own tests before using codes and methods in production environments',
            de: '<strong>Produktionsnutzung:</strong> Führen Sie Ihre eigenen Tests durch, bevor Sie Codes und Methoden in Produktionsumgebungen verwenden'
        },
        'risk-security': {
            tr: '<strong>Güvenlik:</strong> Güvenlik açısından kendi değerlendirmelerinizi yapmanız ve gerekli önlemleri almanız sorumluluğunuzdadır',
            en: '<strong>Security:</strong> It is your responsibility to conduct your own security assessments and take necessary precautions',
            de: '<strong>Sicherheit:</strong> Es liegt in Ihrer Verantwortung, eigene Sicherheitsbewertungen durchzuführen und notwendige Vorsichtsmaßnahmen zu treffen'
        },
        'risk-compliance': {
            tr: '<strong>Uyumluluk:</strong> Yerel yasalar, endüstri standartları ve düzenlemelerle uyumluluğu sağlamak size aittir',
            en: '<strong>Compliance:</strong> Ensuring compliance with local laws, industry standards, and regulations is your responsibility',
            de: '<strong>Compliance:</strong> Die Einhaltung von lokalen Gesetzen, Industriestandards und Vorschriften liegt in Ihrer Verantwortung'
        },
        'risk-data-loss': {
            tr: '<strong>Veri kaybı:</strong> İçeriklerimizi kullanırken veri yedekleme ve koruma sorumluluğu kullanıcıya aittir',
            en: '<strong>Data loss:</strong> Data backup and protection responsibility belongs to the user when using our content',
            de: '<strong>Datenverlust:</strong> Die Verantwortung für Datensicherung und -schutz liegt beim Benutzer bei der Nutzung unserer Inhalte'
        },
        'service-interruptions-title': {
            tr: 'Hizmet Kesintileri ve Değişiklikler',
            en: 'Service Interruptions and Changes',
            de: 'Serviceunterbrechungen und Änderungen'
        },
        'service-interruptions-desc': {
            tr: 'Web sitemiz, içeriklerimiz ve hizmetlerimiz herhangi bir zamanda değişebilir, güncellenebilir veya geçici olarak erişilemez hale gelebilir. Bu durumlardan kaynaklanan sorunlardan sorumlu değiliz.',
            en: 'Our website, content, and services may change, be updated, or become temporarily inaccessible at any time. We are not responsible for problems arising from these situations.',
            de: 'Unsere Website, Inhalte und Dienste können sich jederzeit ändern, aktualisiert werden oder vorübergehend unzugänglich werden. Wir sind nicht verantwortlich für Probleme, die aus diesen Situationen entstehen.'
        },
        'external-links-title': {
            tr: 'Dış Bağlantılar ve Referanslar',
            en: 'External Links and References',
            de: 'Externe Links und Referenzen'
        },
        'external-links-desc': {
            tr: 'Sitemizde yer alan GitHub, PayPal, Patreon ve diğer harici bağlantılar yalnızca bilgi ve kolaylık amaçlıdır. Bu sitelerin içeriği, politikaları veya hizmetleri üzerinde kontrolümüz yoktur ve bunlardan kaynaklanan sorunlardan sorumlu değiliz.',
            en: 'The GitHub, PayPal, Patreon, and other external links on our site are for informational and convenience purposes only. We have no control over the content, policies, or services of these sites and are not responsible for problems arising from them.',
            de: 'Die GitHub-, PayPal-, Patreon- und anderen externen Links auf unserer Website dienen nur zu Informations- und Komfortzwecken. Wir haben keine Kontrolle über den Inhalt, die Richtlinien oder Dienste dieser Websites und sind nicht verantwortlich für daraus entstehende Probleme.'
        },
        'electronic-products-title': {
            tr: 'Elektronik Ürünler ve Teknik Montaj',
            en: 'Electronic Products and Technical Assembly',
            de: 'Elektronische Produkte und technische Montage'
        },
        'electronic-products-desc': {
            tr: 'IoT projelerimiz, elektronik bileşenler, elektrikli cihazlar ve montaj gerektiren ürünler içerebilir. Bu tür projeleri uygularken:',
            en: 'Our IoT projects may include electronic components, electrical devices, and products requiring assembly. When implementing such projects:',
            de: 'Unsere IoT-Projekte können elektronische Komponenten, elektrische Geräte und montageintensive Produkte enthalten. Bei der Umsetzung solcher Projekte:'
        },
        'electrical-knowledge-req': {
            tr: '<strong>Elektrik bilgisi gereksinimi:</strong> Elektrikli bileşenlerin montajı için yeterli elektrik bilgisine sahip olmanız şarttır',
            en: '<strong>Electrical knowledge requirement:</strong> You must have sufficient electrical knowledge for the assembly of electrical components',
            de: '<strong>Elektrisches Wissen erforderlich:</strong> Sie müssen über ausreichende elektrische Kenntnisse für die Montage elektrischer Komponenten verfügen'
        },
        'safety-priority': {
            tr: '<strong>Güvenlik önceliği:</strong> Elektrik montajı yaparken tüm güvenlik kurallarına uymalı, gerektiğinde uzman yardımı almalısınız',
            en: '<strong>Safety priority:</strong> You must follow all safety rules when performing electrical assembly and seek expert help when necessary',
            de: '<strong>Sicherheit hat Priorität:</strong> Sie müssen alle Sicherheitsregeln bei elektrischen Montagearbeiten befolgen und bei Bedarf fachkundige Hilfe suchen'
        },
        'local-regulations': {
            tr: '<strong>Yerel yönetmelikler:</strong> Elektrik işleri için yerel yasalar ve yönetmeliklere uygun hareket etmelisiniz',
            en: '<strong>Local regulations:</strong> You must comply with local laws and regulations for electrical work',
            de: '<strong>Lokale Vorschriften:</strong> Sie müssen die örtlichen Gesetze und Vorschriften für Elektroarbeiten einhalten'
        },
        'product-manuals': {
            tr: '<strong>Ürün kılavuzları:</strong> Her elektronik bileşen ve ürünün kendi kullanım kılavuzu, kurulum talimatları ve güvenlik uyarıları vardır - bunlara mutlaka uyun',
            en: '<strong>Product manuals:</strong> Each electronic component and product has its own user manual, installation instructions, and safety warnings - you must follow them',
            de: '<strong>Produkthandbücher:</strong> Jede elektronische Komponente und jedes Produkt hat ein eigenes Benutzerhandbuch, Installationsanweisungen und Sicherheitswarnungen - Sie müssen diese befolgen'
        },
        'technical-competence': {
            tr: '<strong>Teknik yeterlilik:</strong> Projelerimizi uygulamadan önce gerekli teknik bilgi ve becerilere sahip olduğunuzdan emin olun',
            en: '<strong>Technical competence:</strong> Ensure you have the necessary technical knowledge and skills before implementing our projects',
            de: '<strong>Technische Kompetenz:</strong> Stellen Sie sicher, dass Sie über die notwendigen technischen Kenntnisse und Fähigkeiten verfügen, bevor Sie unsere Projekte umsetzen'
        },
        'risk-acceptance': {
            tr: '<strong>Risk kabülü:</strong> Elektronik montaj ve elektrik işlerinde yaralanma, yangın, elektrik çarpması gibi riskler vardır - bu riskleri kabul ederek çalışırsınız',
            en: '<strong>Risk acceptance:</strong> There are risks such as injury, fire, electric shock in electronic assembly and electrical work - you work by accepting these risks',
            de: '<strong>Risikoakzeptanz:</strong> Bei elektronischen Montagen und Elektroarbeiten bestehen Risiken wie Verletzungen, Brand, Stromschlag - Sie arbeiten unter Akzeptanz dieser Risiken'
        },
        'special-warnings-title': {
            tr: '<strong>Özel uyarılar:</strong>',
            en: '<strong>Special warnings:</strong>',
            de: '<strong>Besondere Warnungen:</strong>'
        },
        'warning-mains-voltage': {
            tr: 'Ana şebeke voltajı (220V/110V) ile çalışan projeler için mutlaka uzman desteği alın',
            en: 'For projects working with mains voltage (220V/110V), definitely get expert support',
            de: 'Für Projekte mit Netzspannung (220V/110V) holen Sie sich unbedingt fachkundige Unterstützung'
        },
        'warning-lithium-battery': {
            tr: 'Lityum pil kullanan projelerde yangın ve patlama risklerine dikkat edin',
            en: 'Pay attention to fire and explosion risks in projects using lithium batteries',
            de: 'Achten Sie auf Brand- und Explosionsrisiken bei Projekten mit Lithium-Batterien'
        },
        'warning-high-current': {
            tr: 'Yüksek akım çeken motorlar ve güç kaynakları için uygun soğutma ve koruma devreleri kullanın',
            en: 'Use appropriate cooling and protection circuits for high-current motors and power supplies',
            de: 'Verwenden Sie geeignete Kühl- und Schutzschaltungen für hochstromführende Motoren und Netzteile'
        },
        'warning-wireless': {
            tr: 'Kablosuz iletişim modülleri için frekans düzenlemelerine uyun',
            en: 'Comply with frequency regulations for wireless communication modules',
            de: 'Beachten Sie die Frequenzvorschriften für drahtlose Kommunikationsmodule'
        },
        'important-warning': {
            tr: '<strong>Önemli uyarı:</strong> İçeriklerimizi kullanmadan önce kendi araştırmanızı yapın, test edin ve profesyonel tavsiye alın. Özellikle kritik sistemlerde ve üretim ortamlarında kullanım öncesi kapsamlı değerlendirme yapılmalıdır.',
            en: '<strong>Important warning:</strong> Do your own research, test, and get professional advice before using our content. Comprehensive evaluation should be done before use, especially in critical systems and production environments.',
            de: '<strong>Wichtige Warnung:</strong> Führen Sie vor der Nutzung unserer Inhalte eigene Recherchen durch, testen Sie und holen Sie sich professionelle Beratung. Besonders in kritischen Systemen und Produktionsumgebungen sollte vor der Nutzung eine umfassende Bewertung durchgeführt werden.'
        },

        // Genel Kullanım Şartları
        'terms-title': {
            tr: 'Genel Kullanım Şartları',
            en: 'General Terms of Use',
            de: 'Allgemeine Nutzungsbedingungen'
        },
        'acceptance-age-title': {
            tr: 'Kabul ve Yaş Sınırı',
            en: 'Acceptance and Age Limit',
            de: 'Akzeptanz und Altersgrenze'
        },
        'acceptance-desc': {
            tr: 'Bu web sitesini kullanarak, burada belirtilen tüm şart ve koşulları kabul etmiş sayılırsınız. Şartları kabul etmiyorsanız siteyi kullanmayınız.',
            en: 'By using this website, you are deemed to have accepted all the terms and conditions specified here. If you do not accept the terms, do not use the site.',
            de: 'Durch die Nutzung dieser Website gelten Sie als mit allen hier angegebenen Bedingungen einverstanden. Wenn Sie die Bedingungen nicht akzeptieren, verwenden Sie die Website nicht.'
        },
        'age-requirement': {
            tr: 'Yaş gereksinimi: 16 yaşından küçükseniz, bu siteyi yalnızca ebeveyn veya vasi onayı ile kullanabilirsiniz. SmartKraft çocukları hedefleyen içerik sunmaz ve çocuklardan bilerek veri toplamaz.',
            en: 'Age requirement: If you are under 16, you can only use this site with parental or guardian consent. SmartKraft does not offer content targeting children and does not knowingly collect data from children.',
            de: 'Altersanforderung: Wenn Sie unter 16 Jahre alt sind, können Sie diese Website nur mit Zustimmung Ihrer Eltern oder Erziehungsberechtigten nutzen. SmartKraft bietet keine auf Kinder ausgerichteten Inhalte an und sammelt wissentlich keine Daten von Kindern.'
        },
        'usage-rules-title': {
            tr: 'Kullanım Kuralları ve Yasak Faaliyetler',
            en: 'Usage Rules and Prohibited Activities',
            de: 'Nutzungsregeln und verbotene Aktivitäten'
        },
        'usage-rules-desc': {
            tr: 'Sitemizi kullanırken aşağıdaki kurallara uymanız zorunludur:',
            en: 'You must comply with the following rules when using our site:',
            de: 'Bei der Nutzung unserer Website müssen Sie die folgenden Regeln einhalten:'
        },
        'rule-legal-use': {
            tr: '<strong>Yasal kullanım:</strong> Siteyi yasadışı amaçlarla kullanamazsınız',
            en: '<strong>Legal use:</strong> You cannot use the site for illegal purposes',
            de: '<strong>Rechtmäßige Nutzung:</strong> Sie dürfen die Website nicht für illegale Zwecke verwenden'
        },
        'rule-security': {
            tr: '<strong>Güvenlik ihlali yasağı:</strong> Sistem güvenliğini test etmek, delmek veya bozmak yasaktır',
            en: '<strong>Security violation prohibition:</strong> Testing, penetrating, or disrupting system security is prohibited',
            de: '<strong>Verbot von Sicherheitsverletzungen:</strong> Das Testen, Durchdringen oder Stören der Systemsicherheit ist verboten'
        },
        'rule-abuse': {
            tr: '<strong>Kötüye kullanım yasağı:</strong> Spam, kötü amaçlı yazılım yayma veya sistemleri aşırı yükleme yasaktır',
            en: '<strong>Abuse prohibition:</strong> Spam, spreading malware, or overloading systems is prohibited',
            de: '<strong>Missbrauchsverbot:</strong> Spam, die Verbreitung von Malware oder die Überlastung von Systemen ist verboten'
        },
        'rule-others-rights': {
            tr: '<strong>Başkalarının hakları:</strong> Diğer kullanıcıların ve üçüncü tarafların haklarına saygı göstermelisiniz',
            en: '<strong>Others\' rights:</strong> You must respect the rights of other users and third parties',
            de: '<strong>Rechte anderer:</strong> Sie müssen die Rechte anderer Benutzer und Dritter respektieren'
        },
        'rule-automated-access': {
            tr: '<strong>Otomatik erişim sınırı:</strong> Aşırı bot kullanımı veya site performansını olumsuz etkileyen otomasyonlar yasaktır',
            en: '<strong>Automated access limit:</strong> Excessive bot usage or automation that negatively affects site performance is prohibited',
            de: '<strong>Automatisierte Zugriffsbegrenzung:</strong> Übermäßige Bot-Nutzung oder Automatisierung, die die Website-Performance negativ beeinflusst, ist verboten'
        },
        'rule-content-integrity': {
            tr: '<strong>İçerik bütünlüğü:</strong> Site içeriklerini değiştirmeye veya tahrif etmeye yönelik girişimler yasaktır',
            en: '<strong>Content integrity:</strong> Attempts to modify or tamper with site content are prohibited',
            de: '<strong>Inhaltsintegrität:</strong> Versuche, Website-Inhalte zu ändern oder zu manipulieren, sind verboten'
        },
        'service-changes-title': {
            tr: 'Hizmet Değişiklikleri ve Kesintiler',
            en: 'Service Changes and Interruptions',
            de: 'Service-Änderungen und Unterbrechungen'
        },
        'service-changes-desc': {
            tr: 'SmartKraft, web sitesini ve sunduğu hizmetleri herhangi bir zamanda değiştirme, güncelleme, geçici olarak durdurma veya tamamen sonlandırma hakkını saklı tutar. Bu değişiklikler için önceden bildirim yükümlülüğümüz yoktur.',
            en: 'SmartKraft reserves the right to change, update, temporarily suspend, or completely terminate the website and the services it provides at any time. We have no obligation to provide advance notice for these changes.',
            de: 'SmartKraft behält sich das Recht vor, die Website und die angebotenen Dienste jederzeit zu ändern, zu aktualisieren, vorübergehend auszusetzen oder vollständig zu beenden. Wir sind nicht verpflichtet, für diese Änderungen eine Vorankündigung zu geben.'
        },
        'service-interruptions-detail': {
            tr: '<strong>Hizmet kesintileri:</strong> Teknik bakım, güvenlik güncellemeleri veya altyapı çalışmaları nedeniyle siteye erişim geçici olarak kesintiye uğrayabilir. Bu durumlardan kaynaklanan sorunlardan sorumlu değiliz.',
            en: '<strong>Service interruptions:</strong> Site access may be temporarily interrupted due to technical maintenance, security updates, or infrastructure work. We are not responsible for problems arising from these situations.',
            de: '<strong>Service-Unterbrechungen:</strong> Der Zugang zur Website kann aufgrund technischer Wartung, Sicherheitsupdates oder Infrastrukturarbeiten vorübergehend unterbrochen werden. Wir sind nicht verantwortlich für Probleme, die aus diesen Situationen entstehen.'
        },

        // Fikri Mülkiyet İhlali Bildirimi
        'ip-violation-title': {
            tr: 'Fikri Mülkiyet İhlali Bildirimi',
            en: 'Intellectual Property Violation Notice',
            de: 'Mitteilung über Verletzung geistigen Eigentums'
        },
        'ip-violation-notice': {
            tr: 'Eğer sitemizde fikri mülkiyet haklarınızı ihlal eden bir içerik bulduğunuzu düşünüyorsanız, lütfen detaylı bilgilerle birlikte <a href="mailto:info@smartkraft.ch" class="license-link">info@smartkraft.ch</a> adresine yazın. İhlal iddialarını inceler ve gerekli işlemleri yaparız.',
            en: 'If you believe you have found content on our site that violates your intellectual property rights, please write to <a href="mailto:info@smartkraft.ch" class="license-link">info@smartkraft.ch</a> with detailed information. We review violation claims and take necessary action.',
            de: 'Wenn Sie glauben, auf unserer Website Inhalte gefunden zu haben, die Ihre geistigen Eigentumsrechte verletzen, schreiben Sie bitte mit detaillierten Informationen an <a href="mailto:info@smartkraft.ch" class="license-link">info@smartkraft.ch</a>. Wir prüfen Verletzungsansprüche und ergreifen notwendige Maßnahmen.'
        },

        // Yargı Yetkisi ve Uygulanacak Hukuk
        'jurisdiction-title': {
            tr: 'Yargı Yetkisi ve Uygulanacak Hukuk',
            en: 'Jurisdiction and Applicable Law',
            de: 'Gerichtsbarkeit und anwendbares Recht'
        },
        'jurisdiction-notice': {
            tr: 'Bu kullanım şartları <strong>İsviçre hukuku</strong> uyarınca yorumlanır ve uygulanır. Bu şartlardan veya site kullanımından kaynaklanan uyuşmazlıklarda <strong>İsviçre mahkemeleri</strong> yetkilidir.',
            en: 'These terms of use are interpreted and applied in accordance with <strong>Swiss law</strong>. <strong>Swiss courts</strong> have jurisdiction over disputes arising from these terms or site usage.',
            de: 'Diese Nutzungsbedingungen werden nach <strong>Schweizer Recht</strong> ausgelegt und angewendet. <strong>Schweizer Gerichte</strong> sind für Streitigkeiten zuständig, die aus diesen Bedingungen oder der Website-Nutzung entstehen.'
        },
        'severability': {
            tr: 'Eğer bu şartların herhangi bir bölümü geçersiz sayılırsa, diğer bölümler geçerliliğini korur.',
            en: 'If any part of these terms is deemed invalid, the other parts remain valid.',
            de: 'Sollte ein Teil dieser Bedingungen für ungültig erklärt werden, bleiben die anderen Teile gültig.'
        },
        'final-note': {
            tr: '<strong>Son not:</strong> Bu kullanım şartları sitemizi kullandığınız andan itibaren geçerlidir. Düzenli olarak gözden geçirilmeli ve güncellenmiş hallerine uyulmalıdır.',
            en: '<strong>Final note:</strong> These terms of use are effective from the moment you use our site. They should be reviewed regularly and updated versions should be followed.',
            de: '<strong>Schlussbemerkung:</strong> Diese Nutzungsbedingungen gelten ab dem Moment, in dem Sie unsere Website nutzen. Sie sollten regelmäßig überprüft und aktualisierte Versionen befolgt werden.'
        },

        // İletişim ve İzin Talepleri
        'contact-requests-title': {
            tr: 'İletişim ve İzin Talepleri',
            en: 'Contact and Permission Requests',
            de: 'Kontakt und Genehmigungsanträge'
        },
        'contact-requests-intro': {
            tr: 'Lisanslarımız hakkında sorularınız varsa veya özel bir izin talep etmek istiyorsanız, lütfen bizimle iletişime geçin. Açık kaynak topluluğunun bir parçası olarak, makul talepleri değerlendirmeye ve işbirliği yapmaya her zaman açığız.',
            en: 'If you have questions about our licenses or want to request special permission, please contact us. As part of the open source community, we are always open to evaluating reasonable requests and collaborating.',
            de: 'Wenn Sie Fragen zu unseren Lizenzen haben oder eine besondere Genehmigung beantragen möchten, kontaktieren Sie uns bitte. Als Teil der Open-Source-Community sind wir immer offen für die Bewertung vernünftiger Anfragen und für Zusammenarbeit.'
        },
        'permission-cases-title': {
            tr: '<strong>İzin talep edebileceğiniz durumlar:</strong>',
            en: '<strong>Situations where you can request permission:</strong>',
            de: '<strong>Situationen, in denen Sie eine Genehmigung beantragen können:</strong>'
        },
        'permission-case-1': {
            tr: 'SmartKraft markasını akademik veya eğitim amaçlı kullanım',
            en: 'Academic or educational use of SmartKraft brand',
            de: 'Akademische oder pädagogische Nutzung der SmartKraft-Marke'
        },
        'permission-case-2': {
            tr: 'Ticari projeler için özel lisans anlaşmaları',
            en: 'Special license agreements for commercial projects',
            de: 'Spezielle Lizenzvereinbarungen für kommerzielle Projekte'
        },
        'permission-case-3': {
            tr: 'İşbirliği veya ortaklık önerileri',
            en: 'Collaboration or partnership proposals',
            de: 'Kooperations- oder Partnerschaftsvorschläge'
        },
        'permission-case-4': {
            tr: 'Medya ve basın için marka kullanımı',
            en: 'Brand usage for media and press',
            de: 'Markennutzung für Medien und Presse'
        },
        'request-requirements-title': {
            tr: '<strong>Talebinizde belirtmeniz gerekenler:</strong>',
            en: '<strong>What you need to specify in your request:</strong>',
            de: '<strong>Was Sie in Ihrem Antrag angeben müssen:</strong>'
        },
        'requirement-1': {
            tr: 'Kullanım amacınız ve kapsamı',
            en: 'Your purpose and scope of use',
            de: 'Ihr Nutzungszweck und -umfang'
        },
        'requirement-2': {
            tr: 'Hangi materyalleri kullanmak istediğiniz',
            en: 'Which materials you want to use',
            de: 'Welche Materialien Sie verwenden möchten'
        },
        'requirement-3': {
            tr: 'Proje veya organizasyon detayları',
            en: 'Project or organization details',
            de: 'Projekt- oder Organisationsdetails'
        },
        'requirement-4': {
            tr: 'Kullanım süresi (geçici/kalıcı)',
            en: 'Duration of use (temporary/permanent)',
            de: 'Nutzungsdauer (vorübergehend/dauerhaft)'
        },
        'contact-title': {
            tr: 'İletişim',
            en: 'Contact',
            de: 'Kontakt'
        },
        'contact-license-matters': {
            tr: 'Lisans konularında: <a href="mailto:info@smartkraft.ch">info@smartkraft.ch</a>',
            en: 'For license matters: <a href="mailto:info@smartkraft.ch">info@smartkraft.ch</a>',
            de: 'Für Lizenzangelegenheiten: <a href="mailto:info@smartkraft.ch">info@smartkraft.ch</a>'
        },
        'contact-response-time': {
            tr: 'Genellikle 2-3 iş günü içinde yanıtlıyoruz.',
            en: 'We usually respond within 2-3 business days.',
            de: 'Wir antworten normalerweise innerhalb von 2-3 Werktagen.'
        },

        // Güncelleme ve Yürürlük
        'updates-title': {
            tr: 'Güncelleme ve Yürürlük',
            en: 'Updates and Effectiveness',
            de: 'Updates und Wirksamkeit'
        },
        'updates-intro': {
            tr: 'Bu lisans ve kullanım rehberi, projelerimizin gelişimine paralel olarak güncellenebilir. Önemli değişikliklerde, mümkün olduğunca topluluktan geri bildirim almaya çalışırız.',
            en: 'This license and usage guide may be updated in parallel with the development of our projects. For important changes, we try to get feedback from the community whenever possible.',
            de: 'Diese Lizenz und dieser Nutzungsleitfaden können parallel zur Entwicklung unserer Projekte aktualisiert werden. Bei wichtigen Änderungen versuchen wir, wann immer möglich, Feedback von der Community zu erhalten.'
        },
        'last-update': {
            tr: '<strong>Son güncelleme:</strong> 14 Ağustos 2025',
            en: '<strong>Last update:</strong> August 14, 2025',
            de: '<strong>Letzte Aktualisierung:</strong> 14. August 2025'
        },
        'current-version': {
            tr: '<strong>Geçerli versiyon:</strong> 1.0',
            en: '<strong>Current version:</strong> 1.0',
            de: '<strong>Aktuelle Version:</strong> 1.0'
        },
        'effective-date': {
            tr: 'Bu sayfada yapılan değişiklikler, yayınlandığı tarihten itibaren geçerlidir. Mevcut kullanımlarınız için ani değişiklik olmayacak, geçiş süresi tanınacaktır.',
            en: 'Changes made to this page are effective from the date of publication. There will be no sudden changes to your existing usage, a transition period will be provided.',
            de: 'Änderungen an dieser Seite sind ab dem Datum der Veröffentlichung wirksam. Es wird keine plötzlichen Änderungen an Ihrer bestehenden Nutzung geben, eine Übergangszeit wird gewährt.'
        }
    };
    
    // Update page title for license page
    if (window.location.pathname.includes('license.html')) {
        const pageTitles = {
            tr: 'SmartKraft - Lisanslar ve Kullanım',
            en: 'SmartKraft - Licenses and Usage',
            de: 'SmartKraft - Lizenzen und Nutzung'
        };
        document.title = pageTitles[lang] || pageTitles.de;
    }
    
    // Translate elements with data-translate attribute
    Object.keys(licenseTexts).forEach(key => {
        const element = document.querySelector(`[data-translate="${key}"]`);
        if (element && licenseTexts[key][lang]) {
            element.innerHTML = licenseTexts[key][lang];
            console.log(`Translated ${key} to ${lang}`);
        }
    });
}

// Navigation functionality
function initializeNavigation() {
    console.log('Initializing navigation...');
    
    // Mobile menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on links
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Scroll effects
function initializeScrollEffects() {
    console.log('Initializing scroll effects...');
    
    // Header scroll effect
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // Fade in animations
    const animatedElements = document.querySelectorAll('.feature-card, .product-card, .about-card');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Interactive elements
function initializeInteractivity() {
    console.log('Initializing interactive elements...');
    
    // Product buy buttons
    const buyButtons = document.querySelectorAll('.product-btn');
    buyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.closest('.product-card').querySelector('h3').textContent;
            alert(`${productName} ürünü için satın alma sayfasına yönlendiriliyorsunuz...`);
        });
    });
    
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.');
        });
    }
    
    // Typing effect for hero title
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        startTypingEffect(typingElement);
    }
}

// Typing effect
function startTypingEffect(element) {
    const texts = {
        tr: ['Açık Kaynak IoT Çözümleri', 'ESP32 Geliştirme Kartları', 'Akıllı Cihaz Platformu'],
        en: ['Open Source IoT Solutions', 'ESP32 Development Boards', 'Smart Device Platform'],
        de: ['Open Source IoT-Lösungen', 'ESP32-Entwicklungsboards', 'Smart Device Plattform']
    };
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentTexts = texts[currentLanguage] || texts.tr;
        const currentText = currentTexts[textIndex];
        
        if (isDeleting) {
            element.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            element.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let speed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentText.length) {
            speed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % currentTexts.length;
        }
        
        setTimeout(type, speed);
    }
    
    type();
}

// Add some visual feedback
function addVisualFeedback() {
    // Add pulse effect to language buttons
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Initialize visual feedback
document.addEventListener('DOMContentLoaded', function() {
    addVisualFeedback();
});

// Debug function for testing
function testLanguageSwitch() {
    console.log('Testing language switching...');
    const languages = ['tr', 'en', 'de'];
    let index = 0;
    
    const interval = setInterval(() => {
        switchLanguage(languages[index]);
        index = (index + 1) % languages.length;
        
        if (index === 0) {
            clearInterval(interval);
            console.log('Language test completed');
        }
    }, 2000);
}

// Make test function available globally
window.testLanguageSwitch = testLanguageSwitch;
window.switchLanguage = switchLanguage;

// Add manual test buttons for debugging
setTimeout(() => {
    console.log('=== SmartKraft Language System Status ===');
    console.log('Current language:', currentLanguage);
    console.log('HTML lang attribute:', document.documentElement.lang);
    console.log('Available functions:');
    console.log('- switchLanguage("tr") - Switch to Turkish');
    console.log('- switchLanguage("en") - Switch to English');
    console.log('- switchLanguage("de") - Switch to German');
    console.log('- testLanguageSwitch() - Auto test all languages');
    console.log('=========================================');
}, 2000);

// Interactive Banner functionality
function initializeInteractiveBanner() {
    console.log('Initializing interactive banner...');
    
    // Initialize counter animations
    initializeCounters();
    
    // Initialize quick action buttons
    initializeQuickActions();
    
    // Initialize terminal typing animation
    initializeTerminalAnimation();
}

function initializeCounters() {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target);
                counterObserver.unobserve(counter);
            }
        });
    });
    
    const counters = document.querySelectorAll('.counter-number');
    counters.forEach(counter => counterObserver.observe(counter));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = Math.ceil(target / 100);
    const duration = 2000;
    const stepTime = duration / (target / increment);
    
    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(counter);
        }
        
        // Format number with thousands separator
        const formattedNumber = current.toLocaleString();
        element.textContent = formattedNumber;
    }, stepTime);
}

function initializeQuickActions() {
    const quickButtons = document.querySelectorAll('.quick-btn');
    
    quickButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            handleQuickAction(action);
        });
    });
}

function handleQuickAction(action) {
    switch(action) {
        case 'demo':
            console.log('Starting demo...');
            showNotification('Demo başlatılıyor...', 'info');
            // Demo functionality can be added here
            break;
        case 'docs':
            console.log('Opening documentation...');
            window.open('https://github.com/smartkraft', '_blank');
            break;
        default:
            console.log('Unknown action:', action);
    }
}

function initializeTerminalAnimation() {
    const typingCommand = document.querySelector('.typing-command');
    if (typingCommand) {
        const text = typingCommand.textContent;
        typingCommand.textContent = '';
        
        let i = 0;
        const typeWriter = setInterval(() => {
            if (i < text.length) {
                typingCommand.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeWriter);
                typingCommand.style.borderRight = 'none';
            }
        }, 50);
    }
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: var(--bg-secondary);
        border: 1px solid var(--border);
        border-radius: 4px;
        color: var(--text-primary);
        font-family: var(--font-sans);
        font-size: 0.9rem;
        z-index: 10000;
        opacity: 0;
        transform: translateX(100px);
        transition: all 0.3s ease;
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Copy button functionality
function initializeCopyButton() {
    const copyBtn = document.querySelector('.copy-btn');
    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            const codeBlock = document.querySelector('.code-body');
            if (codeBlock) {
                const codeText = `const smartKraft = {
    mission: 'Açık Kaynak IoT Çözümleri',
    devices: ['ESP12S', 'ESP32-S3'],
    philosophy: 'Herkes için erişilebilir teknoloji'
};`;
                
                // Copy to clipboard
                navigator.clipboard.writeText(codeText).then(() => {
                    // Change button text temporarily
                    const originalIcon = copyBtn.innerHTML;
                    copyBtn.innerHTML = '<i class="fas fa-check"></i>';
                    copyBtn.style.color = 'var(--accent)';
                    
                    showNotification('Kod kopyalandı!', 'success');
                    
                    // Reset button after 2 seconds
                    setTimeout(() => {
                        copyBtn.innerHTML = originalIcon;
                        copyBtn.style.color = '';
                    }, 2000);
                }).catch(err => {
                    console.error('Kopyalama hatası:', err);
                    showNotification('Kopyalama başarısız!', 'error');
                });
            }
        });
    }
}

// Network Animation System
function initializeNetworkAnimation() {
    console.log('Initializing network animation...');
    
    // Canvas setup
    const canvas = document.getElementById('networkCanvas');
    if (!canvas) {
        console.log('Network canvas not found, skipping animation');
        return;
    }
    
    const ctx = canvas.getContext('2d');
    let width, height;
    const NODE_COUNT = 100;
    const MAX_DIST = 120;
    const nodes = [];
    const DAMPING = 0.97;
    const MIN_SPEED = 0.15;

    const constellation = [
        [0.2, 0.3], [0.3, 0.4], [0.4, 0.35],
        [0.5, 0.45], [0.6, 0.3], [0.7, 0.5], [0.8, 0.4]
    ];

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    class Node {
        constructor(index) {
            this.index = index;
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 1.5;
            this.vy = (Math.random() - 0.5) * 1.5;
            this.color = getSoftColor();
            this.targetColor = getSoftColor();
            this.colorTimer = 0;
        }
        
        update() {
            if (pointer.x === null && this.index < constellation.length) {
                const [nx, ny] = constellation[this.index];
                this.x += (nx * width - this.x) * 0.02;
                this.y += (ny * height - this.y) * 0.02;
            } else {
                this.x += this.vx;
                this.y += this.vy;
            }
            
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;

            this.vx *= DAMPING;
            this.vy *= DAMPING;
            if (Math.abs(this.vx) < MIN_SPEED) this.vx = MIN_SPEED * Math.sign(this.vx || 1);
            if (Math.abs(this.vy) < MIN_SPEED) this.vy = MIN_SPEED * Math.sign(this.vy || 1);

            this.colorTimer++;
            if (this.colorTimer > 10) {
                this.color = blendColors(this.color, this.targetColor, 0.05);
                this.colorTimer = 0;
                if (Math.random() < 0.01) {
                    this.targetColor = getSoftColor();
                }
            }
        }
    }

    function getSoftColor() {
        const h = Math.floor(Math.random() * 360);
        const s = 40 + Math.random() * 30;
        const l = 60 + Math.random() * 20;
        return `hsl(${h},${s}%,${l}%)`;
    }

    function hslToRgb(h, s, l) {
        s /= 100;
        l /= 100;
        const k = n => (n + h / 30) % 12;
        const a = s * Math.min(l, 1 - l);
        const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1));
        return [Math.round(255 * f(0)), Math.round(255 * f(8)), Math.round(255 * f(4))];
    }

    function blendColors(c1, c2, amount) {
        const hslPattern = /hsl\((\d+),(\d+)%?,(\d+)%?\)/;
        const match1 = c1.match(hslPattern);
        const match2 = c2.match(hslPattern);
        if (!match1 || !match2) return c1;
        const rgb1 = hslToRgb(+match1[1], +match1[2], +match1[3]);
        const rgb2 = hslToRgb(+match2[1], +match2[2], +match2[3]);

        const r = Math.round(rgb1[0] + (rgb2[0] - rgb1[0]) * amount);
        const g = Math.round(rgb1[1] + (rgb2[1] - rgb1[1]) * amount);
        const b = Math.round(rgb1[2] + (rgb2[2] - rgb1[2]) * amount);

        return `rgb(${r},${g},${b})`;
    }

    // Initialize nodes
    for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push(new Node(i));
    }

    // Mouse/touch interaction
    const pointer = { x: null, y: null };
    window.addEventListener('mousemove', e => { 
        pointer.x = e.clientX; 
        pointer.y = e.clientY; 
    });
    window.addEventListener('touchmove', e => { 
        pointer.x = e.touches[0].clientX; 
        pointer.y = e.touches[0].clientY; 
    });
    window.addEventListener('mouseout', () => { 
        pointer.x = null; 
        pointer.y = null; 
    });

    // Animation loop
    function draw() {
        ctx.clearRect(0, 0, width, height);
        
        for (let i = 0; i < NODE_COUNT; i++) {
            const ni = nodes[i];
            ni.update();
            
            // Mouse interaction
            if (pointer.x !== null) {
                const dx = ni.x - pointer.x;
                const dy = ni.y - pointer.y;
                const dist = Math.hypot(dx, dy);
                if (dist < MAX_DIST) {
                    const rep = (MAX_DIST - dist) / MAX_DIST * 0.6;
                    ni.vx += (dx / dist) * rep;
                    ni.vy += (dy / dist) * rep;
                }
            }
            
            // Draw connections
            for (let j = i + 1; j < NODE_COUNT; j++) {
                const nj = nodes[j];
                const dx = ni.x - nj.x;
                const dy = ni.y - nj.y;
                const dist = Math.hypot(dx, dy);
                if (dist < MAX_DIST) {
                    ctx.strokeStyle = `rgba(255,255,255,${1 - dist / MAX_DIST})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath(); 
                    ctx.moveTo(ni.x, ni.y); 
                    ctx.lineTo(nj.x, nj.y); 
                    ctx.stroke();
                }
            }
        }
        
        // Draw nodes
        nodes.forEach(n => {
            ctx.fillStyle = n.color;
            ctx.beginPath(); 
            ctx.arc(n.x, n.y, 2.2, 0, Math.PI * 2); 
            ctx.fill();
        });
        
        requestAnimationFrame(draw);
    }
    
    // Start animation
    draw();
    console.log('Network animation started');
}

// Initialize progress circles animation
function initializeProgressCircles() {
    console.log('Initializing progress circles...');
    
    const progressCircles = document.querySelectorAll('.progress-circle');
    
    if (progressCircles.length === 0) {
        console.log('No progress circles found');
        return;
    }
    
    // Set initial progress values directly from CSS nth-child selectors
    const progressValues = [60, 85, 90, 5]; // Matches qwe.html exactly
    
    // Apply progress values immediately (no animation needed as CSS handles it)
    progressCircles.forEach((circle, index) => {
        if (index < progressValues.length) {
            const progressValue = progressValues[index];
            const progressDeg = (progressValue / 100) * 360;
            
            // Set CSS custom property for the gradient
            circle.style.setProperty('--progress', `${progressDeg}deg`);
            
            // Special styling for DMF (5% - in development)
            if (progressValue === 5) {
                circle.style.background = `conic-gradient(#666666 ${progressDeg}deg, rgba(255, 255, 255, 0.1) 0)`;
                const progressText = circle.querySelector('.progress-text');
                if (progressText) {
                    progressText.style.color = '#666666';
                }
            }
        }
    });
    
    console.log(`Progress circles initialized with values: ${progressValues.join(', ')}%`);
}

// Newsletter functionality
function initializeNewsletter() {
    const form = document.getElementById('newsletterForm');
    const emailInput = document.getElementById('emailInput');
    const feedback = document.getElementById('formFeedback');
    
    if (!form || !emailInput || !feedback) {
        console.log('Newsletter elements not found');
        return;
    }
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        const submitBtn = form.querySelector('.newsletter-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const originalText = btnText.textContent;
        
        // Basic email validation
        if (!isValidEmail(email)) {
            showFeedback('error', getLocalizedText('invalid-email', 'Geçerli bir e-posta adresi giriniz.'));
            return;
        }
        
        // Show loading state
        submitBtn.disabled = true;
        btnText.textContent = getLocalizedText('sending', 'Gönderiliyor...');
        feedback.className = 'form-feedback';
        feedback.textContent = '';
        
        try {
            // Method 1: Send to your email (simulated)
            await simulateEmailSubmission(email);
            
            // Show success message
            showFeedback('success', getLocalizedText('success-message', 'Teşekkürler! E-posta listemize başarıyla eklendiniz.'));
            emailInput.value = '';
            
        } catch (error) {
            console.error('Newsletter submission error:', error);
            showFeedback('error', getLocalizedText('error-message', 'Bir hata oluştu. Lütfen tekrar deneyin.'));
        } finally {
            // Reset button
            submitBtn.disabled = false;
            btnText.textContent = originalText;
        }
    });
    
    // Real-time email validation
    emailInput.addEventListener('input', function() {
        const formGroup = this.closest('.form-group');
        if (this.value.trim() && !isValidEmail(this.value.trim())) {
            formGroup.style.borderColor = '#ff5f56';
        } else {
            formGroup.style.borderColor = '';
        }
    });
    
    console.log('Newsletter functionality initialized');
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFeedback(type, message) {
    const feedback = document.getElementById('formFeedback');
    if (feedback) {
        feedback.className = `form-feedback ${type}`;
        feedback.textContent = message;
        
        // Auto-hide after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                feedback.className = 'form-feedback';
                feedback.textContent = '';
            }, 5000);
        }
    }
}

function getLocalizedText(key, defaultText) {
    const texts = {
        'invalid-email': {
            'tr': 'Geçerli bir e-posta adresi giriniz.',
            'en': 'Please enter a valid email address.',
            'de': 'Bitte geben Sie eine gültige E-Mail-Adresse ein.'
        },
        'sending': {
            'tr': 'Gönderiliyor...',
            'en': 'Sending...',
            'de': 'Wird gesendet...'
        },
        'success-message': {
            'tr': 'Teşekkürler! E-posta listemize başarıyla eklendiniz.',
            'en': 'Thank you! You have been successfully added to our email list.',
            'de': 'Vielen Dank! Sie wurden erfolgreich zu unserer E-Mail-Liste hinzugefügt.'
        },
        'error-message': {
            'tr': 'Bir hata oluştu. Lütfen tekrar deneyin.',
            'en': 'An error occurred. Please try again.',
            'de': 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.'
        }
    };
    
    return texts[key] && texts[key][currentLanguage] ? texts[key][currentLanguage] : defaultText;
}

async function simulateEmailSubmission(email) {
    try {
        const response = await fetch('/assets/api/newsletter-simple.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Submission failed');
        }
        
        console.log(`Newsletter subscription successful: ${email}`);
        console.log(`Total subscribers: ${data.total}`);
        
        return data;
        
    } catch (error) {
        console.error('Newsletter API error:', error);
        throw error;
    }
}

// GitHub API Integration for live stats
async function fetchGitHubStats() {
    try {
        console.log('Fetching GitHub stats...');
        
        // User info (for repository count)
        const userResponse = await fetch('https://api.github.com/users/smrtkrft');
        if (!userResponse.ok) throw new Error('Failed to fetch user data');
        const userData = await userResponse.json();
        
        // Issues count (across all repos)
        const issuesResponse = await fetch('https://api.github.com/search/issues?q=user:smrtkrft+state:open+type:issue');
        if (!issuesResponse.ok) throw new Error('Failed to fetch issues data');
        const issuesData = await issuesResponse.json();
        
        // Events for contributions (approximation)
        const eventsResponse = await fetch('https://api.github.com/users/smrtkrft/events');
        if (!eventsResponse.ok) throw new Error('Failed to fetch events data');
        const eventsData = await eventsResponse.json();
        
        const stats = {
            repositories: userData.public_repos,
            issues: issuesData.total_count,
            contributions: eventsData.length || 19 // Fallback to current value
        };
        
        console.log('GitHub stats fetched:', stats);
        updateGitHubUI(stats);
        
    } catch (error) {
        console.error('GitHub API error:', error);
        // Keep existing values on error
        console.log('Using fallback values due to API error');
    }
}

function updateGitHubUI(stats) {
    // Update code block stats (with green color via CSS)
    const statsRepos = document.getElementById('stats-repos');
    const statsIssues = document.getElementById('stats-issues');
    const statsContributions = document.getElementById('stats-contributions');
    
    if (statsRepos) statsRepos.textContent = stats.repositories;
    if (statsIssues) statsIssues.textContent = stats.issues;
    if (statsContributions) statsContributions.textContent = stats.contributions;
    
    // Update support stats section
    const statRepos = document.getElementById('stat-repos');
    const statContributions = document.getElementById('stat-contributions');
    const statIssues = document.getElementById('stat-issues');
    
    if (statRepos) statRepos.textContent = stats.repositories;
    if (statContributions) statContributions.textContent = stats.contributions;
    if (statIssues) statIssues.textContent = stats.issues;
}

// Initialize GitHub stats when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit before fetching to avoid conflicts with other initializations
    setTimeout(fetchGitHubStats, 1000);
});

console.log('Script loaded successfully!');
