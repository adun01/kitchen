export class ServiceWorkerOne {

    public static run(): void {
        addEventListener('fetch', ServiceWorkerOne.onFetched);
    }

    public static onFetched = (event: any): void => {
        const isImage = event.request.url.search(/$(.png)|(.jpg)|(.gif)|(.ico)/gi) !== -1;
        if (!isImage) {
            fetch(event.request);
        } else {
            caches.match(event.request).then((matchResponse) => matchResponse || fetch(event.request)
                .then(fetchResponse => caches.open('images').then((cache) => {
                    cache.put(event.request, fetchResponse.clone());
                    return fetchResponse;
                })));
        }
    }
}

ServiceWorkerOne.run();
