function toggleMenu() { document.getElementById('sideMenu').classList.toggle('active'); }
function openModal(id) { document.getElementById(id).classList.add('active'); }
function closeModal(id) { document.getElementById(id).classList.remove('active'); }

function openDonatePage() { document.getElementById('donatePage').classList.add('active'); document.body.style.overflow = 'hidden'; }
function closeDonatePage() { document.getElementById('donatePage').classList.remove('active'); document.body.style.overflow = 'auto'; }

function scrollToServersAndRegister() { 
    document.getElementById('servers').scrollIntoView({ behavior: 'smooth' }); 
    setTimeout(() => { openModal('registerModal'); }, 800); 
}

function showRegisterStub() {
    document.getElementById('downloadModalTitle').innerText = "Регистрация";
    document.getElementById('downloadModalText').innerText = "На данный момент игра находится в стадии активной разработки. Ожидайте новостей от руководства проекта YUMATRIN MOBILE!";
    closeModal('registerModal');
    openModal('downloadModal');
}

function showDonateStub() {
    document.getElementById('downloadModalTitle').innerText = "Донат";
    document.getElementById('downloadModalText').innerText = "Система пополнения временно недоступна. Мы работаем над подключением платежных систем.";
    openModal('downloadModal');
}

function openWorldTab(tabId, btnElement) {
    let contents = document.querySelectorAll('.world-content');
    contents.forEach(content => {
        content.classList.remove('active');
        content.style.display = 'none'; 
    });

    let tabs = document.querySelectorAll('.world-tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });

    let targetTab = document.getElementById(tabId);
    if (targetTab) {
        targetTab.classList.add('active');
        targetTab.style.display = 'block';
    }

    if (btnElement) {
        btnElement.classList.add('active');
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const hash = window.location.hash;
    if (hash) {
        const tabId = hash.replace('#', '');
        const tabBtn = document.querySelector(`.world-tab[onclick*="${tabId}"]`);
        if (tabBtn) {
            openWorldTab(tabId, tabBtn);
        }
    }
});

function openDownloadModal(platform, title) {
    let text = "";
    if (platform === 'start') text = "Уважаемые игроки! На данный момент проект находится в стадии активной разработки.";
    else if (platform === 'android') text = "Скачивание APK-файла пока недоступно. Мы работаем над этим!";
    else if (platform === 'ios') text = "Приложение еще не опубликовано в App Store.";
    else if (platform === 'rustore') text = "В магазине RuStore игра пока недоступна.";
    else if (platform === 'pc') text = "Скачивание лаунчера для Windows временно приостановлено.";
    else if (platform === 'macos') text = "Скачивание лаунчера для macOS временно приостановлено.";
    else if (platform === 'youtube') text = "Наш YouTube канал находится в разработке. Скоро мы выложим кучу крутых видео!";
    
    document.getElementById('downloadModalTitle').innerText = title;
    document.getElementById('downloadModalText').innerText = text;
    openModal('downloadModal');
}

function openCheckout(amount, price) { 
    document.getElementById('checkoutAmount').innerText = amount; 
    document.getElementById('checkoutPrice').innerText = price; 
    document.getElementById('agreeCheckbox').checked = false; 
    togglePayBtn(); 
    openModal('checkoutModal'); 
}

function togglePayBtn() { 
    const checkbox = document.getElementById('agreeCheckbox'); 
    const btn = document.getElementById('payBtn'); 
    if(checkbox.checked) { btn.style.opacity = '1'; btn.style.pointerEvents = 'auto'; } 
    else { btn.style.opacity = '0.5'; btn.style.pointerEvents = 'none'; } 
}

function processPayment() { 
    if(document.getElementById('hp_field').value !== '') return false; 
    document.getElementById('downloadModalTitle').innerText = "Оплата";
    document.getElementById('downloadModalText').innerText = "Оплата временно недоступна. Платежная система в разработке.";
    closeModal('checkoutModal'); 
    openModal('downloadModal');
}

window.onclick = function(event) { 
    if (event.target.classList.contains('modal-overlay')) { 
        event.target.classList.remove('active'); 
    } 
}

document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById('effects-container');
    if (!container) return;

    function createLeaf() {
        const leaf = document.createElement('div');
        leaf.classList.add('falling-leaf');
        leaf.innerHTML = Math.random() > 0.5 ? '🍂' : '🍁';
        leaf.style.left = Math.random() * 100 + 'vw';
        leaf.style.animationDuration = (Math.random() * 5 + 6) + 's';
        leaf.style.fontSize = (Math.random() * 15 + 15) + 'px';
        container.appendChild(leaf);
        setTimeout(() => leaf.remove(), 11000);
    }

    function createSpark() {
        const spark = document.createElement('div');
        spark.classList.add('fire-spark');
        spark.style.left = Math.random() * 100 + 'vw';
        spark.style.bottom = '-10px';
        spark.style.animationDuration = (Math.random() * 2 + 1) + 's';
        container.appendChild(spark);
        setTimeout(() => spark.remove(), 3000);
    }

    function createStar() {
        const star = document.createElement('div');
        star.classList.add('twinkling-star');
        star.style.left = Math.random() * 100 + 'vw';
        star.style.top = Math.random() * 100 + 'vh';
        star.style.animationDuration = (Math.random() * 2 + 1) + 's';
        container.appendChild(star);
        setTimeout(() => star.remove(), 4000);
    }

    setInterval(createLeaf, 1200);
    setInterval(createSpark, 200);
    setInterval(createStar, 400);
});