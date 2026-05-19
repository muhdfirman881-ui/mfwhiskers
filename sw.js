/* =========================================================
   MF Whiskers — Service Worker  (sw.js)
   Place this file in the SAME folder as index.html / mfwhiskers-v2.html
   ========================================================= */

const APP_VERSION = 'mfw-v3';
const ICON        = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCABgAGADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD6oooqK6nS2gaWTdtXsoyT7AUAPdlRCzsFUckk4Arm9T8VwQMY7JPPcfxnhP8AE1ka0+raxMFFtcR2wPyxbSAfdvU1EfDt95YJWFG9HkA/lUOXYtRXUjufEGo3BO64aNf7sY2j/GqouZJGy8jsf9pia19O8PJH+81GUTN/zyiPyj6t3/CqniG0ht723+zoI45hgqvQEHBx+BFRqy9CJZZkUOrSoD0IJANWrfXL+3Py3BdfST5h/jWXplkZrW7vUAFwXLFj/Ev90+q44x2xx0qtJLzkZCHkZ6j1B9weKmM+bYudNw0Z3Gn+KYJSEvU8hj/GOV/xFdFG6yIHjYMjcgg5BryLzhnBPFauiazcaY5ZG32ufnRjhfwJ6GtVLuYuPY9KoqrpuoW2pWwns5VlTO04PKsOoPoatVZAVj3GohpWEbYVeB71Nrt19ntNq/fkOPw718/+NfinrOieNtR0qw0O0vLGwMayF3dZZCyKxYEHAHzcDB6VnOXRGsI31PeVveMlh+NR+YZm47nA96838F/Ezwz4gtpC98ml3cQzLa6g6xMnuGPysPpz7Vl+OvjFoujWN3b6HML/AFEqY0kX5YYyQRv3fxYznAGDjrUpNjbSOG8Y/ErxLqfju9k8LXskWl6NOYooE/1dyVOHaQfxBjkYPQYxzXt/26LxDoGj6xYqfLmMcojPJXcQGU+6sMH6V8heG9ebRbO4ttqSJcMxklDfMQff8fxr1v4P/EezsvDGu2N7Moax33lnuPJVyAU+odgfoT6UO6b7FWi4Kz1PQY9bi0y31BrmVYoBIyR7TlpCpwQo9sjnOM5zjivMLvxnqtnqb22kqs0Th5I4bmNZS5HQKBgg8qCQcYA9M0/xH4msfDLWj6hpBumt/KuJBe34huTvYkeVDyJMbtzBv7wyB29B+GngOzHiPTtRlP2i30WzZIZnHNzJON5lcHuQ54zxwK4aKm3F7J7HXXnF362Ob8OeL31Gf7LqWnRpcKdpltZikbEdcBwc/UHnsDXe6TPALH7Xcjy32ny4mGCo+nUH9fXNcp4z0vw/ceLb3TrHXtMttfNwphsPN+YrsHy4HAkJ6DOagN1c6hdaVazz+XOZTBIGwAcDO8jrnAOc+lS68+blmiqVKm7OLO98N6s+mXHnSkmC4YeYDzwBgH8OPwFelIwdQykFSMgjuK8ZupHZIwBhUiTOOcZAP8zXefD3Ujd6W9rK2ZbY4Ge6Hp+XIr0aKtFI4a7UpuS7jfE16o1Lyj/yzUD8+f8ACvEvirGmi+J7LxAo/wBG1GMW0+D/AMtYxx9Mpjn/AGDXrGqPDJ4gvftRO0OQvzbRkY6nBxXBfGGCzvvB2pW7XEUHlET2xbkPKgPyDP8AeBYA/Soa5m0y4TcLNdD5+8Vatb3WsNc2lqkTqCnHzAgjByCeetV9Y8M31jpum6jdNuW8BcRnIJAAJPTpj+VWNB8K3t5dWoWA308zsDbxZD5A4U9MZx+VW9Yn1CSNv7QN1cQ2FptTMPlrbkk4VCCd6DCklvU9xzSeqUXtuZza1clvsWr208MN4T+0WSakmqrLtMCx+YoA5Zs9AoBByf7wHaq+haEun+JNBuNQjlh0+/utnmOoAcBgDxk8hiMjpWVpOpWV3Pb2epxT/Y5WMck1tu8wqV6YBGVyBkegNbXxCSXTDpyQ3Xm2K25ltWQGNQCeoVuQcgAnvjt1qbWtC+99wu2+a2x9CfELwX4ZudLsxLZ3d1qxhdLQoPMbCLxxgjIHAz1wOuAKj8IfFm2udUs9DsNNKweTGFlJ+dcDaWcemcY+n5b3gjWE1XRdKa8MUWqLCvltKM4YgZxyM568H2q9p/hOGz0/UdPlW2aO+me4knhiWNnZ2yQ47jPT27d6wnCa+B2tsbwcPtq7Z4lr/wAM9R0nxHDc+JdWku9KWV5oZYIWdmLyb3KlRneTzyeDjnApljq13f8Ai06Xe27G6lm8uJ5VHmNHI2ELbeAcEg49/WvoKTSraDwsNBtpGEaw+Ur8jYO3IIxj2rgZ/CUPhbTZvE2ozfbL6xQRLMFLGON2CtJzyzBSf1781FelKrOLe35FUakaUXZ6/mdZc6TqVol2LVY7iG44PlAFgN3HBGfypfCNrdaXrkQuLeWJJ1MZLLgHuP1FWNMvJ7S0Er4msnUMtwh3IVI4JHX6DpW/b3ayR4XtgkDnHI9BgV2qRyuJ53431OLStV1ZrjgRt5m7PQYB/HivBvE2qXOrwvq1+xxI3lWkHZR/jjqa9L/alP8AZxgcS7P7SVV24+95Z+bn6FK8Ut9RE8FjAAu2BmmY9hj1qZRd1buOMlbXsVr3Un+2xWE1w1vJA5Kzk42scc5BwMEdeT6V02nxPcJdp4p1N57SWMbZbaXcWYEcNkZOR/ERx+o5LxTe6bq+om4hfyZJyPNJUeWrdNxA/PIrDu4LixnjidC8UrfumifcH5GACO/19ahRurX5fL/Ipuzvuei6Bb/2BqNz4qstIjGn2aSqDNchI0ZuN0QbJyBkd87uK5DVNduvFerQLGrpBvSFFGeMsAOeh696r3tnanT52a4igVCrNG6s0rcYbGeABn1ycVY8DxSax4r0PT7G3aGyF2krZ5Z9vLM34D8KuMLPn3f6f5lVYSglF6J6+p9j6P4ehbSYIvkJjRVHHTjrVqLTL+IBVvLvYO27tVrT7oRwMVZQqgZB6r9RWpFcxsgbcMfnQQVdN050bdPPJIzd3bNR+OtOa+8Ea1ZW8fmSPaPsT+8wGQP0p1zrFvHMsQlCk9/Steym82MNtYZ5BYc01YTvueIfA/xg50qy02+BC/Mlu556HAXHc4/lXqC2j2uqQBQTbzOFjAYkKepHI6elcPrXgdLPXprbSm+xxyZurTYcKrZyy49QefoRXb+C9Tk1F/slzEYby0P7+PGNuOhHqCeR+NK15WDpcyfj74Ll8Z+ALiKwhEuq2LfarROMuQMMg/3lJ/ECvlLQdDu9CnuE1+ymsb2RhFCl3HjYMZ3kEEMPQdzX3tXmfxW+HNj4ttkcyPa3kWfIuIxkrnqpHdfb8q1ntYzhvc+JNajSW8kYPcT/ADE+a21N3vgDiotOv7nTJInjAubdZFbypRwGB4//AF16J4s8NT6FLNaeIiM25DAW68TIf+WgJ9MYwe9cNcz20V7Kmnxs9oT8guBksPfHT8DUpqS5bDd4vmuUdZmuNQvHmvJSXY/wjCg+wr6C/ZN8IpPBqWvXY8yQSfZLctyEUAFyPqSB+FeRaF4N1rxGHk0Wx8623bFkeUDaxA+UjqeoHAr7U+GXhRPBngvTtHBV54kL3Eg6PKxy5+mTgewFU7JcqErt3Y3xZH9g0q5ukYIYImcnttA5/CvNNP8AHV7c6Qv2PT7mRiCcuRGoH1PJ/KvQfiQr3kdlpikiO6cmX3RcHb+JIz7CpfDHhqzIjne3TyIj8gIzvYdz7D+dZdbGt9LmR4C0a8WN9f8AFhitg3zQQM3CL/ffOOfQV2ejeI9G1oyDSdStbtoyVdY35UjqCOtch8YtIn1GwtXZmksFbbNAzfISehIx+Gc8HHqa8i0PTbvTPHNmNEkEt5F/riSSNmPlL+4+YY5JBxnHNYTr8tT2aRpGjzQ52z2Txbr1rD4w0a2Mm0x73kbOAuQNqk++M4+ldxpEK4kutgDS4APcqOn8zXHaH4ThnkxqAF05YSTySAHLdfzP6D8K9CAAAAGAO1dUF1MJvoFNkRZEKOMqeop1FaGZ418bvhvdeJLBLjS2jNzBkBZOA6n+EkdOQDmvnhPhV4ve5W2TSPK2kZleVfL+oI5P5V92VnXWkwSsXi/dOeu0cH8KmzXwlXT+I8j+F/hiPwLFp1pdyB5ZZGaSTHymZ8AY/UD8K9Zku4kglk3DCbsgnHTrWXqOgtc27w3ECXETDB2mufk8Ilt8dzd6xLaufmt5JnZG9j6j2rL3luae69itrGpw6pqcuoQS79OtYhEsq8qzE5dlPcAYGfY4rv7WeGSGIQlQpQMoU8Be1YC6agtfs0VrIIsbdqxkDHp0rNsvDPiG2kWPTtUNvZKu1I7qJZdi+i9+O2TRG99gla25u+KtSitNAvHIErOphSP++54A/P8AlXNfDnweumaap/1lzJh57qQZLN6j1P6Cul0jwha2kwuNQubnU7vcX33L5VSeu1Oi/hXTAAAAAADoKvku7snnsrIjt4Ut4hHEMKPzJ9TUlFFaGZ//2Q==';

/* ── Install & Activate ── */
self.addEventListener('install',  () => self.skipWaiting());
self.addEventListener('activate', e  => e.waitUntil(clients.claim()));

/* ── Notification click — focus or open app ── */
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then(cs => {
        for (const c of cs) { if ('focus' in c) return c.focus(); }
        if (clients.openWindow) return clients.openWindow('./');
      })
  );
});

/* ── Push event (server-initiated, future use) ── */
self.addEventListener('push', e => {
  const d = e.data ? e.data.json() : {};
  e.waitUntil(
    self.registration.showNotification(d.title || 'MF Whiskers 🐾', {
      body:     d.body   || '',
      icon:     d.icon   || ICON,
      badge:    d.badge  || ICON,
      tag:      d.tag    || 'mfw',
      renotify: true,
      vibrate:  [200, 100, 200],
    })
  );
});

/* ── Message from page: CHECK_TASKS ──
   Called every minute from the page.
   The SW runs this even when the page tab is backgrounded or
   the screen is locked (Android).
   iOS 16.4+: runs when app is added to Home Screen. ── */
self.addEventListener('message', async e => {
  if (!e.data || e.data.type !== 'CHECK_TASKS') return;

  const { tasks, done, nowMins, today, minutesBefore, iconUrl } = e.data;
  if (!tasks || !tasks.length) return;

  const icon = iconUrl || ICON;

  for (const t of tasks) {
    if (!t.time) continue;
    const [tH, tM]  = t.time.split(':').map(Number);
    const taskMins  = tH * 60 + tM;
    const diff      = taskMins - nowMins;
    const taskDone  = done?.[today]?.[t.id];
    if (taskDone) continue;

    /* Due right now (diff 0 or 1 minute) */
    if (diff >= 0 && diff <= 1) {
      await self.registration.showNotification(
        `${t.emoji || '🐾'} ${t.name}`,
        {
          body:     `⏰ Due now  ·  ${t.petName}`,
          icon, badge: icon,
          tag:      `mfw-now-${t.id}-${today}`,
          renotify: false,
          vibrate:  [200, 100, 200],
        }
      );
    }

    /* Advance reminder (N minutes before) */
    if (minutesBefore > 0 && diff === minutesBefore) {
      await self.registration.showNotification(
        `⏰ In ${minutesBefore} min: ${t.name}`,
        {
          body:     `${t.emoji || '🐾'} ${t.petName}  ·  at ${t.time}`,
          icon, badge: icon,
          tag:      `mfw-remind-${t.id}-${today}`,
          renotify: false,
          vibrate:  [100, 50, 100],
        }
      );
    }
  }
});
