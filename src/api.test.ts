
import { Api } from './api';

describe('PTE API tests', function () {
    it('Test show system component', async function () {
        const api = new Api();
        const info = await api.component.showComponentByAddress(
            "020000000000000000000000000000000000000000000000000002"
        );
        expect(info).toBe('expected');
    })
})