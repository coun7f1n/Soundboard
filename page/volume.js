import { createWidget, widget, align, prop, event, showToast } from '@zos/ui';
import { create, id } from '@zos/media';
import { replace } from '@zos/router';

Page({
  build() {
    const media = create(id.PLAYER);
    let dragging = false;
    let failed = false;
    const clamp = (value) => Math.max(0, Math.min(100, Math.round(value)));
    let initial;
    try { initial = media.getVolume(); } catch (error) {}
    let volume = Number.isFinite(initial) ? clamp(initial) : null;
    createWidget(widget.TEXT, {
      x: 30, y: 42, w: 330, h: 44,
      text: 'Volume', text_size: 28, color: 0xffffff,
      align_h: align.CENTER_H
    });
    const label = createWidget(widget.TEXT, {
      x: 30, y: 110, w: 330, h: 56,
      text: '', text_size: 38, color: 0xffffff, align_h: align.CENTER_H
    });
    // Full-width canvas makes touch x identical in local and screen coordinates.
    const slider = createWidget(widget.CANVAS, { x: 0, y: 174, w: 390, h: 104 });
    const draw = () => {
      slider.clear({ x: 0, y: 0, w: 390, h: 104 });
      slider.drawRect({ x1: 0, y1: 0, x2: 390, y2: 104, color: 0x000000 });
      slider.drawRect({ x1: 50, y1: 44, x2: 340, y2: 60, color: 0x1b2738 });
      if (volume !== null) {
        const x = 50 + volume * 2.9;
        if (volume > 0) slider.drawRect({ x1: 50, y1: 44, x2: x, y2: 60, color: 0x287fa3 });
        slider.drawCircle({ center_x: x, center_y: 52, radius: 19, color: 0xffffff });
      }
      label.setProperty(prop.TEXT, volume === null ? '--' : `${volume}%`);
    };
    const update = (info) => {
      if (!Number.isFinite(info.x)) return;
      const next = clamp((info.x - 50) / 2.9);
      if (next === volume) return;
      try {
        if (!media.setVolume(next)) throw new Error('Volume rejected');
        const actual = media.getVolume();
        volume = Number.isFinite(actual) ? clamp(actual) : next;
        draw();
      } catch (error) {
        if (!failed) showToast({ text: 'Could not change volume' });
        failed = true;
      }
    };
    slider.addEventListener(event.CLICK_DOWN, (info) => {
      dragging = true;
      failed = false;
      update(info);
    });
    slider.addEventListener(event.MOVE, (info) => { if (dragging) update(info); });
    slider.addEventListener(event.CLICK_UP, (info) => {
      if (dragging) update(info);
      dragging = false;
    });
    slider.addEventListener(event.MOVE_OUT, () => { dragging = false; });
    draw();
    createWidget(widget.TEXT, {
      x: 30, y: 286, w: 330, h: 44,
      text: 'Slide to adjust', text_size: 22, color: 0xa9cfe3,
      align_h: align.CENTER_H
    });
    createWidget(widget.BUTTON, {
      x: 90, y: 352, w: 210, h: 56,
      radius: 16, text: 'Back', text_size: 24, color: 0xffffff,
      normal_color: 0x1b2738, press_color: 0x364b66,
      click_func: () => replace({ url: 'page/settings' })
    });
  }
});
