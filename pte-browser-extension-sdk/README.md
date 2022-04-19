
## PTE Browser extension SDK

### Example Use

```typescript
import {
  ActionType,
  sendAction,
  waitForAction,
  GetAccountAddressSuccess, GetAccountAddressFailure,
  SignTransactionSuccess, SignTransactionFailure
} from 'pte-browser-extension-sdk';

async function fetchAccountAddress() {
  sendAction({
    type: ActionType.GetAccountAddress,
    payload: "",
  });
  const response = await waitForAction<GetAccountAddressSuccess>(
    ActionType.GetAccountAddressSuccess,
    [ActionType.GetAccountAddressFailure]
  );
  console.log('Response: ' + response);
};

async function sendManifestToExtension() {
  sendAction({
    type: ActionType.SignTransaction,
    payload: 'CLEAR_AUTH_ZONE;',
  });
  const response = await waitForAction<SignTransactionSuccess>(
    ActionType.SignTransactionSuccess,
    [ActionType.SignTransactionFailure]
  );
  console.log('Response: ' + response);
};
```

### Build

```
npm install
npm run build
```

### Test

```
npm run test
```
