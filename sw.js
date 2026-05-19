/* =====================================================
   MF Whiskers — Service Worker  (sw.js)
   Place this file in the SAME folder as index.html
   ===================================================== */
const CACHE_NAME = 'mfwhiskers-v1';
const ICON_URL   = './icon-512.png';   // fallback icon path

/* ── Cache the app shell on install ── */
self.addEventListener('install', e => {
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(clients.claim());
});

/* ── Handle notification click — focus or open the app ── */
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(cs => {
      // If app window already open, focus it
      for (const c of cs) {
        if ('focus' in c) return c.focus();
      }
      // Otherwise open a new window
      return clients.openWindow('./');
    })
  );
});

/* ── Show notification triggered from the page ──
   The page calls registration.showNotification() directly,
   which the SW intercepts for background delivery.
   This listener handles any push events from a push server. ── */
self.addEventListener('push', e => {
  const data = e.data ? e.data.json() : {};
  e.waitUntil(
    self.registration.showNotification(data.title || 'MF Whiskers 🐾', {
      body:      data.body   || '',
      icon:      data.icon   || ICON_URL,
      badge:     data.badge  || ICON_URL,
      tag:       data.tag    || 'mfw-default',
      renotify:  true,
      vibrate:   [200, 100, 200],
      data:      data,
    })
  );
});

/* ── Background alarm via periodic messages from the page ──
   Every minute the page posts the current task list here.
   The SW checks for due tasks and fires notifications even
   when the page tab is not visible. ── */
self.addEventListener('message', async e => {
  if (!e.data || e.data.type !== 'CHECK_TASKS') return;

  const { tasks, done, nowMins, today, minutesBefore, iconUrl } = e.data;
  if (!tasks || !tasks.length) return;

  for (const t of tasks) {
    if (!t.time) continue;

    const [tH, tM] = t.time.split(':').map(Number);
    const taskMins = tH * 60 + tM;
    const diff     = taskMins - nowMins;
    const isDone   = done?.[today]?.[t.id];

    if (isDone) continue;

    // "Due now" — fires when diff is 0 or 1 minute
    if (diff >= 0 && diff <= 1) {
      await self.registration.showNotification(
        `${t.emoji || '🐾'} ${t.name}`,
        {
          body:    `⏰ Due now  ·  ${t.petName}`,
          icon:    iconUrl || ICON_URL,
          badge:   iconUrl || ICON_URL,
          tag:     `mfw-now-${t.id}-${today}`,
          renotify: false,
          vibrate: [200, 100, 200],
        }
      );
    }

    // Advance reminder — fires N minutes before
    if (minutesBefore > 0 && diff === minutesBefore) {
      await self.registration.showNotification(
        `⏰ In ${minutesBefore} min: ${t.name}`,
        {
          body:    `${t.emoji || '🐾'} ${t.petName}  ·  at ${t.time}`,
          icon:    iconUrl || ICON_URL,
          badge:   iconUrl || ICON_URL,
          tag:     `mfw-remind-${t.id}-${today}`,
          renotify: false,
          vibrate: [100, 50, 100],
        }
      );
    }
  }
});
