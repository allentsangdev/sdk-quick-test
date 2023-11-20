# Unit Tests Repository

This repository contains unit tests for [ludex-js-sdk](https://github.com/Ludex-Labs/ludex-sdk-js/tree/feature/zodParsingTypes), written using Mocha and Chai.

## Getting Started

To run the unit tests locally, follow the steps below:

### 1. Install Dependencies

```shell
npm install
```

### 2. Set Up Environment Variables
Create a ```.env``` file at the project root by following the structure in ```.env.sample```. Make sure to fill in the necessary values for your environment variables and **DO NOT** run test against the Production API by making sure ```LUDEX_PROTOCOL_API``` is pointing to staging API

### 3. Run Unit Tests
``` bash
# Run all tests
npm run test 

# Run individual tests
npm run test_apiClient
npm run test_challenge
npm run test_client
npm run test_payout
npm run test_vault
npm run test_types
```
