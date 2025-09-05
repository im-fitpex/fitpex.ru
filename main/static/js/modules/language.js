// Переключатель языков

export function initLanguageSwitcher() {
    const languageSwitcher = document.getElementById('languageSwitcher');
    const langToggle = document.getElementById('langToggle');
    const langDropdown = document.getElementById('langDropdown');
    const langOptions = document.querySelectorAll('.lang-option');
    
    if (!languageSwitcher || !langToggle || !langOptions.length) return;
    
    // Toggle dropdown
    langToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        languageSwitcher.classList.toggle('open');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!languageSwitcher.contains(e.target)) {
            languageSwitcher.classList.remove('open');
        }
    });
    
    // Handle language option clicks
    langOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            const selectedLang = this.getAttribute('data-lang');
            const selectedFlag = this.querySelector('.lang-flag').textContent;
            const selectedText = selectedLang.toUpperCase();
            
            // Update button content
            const currentFlag = langToggle.querySelector('.lang-flag');
            const currentText = langToggle.querySelector('.lang-text');
            
            if (currentFlag) currentFlag.textContent = selectedFlag;
            if (currentText) currentText.textContent = selectedText;
            
            // Add switching animation
            langToggle.classList.add('switching');
            setTimeout(() => {
                langToggle.classList.remove('switching');
            }, 300);
            
            // Update active state
            langOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            // Close dropdown
            languageSwitcher.classList.remove('open');
            
            // Navigate to the selected language page
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                // Add a small delay for animation
                setTimeout(() => {
                    window.location.href = href;
                }, 150);
            }
        });
    });
    
    // Keyboard navigation
    langToggle.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            languageSwitcher.classList.toggle('open');
        }
        if (e.key === 'Escape') {
            languageSwitcher.classList.remove('open');
        }
    });
    
    // Set current language based on URL
    function setCurrentLanguage() {
        const currentPath = window.location.pathname;
        let currentLang = '';
        
        if (currentPath.includes('/ru/')) {
            currentLang = 'ru';
        } else if (currentPath.includes('/')) {
            currentLang = 'en';
        }
        
        // Update active option
        langOptions.forEach(option => {
            option.classList.remove('active');
            if (option.getAttribute('data-lang') === currentLang) {
                option.classList.add('active');
                
                // Update button display
                const flag = option.querySelector('.lang-flag').textContent;
                const text = currentLang.toUpperCase();
                
                const currentFlag = langToggle.querySelector('.lang-flag');
                const currentText = langToggle.querySelector('.lang-text');
                
                if (currentFlag) currentFlag.textContent = flag;
                if (currentText) currentText.textContent = text;
            }
        });
    }
    
    // Initialize current language
    setCurrentLanguage();
    
    // Add smooth hover effects
    langToggle.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-1px)';
    });
    
    langToggle.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
}