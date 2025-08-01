// Service Worker للتعامل مع أي طلبات غير متوقعة
self.addEventListener('install', function(event) {
  console.log('Service Worker installed');
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  console.log('Service Worker activated');
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function(event) {
  // لا نفعل شيئاً، فقط نتجاهل الطلبات
  return;
});