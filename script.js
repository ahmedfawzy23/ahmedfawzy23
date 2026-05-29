/* ==========================================================================
   Ahmed Fawzy Portfolio Interactive Scripts (Cyber-Artisan Premium Edition)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. SCROLL PROGRESS INDICATOR ---
    const scrollProgress = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / height) * 100;
        scrollProgress.style.width = scrolled + '%';
    });


    // --- 2. MOBILE NAVIGATION TOGGLE ---
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileMenuIcon = mobileMenuToggle.querySelector('i');

    mobileMenuToggle.addEventListener('click', () => {
        mobileNav.classList.toggle('open');
        if (mobileNav.classList.contains('open')) {
            mobileMenuIcon.className = 'fas fa-times';
        } else {
            mobileMenuIcon.className = 'fas fa-bars';
        }
    });

    // Close mobile nav when clicking a link
    const mobileLinks = document.querySelectorAll('.mobile-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('open');
            mobileMenuIcon.className = 'fas fa-bars';
        });
    });


    // --- 3. DARK/LIGHT THEME SWITCHER ---
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check saved theme or use system preference
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
        } else {
            themeIcon.className = 'fas fa-moon';
        }
    }


    // --- 4. SCROLL REVEAL (INTERSECTION OBSERVER) ---
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target); // Reveal only once
            }
        });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));


    // --- 5. SLIDING FILTER SLIDER & PROJECT FILTERING ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const filterSlider = document.getElementById('filter-slider');

    function positionFilterSlider(activeBtn) {
        if (!activeBtn || !filterSlider) return;
        filterSlider.style.width = activeBtn.offsetWidth + 'px';
        filterSlider.style.left = activeBtn.offsetLeft + 'px';
    }

    // Set initial position
    const initialActive = document.querySelector('.filter-btn.active');
    if (initialActive) {
        // Wait briefly for CSS layout to settle
        setTimeout(() => positionFilterSlider(initialActive), 150);
    }

    // Recalculate slider on resize to avoid misalignment
    window.addEventListener('resize', () => {
        const currentActive = document.querySelector('.filter-btn.active');
        if (currentActive) positionFilterSlider(currentActive);
    });

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            positionFilterSlider(btn);

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });


    // --- 6. 3D TILT EFFECT ON CARDS ---
    const tiltCards = document.querySelectorAll('.card-3d');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within element
            const y = e.clientY - rect.top;  // y position within element
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate tilt angle (max 8 degrees)
            const rotateX = ((centerY - y) / centerY) * 6;
            const rotateY = ((x - centerX) / centerX) * 6;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
            card.style.transition = 'transform 0.05s ease';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
            card.style.transition = 'transform 0.5s ease';
        });
    });


    // --- 7. MOCK IDE TAB & FILE TREE INTERACTIVE CONTROLLER ---
    const ideTabs = document.querySelectorAll('.ide-tab');
    const treeFiles = document.querySelectorAll('.tree-file');
    const editorPanes = document.querySelectorAll('.editor-pane');

    function switchIDETab(tabName) {
        // Deactivate all
        ideTabs.forEach(t => t.classList.remove('active'));
        treeFiles.forEach(f => f.classList.remove('active'));
        editorPanes.forEach(p => p.classList.remove('active'));

        // Activate selected tab in tab-bar
        const targetTab = document.querySelector(`.ide-tab[data-tab="${tabName}"]`);
        if (targetTab) targetTab.classList.add('active');

        // Activate selected sidebar item
        const targetFile = document.querySelector(`.tree-file[data-tab="${tabName}"]`);
        if (targetFile) targetFile.classList.add('active');

        // Activate editor pane
        let targetPaneId = '';
        if (tabName === 'bio') targetPaneId = 'pane-bio';
        else if (tabName === 'skills') targetPaneId = 'pane-skills';
        else if (tabName === 'routes') targetPaneId = 'pane-routes';
        else if (tabName === 'terminal') targetPaneId = 'pane-terminal';

        const targetPane = document.getElementById(targetPaneId);
        if (targetPane) {
            targetPane.classList.add('active');
            
            // If switching to terminal pane, auto-focus terminal input
            if (tabName === 'terminal') {
                const terminalInput = document.getElementById('terminal-input');
                if (terminalInput) setTimeout(() => terminalInput.focus(), 150);
            }
        }
    }

    // Tab bar clicks
    ideTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            if (e.target.classList.contains('close-tab')) {
                // If closing a tab, mock logic
                e.stopPropagation();
                return;
            }
            const tabName = tab.getAttribute('data-tab');
            switchIDETab(tabName);
        });
    });

    // File tree clicks
    treeFiles.forEach(file => {
        file.addEventListener('click', () => {
            const tabName = file.getAttribute('data-tab');
            switchIDETab(tabName);
        });
    });


    // --- 8. ARTISAN TERMINAL SIMULATOR ---
    const terminalInput = document.getElementById('terminal-input');
    const terminalBody = document.getElementById('terminal-body');
    const terminalHistory = document.getElementById('terminal-history');

    if (terminalBody && terminalInput) {
        terminalBody.addEventListener('click', (e) => {
            if (e.target !== terminalInput) {
                terminalInput.focus();
            }
        });

        // Available commands dataset
        const commands = {
            help: `Available commands:
  <span class="text-primary">about</span>            - Profile overview
  <span class="text-primary">experience</span>       - Work experience details
  <span class="text-primary">projects</span>         - Selected list of projects
  <span class="text-primary">skills</span>           - Technical skill arsenal
  <span class="text-primary">contact</span>          - Contact links and info
  <span class="text-primary">clear</span>            - Clear terminal screen
  <span class="text-primary">inspire</span>          - Get a motivational developer quote`,
            about: `<div class="terminal-about-card">
  <p><span class="text-primary">Name:</span> Ahmed Fawzy</p>
  <p><span class="text-primary">Role:</span> Backend Engineer & Laravel Architect</p>
  <p><span class="text-primary">Experience:</span> 2+ Years building robust PHP/Laravel systems</p>
  <p><span class="text-primary">Location:</span> Giza, Egypt (Open to Remote/Relocation)</p>
  <p><span class="text-primary">Bio:</span> Detail-oriented developer focusing on clean code, REST APIs, high-performance database indexing, and secure role-based access control systems.</p>
</div>`,
            experience: `Work History:
  
  <span class="text-secondary">[1] Digital Bond — Back-End Engineer (Full-time)</span>
      Dokki, Egypt | Sep 2025 - Present
      - Architected 10+ RESTful APIs, reducing average latency by 30%.
      - Established PR review standards cutting team bugs by 25%.
      
  <span class="text-secondary">[2] Route Academy — PHP/Laravel Mentor (Part-time)</span>
      Dokki, Egypt | Feb 2023 - Present
      - Mentored 500+ trainees, leading team of 3+ mentors.
      
  <span class="text-secondary">[3] Elevate Tech — Back-End Developer (Freelance)</span>
      Remote | Jan 2025 - Jan 2026
      - Delivered custom Laravel solutions for international clients.`,
            projects: `Selected Production Projects:
  
  * <span class="text-primary">WHO IPC Monitoring & Evaluation</span> - Nationwide Healthcare Audits
  * <span class="text-primary">laravel-roles-permissions</span>      - Open-Source Laravel Package on Packagist
  * <span class="text-primary">Meditrade Portal</span>               - Import/Export bilingual CMS and Platform
  * <span class="text-primary">EGEC Student Management</span>        - Arab students enrollment engine (arabsstudents.com)
  * <span class="text-primary">Edugate UAE Admission</span>          - Admissions workflows panel (ksa-students.com)
  * <span class="text-primary">Zi Sushi App Backend</span>           - Order dispatching & loyalty system APIs
  * <span class="text-primary">Graduation Pulmonary AI</span>        - Disease audio analysis using AI/ML & Laravel`,
            skills: `Technical Arsenal:
  
  <span class="text-primary">Languages:</span>      PHP, Python, JavaScript, SQL, Java, C++
  <span class="text-primary">Frameworks:</span>     Laravel, WordPress, Blade templates
  <span class="text-primary">Databases:</span>      MySQL, MongoDB, SQL Server, Oracle
  <span class="text-primary">Tools/DevOps:</span>   Docker, Git, GitHub Actions (CI/CD), Redis, Linux, Postman
  <span class="text-primary">Concepts:</span>       SOLID Principles, RBAC, Query Optimization, System Design`,
            contact: `Let's Connect!
  
  * <span class="text-primary">Email:</span>     01ahmedfawzy23@gmail.com
  * <span class="text-primary">LinkedIn:</span>  linkedin.com/in/ahmedfawzy23
  * <span class="text-primary">GitHub:</span>    github.com/ahmedfawzy23
  * <span class="text-primary">WhatsApp:</span>  +201274106118`
        };

        const inspireQuotes = [
            "\"Simplicity is the ultimate sophistication.\" — Leonardo da Vinci",
            "\"Clean code always looks like it was written by someone who cares.\" — Michael Feathers",
            "\"There are only two hard things in Computer Science: cache invalidation and naming things.\" — Phil Karlton",
            "\"Talk is cheap. Show me the code.\" — Linus Torvalds",
            "\"Make it work, make it right, make it fast.\" — Kent Beck",
            "\"Laravel is designed to make web development fun again.\" — Taylor Otwell"
        ];

        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const rawInput = terminalInput.value;
                const cleanInput = rawInput.trim().toLowerCase();
                
                // 1. Output command line
                const cmdLine = document.createElement('div');
                cmdLine.className = 'terminal-line';
                cmdLine.innerHTML = `<span class="terminal-prompt">guest@laravel:~$</span> <span class="terminal-output-typed">${rawInput}</span>`;
                terminalHistory.appendChild(cmdLine);

                // 2. Process command output
                if (cleanInput.length > 0) {
                    const responseLine = document.createElement('div');
                    responseLine.className = 'terminal-line animate-fade-in';

                    if (cleanInput === 'clear') {
                        terminalHistory.innerHTML = '';
                    } else if (cleanInput === 'help') {
                        responseLine.innerHTML = commands.help;
                        terminalHistory.appendChild(responseLine);
                    } else if (cleanInput === 'about') {
                        responseLine.innerHTML = commands.about;
                        terminalHistory.appendChild(responseLine);
                    } else if (cleanInput === 'experience') {
                        responseLine.innerHTML = commands.experience;
                        terminalHistory.appendChild(responseLine);
                    } else if (cleanInput === 'projects') {
                        responseLine.innerHTML = commands.projects;
                        terminalHistory.appendChild(responseLine);
                    } else if (cleanInput === 'skills') {
                        responseLine.innerHTML = commands.skills;
                        terminalHistory.appendChild(responseLine);
                    } else if (cleanInput === 'contact') {
                        responseLine.innerHTML = commands.contact;
                        terminalHistory.appendChild(responseLine);
                    } else if (cleanInput === 'inspire' || cleanInput === 'php artisan inspire') {
                        const randomQuote = inspireQuotes[Math.floor(Math.random() * inspireQuotes.length)];
                        responseLine.innerHTML = `<span class="text-secondary">${randomQuote}</span>`;
                        terminalHistory.appendChild(responseLine);
                    } else if (cleanInput.startsWith('php artisan ') || cleanInput === 'php artisan') {
                        const artisanSubCmd = cleanInput.replace('php artisan', '').trim();
                        if (artisanSubCmd === 'inspire') {
                            const randomQuote = inspireQuotes[Math.floor(Math.random() * inspireQuotes.length)];
                            responseLine.innerHTML = `<span class="text-secondary">${randomQuote}</span>`;
                        } else if (commands[artisanSubCmd]) {
                            responseLine.innerHTML = commands[artisanSubCmd];
                        } else if (artisanSubCmd === 'list') {
                            responseLine.innerHTML = commands.help;
                        } else {
                            responseLine.innerHTML = `<span class="text-primary">Artisan:</span> Command "${artisanSubCmd || 'list'}" is not defined. Try <span class="text-secondary">'php artisan inspire'</span> or <span class="text-secondary">'about'</span>.`;
                        }
                        terminalHistory.appendChild(responseLine);
                    } else {
                        responseLine.innerHTML = `bash: command not found: ${rawInput}. Type <span class="text-secondary">'help'</span> to see available commands.`;
                        terminalHistory.appendChild(responseLine);
                    }
                }

                // 3. Reset input value & Scroll to bottom
                terminalInput.value = '';
                setTimeout(() => {
                    terminalBody.scrollTop = terminalBody.scrollHeight;
                }, 50);
            }
        });
    }


    // --- 9. CONTACT FORM HANDLING ---
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Visual loading state on submit
            const submitBtn = contactForm.querySelector('.btn-submit');
            const submitBtnText = submitBtn.querySelector('span');
            const originalText = submitBtnText.textContent;
            
            submitBtn.disabled = true;
            submitBtnText.textContent = 'Sending...';

            // Simulating API backend dispatching
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtnText.textContent = originalText;
                
                // Show success status
                formStatus.className = 'form-status success';
                formStatus.innerHTML = `<i class="fas fa-check-circle"></i> Thanks, ${name}! Your message has been sent successfully. I'll get back to you soon.`;
                
                // Reset form inputs
                contactForm.reset();

                // Clear message overlay after 6s
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 6000);
            }, 1500);
        });
    }
});
