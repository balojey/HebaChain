import React, { useEffect, useState } from 'react';
import { useWallet } from '@txnlab/use-wallet'
import { useMemo } from 'react'
import { ellipseAddress } from '../utils/ellipseAddress'
import { getAlgodConfigFromViteEnvironment } from '../utils/network/getAlgoClientConfigs'

const Account: React.FC = () => {
    const { activeAddress, getAccountInfo } = useWallet()
    const algoConfig = getAlgodConfigFromViteEnvironment()
    const [balance, setBalance] = useState<Number>(0)

    const networkName = useMemo(() => {
      return algoConfig.network === '' ? 'localnet' : algoConfig.network.toLocaleLowerCase()
    }, [algoConfig.network])

    useEffect(() => {
      const data = getAccountInfo()
      setBalance(data.amount)
    }, [1000])

    return (
        <div className='flex flex-col gap-16 p-8'>
            <div>
                {activeAddress ? (
                    <div className='flex gap-3 bg-white'>
                        <div className='walletBalance font-bold text-white'>
                            {balance &&
                            <div className='center flex-col gap-4'>
                                <p>
                                    Wallet Balance
                                </p>
                                <p className='text-md'>
                                    {balance} {"ALGO"}

                                </p>
                            </div>
                            }
                        </div>
                        <div className='ml-10 my-auto font-medium flex-col flex gap-4'>
                            <p className=''>
                                Check your wallet balance and copy your wallet address here
                            </p>
                            <div className='text-[.9rem] flex gap-2 p-2 bg-[#F1F6FF] '>
                                <div>
                                    Connected Wallet Address: {activeAddress}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h1 className='font-bold text-md'>
                            Wallet not connected
                        </h1>
                        <p className='text-sm'>
                            Get started by connecting your wallet first
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Account;
