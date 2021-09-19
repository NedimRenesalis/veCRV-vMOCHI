import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IVMochi, IVMochiInterface } from "../IVMochi";
export declare class IVMochi__factory {
    static readonly abi: ({
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
    } | {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: {
            components: {
                internalType: string;
                name: string;
                type: string;
            }[];
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
    })[];
    static createInterface(): IVMochiInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IVMochi;
}
//# sourceMappingURL=IVMochi__factory.d.ts.map