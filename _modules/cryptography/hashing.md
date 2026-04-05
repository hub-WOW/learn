## 2.2. Hashing
Unreversible. Used to verify if a file has been modified. Doesn't prevent the file to be modified, but tells whether it is authentic or not.

- $code = \text{hash}(content, key)$
- There is no unhash function.

### 2.2.1. Fast Hashing
- Not secure, but allows for generating several thousand hashes per second.
- Used to verify if a file is corrupted or modified (e.g., SHA-256, SHA-512).

### 2.2.2. Slow Hashing
- Very secure because it is slow, taking milliseconds to seconds, preventing brute force.
- Used for generating secure encryption keys via iterations.
- **Standard Iterations:**
    - 600k+: Industry Standard.
    - 1M+: Extreme security.
- Examples: KDF2, Argon2 (Best). Argon2 allows setting memory caps (e.g., 64MB) to make guessing $2^{16}$ keys require 4TB of RAM.
