export function solanaAvailable() {
  return typeof(window.solana) === 'object';
}

export function connect() {
  return window.solana.connect().then(response => response.publicKey.toString());
}

export function signMessage(message) {
  let encodedMessage = new TextEncoder().encode(message);
  return window.solana.request({
    method: "signMessage",
    params: {
      message: encodedMessage,
      display: "utf8",
    }
  })
}
