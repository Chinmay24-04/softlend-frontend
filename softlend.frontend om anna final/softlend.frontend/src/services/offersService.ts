import { OFFERS, type Offer } from './mockData'

const ACCEPTED_KEY = 'softlend_accepted_offers'

function readAccepted(): string[] {
  try {
    const raw = localStorage.getItem(ACCEPTED_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function writeAccepted(ids: string[]) {
  localStorage.setItem(ACCEPTED_KEY, JSON.stringify(ids))
}

export async function fetchOffers(delay = 400): Promise<Offer[]> {
  // simulate network delay
  await new Promise(r => setTimeout(r, delay))
  const accepted = readAccepted()
  // return a copy
  return OFFERS.map(o => ({ ...o, accepted: accepted.includes(o.id) } as Offer & { accepted?: boolean }))
}

export function acceptOffer(id: string) {
  const ids = readAccepted()
  if (!ids.includes(id)) {
    ids.push(id)
    writeAccepted(ids)
  }
}

// call acceptOffer and notify listeners (convenience)
export function acceptOfferAndNotify(id: string){
  acceptOffer(id)
  notifyOffersUpdated()
}

// notify other parts of the app that accepted offers changed
export function notifyOffersUpdated(){
  try{ window.dispatchEvent(new CustomEvent('offersUpdated')) }catch{}
}

export function getAcceptedIds(){
  return readAccepted()
}
