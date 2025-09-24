package expo.modules.youtubedl

import android.util.Log
import expo.modules.kotlin.Promise
import com.yausername.youtubedl_android.YoutubeDL
import com.yausername.youtubedl_android.YoutubeDLException
import com.yausername.youtubedl_android.YoutubeDLRequest
import com.yausername.youtubedl_android.mapper.VideoInfo
import expo.modules.kotlin.exception.CodedException
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class ExpoYoutubeDlModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("ExpoYoutubeDl")

    AsyncFunction("initYoutubeDL") { promise: Promise ->
      appContext.currentActivity?.let { activity ->
        try {
          // Initialize and update the binaries asynchronously
          YoutubeDL.getInstance().init(activity)
          // YoutubeDL.getInstance().updateYoutubeDL(activity, YoutubeDL.UpdateChannel._STABLE)
          Log.d("ExpoYoutubeDl", "YoutubeDL initialized successfully.")
          "YoutubeDL initialized."
        } catch (e: YoutubeDLException) {
          Log.e("ExpoYoutubeDl", "Failed to initialize YoutubeDL: " + e.message)
          CodedException("INIT_FAILED", "Failed to initialize YoutubeDL.", e)
        }
      } ?: run {
        CodedException("NO_ACTIVITY", "Could not get current activity context.", null)
      }
    }

    AsyncFunction("getVideoInfo") { url: String ->
      val request = YoutubeDLRequest(url).apply {
        addOption("-f", "bestaudio")
      }

      val videoInfo: VideoInfo? = YoutubeDL.getInstance().getInfo(request)

      if(videoInfo != null) {
        mapOf(
          "downloadUrl" to videoInfo.url,
          "duration" to videoInfo.duration,
          "ext" to videoInfo.ext,
          "filesize" to videoInfo.fileSize,
          "id" to videoInfo.id,
          "resolution" to videoInfo.resolution,
          "title" to videoInfo.title,
          "uploadDate" to videoInfo.uploadDate,
          "uploaderId" to videoInfo.uploaderId,
          "uploader" to videoInfo.uploader,
          "viewCount" to videoInfo.viewCount,
          "webpage" to videoInfo.webpageUrl
        )
      } else {
        throw CodedException("URL_FETCH_FAILED", "Could not find a video URL.", null)
      }
    }
  }
}
