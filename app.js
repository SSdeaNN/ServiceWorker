if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Registrar el service worker relativo al archivo para evitar problemas de scope
        navigator.serviceWorker.register('service-worker.js')
        .then(function(registration) {
            console.log('Service Worker registrado con éxito. Scope:', registration.scope);
        })
        .catch(function(error) {
            console.log('Error al registrar el Service Worker:', error);
        });
    });
}