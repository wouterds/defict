import Web3 from 'web3';

class EthereumService {
  private web3 = new Web3(
    `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
  );

  public walletBalance = async (address: string): Promise<string | null> => {
    const balance = await this.web3.eth.getBalance(address);

    if (balance) {
      return this.web3.utils.fromWei(balance, 'ether');
    }

    return null;
  };

  public isValidAddress = (address: string): boolean => {
    return this.web3.utils.isAddress(address);
  };

  /**
   * Get block number by date
   * Inspired by https://github.com/ethfinex/efx-trustless-vol/blob/master/src/lib/getBlockByTime.js
   */
  public getBlockNumberByDate = async (date: Date): Promise<number> => {
    const ts = date.getTime() / 1000;

    // decreasing average block size will decrease precision and also decrease
    // the amount of requests made in order to find the closest block
    const averageBlockTime = 17 * 1.5;

    const currentBlockNumber = await this.web3.eth.getBlockNumber();
    let block = await this.web3.eth.getBlock(currentBlockNumber);

    let blockNumber = currentBlockNumber;

    while (block.timestamp > ts) {
      const decreaseBlocks = parseInt(
        `${(block.timestamp - ts) / averageBlockTime}`,
      );

      if (decreaseBlocks < 1) {
        break;
      }

      blockNumber -= decreaseBlocks;

      block = await this.web3.eth.getBlock(blockNumber);
    }

    return block.number;
  };
}

export default new EthereumService();
