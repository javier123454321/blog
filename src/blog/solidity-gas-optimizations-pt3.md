---
layout: 'layouts/blogpost.html'
title: 'Solidity Gas Optimizations pt.3 - Packing Structs'
tags: ['tutorial']
topics: ['cryptocurrency', 'software']
date: '2021-10-03'
meta:
  desc: "How to save gas by writing efficiently managed solidity code"
  has_code: true
intro:
  title: 'Solidity Gas Optimizations pt.3 - Packing Structs'
  description: 'Understand how the EVM stores information in order to store it more efficiently.'
---
So now that we've looked at some of the basics of assembly reads and writes memory, we can begin to look at how that memory is actually stored on each node. Everytime we make a variable in our solidity code, the evm stores it in a storage slot of 32 bytes (256 bits). That means that every time we have a uint (which is read as a uint256) we have packed a storage slot fully.

So lets look at some code:
```
    uint128 a;
    uint256 b;
    uint128 c;
```
What the evm does is try to fit everything into storage slots sequentially, but since variable b takes up an entire slot, it cannot fit in in the first one and needs to allocate a total of 3 32byte slots. If you instead order them so that the two smaller slots are next to each other, you can save one such storage operation. A more efficient code would look like this:
```
    uint128 a;
    uint128 c;
    uint256 b;
```

That would allow for the EVM to only need to allocate two storage slots and 'pack' your variables.

Variable types
Now let's look at the size of some common data types in Solidity:

__uint256__ is 32 bytes
__uint128__ is 16 bytes
__uint64__ is 8 bytes
__address__ (and address payable) is 20 bytes
__bool__ is 1 byte
__string__ is usually one byte per character

You can further break down a uint into different sizes, uint8, uint16, uint32... just keep in mind that your integer will overflow if you are using solidity version < 0.8.0 or your function will fail if you are using version > 0.8.0.

The largest number is calculated as 2^(number of bits) - 1, meaning uint8 goes up to ((2^8) - 1) = 255 before your function fails.

I suggest keeping these in mind when you are designing structs.

Disclaimers
A few small caveats, this only works when you are using Structs (custom data objects) and/or declaring variables in your contract storage. Function arguments use memory which does not work in this way. 

 Also, if you will not be packing your structs this way, it actually can be more expensive to use a datatype which is smaller than the 32byte limit! So if you have something like
 
```
    uint8 a;
    uint256 b;
```

It will be cheaper to make both variables uint256! Counter intuitive, I know! 

The reason for this is that the EVM reads 32 bytes at a time and will have to do some operations to make the data it is reading go down to 8 bits (1 byte) which is counter productive. Lastly, this only really applies when you are doing multiple read and writes to the same struct or storage slot in the same operation.

When you are writing code, you don't always want to optimize for efficiency, but for developer productivity and readability. Sometimes, it might be OK to do slightly less efficient code if it makes the project easier to maintain. 

We will leave this here, stay tuned for part 4!