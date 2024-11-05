import { readFile } from 'fs/promises'
import { join } from 'path'
import { H3Event } from 'h3'

export default defineEventHandler(async (event: H3Event) => {
  const filePath = join(process.cwd(), 'server/data/task_json.txt')
  try {
    const data = await readFile(filePath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Ошибка чтения JSON:', error)
    return { error: 'Не удалось загрузить данные каталога' }
  }
})
