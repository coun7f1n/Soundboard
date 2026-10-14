# Bip 6 Soundboard

Eight sound tiles and a settings tile in a three-column, three-row grid for Amazfit Bip 6
(390 x 450, deviceSources 9765120, 9765121, 10158337). Tap a picture to play its bundled MP3.
A new tap replaces the current clip, including when a clip is preparing.
Tapping the same picture restarts its clip. Leaving the page stops audio.
The watch's existing media volume is respected.

The bottom-right gear opens settings and stops playback. Settings has Volume and
Soundboards. Volume opens a draggable 0-100% slider, initialized from the watch's
current media volume; changes take effect immediately and use the system media
volume setting. Soundboards opens a native vertically scrolling list containing
every board, with the current selection marked by an asterisk. There are no
Next/Previous pages. Select a soundboard to save the choice and return to the board.
Back returns to Settings without changing the choice. Selection persists
across app restarts; a removed/old preset falls back to the first alphabetical board.
Tiles are 120 x 120 with 2-pixel gaps, starting at x=13, y=43.

## Add a soundboard

Under `assets/bip-6/`, add:

```
raw/Soundboards/Your-Board/Sound-01.mp3 ... Sound-08.mp3
image/Your-Board/Pic-01.png ... Pic-08.png
image/Your-Board/Pic-Pressed-01.png ... Pic-Pressed-08.png
```

Each immediate soundboard folder becomes a preset named exactly after the folder.
Sounds 01-06 fill the first two rows; 07 and 08 fill bottom-left and bottom-middle.
Settings always uses `image/settings.png` and `image/settings-pressed.png`.
Pictures should be 120 x 120 pixels. The image directory is singular: `image`.
If a matching picture folder or an individual picture is missing, the matching
file from `image/Default/` is used. All eight MP3s are required per board; missing
audio or unavailable fallback pictures stop generation with the missing path.

Discovery runs on the computer during the build. Add folders, run `npm run build`,
and reinstall the package. No source edits or dependency installation are needed.

## Build and install

With Node.js and the Zepp OS Zeus CLI installed, run `npm run build`.
This regenerates `utils/sounds.js` from the folders before invoking Zeus.
Do not edit that generated file. `npm run generate` updates it without building.
Direct `zeus build` bypasses discovery, so use the npm command after asset changes.
The installable `.zab` package is written to `dist/`.
Use `npm run preview` with Zepp developer mode to create a device installation QR
code. Preview upload and physical-watch installation are separate from building.
The app ID 1061301 is a local development placeholder; replace it with an assigned
developer-console app ID before publishing.

## Files

- `page/index.js`: native image buttons and page lifecycle.
- `page/settings.js`: Volume and Soundboards menu.
- `page/volume.js`: touch slider for system media volume.
- `page/soundboards.js`: scrolling preset list and return navigation.
- `scripts/generate-soundboards.cjs`: discovers folders and validates asset paths.
- `utils/sounds.js`: generated preset lists, in alphabetical order.
- `utils/preferences.js`: validated persistent preset selection.
- `utils/player.js`: serialized audio preparation, switching, and cleanup.
- `assets/bip-6/image/`: 120-pixel button art, normal and pressed states.
- `assets/bip-6/raw/Soundboards/`: board folders, each containing eight MP3s.

## Artwork

Created with the built-in image generation tool. Shared prompt: a square,
bold polished cartoon sticker, centered with 12 percent padding, vivid colors,
dark navy background, no text or watermark, recognizable at 120 pixels.
Subjects: Aku Aku mask with feathers; golden handbell; bronze gong and mallet;
hooded Palpatine with blue lightning; Macho Man with sunglasses and bandana.
The separate pointing-Palpatine generation was rejected by the image service;
the existing Palpatine portrait is used for both corresponding buttons.

## Watch verification

Building and mocked API checks do not establish hardware playback. On Bip 6,
check all eight sounds on each board, rapid switching, repeated taps, exiting during
preparation and playback, natural completion, and media volume. Check that the
top and bottom buttons are visible inside the rounded screen.
Also check right-edge clearance, opening settings while audio plays, switching
all presets by scrolling, Back, and preserving the selected preset after reopening the app.
Test dragging the volume slider to mute, intermediate values, and maximum; verify
the next clip uses that volume and reopening Volume shows the current system value.

## Documentation

- https://docs.zepp.com/docs/reference/related-resources/device-list/
- https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/widget/BUTTON/
- https://docs.zepp.com/docs/reference/device-app-api/newAPI/media/
- https://docs.zepp.com/docs/reference/app-json/
