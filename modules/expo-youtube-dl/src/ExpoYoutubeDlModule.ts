import { NativeModule, requireNativeModule } from "expo"

import type {
  ExpoYoutubeDlModuleEvents,
  VideoInfo,
} from "./ExpoYoutubeDl.types"

declare class ExpoYoutubeDlModule extends NativeModule<ExpoYoutubeDlModuleEvents> {
  getVideoInfo(url: string): Promise<VideoInfo>
  initYoutubeDL(): Promise<void>
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoYoutubeDlModule>("ExpoYoutubeDl")
