
// Request the accounts from the available wallet. This will initiate a prompt if the site isn't connected.
// Errors if no account is available.
// @return {account} The Ethereum account we are logging into.
export function getAccount() {
  return window.ethereum
    .request({method: "eth_requestAccounts"})
    .then(accounts => {
      if (accounts.length === 0) {
        throw new Error("No wallet available");
      }
      return accounts[0];
    });
}

// Sign the data using the available wallet. This will initiate a prompt.
// Throws an error if signature fails for whatever reason.
// @param {account} the Ethereum account to request a nonce for.
// @param {message} the structured typed data we are signing to prove we own the account.
// @return {signature} the signature of {account} signing {message}
export function signTypedMessage([account, message]) {
  return window.ethereum.request(
    {
      method: "eth_signTypedData_v4",
      params: [account, message],
      account: account,
    },
    (err, result) => {
      if (err) throw err;
      if (result.error) throw new Error(result.err);
      return result.result
    });
}
