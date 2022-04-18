export enum SignerMessageType {
  SIGN_TX,
}

export type SignerMessage<T extends SignerMessageType> = {
  type: T;
  tx: string;
};

export type Signer = {
  sign: <T extends SignerMessageType>(tx: SignerMessage<T>) => Promise<string>;
};

export enum ActionType {
  Connect = "connect",
  ConnectSuccess = "connectSuccess",
  ConnectFail = "connectFail",
  HandShake = "handShake",
  HandShakeSuccess = "handShakeSuccess",
  Sign = "sign",
  SignSuccess = "signSuccess",
  GetAlias = "getAlias",
  GetAliasSuccess = "getAliasSuccess",
  GetAliasFail = "getAliasFail",
}

export type Action<T extends ActionType, P> = {
  type: T;
  payload: P;
  id: string;
};

export type Connect = Action<
  ActionType.Connect,
  {
    permissions: string[];
  }
>;

export type ConnectSuccess = Action<ActionType.ConnectSuccess, void>;

export enum ConnectFailReason {
  RejectedByUser = "rejectedByUser",
  Timeout = "timeout",
}

export type ConnectFail = Action<
  ActionType.ConnectFail,
  {
    reason: ConnectFailReason;
  }
>;

export type HandShake = Action<ActionType.HandShake, void>;

export type HandShakeSuccess = Action<
  ActionType.HandShakeSuccess,
  { connected: boolean }
>;

export type SignTx = Action<
  ActionType.Sign,
  SignerMessage<SignerMessageType.SIGN_TX>
>;

export type SignTxSuccess = Action<ActionType.Sign, string>;

export enum GetAliasFailReason {
  Permission = "Permission",
  Connection = "Connection",
}
export type GetAlias = Action<ActionType.GetAlias, void>;
export type GetAliasSuccess = Action<
  ActionType.GetAliasSuccess,
  { id: string; name: string }
>;
export type GetAliasFail = Action<
  ActionType.GetAliasFail,
  { reason: GetAliasFailReason }
>;

export type ActionTypes =
  | Connect
  | ConnectSuccess
  | ConnectFail
  | SignTx
  | SignTxSuccess
  | HandShake
  | HandShakeSuccess
  | GetAlias
  | GetAliasSuccess
  | GetAliasFail;

export enum MessageTarget {
  Extension,
  Dapp,
}

export type Message<Action = ActionTypes> = {
  action: Action;
  target: MessageTarget;
};

export type MessageSenderData = {
  tabId: number;
  url: string;
  createdAt: number;
};

export type MessageStoreItem<Action = ActionTypes> = Message<Action> &
  MessageSenderData;
