export class ServiceWorkerOne {

    public static run(): void {
        addEventListener('fetch', ServiceWorkerOne.onFetched);
    }

    public static onFetched = (event: any): void => {
        if (event.request.url.search(/$(.png)|(.jpg)|(.gif)|(.ico)/gi) !== -1) {
            event.respondWith((async () => {

                const match = await caches.match(event.request);

                if (match) {
                    return match;
                }
                return fetch(event.request)
                    .then(fetchResponse => caches.open('images').then((cache) => {
                        cache.put(event.request, fetchResponse.clone());
                        return fetchResponse;
                    }))
            })());
        }
    }
}

ServiceWorkerOne.run();
