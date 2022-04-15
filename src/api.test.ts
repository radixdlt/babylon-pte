
import "isomorphic-fetch";
import { DefaultApi } from './openapi';
import { ManifestBuilder } from './manifest';

const systemComponent = '020000000000000000000000000000000000000000000000000002';
const radixToken = '030000000000000000000000000000000000000000000000000004';
const testManifest = 'CLEAR_AUTH_ZONE;';
const testNonce = 1796006201;
const testPublicKey = '042b10770b3acba7a92916d3349fd0f219b79a9939ed2f17cdb8c2c4543a4fd3e7e86659a90ad4e078d7e93fdbecca41b4a0a57f326db4b7691103c53776336f0e';
const testSignature = 'b277d4e4ff8d5fcc8beb0ba4ac60f4d52d42718d6b8442cd552bce11256a876f702925d4f23f5d444434f855faac2e9da6d78921a603bfa299029608e3b59e5c';

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

    it('Test /transaction', async function () {
        const api = new DefaultApi();
        const receipt = await api.submitTransaction({
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

        const tx = await api.getTransaction({ hash: receipt.transactionHash });
        console.log(tx);
        const re = await api.getReceipt({ hash: receipt.transactionHash });
        console.log(receipt);
    })

    it('Test account creation', async function () {
        const manifest = new ManifestBuilder()
            .callMethod('020000000000000000000000000000000000000000000000000002', 'free_xrd', [])
            .takeFromWorktop('030000000000000000000000000000000000000000000000000004', 'xrd')
            .callFunction('010000000000000000000000000000000000000000000000000003', 'Account', 'new_with_resource',
                [
                    'Enum(2u8, Enum(0u8, Enum(0u8, Enum(0u8, NonFungibleAddress("030000000000000000000000000000000000000000000000000005' + testPublicKey + '")))))',
                    'Bucket("xrd")'
                ]
            )
            .build();

        const api = new DefaultApi();
        const nonce = await api.getNonce({ signers: [testPublicKey] })
        const receipt = await api.submitTransaction({
            transaction: {
                manifest: testManifest,
                nonce,
                signatures: [
                ]
            }
        });
        console.log(receipt);
    })


})