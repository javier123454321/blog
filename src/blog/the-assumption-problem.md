---
layout: 'layouts/blogpost.html'
title: 'The Assumption Problem'
tags: ['main', 'tech', 'ai']
topics: ['artificial intelligence']
date: '2026-09-20'
meta:
  desc: "On the limits of long running agents: low resolution prompts, filled in assumptions, and why thorough planning is not enough."
intro:
  text: "I have been working on https://wiserlearningapp.com through a couple of rewrites. The problem to be solved for agentic loops is that there necessarily is a level of assumption of intent that happens when giving general instructions that should produce specific instructions."
---

## Long Running Agents and the Assumption Problem

My journey with agentic engineering has happened in two phases. I first [wrote about the first time I gave a long running task to an agent](/blog/on-vibecode) and saw success with it. Then I realized how to [leverage tools to build guardrails](/blog/from-vibecoding-to-engineering) that can execute long running instructions in a more deterministic way. My main argument was that you have to provide the LLM deterministic tools, linting tools, offload of the thinking process, and break down the tasks. Then you can get something done.

I have been working on the [Wiser Learning app](https://wiserlearningapp.com) for some time now. Each time I keep getting more amazed, and I have gone through a couple of rewrites. I want to talk about the limit that I am seeing for this.

I do not have a long running agent. I do not have a self improving code base that is looking at customer data. I am completely in the loop for all of that. I am driving the architecture. I am the person giving the prompts, and I am basically uninterested in removing myself from being that guy. At this point I want to be the driver (and I cannot afford simply running agents constantly forever, and agents verifying the work of the other agents, and agents gauging the verified work, etc) forever. I have however found myself looking less at the output that these agents produce.

The biggest issue I see when giving a prompt to an AI, any prompt, is that by design there is an information-theoretic problem. You cannot expand a set of instructions from low resolution to high resolution. You can absolutely do that from high resolution to low resolution. That is what compression algorithms do. That is what programming languages are. Going from low to high resolution, however, is by definition a process that requires filling in gaps and assumptions. And this happens to be a problem that LLMs do not solve well a lot of the time. The instructions you give to the LLM are going to have some level of ambiguity. That level of ambiguity is necessarily going to have to be filled in with assumptions. So the first step is that you **build a plan.** That might look like:

![](/images/screenshot-2026-09-20_22-14-23.png)

LLMs are very bad, sometimes decent but mostly very bad, at filling in those assumptions correctly. A lot of things that seem implicit in a statement will have to be made explicit. In order to make explicit all of these things that seem obvious, you go through a really painful process. To compound the issue, they generate plausible text, but **the only way to know what the LLM means is to build the thing.** The above plan *looks* correct, but it might be making a clickable div instead of a button, it could make a pool of nonsensical, or rather not-quite sensible suggestions, it could be writing a new table for a new entity in the database, instead of using the entity that you had in mind because you called it slightly differently than what the model had in context, and it could be wiring up a notification system with a VAPID key which derails the whole prompt.

Even the good models have this issue, and the only real solution I have found is to follow this loop:

1. plan thoroughly
2. build it
3. then refine after building, undoing a good 30% of the work

If you are not going to be looking at the code, you can catch these assumptions at the level of the plan, or essentially have the agent plan with code snippets and suggestions in the planning document, but that requires a back and forth that I am not sure if that is adding a lot of efficiency.

If you want to get to the promised efficiency of LLM programming, where you can go from idea to outcome much faster, you basically have to forgo some level of decision making to the model. You have to let the model assume some of the decisions that you are not being explicit about.

## The Compiler Comparison

The benefit of an LLM is that it does make statistical assumptions about what your intent is. And the solution that harnesses give is to provide further context that does not oversimplify, or gives extra instructions, or adds more and more tokens to the window in order to do an effective execution of an instruction set.

This is different than the problem as some people try to phrase it, as the compiler problem. When comparing LLMs to a compiler they are saying it translates English syntax into machine instruction. But there is a fundamental difference, which is determinism.

You are still abstracting some things about the specifics of the instructions, but you are not producing different outputs in terms of the compiled instructions to a program. Different passes might produce an accepted level of variance if you are targeting different architectures, or you have other state-dependent things that might produce a different optimization path. Those differences do not prevent you from drawing fundamental conclusions about what a compiled program is going to do. You can basically test around the minuscule variance that a compiled output is going to make. Any deviation from that is a bug.

That is not at all the case for how LLMs are generating text and filling in the assumptions.

## So how do you arrive at some understanding with the robots?

Basically, there is the spec heavy way of coming to the understanding with the agent, where you use prompts like /grill-me to arrive at the same conclusion leaving as few assumptions. I find that text is not the right medium though, the other solution is prototyping and working off of that as a base. Basically leverage the fact that building is cheap now.

This is much closer to the life cycle of how a product manager communicates to a developer. A developer has a process of clarifying the assumptions that are in their head, but often does not do it. QA has a way of testing those assumptions and bringing everything into context, and the team has a process of getting back together to see where the deviation happened in mental models. So often developers will build something that, when shown to QA or to a product manager, gets the response "*That is not what I meant*". The important part is that you don't quite arrive at that conclusion until after some work gets produced.

![](/images/screenshot-2026-09-20_22-34-00.png)

The above works, and it works decently, but it needs to happen in a much faster and smaller cycle. So the process is at every step to go through some level of this loop, because the information is lossy at every step. So the actual loop looks like this:

![](/images/screenshot-2026-09-21_14-54-21.png)



And this process, of course gated by the stuff I wrote in my prior blogposts<a name="ref1">[(1)](#note1)</a> has been the only way to get "deterministic" solutions out of the LLM coding loop. And deterministic is a bad name for it because what actually happens is that the non determinism creates a loop with a bad outcome, and then you fix it, and continue at every scale until you are done. I think people call this loop engineering or something, and I am not too interested in the trendy name. What I am interested is the results that I can guarantee.

## Conclusions

As I am writing this, I am seeing others talk about similar things. [A16z has a great article](https://a16z.com/product-management-is-still-all-about-telling-stories/) where they are saying that now the prototype can and should come as one of the first intermediate steps to validate the idea, because it is now so cheap to do. I like this approach, and it matches what I have been doing. Make the assumptions explicit because the only way to merge your understanding from the prompt to what the model is outputting is just to see what the outcome of the model's understanding is. And you should do that at every step.

## **Notes**

<a name="note1">**1.**</a> Again, this post assumes the things I started speaking about in [Treating Vibecoding Like Engineering](/blog/from-vibecoding-to-engineering). [\[Back\]](#ref1)