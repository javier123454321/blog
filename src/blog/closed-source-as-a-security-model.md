---
layout: 'layouts/blogpost.html'
title: 'Closed Source is a Business Decision, not Security.'
tags: ['main', 'tech', 'ai']
topics: ['artificial intelligence']
date: '2026-04-17'
meta:
  desc: "Cal.com claims that moving to closed source is a security decision. It is not."
intro:
  text: "What used to be a human-scale problem—finding and fixing vulnerabilities is becoming a compute-scale race between attackers and defenders."
---
After Anthropics Mythos rollout, conversation began brewing around the new era of software security. It seems increasingly true that, given enough compute, these models *will* find vulnerabilities when pointed at a codebase. This seems different than hiring a security team, which is also expensive. Given these assumptions, what is the right tradeoff to consider? 
There are two approaches brewing right now, [treating cyber as proof of work](https://www.dbreunig.com/2026/04/14/cybersecurity-is-proof-of-work-now.html/) or [going closed source to protect your security profile.](https://cal.com/blog/cal-com-goes-closed-source-why) which is just a version of ['Security by Obscurity'](https://www.okta.com/identity-101/security-through-obscurity/) and it is just as bad of an idea as it's ever been. 

What is actually happening is that frontier models are increasing the available search space for vulnerabilities, and automating the task of running it. And the actual question is the practical tradeoff is between **attacker cost** and **defender cost**. If open code meaningfully helps attackers automate finding exploits faster than your team can remediate them, then limiting exposure may buy time; but if the dominant risk comes from implementation flaws, weak auth, missing controls, or poor operational hygiene, then closing the source does little while also reducing external review. 

Put bluntly, the Cal argument can be interpreted as: “Our code has vulnerabilities we don’t want to patch quickly, so we’re adding a thin layer of obfuscation”.

As a practical counter example, consider OpenClaw. It was flooded with vulnerability reports as soon as it gained traction. That surge has since subsided, and the most serious issues appear to have been fixed. But it may simply have been the [first public example of facing the firehose of LLM-driven vulnerability scanning](https://x.com/steipete/status/2044888081141223442).

The calculus is simple, discovery + execution cost + remediation cost in the defensive side vs discovery and execution in the attacking side.

Being open changes these variables:
- Decreases discovery cost for attacker some amount **X**.
- Decreases discovery cost for the defender side some amount **Y**.
- Decreases remediation cost some amount **Z**.

Is **Y + Z > X**? If you assume that more eyes means that not only you are funding the discovery then the answer is likely yes. Then there is the issue of time that the vulnerability exists, which makes the probability of finding it higher.
I'm not an open source maximalist, and there are plenty of reasons to protect your IP, but to frame this business decision as a security move seems disingenuous to me. It does not work like that.

