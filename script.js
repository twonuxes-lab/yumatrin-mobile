// 1. ПРЕЛОАДЕР
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 800);
});

// 2. ПЕРЕКЛЮЧЕНИЕ ВКЛАДОК САЙТА
function navigateTo(sectionName) {
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    const targetPage = document.getElementById('page-' + sectionName);
    if (targetPage) {
        targetPage.classList.add('active');
        
        // Сброс скролла для текстовых страниц и энциклопедии
        const scrollable = targetPage.querySelector('.text-page, .world-content');
        if(scrollable) scrollable.scrollTop = 0;
    }

    const activeNav = document.getElementById('nav-' + sectionName);
    if (activeNav) {
        activeNav.classList.add('active');
    }
}

// 3. ПЕРЕКЛЮЧЕНИЕ ВКЛАДОК ВНУТРИ ЭНЦИКЛОПЕДИИ
function switchWorldTab(tabId, btnElement) {
    document.querySelectorAll('.world-pane').forEach(pane => {
        pane.classList.remove('active');
    });
    document.querySelectorAll('.world-tab').forEach(tab => {
        tab.classList.remove('active');
    });

    document.getElementById(tabId).classList.add('active');
    btnElement.classList.add('active');

    document.querySelector('.world-content').scrollTop = 0;
}

// 4. МОБИЛЬНОЕ МЕНЮ
const burgerBtn = document.getElementById('burgerBtn');
const mobileMenu = document.getElementById('mobileMenu');

burgerBtn.addEventListener('click', () => {
    burgerBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

function closeMobileMenu() {
    burgerBtn.classList.remove('active');
    mobileMenu.classList.remove('active');
}

// 5. ВЫБОР ПЛАТФОРМЫ
function selectPlatform(platform, btnElement) {
    document.querySelectorAll('.platform-tab').forEach(tab => tab.classList.remove('active'));
    btnElement.classList.add('active');

    const pcDownloads = document.getElementById('pc-downloads');
    const mobileDownloads = document.getElementById('mobile-downloads');

    if (platform === 'pc') {
        pcDownloads.style.display = 'flex';
        mobileDownloads.style.display = 'none';
    } else {
        pcDownloads.style.display = 'none';
        mobileDownloads.style.display = 'flex';
    }
}

// 6. МОДАЛЬНЫЕ ОКНА
function openModal(id) {
    document.getElementById(id).classList.add('active');
}

function closeModal(id) {
    document.getElementById(id).classList.remove('active');
}

document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.classList.remove('active');
        }
    });
});