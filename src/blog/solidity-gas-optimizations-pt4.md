---
layout: 'layouts/blogpost.html'
title: 'Solidity Gas Optimizations pt.4 - Efficient Strings'
tags: ['tutorial']
topics: ['cryptocurrency', 'software']
date: '2022-04-17'
meta:
  desc: "How to save gas by writing efficiently managed solidity code"
  has_code: true
intro:
  title: 'Solidity Gas Optimizations pt.4 - Efficient Strings'
  text: 'Understand how the EVM encodes strings to get more efficient code.'
---
In the previous lesson, we saw a bit about how the solidty compiler and the EVM stores data in 32 byte 'buckets' or 'slots'. This applies to every operation that deals with storage. This can come in handy when dealing with strings, specially when using `revert()` or `require()`.

## What is a String?
In the Solidity Documentation we can see that:

Variables of type bytes and string are special arrays. The bytes type is similar to bytes1[], but it is packed tightly in calldata and memory. string is equal to bytes but does not allow length or index access.

Basically, strings are arrays of UTF-8 characters, and arrays are basically a fixed length sequence of storage slots located next to each other. Therefore, like everything else we need to think in terms of storage buckets

## How to use this to our advantage
This means that when we compile our contracts, we would prefer to use a single slot for the strings we use.

Each character in a string is a UTF-8 Encoded byte, meaning that your strings can be up to 32 characters in length if you do not use specially encoded characters like emojis to be contained in a single storage slot.

>__A Note About UTF-8__
>UTF encoding is a standard for how computers represent each character in a language. All the standard English characters take up one byte, but things get a bit more difficult when we start with characters like 💩 which takes up 4 bytes (64 bits).
>Here's a great resource to look up how many bytes a string takes up under [UTF-8 Encoding.](https://mothereff.in/byte-counter)

So basically, when we can use this everywhere for example in revert statements, we can think of how to make these messages fit in multiples of 32 bytes.

So instead of having this:

```solidity
// 40 bytes or two slots
revert(condition, "User has insufficient funds for transfer")
Consider having this:
//32 bytes or one slot
revert(condition, "Insufficient funds for transfer.")
```
Again, sometimes being verbose is better for everyone to know what is happening, so consider the tradeoffs. This works best when an extra character can add a considerable expense of a function call.

[Some further reading on UTF-8 characters](https://blog.hubspot.com/website/what-is-utf-8)