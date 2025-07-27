---
layout: 'layouts/blogpost.html'
title: 'Creating a Visual Representation of a Hash'
tags: []
topics: ['frontend', 'technology', 'cryptography']
date: '2023-04-09'
draft: true
meta:
  desc: "Using SVGs to provide a visual fingerprint of data"
  has_code: true
intro:
  text: "How to give hash based identifiers a human understandable visual representation."
---
Hashing information is an often used digital fingerprinting technique. Given the same **pre-image** (bit of information) is passed to the same hash function, you should always get the same output. That is always the case. You can try this by updating the text in this box. If you put the words, `Give Javier a raise!` on the box, it will always render the following hash output <span class="break-all p-1 bg-slate-100 font-mono text-sm">7574fdf5aa8456826745babea036f43079f5950220f63ee2973a3d73161ae468</span>. 
Try changing the preimage below:
{% render "partials/components/hash-input.liquid"  preimage: 'Give Javier a raise!' %}

The four properties of a good hashing function are: 
1. Same input provides same output.
1. Output is fixed length
1. Easy to compute the hash (easy to verify) but hard to compute in reverse. (Given a hash it should be impossibly hard to compute the preimage)
1. Collision resistant. It should be impossibly difficult to find two different pieces of data that have the same hash.
1. Small variations in the input data output wildly different results  
  
Given these conditions, we can assume that a hash function is a good way to get a sort of digital fingerprint of data. If you change any bit of data, of the preimage, the output will make it evident it has been tampered. We actually use this all the time in software development, and because the hashing function is easy to compute (your browser did so in milliseconds for this blog post) systems use it to verify information constantly. One such uses is cryptocurrency addresses, or another is creating an identity in Nostr.

## The Problem With Differentiating Hashes

It is not easy for humans to find differences in strings of 64 character lengths. Usually we abbreviate and use some of the first or the last characters like this: `757...e468`. Of course, a lot of information gets lost. For systems like Nostr where identity verification is completely exogenous to the protocol, and anyone can take someone's photo and use it as their profile pic, this is particularly dangerous. Take the issue of Jack Dorsey (who is a regular Nostr user). He hangs out and shitposts and is easy to impersonate. Link to his profile picture, call yourself the same nickname, register your identity through cashap or cahsapp. Becuase hashes are EXTREMELY cheap to create and public private keypairs are basically hashes, nostr is ripe for this kind of impersonation. 

Another reason you might want to use hashes is to verify data. Say you're downloading software from a site that you don't know, (for example through a mirror). If you trust the developers you just have to make sure that the hash they provided is the same as the hash of your download. 

The basic crux is this, fingerprints need to be differentiable. 

## Potential Solutions

So here is my proposal, focused on platforms that use hash based identifiers. Given that a hash in the end of the day is **just a long number in hexadecimal notation** you can just split the hex value into equal lengths, and have each length represent a color in hex notation.

{% render "partials/components/hash-input.liquid"  preimage: 'Color coat this hash', color: true %}

Now, by changing the value in the input box you can see a more visual hash, and more importantly, this information is easier to commit to memory than a string of numbers and letters. Granted, there is more ambiguity because the hues of the colors are more subtle, but this type of visual fingerprinting can be used to garner enough information as to whether the hash is what you expect. It is *extremely* difficult to produce a hash that looks similar.

## Let's give an example:

In Nostr, your identity is represented by a unique hash. This brings up a significant impersonation problem. Much like i.p. addresses or bitcoin addresses, strings of letters and numbers are HARD to keep straight. I wrote this simple script that can generate a 'fingerprint' in a way that can be rendered by clients. You can imagine a social media app that renders a profile image with a fingerprint surrounding it.


{% render "partials/components/hash-input.liquid"  preimage: 'Color coat this hash', svg: true %}

So that is all I have for now. I do believe that client developers should implement something like this in Nostr. I kept it simple and have the code free for anyone to use in my [github](https://github.com/javier123454321/blog/tree/main/src/_includes/partials/components/hash-input.liquid). Give me a shout out if you use it in your client. Also, [connect with me on Nostr](https://coracle.social/people/npub1964kxje857qs0jv9nx5c9pymfacuvpf3dj85n9yxr7pac4ja7hyq65hftf/notes) if you want to get in touch. 
