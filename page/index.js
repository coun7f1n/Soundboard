import { createWidget, widget, showToast } from '@zos/ui';
import { sounds } from '../utils/sounds';
import { createSoundPlayer } from '../utils/player';

Page({
  build() {
    this.player = createSoundPlayer(() => {
      showToast({ text: 'Unable to play sound' });
    });

    // 432 x 514 display; inset all six tiles from the rounded corners.
    sounds.forEach((sound, index) => {
      createWidget(widget.BUTTON, {
        x: 60 + (index % 2) * 164,
        y: 27 + Math.floor(index / 2) * 156,
        w: 148,
        h: 148,
        text: '',
        normal_src: sound.image,
        press_src: sound.pressed,
        click_func: () => this.player.play(sound.audio)
      });
    });
  },

  onDestroy() {
    if (this.player) this.player.destroy();
  }
});
