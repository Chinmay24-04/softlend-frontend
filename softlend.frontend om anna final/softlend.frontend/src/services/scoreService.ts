const SCORE_KEY = 'softlend_cibil_score'

export function getSavedScore(): number | null {
  try {
    const raw = localStorage.getItem(SCORE_KEY)
    if (!raw) return null
    const n = Number(raw)
    return Number.isFinite(n) ? n : null
  } catch {
    return null
  }
}

export function saveScore(score: number) {
  try {
    localStorage.setItem(SCORE_KEY, String(Math.round(score)))
    notifyScoreUpdated()
  } catch {}
}

export function clearScore() {
  try { localStorage.removeItem(SCORE_KEY) } catch {}
}

export function notifyScoreUpdated() {
  try { window.dispatchEvent(new CustomEvent('scoreUpdated')) } catch {}
}
