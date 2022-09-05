import { DefaultApi, ManifestBuilder } from 'pte-sdk';
import { getAccountAddress, signTransaction } from 'pte-browser-extension-sdk';

// Global states
let accountAddress = undefined; // User account address
let packageAddress = undefined; // GumballMachine package address
let componentAddress = undefined; // GumballMachine component address
let resourceAddress = undefined; // GUM resource address

document.getElementById('fetchAccountAddress').onclick = async function () {
  // Retrieve extension user account address
  accountAddress = await getAccountAddress();

  document.getElementById('accountAddress').innerText = accountAddress;
};

document.getElementById('publishPackage').onclick = async function () {
  // Load the wasm
  const response = await fetch('./gumball_machine.rtm');
  const buffer = new Uint8Array(await response.arrayBuffer());

  // Construct manifest
  // const manifest = new ManifestBuilder()
  //   .callMethod('system_sim1qsqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqs9fh54n', 'lock_fee', ['Decimal("100.0")'])
  //   .publishPackage(wasm)
  //   .build()
  //   .toString();
  const manifest = new TextDecoder("utf-8").decode(buffer);

  // Send manifest to extension for signing
  const receipt = await signTransaction(manifest);

  // Update UI
  packageAddress = receipt.newPackages[0];
  document.getElementById('packageAddress').innerText = packageAddress;
};


document.getElementById('instantiateComponent').onclick = async function () {
  // Construct manifest
  const manifest = new ManifestBuilder()
    .callMethod('system_sim1qsqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqs9fh54n', 'lock_fee', ['Decimal("100.0")'])
    .callFunction(packageAddress, 'GumballMachine', 'instantiate_gumball_machine', ['Decimal("1.0")'])
    .build()
    .toString();

  // Send manifest to extension for signing
  const receipt = await signTransaction(manifest);

  // Update UI
  if (receipt.status == 'COMMIT_SUCCESS') {
    componentAddress = receipt.newComponents[0];
    resourceAddress = receipt.newResources[0];
    document.getElementById('componentAddress').innerText = componentAddress;
  } else {
    document.getElementById('componentAddress').innerText = 'Error: ' + receipt.status;
  }
}


document.getElementById('buyGumball').onclick = async function () {
  // Construct manifest
  const manifest = new ManifestBuilder()
    .callMethod('system_sim1qsqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqs9fh54n', 'lock_fee', ['Decimal("100.0")'])
    .withdrawFromAccountByAmount(accountAddress, 1, 'resource_sim1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqzqu57yag')
    .takeFromWorktop('resource_sim1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqzqu57yag', 'xrd')
    .callMethod(componentAddress, 'buy_gumball', ['Bucket("xrd")'])
    .callMethodWithAllResources(accountAddress, 'deposit_batch')
    .build()
    .toString();

  // Send manifest to extension for signing
  const receipt = await signTransaction(manifest);

  // Update UI
  document.getElementById('receipt').innerText = JSON.stringify(receipt, null, 2);
};

document.getElementById('checkBalance').onclick = async function () {
  // Retrieve component info from PTE service
  const api = new DefaultApi();
  const userComponent = await api.getComponent({
    address: accountAddress
  });
  const machineComponent = await api.getComponent({
    address: componentAddress
  });

  // Update UI
  document.getElementById('userBalance').innerText = userComponent.ownedResources
    .filter(e => e.resourceAddress == resourceAddress)
    .map(e => e.amount)[0] || '0';
  document.getElementById('machineBalance').innerText = machineComponent.ownedResources
    .filter(e => e.resourceAddress == resourceAddress).map(e => e.amount)[0];
};