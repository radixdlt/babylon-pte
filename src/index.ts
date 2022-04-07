import { paths } from './pte';
import { Fetcher } from 'openapi-typescript-fetch';
import { ManifestBuilder } from './manifest';

// declare fetcher for paths
const fetcher = Fetcher.for<paths>();

// global configuration
fetcher.configure({
    baseUrl: 'http://api.example.com/v1',
    init: {
        headers: {
            Accept: 'application/json',
        }
    },
    use: []
});

// create fetch operations
const getUsers = fetcher.path('/users').method('get').create();

// fetch
const users = getUsers({});
console.log(users);

// use manifest builder
const manifest = new ManifestBuilder()
    .takeFromWorktop('034812f861a8081a76f19a860f9312854826e8dbd791cf23deb335', 'bucket1')
    .takeFromWorktopByAmount(1.2, '034812f861a8081a76f19a860f9312854826e8dbd791cf23deb335', 'bucket2')
    .takeFromWorktopByIds(['dead', 'beef'], '034812f861a8081a76f19a860f9312854826e8dbd791cf23deb335', 'bucket3')
    .returnToWorktop('bucket3')
    .assertWorktopContains('034812f861a8081a76f19a860f9312854826e8dbd791cf23deb335')
    .assertWorktopContainsByAmount(3.4, '034812f861a8081a76f19a860f9312854826e8dbd791cf23deb335')
    .assertWorktopContainsByIds(['dead', 'beef'], '034812f861a8081a76f19a860f9312854826e8dbd791cf23deb335')
    .popFromAuthZone('proof1')
    .pushToAuthZone('proof1')
    .clearAuthZone()
    .createProofFromAuthZone('034812f861a8081a76f19a860f9312854826e8dbd791cf23deb335', 'proof2')
    .createProofFromAuthZoneByAmount(1.2, '034812f861a8081a76f19a860f9312854826e8dbd791cf23deb335', 'proof3')
    .createProofFromAuthZoneByIds(['dead', 'beef'], '034812f861a8081a76f19a860f9312854826e8dbd791cf23deb335', 'proof4')
    .createProofFromBucket('bucket1', 'proof5')
    .cloneProof('proof5', 'proof6')
    .dropProof('proof6')
    .callFunction('01afd33a0aa465673a3ba9dc82444029620138a04f537d54f4cad8', 'GumballMachine', 'new', ['Decimal("1.2") "GUM"'])
    .callMethod('0276ef419fc25b4b8bfd14c65bda76d15d73372693d3d9240de390', 'buy_gumball', ['Bucket("bucket2")'])
    .publishPackage(new Uint8Array([1, 2, 3]))
    .build();
console.log(manifest.toString());