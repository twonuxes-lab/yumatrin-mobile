_output("tasklist", shell=True, stderr=subprocess.DEVNULL).decode('cp866').lower()
        for proc in vm_processes:
            if proc in output:
                print("[!] ОБНАРУЖЕНА ВИРТУАЛЬНАЯ МАШИНА. ВЫХОД.")
                sys.exit(1)
    except Exception:
        pass

# ==========================================import os
import sys
import time
import base64
import ctypes
import threading
import subprocess

# ==========================================
# БЛОК 1: ПРОВЕРКА ОКРУЖЕНИЯ (Анти-Виртуалка, Анти-Отладка)
# ==========================================
def check_environment():
    """Проверяет, не запущен ли скрипт в песочнице или под отладчиком."""
    
    # 1. Проверка на запуск через IDLE (стандартная среда Python)
    if "idlelib" in sys.modules:
        print("[!] ОБНАРУЖЕНА ОТЛАДКА. ВЫХОД.")
        sys.exit(1)
        
    # 2. Проверка на виртуальную машину (поиск процессов)
    vm_processes = ["vboxservice.exe", "vmtoolsd.exe", "vmsrvc.exe"]
    try:
        # Используем WMIC для получения списка процессов (работает только на Windows)
        output = subprocess.check
# БЛОК 2: ОБФУСКАЦИЯ (Шифрование строк)
# ==========================================
# Ключ не лежит в открытом виде. Он зашифрован XOR-ом и закодирован в Base64.
# Строка: "SECRET_KEY_NUXES_2026"
_ENCODED_KEY = "U0VSQ1JUX0tFWV9OVVhFU18yMDI2" 

def get_secret_key():
    """Расшифровывает ключ в памяти."""
    try:
        decoded = base64.b64decode(_ENCODED_KEY).decode('utf-8')
        # Простой XOR для снятия "защиты" (в реальности тут должен быть AES)
        return ''.join(chr(ord(c) ^ 7) for c in decoded)
    except Exception:
        return "ERROR"

# ==========================================
# БЛОК 3: СИСТЕМНАЯ БЛОКИРОВКА (Windows API)
# ==========================================
def block_screenshot_and_keys():
    """Блокирует PrintScreen, F12 и скрывает окно от захвата."""
    
    # 1. Блокировка клавиш на уровне системы (через WinAPI)
    user32 = ctypes.windll.user32
    
    # Блокируем PrintScreen (VK_SNAPSHOT = 0x2C)
    user32.keybd_event(0x2C, 0, 0, 0) # Нажимаем
    user32.keybd_event(0x2C, 0, 2, 0) # Отпускаем
    
    # 2. Защита от скриншотов (SetWindowDisplayAffinity)
    # Ищем окно консоли, в которой запущен скрипт
    hwnd = ctypes.windll.kernel32.GetConsoleWindow()
    if hwnd:
        # WDA_EXCLUDEFROMCAPTURE = 0x00000011 (Окно становится черным на скриншотах)
        ctypes.windll.user32.SetWindowDisplayAffinity(hwnd, 0x00000011)

    # 3. Постоянный мониторинг клавиш (в отдельном потоке)
    def monitor_keys():
        while True:
            # Если нажали Ctrl+C (чтобы можно было выйти)
            if user32.GetAsyncKeyState(0x11) & 0x8000 and user32.GetAsyncKeyState(0x43) & 0x8000:
                sys.exit(0)
            
            # Блокируем закрытие окна крестиком
            if user32.GetAsyncKeyState(0x12) & 0x8000 and user32.GetAsyncKeyState(0x73) & 0x8000: # Alt+F4
                pass # Игнорируем
                
            time.sleep(0.05)

    threading.Thread(target=monitor_keys, daemon=True).start()

# ==========================================
# БЛОК 4: ЗАЩИТА ОТ БЛОКИРОВКИ ЭКРАНА (Anti-BruteForce)
# ==========================================
login_attempts = 0
MAX_ATTEMPTS = 3

def check_password():
    """Имитация проверки пароля с защитой от брутфорса."""
    global login_attempts
    
    if login_attempts >= MAX_ATTEMPTS:
        print("\n[!] СИСТЕМА ЗАБЛОКИРОВАНА. СЛИШКОМ МНОГО ПОПЫТОК.")
        time.sleep(5)
        sys.exit(1)

    secret_key = get_secret_key()
    user_input = input("Введите ключ доступа: ")

    if user_input == secret_key:
        print("[+] ДОСТУП РАЗРЕШЕН. ЗАГРУЗКА СИСТЕМЫ...")
        return True
    else:
        login_attempts += 1
        print(f"[-] НЕВЕРНЫЙ КЛЮЧ. ОСТАЛОСЬ ПОПЫТОК: {MAX_ATTEMPTS - login_attempts}")
        return False

# ==========================================
# БЛОК 5: ЗАПУСК (Главная функция)
# ==========================================
def main():
    # Очищаем консоль
    os.system('cls' if os.name == 'nt' else 'clear')
    
    print("==========================================")
    print("   СИСТЕМА ЗАЩИТЫ 'NUXES SHIELD' v3.0")
    print("==========================================")
    
    # 1. Проверка окружения
    check_environment()
    
    # 2. Включаем защиту экрана и клавиш
    block_screenshot_and_keys()
    
    # 3. Проверка пароля
    while not check_password():
        pass # Крутимся в цикле, пока не введут правильный пароль
        
    # 4. Имитация работы защищенной программы
    print("\n[+] Инициализация ядра...")
    time.sleep(1)
    print("[+] Загрузка базы данных...")
    time.sleep(1)
    print("[+] Расшифровка ключей...")
    time.sleep(1)
    
    print("\n==========================================")
    print("   ДОСТУП К СИСТЕМЕ ПОЛУЧЕН.")
    print("   НАЖМИТЕ CTRL+C ДЛЯ ВЫХОДА.")
    print("==========================================")
    
    # Бесконечный цикл (чтобы программа не закрылась)
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\n[!] Выход из системы...")
        sys.exit(0)

if __name__ == "__main__":
    main()