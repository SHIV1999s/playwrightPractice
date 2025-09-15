const { test } = require('@playwright/test')
const mockApi = require('./mockApi')

test('api calling', { tag: '@apiMocking' }, async ({ }) => {
    const api = new mockApi();

    // for (let i = 0; i < 20; i++) {
    //     console.log(await api.getData());
    //     console.log('--------------------------------------');

    // };
    async function pooling(count = 0, retries = 20) {
        const json = await api.getData();
        if (json.status == 'inactive' && count < retries) {
            count++;
            console.log(count);
            await new Promise(r=>setTimeout(r,500))
            await pooling(count)
        } else {
            console.log(json);
        }
    };
    await pooling()
})  