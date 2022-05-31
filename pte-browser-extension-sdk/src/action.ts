import { ActionType, ActionTypes, MessageStoreItem } from "./_types";

export const sendAction = ({ type, payload }: Omit<ActionTypes, "id">) => {
  const event = new CustomEvent("radix#chromeExtension#send", {
    detail: { type, payload },
  });

  window.dispatchEvent(event);
};

export const waitForAction = async <SuccessType extends ActionTypes>(
  successType: ActionType,
  errorTypes?: ActionType[]
): Promise<SuccessType> =>
  new Promise((resolve, reject) => {
    let listener = function(event){
      const { action } = (event as CustomEvent<MessageStoreItem<ActionTypes>>)
        .detail;

      if (action.type === successType) {
        window.removeEventListener("radix#chromeExtension#receive", listener);
        resolve(action as SuccessType);
      } else if (errorTypes?.includes(action.type)) {
        window.removeEventListener("radix#chromeExtension#receive", listener);
        reject(action);
      } else console.log("MESSAGE IGNORED !", event);
    }
    window.addEventListener("radix#chromeExtension#receive", listener);
  });