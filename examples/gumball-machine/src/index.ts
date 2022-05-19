import { DefaultApi, ManifestBuilder } from 'pte-sdk';
import { getAccountAddress, signTransaction } from 'pte-browser-extension-sdk';

// Global states
let accountAddress = '029451391191a5f3692b0ed9a0d209f3010cb11e65cfa0c2c669af'; // User account address
let packageAddress = '01804fc985a5eb16748de1e25a882abf8bb50163b962af0b0944fc'; // GumballMachine package address
let componentAddress = '0221d31cf395377e29ddd2bac1142560b3f738a89f772b7f2c7480'; // GumballMachine component address
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

  // Send manifest to extension for signing
  const receipt = await signTransaction(manifest);

  // Update UI
  if (receipt.status == 'Success') {
    componentAddress = receipt.newComponents[0];
    resourceAddress = receipt.newResources[0];
    document.getElementById('componentAddress').innerText = componentAddress;
  } else {
    document.getElementById('componentAddress').innerText =
      'Error: ' + receipt.status;
  }
};

document.getElementById('update_time').onclick = async function () {
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
