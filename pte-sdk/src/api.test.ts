
import "isomorphic-fetch";
import { DefaultApi } from './api';
import { ManifestBuilder } from './manifest';

const systemComponent = 'system_sim1qsqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqs9fh54n';
const radixToken = 'resource_sim1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqzqu57yag';
const testManifest = 'CLEAR_AUTH_ZONE;';
const testNonce = 3880673815;
const testPublicKey = '0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798';
const testSignature = '79224ea514206706298d8d620f660828f7987068d6d02757e6f3cbbf4a51ab133395db69db1bc9b2726dd99e34efc252d8258dcb003ebaba42be349f50f7765e';

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
                nonce: {
                    value: testNonce
                },
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
            .callMethod("system_sim1qsqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqs9fh54n", "lock_fee", ["Decimal(\"10\")"])
            .newAccount(testPublicKey)
            .build();

        const api = new DefaultApi();
        const nonce = await api.getNonce({ signers: [testPublicKey] });
        const receipt = await api.submitTransaction({
            transaction: {
                manifest: manifest.toString(),
                nonce,
                signatures: [
                ]
            }
        });
        console.log(receipt);
    })


})