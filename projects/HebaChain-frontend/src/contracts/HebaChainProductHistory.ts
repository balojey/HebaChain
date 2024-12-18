/* eslint-disable */
// @ts-nocheck
/**
 * This file was automatically generated by @algorandfoundation/algokit-client-generator.
 * DO NOT MODIFY IT BY HAND.
 * requires: @algorandfoundation/algokit-utils: ^2
 */
import * as algokit from '@algorandfoundation/algokit-utils'
import type {
  ABIAppCallArg,
  AppCallTransactionResult,
  AppCallTransactionResultOfType,
  AppCompilationResult,
  AppReference,
  AppState,
  AppStorageSchema,
  CoreAppCallArgs,
  RawAppCallArgs,
  TealTemplateParams,
} from '@algorandfoundation/algokit-utils/types/app'
import type {
  AppClientCallCoreParams,
  AppClientCompilationParams,
  AppClientDeployCoreParams,
  AppDetails,
  ApplicationClient,
} from '@algorandfoundation/algokit-utils/types/app-client'
import type { AppSpec } from '@algorandfoundation/algokit-utils/types/app-spec'
import type { SendTransactionResult, TransactionToSign, SendTransactionFrom, SendTransactionParams } from '@algorandfoundation/algokit-utils/types/transaction'
import type { ABIResult, TransactionWithSigner } from 'algosdk'
import { Algodv2, OnApplicationComplete, Transaction, AtomicTransactionComposer, modelsv2 } from 'algosdk'
export const APP_SPEC: AppSpec = {
  "hints": {
    "save_product_history(string,string,string,string)(string,string,string,string,uint64)": {
      "call_config": {
        "no_op": "CALL"
      },
      "structs": {
        "output": {
          "name": "History",
          "elements": [
            [
              "id",
              "string"
            ],
            [
              "product_id",
              "string"
            ],
            [
              "location",
              "string"
            ],
            [
              "condition",
              "string"
            ],
            [
              "timestamp",
              "uint64"
            ]
          ]
        }
      }
    }
  },
  "source": {
    "approval": "I3ByYWdtYSB2ZXJzaW9uIDEwCgpzbWFydF9jb250cmFjdHMuaGViYV9jaGFpbl9wcm9kdWN0X2hpc3RvcnkuY29udHJhY3QuSGViYUNoYWluUHJvZHVjdEhpc3RvcnkuYXBwcm92YWxfcHJvZ3JhbToKICAgIGNhbGxzdWIgX19wdXlhX2FyYzRfcm91dGVyX18KICAgIHJldHVybgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy5oZWJhX2NoYWluX3Byb2R1Y3RfaGlzdG9yeS5jb250cmFjdC5IZWJhQ2hhaW5Qcm9kdWN0SGlzdG9yeS5fX3B1eWFfYXJjNF9yb3V0ZXJfXygpIC0+IHVpbnQ2NDoKX19wdXlhX2FyYzRfcm91dGVyX186CiAgICBwcm90byAwIDEKICAgIHR4biBOdW1BcHBBcmdzCiAgICBieiBfX3B1eWFfYXJjNF9yb3V0ZXJfX19iYXJlX3JvdXRpbmdANQogICAgbWV0aG9kICJzYXZlX3Byb2R1Y3RfaGlzdG9yeShzdHJpbmcsc3RyaW5nLHN0cmluZyxzdHJpbmcpKHN0cmluZyxzdHJpbmcsc3RyaW5nLHN0cmluZyx1aW50NjQpIgogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAogICAgbWF0Y2ggX19wdXlhX2FyYzRfcm91dGVyX19fc2F2ZV9wcm9kdWN0X2hpc3Rvcnlfcm91dGVAMgogICAgaW50IDAKICAgIHJldHN1YgoKX19wdXlhX2FyYzRfcm91dGVyX19fc2F2ZV9wcm9kdWN0X2hpc3Rvcnlfcm91dGVAMjoKICAgIHR4biBPbkNvbXBsZXRpb24KICAgICEKICAgIGFzc2VydCAvLyBPbkNvbXBsZXRpb24gaXMgTm9PcAogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgIGFzc2VydCAvLyBpcyBub3QgY3JlYXRpbmcKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDEKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDIKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDMKICAgIHR4bmEgQXBwbGljYXRpb25BcmdzIDQKICAgIGNhbGxzdWIgc2F2ZV9wcm9kdWN0X2hpc3RvcnkKICAgIGJ5dGUgMHgxNTFmN2M3NQogICAgc3dhcAogICAgY29uY2F0CiAgICBsb2cKICAgIGludCAxCiAgICByZXRzdWIKCl9fcHV5YV9hcmM0X3JvdXRlcl9fX2JhcmVfcm91dGluZ0A1OgogICAgdHhuIE9uQ29tcGxldGlvbgogICAgYm56IF9fcHV5YV9hcmM0X3JvdXRlcl9fX2FmdGVyX2lmX2Vsc2VAOQogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgICEKICAgIGFzc2VydCAvLyBpcyBjcmVhdGluZwogICAgaW50IDEKICAgIHJldHN1YgoKX19wdXlhX2FyYzRfcm91dGVyX19fYWZ0ZXJfaWZfZWxzZUA5OgogICAgaW50IDAKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy5oZWJhX2NoYWluX3Byb2R1Y3RfaGlzdG9yeS5jb250cmFjdC5IZWJhQ2hhaW5Qcm9kdWN0SGlzdG9yeS5zYXZlX3Byb2R1Y3RfaGlzdG9yeShoaXN0b3J5X2lkOiBieXRlcywgcHJvZHVjdF9pZDogYnl0ZXMsIGN1cnJlbnRfbG9jYXRpb246IGJ5dGVzLCBjb25kaXRpb246IGJ5dGVzKSAtPiBieXRlczoKc2F2ZV9wcm9kdWN0X2hpc3Rvcnk6CiAgICBwcm90byA0IDEKICAgIGdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKICAgIGl0b2IKICAgIGZyYW1lX2RpZyAtNAogICAgbGVuCiAgICBpbnQgMTYKICAgICsKICAgIGR1cAogICAgaXRvYgogICAgZXh0cmFjdCA2IDIKICAgIGJ5dGUgMHgwMDEwCiAgICBzd2FwCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGZyYW1lX2RpZyAtMwogICAgbGVuCiAgICArCiAgICBkdXAKICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICB1bmNvdmVyIDIKICAgIHN3YXAKICAgIGNvbmNhdAogICAgc3dhcAogICAgZnJhbWVfZGlnIC0yCiAgICBsZW4KICAgICsKICAgIGl0b2IKICAgIGV4dHJhY3QgNiAyCiAgICBjb25jYXQKICAgIHN3YXAKICAgIGNvbmNhdAogICAgZnJhbWVfZGlnIC00CiAgICBjb25jYXQKICAgIGZyYW1lX2RpZyAtMwogICAgY29uY2F0CiAgICBmcmFtZV9kaWcgLTIKICAgIGNvbmNhdAogICAgZnJhbWVfZGlnIC0xCiAgICBjb25jYXQKICAgIGNhbGxzdWIgc2F2ZV9oaXN0b3J5CiAgICBwb3AKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy5oZWJhX2NoYWluX3Byb2R1Y3RfaGlzdG9yeS5jb250cmFjdC5IZWJhQ2hhaW5Qcm9kdWN0SGlzdG9yeS5zYXZlX2hpc3RvcnkoaGlzdG9yeTogYnl0ZXMpIC0+IGJ5dGVzLCBieXRlczoKc2F2ZV9oaXN0b3J5OgogICAgcHJvdG8gMSAyCiAgICBieXRlICJoaXN0b3JpZXMiCiAgICB0eG4gU2VuZGVyCiAgICBjb25jYXQKICAgIGR1cAogICAgYm94X2RlbAogICAgcG9wCiAgICBmcmFtZV9kaWcgLTEKICAgIGJveF9wdXQKICAgIGZyYW1lX2RpZyAtMQogICAgZHVwCiAgICByZXRzdWIK",
    "clear": "I3ByYWdtYSB2ZXJzaW9uIDEwCgpzbWFydF9jb250cmFjdHMuaGViYV9jaGFpbl9wcm9kdWN0X2hpc3RvcnkuY29udHJhY3QuSGViYUNoYWluUHJvZHVjdEhpc3RvcnkuY2xlYXJfc3RhdGVfcHJvZ3JhbToKICAgIGludCAxCiAgICByZXR1cm4K"
  },
  "state": {
    "global": {
      "num_byte_slices": 0,
      "num_uints": 0
    },
    "local": {
      "num_byte_slices": 0,
      "num_uints": 0
    }
  },
  "schema": {
    "global": {
      "declared": {},
      "reserved": {}
    },
    "local": {
      "declared": {},
      "reserved": {}
    }
  },
  "contract": {
    "name": "HebaChainProductHistory",
    "methods": [
      {
        "name": "save_product_history",
        "args": [
          {
            "type": "string",
            "name": "history_id"
          },
          {
            "type": "string",
            "name": "product_id"
          },
          {
            "type": "string",
            "name": "current_location"
          },
          {
            "type": "string",
            "name": "condition"
          }
        ],
        "readonly": false,
        "returns": {
          "type": "(string,string,string,string,uint64)"
        }
      }
    ],
    "networks": {}
  },
  "bare_call_config": {
    "no_op": "CREATE"
  }
}

/**
 * Defines an onCompletionAction of 'no_op'
 */
export type OnCompleteNoOp =  { onCompleteAction?: 'no_op' | OnApplicationComplete.NoOpOC }
/**
 * Defines an onCompletionAction of 'opt_in'
 */
export type OnCompleteOptIn =  { onCompleteAction: 'opt_in' | OnApplicationComplete.OptInOC }
/**
 * Defines an onCompletionAction of 'close_out'
 */
export type OnCompleteCloseOut =  { onCompleteAction: 'close_out' | OnApplicationComplete.CloseOutOC }
/**
 * Defines an onCompletionAction of 'delete_application'
 */
export type OnCompleteDelApp =  { onCompleteAction: 'delete_application' | OnApplicationComplete.DeleteApplicationOC }
/**
 * Defines an onCompletionAction of 'update_application'
 */
export type OnCompleteUpdApp =  { onCompleteAction: 'update_application' | OnApplicationComplete.UpdateApplicationOC }
/**
 * A state record containing a single unsigned integer
 */
export type IntegerState = {
  /**
   * Gets the state value as a BigInt.
   */
  asBigInt(): bigint
  /**
   * Gets the state value as a number.
   */
  asNumber(): number
}
/**
 * A state record containing binary data
 */
export type BinaryState = {
  /**
   * Gets the state value as a Uint8Array
   */
  asByteArray(): Uint8Array
  /**
   * Gets the state value as a string
   */
  asString(): string
}

export type AppCreateCallTransactionResult = AppCallTransactionResult & Partial<AppCompilationResult> & AppReference
export type AppUpdateCallTransactionResult = AppCallTransactionResult & Partial<AppCompilationResult>

export type AppClientComposeCallCoreParams = Omit<AppClientCallCoreParams, 'sendParams'> & {
  sendParams?: Omit<SendTransactionParams, 'skipSending' | 'atc' | 'skipWaiting' | 'maxRoundsToWaitForConfirmation' | 'populateAppCallResources'>
}
export type AppClientComposeExecuteParams = Pick<SendTransactionParams, 'skipWaiting' | 'maxRoundsToWaitForConfirmation' | 'populateAppCallResources' | 'suppressLog'>

export type IncludeSchema = {
  /**
   * Any overrides for the storage schema to request for the created app; by default the schema indicated by the app spec is used.
   */
  schema?: Partial<AppStorageSchema>
}

/**
 * Defines the types of available calls and state of the HebaChainProductHistory smart contract.
 */
export type HebaChainProductHistory = {
  /**
   * Maps method signatures / names to their argument and return types.
   */
  methods:
    & Record<'save_product_history(string,string,string,string)(string,string,string,string,uint64)' | 'save_product_history', {
      argsObj: {
        historyId: string
        productId: string
        currentLocation: string
        condition: string
      }
      argsTuple: [historyId: string, productId: string, currentLocation: string, condition: string]
      returns: History
    }>
}
/**
 * Defines the possible abi call signatures
 */
export type HebaChainProductHistorySig = keyof HebaChainProductHistory['methods']
/**
 * Defines an object containing all relevant parameters for a single call to the contract. Where TSignature is undefined, a bare call is made
 */
export type TypedCallParams<TSignature extends HebaChainProductHistorySig | undefined> = {
  method: TSignature
  methodArgs: TSignature extends undefined ? undefined : Array<ABIAppCallArg | undefined>
} & AppClientCallCoreParams & CoreAppCallArgs
/**
 * Defines the arguments required for a bare call
 */
export type BareCallArgs = Omit<RawAppCallArgs, keyof CoreAppCallArgs>
/**
 * Represents a History result as a struct
 */
export type History = {
  id: string
  productId: string
  location: string
  condition: string
  timestamp: bigint
}
/**
 * Converts the tuple representation of a History to the struct representation
 */
export function History([id, productId, location, condition, timestamp]: [string, string, string, string, bigint] ) {
  return {
    id,
    productId,
    location,
    condition,
    timestamp,
  }
}
/**
 * Maps a method signature from the HebaChainProductHistory smart contract to the method's arguments in either tuple of struct form
 */
export type MethodArgs<TSignature extends HebaChainProductHistorySig> = HebaChainProductHistory['methods'][TSignature]['argsObj' | 'argsTuple']
/**
 * Maps a method signature from the HebaChainProductHistory smart contract to the method's return type
 */
export type MethodReturn<TSignature extends HebaChainProductHistorySig> = HebaChainProductHistory['methods'][TSignature]['returns']

/**
 * A factory for available 'create' calls
 */
export type HebaChainProductHistoryCreateCalls = (typeof HebaChainProductHistoryCallFactory)['create']
/**
 * Defines supported create methods for this smart contract
 */
export type HebaChainProductHistoryCreateCallParams =
  | (TypedCallParams<undefined> & (OnCompleteNoOp))
/**
 * Defines arguments required for the deploy method.
 */
export type HebaChainProductHistoryDeployArgs = {
  deployTimeParams?: TealTemplateParams
  /**
   * A delegate which takes a create call factory and returns the create call params for this smart contract
   */
  createCall?: (callFactory: HebaChainProductHistoryCreateCalls) => HebaChainProductHistoryCreateCallParams
}


/**
 * Exposes methods for constructing all available smart contract calls
 */
export abstract class HebaChainProductHistoryCallFactory {
  /**
   * Gets available create call factories
   */
  static get create() {
    return {
      /**
       * Constructs a create call for the HebaChainProductHistory smart contract using a bare call
       *
       * @param params Any parameters for the call
       * @returns A TypedCallParams object for the call
       */
      bare(params: BareCallArgs & AppClientCallCoreParams & CoreAppCallArgs & AppClientCompilationParams & (OnCompleteNoOp) = {}) {
        return {
          method: undefined,
          methodArgs: undefined,
          ...params,
        }
      },
    }
  }

  /**
   * Constructs a no op call for the save_product_history(string,string,string,string)(string,string,string,string,uint64) ABI method
   *
   * @param args Any args for the contract call
   * @param params Any additional parameters for the call
   * @returns A TypedCallParams object for the call
   */
  static saveProductHistory(args: MethodArgs<'save_product_history(string,string,string,string)(string,string,string,string,uint64)'>, params: AppClientCallCoreParams & CoreAppCallArgs) {
    return {
      method: 'save_product_history(string,string,string,string)(string,string,string,string,uint64)' as const,
      methodArgs: Array.isArray(args) ? args : [args.historyId, args.productId, args.currentLocation, args.condition],
      ...params,
    }
  }
}

/**
 * A client to make calls to the HebaChainProductHistory smart contract
 */
export class HebaChainProductHistoryClient {
  /**
   * The underlying `ApplicationClient` for when you want to have more flexibility
   */
  public readonly appClient: ApplicationClient

  private readonly sender: SendTransactionFrom | undefined

  /**
   * Creates a new instance of `HebaChainProductHistoryClient`
   *
   * @param appDetails appDetails The details to identify the app to deploy
   * @param algod An algod client instance
   */
  constructor(appDetails: AppDetails, private algod: Algodv2) {
    this.sender = appDetails.sender
    this.appClient = algokit.getAppClient({
      ...appDetails,
      app: APP_SPEC
    }, algod)
  }

  /**
   * Checks for decode errors on the AppCallTransactionResult and maps the return value to the specified generic type
   *
   * @param result The AppCallTransactionResult to be mapped
   * @param returnValueFormatter An optional delegate to format the return value if required
   * @returns The smart contract response with an updated return value
   */
  protected mapReturnValue<TReturn, TResult extends AppCallTransactionResult = AppCallTransactionResult>(result: AppCallTransactionResult, returnValueFormatter?: (value: any) => TReturn): AppCallTransactionResultOfType<TReturn> & TResult {
    if(result.return?.decodeError) {
      throw result.return.decodeError
    }
    const returnValue = result.return?.returnValue !== undefined && returnValueFormatter !== undefined
      ? returnValueFormatter(result.return.returnValue)
      : result.return?.returnValue as TReturn | undefined
      return { ...result, return: returnValue } as AppCallTransactionResultOfType<TReturn> & TResult
  }

  /**
   * Calls the ABI method with the matching signature using an onCompletion code of NO_OP
   *
   * @param typedCallParams An object containing the method signature, args, and any other relevant parameters
   * @param returnValueFormatter An optional delegate which when provided will be used to map non-undefined return values to the target type
   * @returns The result of the smart contract call
   */
  public async call<TSignature extends keyof HebaChainProductHistory['methods']>(typedCallParams: TypedCallParams<TSignature>, returnValueFormatter?: (value: any) => MethodReturn<TSignature>) {
    return this.mapReturnValue<MethodReturn<TSignature>>(await this.appClient.call(typedCallParams), returnValueFormatter)
  }

  /**
   * Idempotently deploys the HebaChainProductHistory smart contract.
   *
   * @param params The arguments for the contract calls and any additional parameters for the call
   * @returns The deployment result
   */
  public deploy(params: HebaChainProductHistoryDeployArgs & AppClientDeployCoreParams & IncludeSchema = {}): ReturnType<ApplicationClient['deploy']> {
    const createArgs = params.createCall?.(HebaChainProductHistoryCallFactory.create)
    return this.appClient.deploy({
      ...params,
      createArgs,
      createOnCompleteAction: createArgs?.onCompleteAction,
    })
  }

  /**
   * Gets available create methods
   */
  public get create() {
    const $this = this
    return {
      /**
       * Creates a new instance of the HebaChainProductHistory smart contract using a bare call.
       *
       * @param args The arguments for the bare call
       * @returns The create result
       */
      async bare(args: BareCallArgs & AppClientCallCoreParams & AppClientCompilationParams & IncludeSchema & CoreAppCallArgs & (OnCompleteNoOp) = {}) {
        return $this.mapReturnValue<undefined, AppCreateCallTransactionResult>(await $this.appClient.create(args))
      },
    }
  }

  /**
   * Makes a clear_state call to an existing instance of the HebaChainProductHistory smart contract.
   *
   * @param args The arguments for the bare call
   * @returns The clear_state result
   */
  public clearState(args: BareCallArgs & AppClientCallCoreParams & CoreAppCallArgs = {}) {
    return this.appClient.clearState(args)
  }

  /**
   * Calls the save_product_history(string,string,string,string)(string,string,string,string,uint64) ABI method.
   *
   * @param args The arguments for the contract call
   * @param params Any additional parameters for the call
   * @returns The result of the call
   */
  public saveProductHistory(args: MethodArgs<'save_product_history(string,string,string,string)(string,string,string,string,uint64)'>, params: AppClientCallCoreParams & CoreAppCallArgs = {}) {
    return this.call(HebaChainProductHistoryCallFactory.saveProductHistory(args, params), History)
  }

  public compose(): HebaChainProductHistoryComposer {
    const client = this
    const atc = new AtomicTransactionComposer()
    let promiseChain:Promise<unknown> = Promise.resolve()
    const resultMappers: Array<undefined | ((x: any) => any)> = []
    return {
      saveProductHistory(args: MethodArgs<'save_product_history(string,string,string,string)(string,string,string,string,uint64)'>, params?: AppClientComposeCallCoreParams & CoreAppCallArgs) {
        promiseChain = promiseChain.then(() => client.saveProductHistory(args, {...params, sendParams: {...params?.sendParams, skipSending: true, atc}}))
        resultMappers.push(History)
        return this
      },
      clearState(args?: BareCallArgs & AppClientComposeCallCoreParams & CoreAppCallArgs) {
        promiseChain = promiseChain.then(() => client.clearState({...args, sendParams: {...args?.sendParams, skipSending: true, atc}}))
        resultMappers.push(undefined)
        return this
      },
      addTransaction(txn: TransactionWithSigner | TransactionToSign | Transaction | Promise<SendTransactionResult>, defaultSender?: SendTransactionFrom) {
        promiseChain = promiseChain.then(async () => atc.addTransaction(await algokit.getTransactionWithSigner(txn, defaultSender ?? client.sender)))
        return this
      },
      async atc() {
        await promiseChain
        return atc
      },
      async simulate(options?: SimulateOptions) {
        await promiseChain
        const result = await atc.simulate(client.algod, new modelsv2.SimulateRequest({ txnGroups: [], ...options }))
        return {
          ...result,
          returns: result.methodResults?.map((val, i) => resultMappers[i] !== undefined ? resultMappers[i]!(val.returnValue) : val.returnValue)
        }
      },
      async execute(sendParams?: AppClientComposeExecuteParams) {
        await promiseChain
        const result = await algokit.sendAtomicTransactionComposer({ atc, sendParams }, client.algod)
        return {
          ...result,
          returns: result.returns?.map((val, i) => resultMappers[i] !== undefined ? resultMappers[i]!(val.returnValue) : val.returnValue)
        }
      }
    } as unknown as HebaChainProductHistoryComposer
  }
}
export type HebaChainProductHistoryComposer<TReturns extends [...any[]] = []> = {
  /**
   * Calls the save_product_history(string,string,string,string)(string,string,string,string,uint64) ABI method.
   *
   * @param args The arguments for the contract call
   * @param params Any additional parameters for the call
   * @returns The typed transaction composer so you can fluently chain multiple calls or call execute to execute all queued up transactions
   */
  saveProductHistory(args: MethodArgs<'save_product_history(string,string,string,string)(string,string,string,string,uint64)'>, params?: AppClientComposeCallCoreParams & CoreAppCallArgs): HebaChainProductHistoryComposer<[...TReturns, MethodReturn<'save_product_history(string,string,string,string)(string,string,string,string,uint64)'>]>

  /**
   * Makes a clear_state call to an existing instance of the HebaChainProductHistory smart contract.
   *
   * @param args The arguments for the bare call
   * @returns The typed transaction composer so you can fluently chain multiple calls or call execute to execute all queued up transactions
   */
  clearState(args?: BareCallArgs & AppClientComposeCallCoreParams & CoreAppCallArgs): HebaChainProductHistoryComposer<[...TReturns, undefined]>

  /**
   * Adds a transaction to the composer
   *
   * @param txn One of: A TransactionWithSigner object (returned as is), a TransactionToSign object (signer is obtained from the signer property), a Transaction object (signer is extracted from the defaultSender parameter), an async SendTransactionResult returned by one of algokit utils helpers (signer is obtained from the defaultSender parameter)
   * @param defaultSender The default sender to be used to obtain a signer where the object provided to the transaction parameter does not include a signer.
   */
  addTransaction(txn: TransactionWithSigner | TransactionToSign | Transaction | Promise<SendTransactionResult>, defaultSender?: SendTransactionFrom): HebaChainProductHistoryComposer<TReturns>
  /**
   * Returns the underlying AtomicTransactionComposer instance
   */
  atc(): Promise<AtomicTransactionComposer>
  /**
   * Simulates the transaction group and returns the result
   */
  simulate(options?: SimulateOptions): Promise<HebaChainProductHistoryComposerSimulateResult<TReturns>>
  /**
   * Executes the transaction group and returns the results
   */
  execute(sendParams?: AppClientComposeExecuteParams): Promise<HebaChainProductHistoryComposerResults<TReturns>>
}
export type SimulateOptions = Omit<ConstructorParameters<typeof modelsv2.SimulateRequest>[0], 'txnGroups'>
export type HebaChainProductHistoryComposerSimulateResult<TReturns extends [...any[]]> = {
  returns: TReturns
  methodResults: ABIResult[]
  simulateResponse: modelsv2.SimulateResponse
}
export type HebaChainProductHistoryComposerResults<TReturns extends [...any[]]> = {
  returns: TReturns
  groupId: string
  txIds: string[]
  transactions: Transaction[]
}
