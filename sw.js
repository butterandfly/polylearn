// console.log(window);
//
// self.addEventListener('install', e => {
//   // 打开cache并加载内容进去
//   let p = caches.open('polylearn').then(cache => {
//     return cache.addAll([
//       '/',
//       '/index.html'
//     ])
//     // 让service worker进入active状态
//     .then(() => self.skipWaiting());
//   });
//
//   e.waitUntil(p);
// });
//
// self.addEventListener('activate', event => {
//   event.waitUntil(self.clients.claim());
// });
//
// self.addEventListener('fetch', event => {
//   let responseP = caches.match(event.request).then(response => {
//     return response || fetch(event.request);
//   });
//
//   event.respondWith(responseP);
// });

console.info('Service worker disabled for development, will be generated at build time.');

