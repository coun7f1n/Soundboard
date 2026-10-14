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

    const preset = presets.find((item) => item.id === getSelectedPreset());
    // Shift left and tighten spacing to keep the right edge visible.
    preset.tiles.forEach((sound, index) => {
      createWidget(widget.BUTTON, {
        x: 1 + (index % 3) * 134,
        y: 40 + Math.floor(index / 3) * 134,
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
