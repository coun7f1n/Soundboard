export const sounds = [
  { id: 'mask', file: 'crash-bandicoot-mask-made-with-Voicemod.mp3' },
  { id: 'ding', file: 'ding06.mp3' },
  { id: 'dong', file: 'dong02.mp3' },
  { id: 'senate', file: 'i-am-the-senate!-made-with-Voicemod.mp3' },
  { id: 'kill', file: 'kill-him-palpatine-made-with-Voicemod.mp3' },
  { id: 'cream', file: 'the-cream-of-the-crop-made-with-Voicemod.mp3' }
].map((sound) => ({
  ...sound,
  audio: `raw/sounds/${sound.file}`,
  image: `image/${sound.id}.png`,
  pressed: `image/${sound.id}-pressed.png`
}));
