// Card tilt: elements with [data-tilt] lean toward the mouse pointer.
// Sets --tilt-x/--tilt-y (deg) and --glare-x/--glare-y (%) on the element; the CSS lives in global.css ([card-tilt]).
// Runs only with a fine hover pointer and no reduced-motion preference. To turn it off, remove the import in BaseLayout.
const MAX = 5; // max tilt in degrees; raise for a stronger lean

const mq = (q: string) => matchMedia(q).matches;
const cards = document.querySelectorAll<HTMLElement>('[data-tilt]');

if (cards.length && mq('(hover: hover) and (pointer: fine)') && mq('(prefers-reduced-motion: no-preference)')) {
  cards.forEach((el) => {
    let frame = 0;
    let e: PointerEvent;
    const set = (k: string, v: string) => el.style.setProperty(k, v);
    const move = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const x = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
      const y = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
      set('--tilt-x', `${((0.5 - x) * 2 * MAX).toFixed(2)}deg`);
      set('--tilt-y', `${((y - 0.5) * 2 * MAX).toFixed(2)}deg`);
      set('--glare-x', `${(x * 100).toFixed(1)}%`);
      set('--glare-y', `${(y * 100).toFixed(1)}%`);
    };
    el.addEventListener(
      'pointermove',
      (ev) => {
        if (ev.pointerType !== 'mouse') return;
        e = ev;
        frame ||= requestAnimationFrame(move);
      },
      { passive: true },
    );
    el.addEventListener(
      'pointerleave',
      () => {
        cancelAnimationFrame(frame);
        frame = 0;
        ['--tilt-x', '--tilt-y', '--glare-x', '--glare-y'].forEach((k) => el.style.removeProperty(k));
      },
      { passive: true },
    );
  });
}
