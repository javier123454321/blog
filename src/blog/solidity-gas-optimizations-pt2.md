---
layout: 'layouts/blogpost-code.html'
title: 'Solidity Gas Optimizations pt.2 - Constants'
tags: ['tutorial']
topics: ['cryptocurrency', 'software']
date: '2021-09-29'
meta:
  desc: "How to save gas by writing efficiently managed solidity code"
intro:
  title: 'Solidity Gas Optimizations pt.2 - Constants'
  description: 'How to use constants to get a more efficient smart contract.'
---
## Variables in the blockchain
Storing variables in memory, on a normal computer, is easy and cheap. However, blockchains are distributed systems, in which every node - or computer - has to store the data locally. That makes storing data expensive, this behavior is discouraged except where necessary.

## SSTORE and SLOAD

These are two of the more expensive OPCOs in the EVM for the reason outlined above. In my previous post I talk a bit about the gas cost of loading from storage using SLOAD, and why it is better to use MLOAD instead when possible.

However, there are times that you need to instantiate a variable on creation or deployment and do not expect that variable to change. In these cases, you can use a constant or immutable modifier which will let the solidity compiler know about the future of that variable. Let's take an example simplified contract:

```solidity
contract Token {
    uint8 VERSION = 1;
    uint256 decimals;
    constructor(uint256 val) {
      decimals = val;
    }
}
```
The decimals variable in the contract is only there for display purposes in the frontend, ERC20 tokens don't actually have a concept of 'decimals'. This means that it does not use it, it is only for users of the contract to know how to format outputs. This also means that the variable should not change. To indicate that it should not change, we have two options, constant or immutable. According to the docs:

The compiler does not reserve a storage slot for these variables, and every occurrence is replaced by the respective value.

Constant variables are replaced at compile time by their values, while immutable variables are replaced at deployment time. Either way, we avoid the annoying fees required with doing an SLOAD operation.

One simple fix looks like :

```solidity
contract Token {
    uint8 constant VERSION = 1;
    uint256 immutable decimals;
    constructor(uint256 val) {
      decimals = val;
    }
}
```

One small caveat to note is that constant variables cannot make reference to the state of the blockchain. You cannot do something like:

```
uint256 constant VERSION = block.number
```

or things to do with context generally, like `block.timestamp`, `address(this).balance` or `block.number` `msg.value` or `gasleft()` nor call external contracts.

Immutable variables however, are fine to do so.