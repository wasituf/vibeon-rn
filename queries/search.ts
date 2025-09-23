import axios from "axios"
import type { SearchResult } from "@/lib/constants"

const SEARCH_API = "https://vibeon-server-fcw16.sevalla.app/search?q="

export const searchDefault = async (searchTerm: string) => {
  if (!searchTerm) {
    return null
  }

  const response = await axios.get(`${SEARCH_API}${searchTerm}`)
  const data: SearchResult[] = response.data

  return data
}
