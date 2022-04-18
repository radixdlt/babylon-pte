import { DefaultApi } from 'pte-sdk';
import {
  ActionType,
  sendAction,
  SignTxSuccess,
  waitForAction,
  GetAliasSuccess,
} from 'pte-browser-extension-sdk';


document.getElementById('fetchAccountAddress').onclick = async function () {
  // Send request to browser extension
  sendAction({ type: ActionType.GetAlias, payload: null });

  // Add trigger when a response is received
  const response = await waitForAction<GetAliasSuccess>(
    ActionType.SignSuccess
  );

  document.getElementById('accountAddress').innerText = response.toString();
};

document.getElementById('sendManifestToExtension').onclick = async function () {
  // Read input manifest
  const manifest = (<HTMLInputElement>document.getElementById('manifest')).value;
  console.log("Manifest: " + manifest);

  // Send request to browser extension
  sendAction({ type: ActionType.Sign, payload: manifest });
  const response = await waitForAction<SignTxSuccess>(
    ActionType.SignSuccess
  );

  document.getElementById('receipt').innerText = response.toString();
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