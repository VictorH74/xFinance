"use server"
import { cookies } from 'next/headers'

export async function apiFetch(path: string, init?: RequestInit) {
  const token = (await cookies()).get('access_token')?.value

  return fetch(`${process.env.API_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { authorization: `Bearer ${token}` } : {}),
      ...init?.headers,
    },
  })
}