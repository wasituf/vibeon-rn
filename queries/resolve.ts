import YTDL from "expo-youtube-dl"

type ResolveResponse = {
  downloadUrl: string
  duration: number
  ext: string
  filesize: number
  id: string
  resolution: string
  title: string
  uploadDate: string
  uploaderId: string
  uploader: string
  viewCount: string
  webpage: string
}

export const resolveTrack = async ({
  videoId,
  thumbnail,
}: {
  videoId: string
  thumbnail: string
}): Promise<ResolveResponse> => {
  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`

  const data = await YTDL.getVideoInfo(videoUrl)

  const result = { ...data, thumbnail: thumbnail }
  return result
}
