import { createWidget, widget, align } from '@zos/ui';
import { replace } from '@zos/router';

Page({
  build() {
    createWidget(widget.TEXT, {
      x: 30, y: 42, w: 330, h: 44,
      text: 'Settings', text_size: 28, color: 0xffffff,
      align_h: align.CENTER_H
    });
    [
      { name: 'Volume', url: 'page/volume' },
      { name: 'Soundboards', url: 'page/soundboards' }
    ].forEach((item, index) => {
      createWidget(widget.BUTTON, {
        x: 30, y: 116 + index * 94, w: 330, h: 74,
        radius: 16, text: item.name, text_size: 26, color: 0xffffff,
        normal_color: 0x1b2738, press_color: 0x287fa3,
        click_func: () => replace({ url: item.url })
      });
    });
    createWidget(widget.BUTTON, {
      x: 90, y: 352, w: 210, h: 56,
      radius: 16, text: 'Back', text_size: 24, color: 0xffffff,
      normal_color: 0x1b2738, press_color: 0x364b66,
      click_func: () => replace({ url: 'page/index' })
    });
  }
});
