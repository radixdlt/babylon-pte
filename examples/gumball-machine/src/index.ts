import { DefaultApi, ManifestBuilder } from 'pte-sdk';
import {
  ActionType,
  sendAction,
  waitForAction,
  GetAccountAddressSuccess, GetAccountAddressFailure,
  SignTransactionSuccess, SignTransactionFailure
} from 'pte-browser-extension-sdk';

// Global states
let accountAddress = undefined; // User account address
let packageAddress = undefined; // GumballMachine package address
let componentAddress = undefined; // GumballMachine component address
let resourceAddress = undefined; // GUM resource address

document.getElementById('fetchAccountAddress').onclick = async function () {
  // Send request to browser extension
  sendAction({
    type: ActionType.GetAccountAddress,
    payload: "",
  });
  const response = await waitForAction<GetAccountAddressSuccess>(
    ActionType.GetAccountAddressSuccess,
    [ActionType.GetAccountAddressFailure]
  );
  console.log("Response: " + response);

  // Update UI
  accountAddress = response.payload;
  document.getElementById('accountAddress').innerText = accountAddress;
};

document.getElementById('publishPackage').onclick = async function () {
  // Load the wasm
  const res = await fetch('./hello_world.wasm');
  if (!res.ok) {
    throw new Error("HTTP error " + res.status);
  }
  const array = new Uint8Array(await res.arrayBuffer());

  // Construct manifest
  const manifest = new ManifestBuilder()
    .publishPackage(array)
    .build()
    .toString();
  console.log("Manifest: " + manifest);

  // Send request to browser extension
  sendAction({
    type: ActionType.SignTransaction,
    payload: manifest,
  });
  const response = await waitForAction<SignTransactionSuccess>(
    ActionType.SignTransactionSuccess,
    [ActionType.SignTransactionFailure]
  );
  console.log("Response: " + response);

  // Update UI
  packageAddress = response.payload.newPackages[0];
  document.getElementById('packageAddress').innerText = packageAddress;
};


document.getElementById('instantiateComponent').onclick = async function () {
  // Construct manifest
  const manifest = new ManifestBuilder()
    .callFunction(packageAddress, 'GumballMachine', 'instantiate_gumball_machine', ['Decimal("1.0")'])
    .build()
    .toString();
  console.log("Manifest: " + manifest);

  // Send request to browser extension
  sendAction({
    type: ActionType.SignTransaction,
    payload: manifest,
  });
  const response = await waitForAction<SignTransactionSuccess>(
    ActionType.SignTransactionSuccess,
    [ActionType.SignTransactionFailure]
  );
  console.log("Response: " + response);

  // Update UI
  componentAddress = response.payload.newComponents[0];
  resourceAddress = response.payload.newResources[0];
  document.getElementById('componentAddress').innerText = componentAddress;
};


document.getElementById('buyGumball').onclick = async function () {
  // Construct manifest
  const manifest = new ManifestBuilder()
    .withdrawFromAccountByAmount(accountAddress, 1, '030000000000000000000000000000000000000000000000000004')
    .callMethod(componentAddress, 'buy_gumball', ['Decimal("1.0")'])
    .callMethodWithAllResources(accountAddress, 'deposit_batch')
    .build()
    .toString();
  console.log("Manifest: " + manifest);

  // Send request to browser extension
  sendAction({
    type: ActionType.SignTransaction,
    payload: manifest,
  });
  const response = await waitForAction<SignTransactionSuccess>(
    ActionType.SignTransactionSuccess,
    [ActionType.SignTransactionFailure]
  );
  console.log("Response: " + response);

  // Update UI
  const receipt = response.payload;
  document.getElementById('receipt').innerText = JSON.stringify(receipt, null, 2);
};

document.getElementById('checkBalance').onclick = async function () {
  // Retrieve component info from PTE service
  const api = new DefaultApi();
  const userComponent = await api.getComponent({
    address: accountAddress
  });
  console.log(userComponent);
  const machineComponent = await api.getComponent({
    address: componentAddress
  });
  console.log(machineComponent);

  // Update UI
  document.getElementById('userBalance').innerText = userComponent.ownedResources
    .filter(e => e.resourceAddress == resourceAddress)
    .map(e => e.amount)[0] || '0';
  document.getElementById('machineBalance').innerText = machineComponent.ownedResources
  .filter(e => e.resourceAddress == resourceAddress).map(e => e.amount)[0];
};