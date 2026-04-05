# 1. What is this *cryptography* thing?

- It's just a mathematical way to secure, verify content with **extremely high levels** of entropy (randomness).
- Modern Cryptography uses usually 192 bits or higher encryption, making it absurdly secure.
- Encryption = Making it into secret code. Decryption:
- What do the *bits* mean? Well, in computer science, we use binary which is base 2. ON or OFF, 1 or 0, True or False. You have 2 choices in a bit, so if you want to find all unique combinations of a 256 digit binary number, you would have $2\times{2}\times{2}\times{2}\times{}..$. Which will get the number $2^{256}$ or roughly $1.1579\times{10^{77}}$ which is a number so giant that if you wanted to predict a number from 0, it would take **10 trillion supercomputers each doing 10 trillion number checks per second running for roughly $3.7 \times 10^{43}$ years, which is $2.7\times{10^{33}}$ times longer than the age of the universe.** Just to find the number.
- You don't need to go down into the rabbit hole to learn how this stuff works. Just use it. It is not worth any time to learn this, unless you are going really going to benefit from it.

# 2. Technical Details

There are 2 types of cryptography you are ever going to need in your life. Encryption and Hashing.

## 2.1. Encryption
Reversible. Basically adding a lock to data using a key, which turns it into random garble, and can only be unlocked by the same or another key.

- **Encryption**: Making normal plaintext into complex code.
  $Ciphertext = \text{Encrypt}(Content, Key_{\text{encryption}})$
- **Decryption**: Decoding the complex shit into it's original stuff.
  $Content= \text{Decrypt}(Ciphertext, Key_\text{decryption})$

### 2.1.1. Symmetric Encryption
- The encryption key is same as decryption key. Just common sense.
- Most popular algorithm is AES256-GCM. It is 256 bit encryption, with a *128bit GCM tag*. A GCM tag allows for the algorithm to verify whether decryption was successful. It is very fast and can allow multiple encryptions and decryptions per second.

### 2.1.2. Asymmetric Encryption
- The encryption key is not the same as decryption key. This uses *very large prime numbers using RSA.*
- The encryption key and decryption key are mathematically related. But it is near impossible to derive the other key from a single key due to properties of large prime numbers.
- Encryption Key has enough information to encrypt the data but not enough to decrypt it. That's why encryption key is known as **public key**, and decryption key is known as **private key**.

**The Process (Simplified RSA):**
1. Get 2 VERY Large Prime Numbers named 'p' and 'q'
2. $n = p \times{q}$ (n is usually 2048 bits)
3. $e$ is the public exponent (usually 65537)
4. $cipher = content^{e} \pmod{n}$
5. $key_{public} = (n,e)$

**Finding Private Key:**
1. $\theta(n) = (p-1)(q-1)$
2. $e \times{d} \pmod{\theta(n)} = 1$
3. $key_{private} = (n,d)$
4. $content = ciphertext^{d} \pmod{n}$

Modern systems also use **Elliptic Curve Cryptography** (e.g., Ed25519) which is very secure.
