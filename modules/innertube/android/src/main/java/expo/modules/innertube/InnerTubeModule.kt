package expo.modules.innertube

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class InnerTubeModule : Module() {
  override fun definition() = ModuleDefinition {
    // The module will be accessible from `requireNativeModule('InnerTube')` in JavaScript.
    Name("InnerTube")

    // Runs on JavaScript thread.
    Function("hello") { "Hello from InnerTube - synchronously!?" }

    // Runs on background thread.
    AsyncFunction("someAsyncFunction") { value: String -> "Received value from JavaScript: $value" }
  }
}
