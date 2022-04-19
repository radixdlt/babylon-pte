import { DefaultApi } from 'pte-sdk';
import {
  ActionType,
  sendAction,
  waitForAction,
  GetAccountAddressSuccess, GetAccountAddressFailure,
  SignTransactionSuccess, SignTransactionFailure
} from 'pte-browser-extension-sdk';


document.getElementById('fetchAccountAddress').onclick = async function () {
  // Send request to browser extension
  try {
    sendAction({
      type: ActionType.GetAccountAddress,
      payload: "",
    });
    const response = await waitForAction<GetAccountAddressSuccess>(
      ActionType.GetAccountAddressSuccess,
      [ActionType.GetAccountAddressFailure]
    );
    console.log("Response: " + response);
    document.getElementById('accountAddress').innerText = response.payload;
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
  }
};

document.getElementById('sendManifestToExtension').onclick = async function () {
  // Read input manifest
  const manifest = (<HTMLInputElement>document.getElementById('manifest')).value;
  console.log("Manifest: " + manifest);

  // Send request to browser extension
  try {
    sendAction({
      type: ActionType.SignTransaction,
      payload: manifest,
    });
    const response = await waitForAction<SignTransactionSuccess>(
      ActionType.SignTransactionSuccess,
      [ActionType.SignTransactionFailure]
    );
    console.log("Response: " + response);
    document.getElementById('receipt').innerText = JSON.stringify(response.payload, null, 2);
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
  }
};

document.getElementById('fetchComponentState').onclick = async function () {
  // Read input component address
  const componentAddress = (<HTMLInputElement>document.getElementById('componentAddress')).value;

  // Retrieve component info from PTE service
  const api = new DefaultApi();
  const component = await api.getComponent({
    address: componentAddress
  });

  document.getElementById('componentState').innerText = component.state;
};

document.getElementById('checkTransaction').onclick = async function () {
  // Read input transaction hash
  const transactionHash = (<HTMLInputElement>document.getElementById('pastTransactionHash')).value;

  // Retrieve transaction and receipt from PTE service
  const api = new DefaultApi();
  const transaction = await api.getTransaction({
    hash: transactionHash
  });
  const receipt = await api.getReceipt({
    hash: transactionHash
  });

  document.getElementById('pastTransaction').innerText = JSON.stringify(transaction, null, 2);
  document.getElementById('pastReceipt').innerText = JSON.stringify(receipt, null, 2);
};