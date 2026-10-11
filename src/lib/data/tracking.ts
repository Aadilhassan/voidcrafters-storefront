"use server"

import { sdk } from "@lib/config"
import { getAuthHeaders } from "./cookies"

export async function trackSessionEvent(input: {
  session_id?: string
  type: string
  path?: string
  data?: Record<string, any>
  email?: string
  cart_id?: string
  utm?: { source?: string; medium?: string; campaign?: string }
}) {
  try {
    const { session_id } = await sdk.client.fetch<{ session_id: string }>(
      `/store/sessions/events`,
      {
        method: "POST",
        body: input,
        headers: { ...(await getAuthHeaders()) },
        cache: "no-store",
      }
    )
    return session_id
  } catch {
    return input.session_id || null
  }
}

export async function scoreSession(session_id: string) {
  try {
    return await sdk.client.fetch<{
      scores: any
      engine: string
      personal_offer: string | null
    }>(`/store/sessions/score`, {
      method: "POST",
      body: { session_id },
      headers: { ...(await getAuthHeaders()) },
      cache: "no-store",
    })
  } catch {
    return null
  }
}

export async function getPersonalOffer(session_id: string) {
  try {
    const { personal_offer } = await sdk.client.fetch<{
      personal_offer: { code: string; confidence: number } | null
    }>(`/store/sessions/me`, {
      method: "GET",
      query: { session_id },
      headers: { ...(await getAuthHeaders()) },
      cache: "no-store",
    })
    return personal_offer
  } catch {
    return null
  }
}
