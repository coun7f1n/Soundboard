import { create, id } from '@zos/media';

// Serialize asynchronous media transitions. The latest tap wins.
export function createSoundPlayer(onError) {
  const media = create(id.PLAYER);
  let phase = 'idle';
  let pending = null;
  let disposed = false;

  function reportError() {
    if (!disposed) onError();
  }

  function stop() {
    if (phase === 'stopping' || phase === 'idle') return;
    phase = 'stopping';
    media.stop();
  }

  function drain() {
    if (disposed || phase !== 'idle' || !pending) return;
    const file = pending;
    pending = null;
    phase = 'preparing';
    try {
      media.setSource(media.source.FILE, { file });
      media.prepare();
    } catch (error) {
      pending = null;
      reportError();
      stop();
    }
  }

  media.addEventListener(media.event.PREPARE, (success) => {
    if (phase !== 'preparing') return;
    if (!success) {
      reportError();
      stop();
    } else if (disposed || pending) {
      stop();
    } else {
      phase = 'starting';
      media.start();
    }
  });

  media.addEventListener(media.event.PLAY, (success) => {
    if (phase !== 'starting') return;
    phase = 'playing';
    if (!success) reportError();
    if (!success || disposed || pending) stop();
  });

  media.addEventListener(media.event.STOP, () => {
    if (phase !== 'stopping') return;
    phase = 'idle';
    drain();
  });

  media.addEventListener(media.event.COMPLETE, () => {
    phase = 'completed';
    media.stop();
    phase = 'idle';
    drain();
  });

  return {
    play(file) {
      if (disposed) return;
      pending = file;
      if (phase === 'idle') drain();
      else if (phase === 'playing') stop();
      // PREPARE / PLAY / STOP callbacks finish other transitions first.
    },
    destroy() {
      disposed = true;
      pending = null;
      stop();
    }
  };
}
