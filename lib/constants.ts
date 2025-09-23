export const searchResultTypes = [
  "song",
  "video",
  "artist",
  "album",
  "playlist",
  "featured_playlist",
  "community_playlist",
] as const

type SearchResultType = (typeof searchResultTypes)[number]

export type SearchResult = {
  album?: null | string
  artist?: string
  artists?: {
    id: string
    name: string
  }[]
  browseId?: string
  category: null | string
  duration: null | string
  duration_seconds: number
  feedbackTokens?: {
    add: null | string
    remove: null | string
  }
  inLibrary?: boolean
  isExplicit?: boolean
  resultType: SearchResultType
  resultId: string
  thumbnails: {
    height: number
    url: string
    width: number
  }[]
  title: string
  videoId: string
  videoType: string
  views?: string
  year?: null | string
}
