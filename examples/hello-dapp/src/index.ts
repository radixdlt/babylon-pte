import { DefaultApi } from 'pte-sdk';
import {
  ActionType,
  sendAction,
  waitForAction,
  GetAccountAddressSuccess, GetAccountAddressFailure,
  SignTransactionSuccess, SignTransactionFailure
} from 'pte-browser-extension-sdk';


document.getElementById('fetchAccountAddress').onclick = async function () {
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
};

document.getElementById('sendManifestToExtension').onclick = async function () {
  const manifest = (<HTMLInputElement>document.getElementById('manifest')).value;
  console.log("Manifest: " + manifest);

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