import { DefaultApi } from 'pte-sdk';
import {
  ActionType,
  sendAction,
  waitForAction,
  GetAccountAddress, GetAccountAddressSuccess,
  SignTransaction, SignTransactionSuccess
} from 'pte-browser-extension-sdk';


document.getElementById('fetchAccountAddress').onclick = async function () {
  // Send request to browser extension
  sendAction({
    type: ActionType.GetAccountAddress,
    payload: null,
  });
  const response = await waitForAction<GetAccountAddressSuccess>(
    ActionType.GetAccountAddressSuccess
  );
  console.log("Response: " + response);

  document.getElementById('accountAddress').innerText = response.payload;
};

document.getElementById('sendManifestToExtension').onclick = async function () {
  // Read input manifest
  const manifest = (<HTMLInputElement>document.getElementById('manifest')).value;
  console.log("Manifest: " + manifest);

  // Send request to browser extension
  sendAction({
    type: ActionType.SignTransaction,
    payload: manifest,
  });
  const response = await waitForAction<SignTransactionSuccess>(
    ActionType.SignTransactionSuccess
  );
  console.log("Response: " + response);

  document.getElementById('receipt').innerText = response.payload;
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