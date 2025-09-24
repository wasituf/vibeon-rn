import { NativeModule, requireNativeModule } from "expo"

import type { InnerTubeModuleEvents } from "./InnerTube.types"

declare class InnerTubeModule extends NativeModule<InnerTubeModuleEvents> {
  hello(): string
  someAsyncFunction(value: string): Promise<string>
}

// This call loads the native module object from the JSI.
export default requireNativeModule<InnerTubeModule>("InnerTube")
