const sounds = [
  { id: 'mask', file: 'crash-bandicoot-mask-made-with-Voicemod.mp3' },
  { id: 'ding', file: 'ding06.mp3' },
  { id: 'dong', file: 'dong02.mp3' },
  { id: 'senate', file: 'i-am-the-senate!-made-with-Voicemod.mp3' },
  { id: 'kill', file: 'kill-him-palpatine-made-with-Voicemod.mp3' },
  { id: 'cream', file: 'the-cream-of-the-crop-made-with-Voicemod.mp3' },
  { id: 'settings', action: 'settings' },
  { id: 'ding', file: 'ding06.mp3' },
  { id: 'dong', file: 'dong02.mp3' }
].map((sound) => ({
  ...sound,
  audio: sound.file ? `raw/sounds/${sound.file}` : null,
  image: `image/${sound.id}.png`,
  pressed: `image/${sound.id}-pressed.png`
}));

// Separate tile objects allow either preset to be customized independently.
export const presets = [
  { id: 'board-1', name: 'Soundboard 1', tiles: sounds.map((tile) => ({ ...tile })) },
  { id: 'board-2', name: 'Soundboard 2', tiles: sounds.map((tile) => ({ ...tile })) }
];
