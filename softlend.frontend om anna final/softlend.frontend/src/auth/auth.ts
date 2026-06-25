type User = { username: string; name: string }

const STORAGE_KEY = 'softlend_user'
const USERS_KEY = 'softlend_users'

const DEFAULT_CREDENTIALS = [
  { username: 'intern', password: 'intern123', name: 'Softlend Intern' },
  { username: 'ravi@softlend.com', password: 'password123', name: 'Ravi Patel' },
]

function getStoredUsers(): Array<{ username: string; password: string; name: string }> {
  const raw = localStorage.getItem(USERS_KEY)
  if (!raw) return DEFAULT_CREDENTIALS
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : DEFAULT_CREDENTIALS
  } catch {
    return DEFAULT_CREDENTIALS
  }
}

function saveStoredUsers(users: Array<{ username: string; password: string; name: string }>) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function login(username: string, password: string): { ok: true; user: User } | { ok: false; error: string } {
  const users = getStoredUsers()
  const matched = users.find(user => user.username === username)
  if (matched && matched.password === password) {
    const user: User = { username, name: matched.name }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    return { ok: true, user }
  }
  return { ok: false, error: 'Invalid credentials' }
}

export function register(username: string, password: string, name: string): { ok: true; user: User } | { ok: false; error: string } {
  if (!username || !password || !name) {
    return { ok: false, error: 'Please complete all fields' }
  }
  const users = getStoredUsers()
  if (users.some(user => user.username === username)) {
    return { ok: false, error: 'An account with this email already exists' }
  }
  const newUser = { username, password, name }
  saveStoredUsers([...users, newUser])
  const user: User = { username, name }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
  return { ok: true, user }
}

export function logout() {
  localStorage.removeItem(STORAGE_KEY)
}

export function getUser(): User | null {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return null
  try { return JSON.parse(raw) as User } catch { return null }
}

export function isAuthenticated() {
  return getUser() !== null
}
