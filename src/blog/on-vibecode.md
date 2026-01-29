---
layout: 'layouts/blogpost.html'
title: On Vibecode'
tags: ['main']
topics: ['artificial intelligence']
date: '2026-01-26'
draft: true
meta:
  desc: "I strongly believe we have entered into a new world with rules of engagement that we haven't quite realized with artificial intelligence"
intro:
  text: 'I vibe coded an entire application with no idea about how the code looks. I know it works because I'm writing this blog post today with it.'
---
I vibe coded an entire application with no idea about how the code looks. I know it works because I'm writing this blog post today with it.

## Development

Something interesting happened to me over this weekend. I've heard about this new craze of vibe coding and I decided it was time to seriously take the concept. I wanted to test generating a simple application in a weekend that is completely tailored to a specific workflow or need. I've also been reading a lot about Ralph loops<a name="ref1">[(1)](#note1)</a> and what they enable you to do. So I decided to try it out. I ended up being completely impressed with the outcomes.

A few years ago I wrote about using AI in a sort of cybernetic loop system<a name="ref2">[(2)](#note2)</a> in which the human and the machine are forming together a feedback mechanism which feeds into each other. My thought was that AI by itself is not good at coming up with original ideas. What it's good at is taking prompts, expanding on them, critiquing them, becoming a feedback mechanism, literally. This is why the study of cybernetics is becoming absolutely fundamental, which focuses on the study of such feedback systems.<a name="ref3">[(3)](#note3)</a>
So I started taking a look and investigating deeply. At the time I wrote it, AI wasn't nearly as good as it is now, which is its own problem because that was, in a very real sense, not too long ago. AI is much, much, much, much better today.

## On the Vibe Coding World

As a programmer, vibe coding is all the rage. And it's all the rage in both the literal sense of the word and the figurative sense of it being popular. And, you know, I've had a couple of oh crap moments associated with it, but now I'm starting to realize that this is actually something to take seriously. It's something to take seriously because it actually is effective at doing a certain family of tasks. The family of tasks is singular, not too complex, and deterministic.
If you're able to structure a task in such a way that it is easy for the AI to execute, and you're able to give it instructions and make a detailed requirements document, then the AI, a lot of the time, is able to succeed. There is a level of complexity which becomes the threshold at which the AI can no longer succeed, though. To push past that threshold, the work lies in structuring the requirements.

I've had a lot of success with vibe coding, especially when it comes to making tools for myself, like bash scripts that facilitate my workflow and things of that nature. I always, I'm looking for ways to facilitate my own workflow by creating scripts and automating repetitive tasks. These are perfect candidates for LLM automation because they are discrete, low-complexity, and don't need to be future-proof.

## The Chasm

However, I wanted to take this process a little further. I've read about this idea of Ralph loops, and when I'm hearing the author say that the idea of writing code is today no longer relevant and those who tried to cling on to the old way of writing code are clinging on to a dying art.<a name="ref4">[(4)](#note4)</a>

To explain the context: A Ralph loop is literally a bash script that runs an agent on a loop, giving the agent a very determinate and narrow-focused task. The script instructs the agent to finish its session, provide a progress report for the next agent, and spin up a new instance with a fresh context window.  This matched my experience of how to effectively work with agents. So I wanted to take it to a larger property to test it out.

The application I wanted to build is a visual editor for this blog's Markdown files. Whenever I merge a change, Netlify deploys the 11ty application. I automated that entire workflow. It was a medium-complexity task—something I wouldn’t expect an AI to do in one shot, and certainly not two years ago.

But it did it.

The agent completed roughly 30 individual steps that I had painstakingly spec’d out. It just worked. We are at a point where the future of development is shifting.

## A Machine With A Machine

This was a new level of vibe coding. To create a sandbox for the agent, I set up a DigitalOcean droplet with an OpenCode instance. I didn't care if the agent destroyed the environment or executed `rm -rf /` while "yoloing" the project.

I had a fascinating experience while trying to open ports to connect to the machine via a subdomain. I gave the machine the goal, and it used its own compute environment to solve it. The machine autonomously debugged the ports, edited the Caddyfile, and checked DNS name servers while we collaborated on the final configuration. It's not something that I do regularly. It was eye-opening to see the machine debug its own state.

Likewise, when deploying the application, the agent was able to debug the VM it was running in to achieve its goal. While I remained "in the loop" (unlike the Ralph loops) the concept of talking to a computer to debug its own state is wild. When you give an agent a compute environment, everything computable is on the table.

## Engineering
The blog editor was a proof of concept, and I will continue experiment. I want to do it because after seeing it done, it is clear to me that this is the future. And the future is not something far out, it's happening now.
As a software developer, I am coming to terms with a very "serious" question. What is the future of the profession which pays for my bills and for my family, if that profession is going to be completely rewritten. We are absolutely heading in the direction of code being a disposable and cheap resource that we can just recompute. We are heading toward a world where code is a disposable, cheap resource that we can simply recompute. If code reaches a near-zero marginal cost of production, what should be my relationship with this craft? I will be thinking about this and  writing more as this evolves.
## **Notes**

<a name="note1">**1.**</a> A ralph loop is a technique of structuring a bash loop with an agent and a task list in order to keep generating new agents with determinate subtasks with a new context window in order to execute autonomously on the larger task. [[Back]](#ref1)

<a name="note2">**2.**</a> My usage of LLMs has evolved since that time. That was an experiment of how I was thinking about it. What's interesting about this way of working with a Ralph loop is that I'm effectively able to have the LLM radio feedback mechanism for itself. [[Back]](#ref2)

<a name="note3">**3.**</a> Stafford Beer's Brain of the Film is an example of how I think we should be thinking about these agents with viable communication channels, multiple networks of nodes, receiving feedback mechanisms. [[Back]](#ref3)

<a name="note4">**4.**</a> When you see Geoff Huntley come with claims that: "software development is dead - I killed it. Software can now be developed cheaper than the wage of a burger flipper at maccas and it can be built autonomously whilst you are AFK." (https://ghuntley.com/loop/) I, on the one hand, know he is being facetious. On the other hand, I'm inclined to take a claim like that seriously. [[Back]](#ref4)
