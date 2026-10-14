import { createWidget, widget, showToast } from '@zos/ui';
import { replace } from '@zos/router';
import { presets } from '../utils/sounds';
import { getSelectedPreset } from '../utils/preferences';
import { createSoundPlayer } from '../utils/player';

Page({
  build() {
    this.player = createSoundPlayer(() => {
      showToast({ text: 'Unable to play sound' });
    });

    const selected = getSelectedPreset();
    const preset = presets.find((item) => item.id === selected);
    // Center the grid within the Bip 6 rounded screen.
    preset.tiles.forEach((sound, index) => {
      createWidget(widget.BUTTON, {
        x: 13 + (index % 3) * 122,
        y: 43 + Math.floor(index / 3) * 122,
        w: 120,
        h: 120,
        text: '',
        normal_src: sound.image,
        press_src: sound.pressed,
        click_func: () => {
          if (sound.action === 'settings') {
            this.player.destroy();
            replace({ url: 'page/settings' });
          } else {
            this.player.play(sound.audio);
          }
        }
      });
    });
  },

  onDestroy() {
    if (this.player) this.player.destroy();
  }
});
