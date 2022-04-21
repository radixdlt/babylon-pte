import { DefaultApi } from 'pte-sdk';
import { getAccountAddress, signTransaction } from 'pte-browser-extension-sdk';

document.getElementById('fetchAccountAddress').onclick = async function () {
  // Retrieve extension user account address
  const accountAddress = await getAccountAddress();

  document.getElementById('accountAddress').innerText = accountAddress;
};

document.getElementById('sendManifestToExtension').onclick = async function () {
  const manifest = (<HTMLInputElement>document.getElementById('manifest')).value;
  console.log("Manifest: " + manifest);

  // Send manifest to extension for signing
  const receipt = await signTransaction(manifest);

  document.getElementById('receipt').innerText = JSON.stringify(receipt, null, 2);
};

document.getElementById('fetchComponentState').onclick = async function () {
  const componentAddress = (<HTMLInputElement>document.getElementById('componentAddress')).value;

  // Retrieve component info from PTE service
  const api = new DefaultApi();
  const component = await api.getComponent({
    address: componentAddress
  });
  console.log(component);

  document.getElementById('componentState').innerText = component.state;
};

document.getElementById('checkTransaction').onclick = async function () {
  const transactionHash = (<HTMLInputElement>document.getElementById('pastTransactionHash')).value;

  // Retrieve transaction and receipt from PTE service
  const api = new DefaultApi();
  const transaction = await api.getTransaction({
    hash: transactionHash
  });
  const receipt = await api.getReceipt({
    hash: transactionHash
  });
  console.log(receipt);

  document.getElementById('pastTransaction').innerText = JSON.stringify(transaction, null, 2);
  document.getElementById('pastReceipt').innerText = JSON.stringify(receipt, null, 2);
};