// Language Switching
        function switchLanguage(lang) {
            const html = document.documentElement;
            const enBtn = document.getElementById('en-btn');
            const arBtn = document.getElementById('ar-btn');
            
            if (lang === 'ar') {
                html.setAttribute('dir', 'rtl');
                html.setAttribute('lang', 'ar');
                arBtn.classList.add('active');
                enBtn.classList.remove('active');
            } else {
                html.setAttribute('dir', 'ltr');
                html.setAttribute('lang', 'en');
                enBtn.classList.add('active');
                arBtn.classList.remove('active');
            }
        }

        // Counter Animation
        function animateCounter(element, target) {
            const counter = element.querySelector('.stat-number');
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target + (target === 98 ? '%' : '+');
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current) + (target === 98 ? '%' : '+');
                }
            }, 40);
        }

        // Calculator Functions
        let currentInput = '';
        let shouldResetDisplay = false;

        function addToCalc(value) {
            const display = document.getElementById('calc-display');
            
            if (shouldResetDisplay) {
                currentInput = '';
                shouldResetDisplay = false;
            }
            
            if (currentInput === '0' && value !== '.') {
                currentInput = value;
            } else {
                currentInput += value;
            }
            
            display.textContent = currentInput || '0';
        }

        function clearCalc() {
            currentInput = '';
            document.getElementById('calc-display').textContent = '0';
        }

        function deleteLast() {
            currentInput = currentInput.slice(0, -1);
            document.getElementById('calc-display').textContent = currentInput || '0';
        }

        function calculate() {
            try {
                const result = eval(currentInput.replace('×', '*').replace('÷', '/'));
                document.getElementById('calc-display').textContent = result;
                currentInput = result.toString();
                shouldResetDisplay = true;
                
                // Celebration effect
                if (result) {
                    const display = document.getElementById('calc-display');
                    display.style.background = 'white';
                    setTimeout(() => {
                        display.style.background = '#000';
                    }, 500);
                }
            } catch (error) {
                document.getElementById('calc-display').textContent = 'Error';
                currentInput = '';
                shouldResetDisplay = true;
            }
        }

        // Auto-animate stats on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.target.classList.contains('stat-card')) {
                    const target = entry.target.querySelector('.stat-number').id;
                    const values = {
                        'students-count': 500,
                        'courses-count': 25,
                        'projects-count': 1000,
                        'satisfaction-count': 98
                    };
                    animateCounter(entry.target, values[target]);
                }
            });
        });

        document.querySelectorAll('.stat-card').forEach(card => {
            observer.observe(card);
        });

        // Smooth scrolling for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });