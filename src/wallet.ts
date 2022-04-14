export const Radix = {
    sign: (signer: Signer, manifest: string) =>
        signer.sign({
            type: SignerMessageType.SIGN_TX,
            manifest,
        }),
};

enum SignerMessageType {
    SIGN_TX,
}

type SignerMessage<T extends SignerMessageType> = {
    type: T;
    manifest: string;
};

type Signer = {
    sign: <T extends SignerMessageType>(tx: SignerMessage<T>) => Promise<string>;
};

export const ChromeExtensionSigner: Signer = {
    sign: async (tx: SignerMessage<SignerMessageType.SIGN_TX>) => {
        let resolveSignature: any;
        const signaturePromise = new Promise<string>((resolve, reject) => {
            resolveSignature = resolve;
        });

        window.addEventListener(
            "radix#chromeExtension#signature",
            (event) => {
                //@ts-ignore
                if (!event.detail.signature) throw Error("No signature provided.");
                //@ts-ignore
                resolveSignature(JSON.stringify(event.detail.signature, null, 2));
            },
            {
                once: true,
            }
        );

        const event = new CustomEvent("radix#chromeExtension#signRequest", {
            detail: tx,
        });

        window.dispatchEvent(event);
        return signaturePromise;
    },
};
