import { createWidget, widget, align, showToast } from '@zos/ui';
import { replace } from '@zos/router';
import { presets } from '../utils/sounds';
import { getSelectedPreset, setSelectedPreset } from '../utils/preferences';

Page({
  build() {
    const selected = getSelectedPreset();
    createWidget(widget.TEXT, {
      x: 30, y: 36, w: 330, h: 44,
      text: 'Soundboards', text_size: 28, color: 0xffffff,
      align_h: align.CENTER_H
    });
    createWidget(widget.SCROLL_LIST, {
      x: 30, y: 92, w: 330, h: 250,
      item_space: 10, snap_to_center: false,
      item_config: [{
        type_id: 1, item_height: 74,
        item_bg_color: 0x1b2738, item_bg_radius: 16,
        text_view: [{
          x: 12, y: 0, w: 306, h: 74,
          key: 'name', color: 0xffffff, text_size: 22, action: true
        }],
        text_view_count: 1
      }],
      item_config_count: 1,
      data_array: presets.map((preset) => ({
        name: preset.id === selected ? `* ${preset.name}` : preset.name
      })),
      data_count: presets.length,
      item_click_func: (list, index) => {
        const preset = presets[index];
        if (!preset) return;
        if (setSelectedPreset(preset.id)) {
          replace({ url: 'page/index' });
        } else {
          showToast({ text: 'Could not save preset' });
        }
      }
    });
    createWidget(widget.BUTTON, {
      x: 90, y: 366, w: 210, h: 50,
      radius: 16, text: 'Back', text_size: 24, color: 0xffffff,
      normal_color: 0x1b2738, press_color: 0x364b66,
      click_func: () => replace({ url: 'page/settings' })
    });
  }
});
