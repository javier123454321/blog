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
So something interesting happened to me over this weekend. I've heard about this new craze of vibe coding and, you know, seriously taking the concept of having the ability to just generate a simple application in a weekend that is completely tailored to a specific workflow or need. I've also been reading a lot about Ralph loops and what they enable you to do. So I decided to try it out. And the fact that we were able to get to this point here is absolutely incredible and sort of awe-inducing.

Maybe a few years ago I wrote about using AI in a [sort of cybernetic loop system](https://javiergonzalez.io/blog/cybernetically-enhancing-creative-output/) in which the human and the machine are forming together a feedback mechanism which feeds into each other. My thought was that AI by itself is not good at coming up with original writing or anything like that. What it's good at is taking prompts, expanding on them, critiquing them, becoming a feedback mechanism, literally. Of course, the study of feedback mechanisms is well thought out in the 20th century through cybernetics.

So I started taking a look and investigating deeply. At the time I wrote it, AI wasn't nearly as good as it is now, which is its own problem because that was, in a very real sense, not too long ago. AI is much, much, much, much better today. So, I decided to start going back and testing some of these in a real way.

## On the Vibe Coding World

As a programmer, vibe coding is all the rage. And it's all the rage in both the literal sense of the word and the figurative sense of it being popular. And, you know, I've had a couple of oh crap moments associated with it, but now I'm starting to realize that this is actually something to take seriously. It's something to take seriously because it actually is effective at doing a certain family of tasks. The family of tasks is singular, not too complex, and deterministic.

If you're able to structure a task in such a way that it is easy for the AI to execute, and you're able to give it instructions and make a detailed requirements document, then the AI, a lot of the time, if it's not too complex, is able to succeed. There is a level of complexity which is the threshold at which the AI can no longer succeed, though. So in order to affect the change in a project that has a level of complexity that is higher than that threshold, then you can still use AI favorably, but the work involved in structuring the problem in the same way increases.

I've had a lot of success with this technique, especially when it comes to making tools for myself, like bash scripts that facilitate my workflow and things of that nature. I no longer fully make these tools myself; I use LLM assistants to create them. These have a particular quality, which I find interesting—I don't care so much about extensibility or code quality. I review them in the sense that I make sure they don't have something egregious, like executing code from external sources or anything like that. But I, for the most part, don't really care if they are good code. I can effectively throw them away if they stop being useful. And I do.

## The Chasm

So the other day, I wanted to take this process a little further. I've read about this idea of Ralph loops, which in its core is just an idea of taking this strategy of giving an AI narrow, deterministic tasks, and then going on to create a single context window for that task at hand. So my process was to just create a very detailed specification, which did include some of the technical implementation details that I wanted to have. However, it was basically just a spec that I did with a voice LLM completely associated with a coding agent. I took that spec and turned it into a PRD.json file that has specific instructions for aligned progress, state, and completion. And a progress log that the LLM would append after each iteration in order to give further context to later agents down the line.

The app that I want to build is a visual editor for my Markdown files that are in this blog. Is completely code-based. Whenever something gets merged, Netlify deploys the 11ty application. So I automated the entire process. I thought that task was good. It was, I would say, a medium complexity task—something that I would not expect an AI to just be able to do, and definitely not in one shot, and probably not 2 years ago.

But it did it.

It completed this medium complexity task that had about 30 individual steps that I painstakingly spec'd out with an agent. And it just completed it. I think that we're at a point where the future is going to look very different.

## A Machine With A Machine

Now, we've done some vibe coding before, but this was a different level. In order to create an environment for this machine to run, I effectively created a DigitalOcean droplet, attached an OpenCode instance to it, and started going crazy with it. The fact that it's on a droplet is the best because I no longer care if the machine destroys the entire compute platform which it's currently running in. I no longer care whether `rm -rf /` or anything like that happens when I'm yoloing a project. And I had an interesting experience when I was trying to basically open the ports in order to be able to connect to this machine via a subdomain in which I was telling the machine what I wanted it to do. It was effectively debugging the issue in its own compute environment by itself through my prompts.

When I wanted to point a reverse proxy to one of the ports in order to host the OpenCode web view on its own subdomain, the machine was just by itself debugging the ports, looking at the caddy file, checking the name servers with the DNS, and we went back and forth to do it. It's not something that I do regularly. It's something that I understood how to do conceptually, but it was an eye-opening experience to see the machine debug its own state, effectively.

Likewise, I created this application and in order to deploy it, I had to give information to the agent about the vm that it's running in. And it effectively was able to debug itself to do achieve its goal. Now I was completely in the loop for these types of processes, which are different to the types of processes that the Ralph loop was doing "autonomously". However, just the concept of being able to talk to my computer in order to debug its current state is crazy. What happens if you give a computer environment to an agent? It can do anything that a computer can do. The only limit is how many premium tokens you have and which API keys you've given it access to. However, a completely viable thought is to have it make its own API tokens and access. And possibly run continuously.

## Engineering

The blog was a proof of concept, and I will continue to work on effectively executing on this mission of having an agent with access to its own compute environment. I want to do it because after seeing it done, it is clear to me that this is the future. And the future is not something far out, it's happening now. There are engineering challenges left to solve. Massive ones. But I am starting to be of the type of person that believes that these challenges are no longer in the output of code. They are in the orchestration of agents.