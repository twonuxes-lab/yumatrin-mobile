#include <iostream>
#include <windows.h>
#include <tlhelp32.h>
#include <string>
#include <thread>
#include <chrono>

// ==========================================
// БЛОК 1: АНТИ-ОТЛАДКА (Проверка на дебаггер)
// ==========================================
bool IsDebuggerAttached() {
    if (IsDebuggerPresent()) return true;
    
    BOOL isDebuggerPresent = FALSE;
    CheckRemoteDebuggerPresent(GetCurrentProcess(), &isDebuggerPresent);
    if (isDebuggerPresent) return true;

    return false;
}

// ==========================================
// БЛОК 2: АНТИ-ВИРТУАЛКА (Поиск процессов VM)
// ==========================================
bool IsVirtualMachine() {
    const wchar_t* vmProcesses[] = {
        L"vboxservice.exe", L"vmtoolsd.exe", L"vmsrvc.exe", L"vmware.exe"
    };

    HANDLE hSnapshot = CreateToolhelp32Snapshot(TH32CS_SNAPPROCESS, 0);
    if (hSnapshot == INVALID_HANDLE_VALUE) return false;

    PROCESSENTRY32W pe32;
    pe32.dwSize = sizeof(PROCESSENTRY32W);

    if (Process32FirstW(hSnapshot, &pe32)) {
        do {
            for (const auto& vmProc : vmProcesses) {
                if (_wcsicmp(pe32.szExeFile, vmProc) == 0) {
                    CloseHandle(hSnapshot);
                    return true;
                }
            }
        } while (Process32NextW(hSnapshot, &pe32));
    }
    CloseHandle(hSnapshot);
    return false;
}

// ==========================================
// БЛОК 3: ОБФУСКАЦИЯ КЛЮЧА (XOR Шифрование)
// ==========================================
// Зашифрованный пароль (XOR ключ = 7). Расшифровка: "SECRET_KEY_NUXES_2026"
std::string GetDecryptedKey() {
    unsigned char encKey[] = { 85, 68, 80, 69, 67, 91, 68, 91, 83, 90, 89, 70, 88, 91, 94, 83, 89, 82, 82, 49, 48, 49, 55, 0 };
    std::string decrypted = "";
    for (int i = 0; encKey[i] != 0; i++) {
        decrypted += (char)(encKey[i] ^ 7); // XOR дешифровка
    }
    return decrypted;
}

// ==========================================
// БЛОК 4: ЗАЩИТА ОКНА (От скриншотов)
// ==========================================
void ProtectWindow() {
    HWND hwnd = GetConsoleWindow();
    if (hwnd) {
        // WDA_EXCLUDEFROMCAPTURE (0x00000011) - делает окно черным на скриншотах
        SetWindowDisplayAffinity(hwnd, 0x00000011);
    }
}

// ==========================================
// БЛОК 5: ЗАПУСК PYTHON-СКРИПТА
// ==========================================
void RunPythonScript() {
    // Запускаем скрыто (SW_HIDE), чтобы не было видно второго окна
    STARTUPINFOA si = { sizeof(si) };
    si.dwFlags = STARTF_USESHOWWINDOW;
    si.wShowWindow = SW_HIDE; 
    PROCESS_INFORMATION pi;

    // Если Python скомпилирован в EXE, укажи путь к нему, например: "protection.exe"
    // Если запускаем сам скрипт: "python protection.py"
    char cmd[] = "python protection.py"; 

    if (CreateProcessA(NULL, cmd, NULL, NULL, FALSE, 0, NULL, NULL, &si, &pi)) {
        WaitForSingleObject(pi.hProcess, INFINITE);
        CloseHandle(pi.hProcess);
        CloseHandle(pi.hThread);
    } else {
        std::cout << "[-] Ошибка: Не удалось запустить Python-скрипт.\n";
    }
}

// ==========================================
// ГЛАВНАЯ ФУНКЦИЯ
// ==========================================
int main() {
    SetConsoleTitleA("NUXES SHIELD C++ EDITION");
    system("color 0A"); // Зеленый текст

    std::cout << "==========================================\n";
    std::cout << "   СИСТЕМА ЗАЩИТЫ 'NUXES SHIELD' (C++)   \n";
    std::cout << "==========================================\n\n";

    // 1. Проверка на отладчик
    if (IsDebuggerAttached()) {
        std::cout << "[!] ОБНАРУЖЕН ОТЛАДЧИК. ВЫХОД.\n";
        Sleep(3000);
        return 1;
    }

    // 2. Проверка на виртуальную машину
    if (IsVirtualMachine()) {
        std::cout << "[!] ОБНАРУЖЕНА ВИРТУАЛЬНАЯ МАШИНА. ВЫХОД.\n";
        Sleep(3000);
        return 1;
    }

    // 3. Защита от скриншотов
    ProtectWindow();

    // 4. Проверка пароля (с защитой от брутфорса)
    std::string secretKey = GetDecryptedKey();
    std::string userInput;
    int attempts = 0;
    const int MAX_ATTEMPTS = 3;

    while (attempts < MAX_ATTEMPTS) {
        std::cout << "Введите ключ доступа: ";
        std::cin >> userInput;

        if (userInput == secretKey) {
            std::cout << "[+] ДОСТУП РАЗРЕШЕН. ПЕРЕДАЧА УПРАВЛЕНИЯ...\n";
            Sleep(1000);
            break;
        } else {
            attempts++;
            std::cout << "[-] НЕВЕРНЫЙ КЛЮЧ. ОСТАЛОСЬ ПОПЫТОК: " << (MAX_ATTEMPTS - attempts) << "\n";
        }
    }

    if (attempts >= MAX_ATTEMPTS) {
        std::cout << "[!] СИСТЕМА ЗАБЛОКИРОВАНА.\n";
        Sleep(5000);
        return 1;
    }

    // 5. Запуск Python-кода
    std::cout << "\n[+] Инициализация ядра...\n";
    std::cout << "[+] Запуск защищенного модуля...\n";
    
    RunPythonScript();

    std::cout << "\n[!] Работа завершена. Нажмите Enter для выхода...\n";
    std::cin.ignore();
    std::cin.get();
    return 0;
}