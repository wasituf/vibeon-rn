const { withAndroidManifest } = require("@expo/config-plugins")

function withYoutubeDl(config) {
  config = withAndroidManifest(config, (manifest) => {
    manifest.modResults.manifest.application[0].$["android:extractNativeLibs"] =
      "true"
    return manifest
  })

  return config
}

module.exports = withYoutubeDl
