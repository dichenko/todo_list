import FingerprintJS from '@fingerprintjs/fingerprintjs'

const STORAGE_KEY = 'user_id'

export async function getUserId() {
  // Проверяем существующий ID
  let userId = localStorage.getItem(STORAGE_KEY)
  
  if (!userId) {
    // Получаем отпечаток браузера
    const fp = await FingerprintJS.load()
    const result = await fp.get()
    
    // Создаем уникальный ID, комбинируя отпечаток и случайное число
    userId = `${result.visitorId}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    
    localStorage.setItem(STORAGE_KEY, userId)
  }
  
  return userId
} 