---
layout: 'layouts/blogpost.html'
title: 'Solidity Gas Optimizations pt.1 - Memory vs Storage'
tags: ['tutorial']
topics: ['cryptocurrency', 'software']
date: '2021-09-21'
meta:
  desc: "How to save gas by writing efficiently managed solidity code"
  has_code: true
intro:
  title: 'Solidity Gas Optimizations pt.1 - Memory vs Storage'
  text: 'How to differentiate between memory and storage in order to save money on gas while writing solidity.'
---
## Building on a blockchain
If you are familiar with a language like JavaScript, you tend to never think about how your variable is stored, except to deal with the scope of the variable. When you are making programs to run on a distributed system like a blockchain, you have to think about things a bit differently.

Solidity works as a compiled language where each operation gets converted to a lower level opco which the EVM can understand and interpret. Then, every operation that you write on your program gets executed on every computer in the network, which is why every operation costs 'gas' to prevent spamming and more importantly, infinite loops. In solidity, getting to know the machine readable operations and their associated cost literally saves you money.

So let's take an example:

```solidity
uint256 percentage = 30;
function splitAmountToOwnerAndSeller(uint256 amount)
    internal
    view
    returns (uint256 amountForSender, uint256 amountForOwner)
{
    amountForSender = (amount * (100 - percentage)) / 100;
    amountForOwner = (amount * percentage) / 100;
}
```

This functions calculates how much ether should go to the owner and to the seller of an item. The owner gets a percentage defined by the storage variable called percentage. If we break it down into how this works, you actually need to read from the storage variable twice. In some languages that might not be a problem, however if you understand how data is stored on the blockchain, you would realize that reading the variable for amount is an in-memory operation, while reading the variable percentage is a storage operation. It is a different assembly code.

## EVM Assembly
Whenever you read the variable percentage you are getting data from the blockchain database (A network of computers that each have to validate that piece of data), and this is done through an opco called SLOAD which according to the Ethereum Yellow Paper costs 800 gas to execute:

<div class="flex justify-center">
    <img src="/images/sgo1.png" alt="A snapshot of the Ethereum yellow paper">
</div>

Because you do this twice, you would end up spending 1600 gas on reading this variable. To combat that, you could always store the object in memory, and load it from there, which is much cheaper (around 3 gas). So what you could do is write from storage to memory once (SLOAD + MSTORE) = 803 gas, then read the memory variable twice (MLOAD + MLOAD) = 6 gas, for an almost 50% gas reduction for that transaction (1).

So, the code would look like this:

```solidity
uint256 percentage = 30;
function splitAmountToOwnerAndSeller(uint256 amount) internal view returns (uint256 amountForSender, uint256 amountForOwner)
{
    uint256 ownerPercentage = percentage;
    amountForSender = (amount * (100 - ownerPercentage)) / 100;
    amountForOwner = (amount * ownerPercentage) / 100;
}
```

This is especially necessary when you are dealing with loops that read from state regularly, always cast a state variable to memory before entering a loop.

### NOTES:

(1) Thanks to user CPlusPlusDeveloper in reddit for pointing out that this is not entirely true, ever since EIP-2929 the first SLOAD operation costs 2100 gas, but once that memory is read, it is cached and considered considered warm, which has a cost of 100 gas to load again. It would still save gas to load and retrieve that variable in memory, especially if read more than twice.