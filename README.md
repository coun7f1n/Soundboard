# Bip Max Soundboard

Eight sound tiles and a settings tile in a three-column, three-row grid for Amazfit Bip Max
(432 x 514, deviceSource 11206915). Tap a picture to play its bundled MP3.
A new tap replaces the current clip, including when a clip is preparing.
Tapping the same picture restarts its clip. Leaving the page stops audio.
The watch's existing media volume is respected.

The bottom-left gear opens settings and stops playback. Choose Soundboard 1 or
Soundboard 2 to save the selection and return to the board. Both presets start
with identical content and independent tile objects. Back returns without changing
the selection. The choice persists across app restarts using local storage.
Tiles are 120 x 120 with 14-pixel gaps, starting at x=16, y=63.

## Build and install

With the Zepp OS Zeus CLI installed, run `zeus build --target bip-max`.
The installable `.zab` package is written to `dist/`.
Use `zeus preview` with Zepp developer mode to create a device installation QR
code. Preview upload and physical-watch installation are separate from building.
The app ID 1061301 is a local development placeholder; replace it with an assigned
developer-console app ID before publishing.

## Files

- `page/index.js`: native image buttons and page lifecycle.
- `page/settings.js`: preset selection and return navigation.
- `utils/sounds.js`: two independently editable preset tile lists.
- `utils/preferences.js`: validated persistent preset selection.
- `utils/player.js`: serialized audio preparation, switching, and cleanup.
- `assets/bip-max/image/`: 120-pixel button art, normal and pressed states.
- `assets/bip-max/raw/sounds/`: unchanged copies of the source MP3 files.
- `Soundboard-01/`: original supplied clips.

Grid order: mask, ding, gong; Senate, Kill him, Cream of the crop;
then settings, duplicate ding, and duplicate gong placeholders.
The two Palpatine clips share a portrait with distinct blue and red frames.

## Artwork

Created with the built-in image generation tool. Shared prompt: a square,
bold polished cartoon sticker, centered with 12 percent padding, vivid colors,
dark navy background, no text or watermark, recognizable at 120 pixels.
Subjects: Aku Aku mask with feathers; golden handbell; bronze gong and mallet;
hooded Palpatine with blue lightning; Macho Man with sunglasses and bandana.
The separate pointing-Palpatine generation was rejected by the image service;
the existing Palpatine portrait is used for both corresponding buttons.

## Watch verification

Building and mocked API checks do not establish hardware playback. On Bip Max,
check each of the six sounds, rapid switching, repeated taps, exiting during
preparation and playback, natural completion, and media volume. Check that the
top and bottom buttons are visible inside the rounded screen. The original MP3s
use 48 kHz stereo at 128 kbps; confirm these play on the installed firmware.
The longest clip is approximately 45 seconds.
Also check right-edge clearance, opening settings while audio plays, switching
both presets, Back, and preserving the selected preset after reopening the app.

## Documentation

- https://docs.zepp.com/docs/reference/related-resources/device-list/
- https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/widget/BUTTON/
- https://docs.zepp.com/docs/reference/device-app-api/newAPI/media/
- https://docs.zepp.com/docs/reference/app-json/
