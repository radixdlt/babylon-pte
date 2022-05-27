import { DefaultApi, ManifestBuilder } from 'pte-sdk';
import { getAccountAddress, signTransaction } from 'pte-browser-extension-sdk';

// Global states
let accountAddress = undefined; // User account address
let packageAddress = '01f23d3f59d287993ebb6a195b65a2cd8bd5d353d1aef454c11767'; // GumballMachine package address
let componentAddress = undefined; // GumballMachine component address
let resourceAddress = undefined; // GUM resource address

document.getElementById('fetchAccountAddress').onclick = async function () {
  // Retrieve extension user account address
  accountAddress = await getAccountAddress();

  document.getElementById('accountAddress').innerText = accountAddress;
};

document.getElementById('publishPackage').onclick = async function () {
  // Load the wasm
  const response = await fetch('./gumball_machine.wasm');
  const wasm = new Uint8Array(await response.arrayBuffer());

  // Construct manifest
  const manifest = new ManifestBuilder()
    .publishPackage(wasm)
    .build()
    .toString();

  // Send manifest to extension for signing
  const receipt = await signTransaction(manifest);

  // Update UI
  packageAddress = receipt.newPackages[0];
  document.getElementById('packageAddress').innerText = packageAddress;
};

document.getElementById('instantiateComponent').onclick = async function () {
  // Construct manifest
  const manifest = new ManifestBuilder()
    .callFunction(packageAddress, 'TimeOracle', 'instantiate_time_oracle', [])
    .callMethodWithAllResources(accountAddress, 'deposit_batch')
    .build()
    .toString();
  console.log('Test1');
  // Send manifest to extension for signing
  const receipt = await signTransaction(manifest);
  console.log(receipt);

  // Update UI
  if (receipt.status == 'Success') {
    console.log('Test3');
    componentAddress = receipt.newComponents[0];
    resourceAddress = receipt.newResources[0];
    document.getElementById('componentAddress').innerText = componentAddress;
  } else {
    document.getElementById('componentAddress').innerText =
      'Error: ' + receipt.status;
  }
};

document.getElementById('update_time').onclick = async function () {
  // API CALL to get the timestring
  const response = await fetch('http://worldtimeapi.org/api/timezone/Europe');

  console.log(response);

  // Construct manifest
  const manifest = new ManifestBuilder()
    .callMethod(componentAddress, 'update_time', ['"Test"'])
    .build()
    .toString();

  console.log(manifest);

  // Send manifest to extension for signing
  const receipt = await signTransaction(manifest);

  // Update UI
  document.getElementById('receipt2').innerText = JSON.stringify(
    receipt,
    null,
    2,
  );
};

document.getElementById('get_time').onclick = async function () {
  // Construct manifest
  const manifest = new ManifestBuilder()
    .callMethod(componentAddress, 'get_time', [])
    .build()
    .toString();

  console.log(manifest);

  // Send manifest to extension for signing
  const receipt = await signTransaction(manifest);

  // Update UI
  document.getElementById('receipt3').innerText = JSON.stringify(
    receipt,
    null,
    2,
  );
};

document.getElementById('pay_for_update_time').onclick = async function () {
  // Construct manifest
  const manifest = new ManifestBuilder()
    .withdrawFromAccountByAmount(
      accountAddress,
      1,
      '030000000000000000000000000000000000000000000000000004',
    )
    .takeFromWorktop(
      '030000000000000000000000000000000000000000000000000004',
      'xrd',
    )
    .callMethod(componentAddress, 'pay_for_update_time', ['Bucket("xrd")'])
    .callMethodWithAllResources(accountAddress, 'deposit_batch')
    .build()
    .toString();

  // Send manifest to extension for signing
  const receipt = await signTransaction(manifest);

  // Update UI
  document.getElementById('receipt').innerText = JSON.stringify(
    receipt,
    null,
    2,
  );
};

document.getElementById('checkBalance').onclick = async function () {
  // Retrieve component info from PTE service
  const api = new DefaultApi();
  const userComponent = await api.getComponent({
    address: accountAddress,
  });
  const machineComponent = await api.getComponent({
    address: componentAddress,
  });

  // Update UI
  document.getElementById('userBalance').innerText =
    userComponent.ownedResources
      .filter((e) => e.resourceAddress == resourceAddress)
      .map((e) => e.amount)[0] || '0';
  document.getElementById('machineBalance').innerText =
    machineComponent.ownedResources
      .filter((e) => e.resourceAddress == resourceAddress)
      .map((e) => e.amount)[0];
};
