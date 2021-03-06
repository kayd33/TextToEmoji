let cacheName = 'tte';
let cacheURLs = [
  './',
  'index.html',
  'src/index.css',
  'src/bundle.js',
  'manifest.json',
  'favicon.ico',
  'https://fonts.googleapis.com/css?family=Roboto|Ubuntu'
];

self.addEventListener('install', function(e){
  e.waitUntil(
    caches.open(cacheName).then(function(ch){
      return ch.addAll(cacheURLs);
    })
  );
  // console.log('Caching complete');
});

self.addEventListener('fetch', function(e){
  e.respondWith(
    fetch(e.request).catch(function(){
      return caches.match(e.request).then(function(response){
        if(response){
          return response;
        }
        else{
          console.log('Not Available');
        }
      })
    })
  );
});