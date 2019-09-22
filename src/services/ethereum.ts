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
}

export default new EthereumService();
