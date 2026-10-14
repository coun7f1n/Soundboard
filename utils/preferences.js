import { LocalStorage } from '@zos/storage';
import { presets } from './sounds';

// Construct storage within the page lifecycle, never at module load time.
export function getSelectedPreset() {
  try {
    const selected = new LocalStorage().getItem('preset', presets[0].id);
    return presets.some((preset) => preset.id === selected) ? selected : presets[0].id;
  } catch (error) {
    return presets[0].id;
  }
}

export function setSelectedPreset(selected) {
  if (!presets.some((preset) => preset.id === selected)) return false;
  try {
    new LocalStorage().setItem('preset', selected);
    return getSelectedPreset() === selected;
  } catch (error) {
    return false;
  }
}
