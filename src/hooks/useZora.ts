import { ZDK } from "@zoralabs/zdk";

const API_ENDPOINT = "https://api.zora.co/graphql";
const zdk = new ZDK({
  endpoint: API_ENDPOINT,
}); // Defaults to Ethereum Mainnet

export const useZora = () => {
  return { zdk };
};
