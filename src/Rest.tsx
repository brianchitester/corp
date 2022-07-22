import React, { useEffect, useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, TokenAccountsFilter } from '@solana/web3.js';


function Rest() {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [hasCorpTokens, setHasCorpTokens] = useState(false);

  const getResult = async (publicKey: PublicKey) => {
    const corpTokens = ['GBGLvZDqRGMviomCvvrq2eyMQX49XrA6WXEB6qmqQF36', '4GyqVhY2fEWSFmHxkUDwVbacWcAYYqpuHqMDBQLcjJ5R', 'HCPECyL9rySiNHaFNeBermwv9WhDedaChtvEFn2BHFvf']
    const filters: TokenAccountsFilter[] = corpTokens.map((token) => {
      return {
        mint: new PublicKey(token),
      }
    })

    return await Promise.all(
      filters.map((filter) => {
        return connection.getTokenAccountsByOwner(
          publicKey,
          filter
        );
      })
    ) 
  }

  useEffect(() => {
    if (publicKey) {
      getResult(publicKey).then((res) => {
        console.log(res)
        return setHasCorpTokens(res.some((tokenResult) => tokenResult.value.length > 0))
      })
    }
  }, [publicKey])

  return (
    <div>
      {hasCorpTokens ? <div>Were in business</div> : <div>Were not in business</div> }
    </div>
  );
}

export default Rest;
