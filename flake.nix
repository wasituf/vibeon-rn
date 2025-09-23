{
  description = "Node.js LTS version flake";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
  };

  outputs =
    { self, nixpkgs }:
    let
      system = "x86_64-linux";
      pkgs = import nixpkgs {
        inherit system;
        config = {
          android_sdk.accept_license = true;
          allowUnfree = true;
        };
      };
      androidComposition = pkgs.androidenv.composeAndroidPackages {
        buildToolsVersions = [
          "35.0.0"
          "36.0.0"
        ];
        platformVersions = [
          "35"
          "36"
        ];
        abiVersions = [ "x86_64" ];
        includeEmulator = false;
        includeSystemImages = false;
        # systemImageTypes = [ "google_apis" ];
        includeNDK = true;
        ndkVersions = [
          "27.1.12297006"
          "26.1.10909125"
        ];
        cmakeVersions = [ "3.22.1" ];
      };
      androidSdk = androidComposition.androidsdk;
    in
    {
      devShells.x86_64-linux.default = pkgs.mkShell {
        ANDROID_SDK_ROOT = "${androidSdk}/libexec/android-sdk";
        GRADLE_OPTS = "-Dorg.gradle.project.android.aapt2FromMavenOverride=${androidSdk}/libexec/android-sdk/build-tools/35.0.0/aapt2";
        # LD_LIBRARY_PATH="${libglvnd}/lib";

        packages = with pkgs; [
          androidSdk

          bun
          nodePackages.nodejs
          corepack
          biome
          git
          eas-cli
          watchman
          jdk17
        ];
        shellHook = ''
          echo "Configuring biome ..."
          touch biome.jsonc
          curl -o biome.jsonc "https://gist.githubusercontent.com/wasituf/4a449cfa15293cc385cdc94579d1d461/raw/714a98b71a0e2c9f4a7315455aa232d4b55b681b/biome.jsonc"
          echo "Configured biome."

          echo "Configuring .npmrc ..."
          touch .npmrc
          echo "auto-install-peers=true\nnode-linker=hoisted\nlockfile=true" > .npmrc
          echo "Configured .npmrc"
        '';
      };
    };
}
