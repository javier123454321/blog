---
layout: 'layouts/blogpost.html'
title: 'The Assumption Problem'
tags: ['main', 'tech', 'ai']
topics: ['artificial intelligence']
date: '2026-09-20'
meta:
  desc: "On the limits of long running agents: low resolution prompts, filled in assumptions, and why thorough planning still matters."
intro:
  text: "I have been working on the Wiser Learning app through a couple of rewrites. I want to talk about the limit that I am seeing with long running agents."
---

## Long Running Agents and the Assumption Problem

Going into AI, I first wrote about the first time I gave a long running task to an agent and saw success with it.

I wrote about creating a lever and harness that can execute long running instructions in a more deterministic way. My main argument was that you have to provide the LLM deterministic tools, linting tools, offload of the thinking process, and break down the tasks. Then you can get something done.

I have been working on the Wiser Learning app for some time now. Each time I keep getting more amazed, and I have gone through a couple of rewrites. I want to talk about the limit that I am seeing for this.

I do not have a long running agent. I do not have a self improving code base that is looking at customer data. I am completely in the loop for all of that. I am driving the architecture. I am the person giving the prompts, and I am basically uninterested in removing myself from being that guy. At this point I want to be the driver (and I cannot afford simply running agents constantly forever, and agents verifying the work of the other agents, and agents qaing the verified work, etc).

The biggest issue I see when giving a prompt to an AI, any prompt, is that by design there is an information theoretical problem. You cannot decompress a set of instructions from low resolution to high resolution. It is possible you could do that from high resolution to low resolution. That is what compression algorithms do. That is what programming languages are. Going from low resolution to high resolution is by definition a process that requires filling in gaps and assumptions. There is an inherent problem that LLMs cannot solve. The instructions you give to the LLM are going to have some level of ambiguity. That level of ambiguity is necessarily going to have to be filled in with assumptions. So you **build a plan.** That might look like:

![](/images/screenshot-2026-09-20_22-14-23.png)

LLMs are very bad, sometimes decent but mostly very bad, at filling in those assumptions correctly. A lot of things that seem implicit in a statement will have to be made explicit. In order to make explicit all of these things that seem obvious, you go through a really painful process. To compound the issue, they generate plausible text, but **the only way to know what the LLM means is to build the thing.** The above plan *looks* correct, but it might be making a clickable div instead of a button, it could make a pool of nonsensical, or rather not-quite sensical suggestions, it could be writing a new table for a new entity in the database, instead of using the entity that you had in mind because you called it slightly differently than what the model had in context, and it could be wiring up a notification system with a VAPID key which derrails the whole prompt. 

Even the good models have this issue, and the only real solution I have found is to follow this loop:

1. plan thoroughly 
2. build it
3. then refine after building, undoing a good 30% of the work

If you are not going to be looking at the code, you can catch these assumptions at the level of the code, or essentially have the agent plan with code snippets and suggestions in the planning document, but that requires a back and forth that I am not sure if that is adding a lot of efficiency.

If you want to get to the promised efficiency of LLM programming, where you can go from idea to outcome much faster, you basically have to forgo some level of decision making to the model. You have to let the model assume some of the decisions that you are not being explicit about.

## The Compiler Comparison

I am actually not sure what the solution to this is. The benefit of an LLM is that it does make statistical assumptions about what your intent is. And the solution that harnesses give is to provide further context that does not oversimplify, or gives extra instructions, or adds more and more tokens to the window in order to do an effective execution of an instruction set.

This is different than the problem as some people try to phrase it, as the compiler problem. When comparing LLMs to a compiler they are saying it translates English syntax into machine instruction. But there is a fundamental difference, which is determinism.

You are still abstracting some things about the specifics of the instructions, but you are not producing different outputs in terms of the compiled instructions to a program. Different passes might create some accepted level of variance if you are targeting different architectures, or you have other state dependent things that might produce a different optimization path, those do not prevent you from drawing fundamental conclusions about what a compiled program is going to do. You can basically test around the minuscule variance that a compiled output is going to make. Any deviation from that is a bug.

That is not at all the case for how LLMs are generating text and filling in the assumptions.

## The Solution as I See It

It is much closer to the life cycle of how a human product manager communicates to a human developer, where the human developer has a process of clarifying the assumptions that are in their head, but often doesn't, and the QA process has a way of testing those assumptions and bringing everything into context, and a process of getting back together to see where the deviation happened in mental models. So often developers will build something that when shown to a QA or to a PM, the response is something like "*That is not what I meant"*. 

![](/images/screenshot-2026-09-20_22-34-00.png)

So when we say that the LLMs are replacing developers, what are we actually saying? Because this issue is fractal, and the information loss is at every level. As a dev you have to do this on a technical level, and we are fostering a culture of not really seeing the output. So these assumptions get baked in.