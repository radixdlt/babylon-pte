
import "isomorphic-fetch";
import { DefaultApi } from './openapi';

const systemComponent = '020000000000000000000000000000000000000000000000000002';
const radixToken = '030000000000000000000000000000000000000000000000000004';
const testManifest = 'CLEAR_AUTH_ZONE;';
const testNonce = 4177801098;
const testPublicKey = '04a0fe72493f50e0666a455c6c099277a69e3db2da4ae4159b347394738f3bb54eebec620a584cd467746873cf244531779438ba2ba5fc6220eae8c9cd0e8000aa';
const testSignature = '0360ed75d2852635286e50baa69233814cdfd195a1c40174f0bff310861e448a132dff5e2df88a27b06c7bb4c3ed3f95a978410182af62a897e856fe33261a68';

describe('PTE API tests', function () {
    it('Test /component', async function () {
        const api = new DefaultApi();
        const component = await api.getComponent({
            address: systemComponent
        });
        console.log(component);
    })

    it('Test /resource', async function () {
        const api = new DefaultApi();
        const resource = await api.getResource({ address: radixToken });
        console.log(resource);
    })

    it('Test /nonce', async function () {
        const api = new DefaultApi();
        const nonce = await api.getNonce({ signers: [testPublicKey] });
        console.log(nonce);
    })

    it('Test /manifest', async function () {
        const api = new DefaultApi();
        const receipt = await api.runManifest({ body: testManifest });
        console.log(receipt);

        const tx = await api.getTransaction({ hash: receipt.transactionHash });
        console.log(tx);
        const re = await api.getReceipt({ hash: receipt.transactionHash });
        console.log(receipt);
    })

    it('Test /transaction', async function () {
        const api = new DefaultApi();
        const receipt = await api.runTransaction({
            transaction: {
                manifest: testManifest,
                nonce: testNonce,
                signatures: [
                    {
                        publicKey: testPublicKey,
                        signature: testSignature
                    }
                ]
            }
        });
        console.log(receipt);
    })
})