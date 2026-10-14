import { createWidget, widget, align, showToast } from '@zos/ui';
import { replace } from '@zos/router';
import { presets } from '../utils/sounds';
import { getSelectedPreset, setSelectedPreset } from '../utils/preferences';

Page({
  build() {
    const selected = getSelectedPreset();
    createWidget(widget.TEXT, {
      x: 46, y: 64, w: 332, h: 44,
      text: 'Soundboards', text_size: 30, color: 0xffffff,
      align_h: align.CENTER_H
    });

    presets.forEach((preset, index) => {
      const active = preset.id === selected;
      createWidget(widget.BUTTON, {
        x: 46, y: 137 + index * 102, w: 332, h: 84,
        radius: 16, text_size: 24,
        text: active ? `${preset.name} (active)` : preset.name,
        color: 0xffffff,
        normal_color: active ? 0x175b79 : 0x1b2738,
        press_color: 0x287fa3,
        click_func: () => {
          if (setSelectedPreset(preset.id)) {
            replace({ url: 'page/index' });
          } else {
            showToast({ text: 'Could not save preset' });
          }
        }
      });
    });

    createWidget(widget.BUTTON, {
      x: 96, y: 365, w: 232, h: 66,
      radius: 16, text: 'Back', text_size: 24, color: 0xffffff,
      normal_color: 0x1b2738, press_color: 0x364b66,
      click_func: () => replace({ url: 'page/index' })
    });
  }
});
