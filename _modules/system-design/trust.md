# Data Integrity & Trust

To implement cryptography into a system, remember: **the server NEVER knows what content is put in by the user. It doesn't have any sensitive raw data, no decryption keys, no encryption keys, no plaintext.**

## Basic System with Encryption

### Client Side Validation
- *Problem*: Simple passwords can be guessed.
- *Solution*: Use KDF2 or Argon2 to hash the password into a **master key** (KEK - Key Encrypting Key).
- $masterKey = \text{Argon2}(\text{ConstantValue}, \text{password})$
- *Problem*: Patterns can be observed easily by an attacker
- *Solution*: Add a **salt** (random string, e.g., 96 bits) and **iterations** to add extreme randomness.
- $\text{hash}(\text{salt}, \text{password}, \text{content}, \text{iterations}) = \text{hash}(\text{salt}, \dots)$
- *Safety*: Never reuse the same salt with the same key. All changes should be together in an instant (atomic), to prevent partial writes, which can lock out users.

### Content Encryption
- *Rule*: Don't encrypt identifiers (userID, timestamp, etc.) to avoid backend complexity.
- *Nonce*: Use a **Nonce** (Number used once) for every encryption to add diversity.
```python
password = userInput()
masterSalt = generateSalt()
iterations = 1000000
masterKey = hash(password, salt, iterations)

content = "Hello World"
nonce = generateNonce()
key = generateKey()
ciphertext = encrypt(content, nonce, key)

# Encrypt Key using MasterKey
safeKey = encrypt(key, masterNonce, masterKey)
```

### Payload Delivery
- The plaintext data *ONLY* stays on the client. Only encrypted data goes to the server.
```java
class EncryptedVariable {
  private final byte[] salt;
  private final byte[] nonce;
  private final byte[] encryptedKey;
  private final byte[] content;
}
```


### Backend and Database Handling
- The server stores the payload and allows clients to fetch it by identifiers. The server cannot read the data.

### Accessing the Content
- The client fetches the payload, decrypts the individual keys using the master key, and then decrypts the content.
- If the data needs to be sorted, then the server *can not* sort it, and the client has to do it. 

## Add-ons to the System
- *Authentication*: authKey can be encrypted to reduce compute. This is generally done in most codebases..
- *P2P* (Peer to Peer): In case of chatting or similar apps, use asymmetric encryption.
- *Double Encryption*: Encrypt the entire JSON payload on top for extra safety. Is it needed? No. Why? Because HTTPS has TLS (Transport Layer Security) which does the same thing, but is far more reliable and secure as it uses a mix of asymmetric and symmetric encryption for perfect speed and security.
