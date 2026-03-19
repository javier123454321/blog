---
layout: 'layouts/blogpost.html'
title: 'On the State of Clean Code in 2026'

tags: ['main']
topics: ['software']
date: '2026-03-19'
meta:
  desc: 'Grappling with the question whether code dead or is learning to code still relevant.'
intro:
  text: "Coding is dead, code is solved, and all that. Sure, but is domain expertise still relevant? Is the craft dead?"
---

[This interview](https://www.youtube.com/watch?v=IGsbARhERqc) with [Dax](https://github.com/thdxr) caught my eye the other day. The thought that in some way, with the current state of LLM aided development, his code tends to be the cleanest it has ever been. That is due to the new reality that LLMs have a context drift problem, and constraining boundaries is one of the ways that you can actually use to reduce the scope of problems until they are solvable by these models. This means that clean code, architecture, and other things that might have been in the 'nice to have but not nice enough to justify business investments into' bucket are now much more straightforward to justify (At the very least easy to justify at the C level that it is worth investing in given the current state of the AI hype cycle).
The second thing that the current state of LLM assisted development categorically allows<a name="ref1"></a>[(1)](#note1)<span style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif;">&nbsp;is that large refactors of the code are now much cheaper. This ease and encouragement to refactor is the counter argument to the rivers of AI slop argument against agentic development. It is also arguably one of the best uses of this technology, when there is a categorical improvement in the quality of the code.</span>

Of course this is not an undisputed opinion. Many proponents talk about code as the intermediate step that will be completely outdatedway to give machines instructions<a name="ref2"></a>[(2)](#note2). If that is the case, and it might be the case in some future state<a name="ref3"></a>[(3)](#note3), that is not what I'm talking about. I am talking about the current state of LLM aided development, and for that it is still extremely important to shift the effort left into the planning stage.
If you take the assumption that the context problem will remain for enough time to be worth spending energy into solving at the organization level rather than at the model level, then actually coding, good practices, and other things that people say are no longer a relevant skill to acquire are actually a great skill to have. Knowing your pattern language for organizing complex systems becomes the meta skill. There might be a tug on what is worth your attention, and whether reviewing the code is a worthy use of your time, but it seems to me to be a clear yes. Ensuring the code is extensible, the interfaces are clear, methods are decoupled, that the code is testable, all of these are actually extremely worth spending time on. 

## **Notes**

<a name="note1">**1.**</a>&nbsp;Based on anecdotal experience of the only thing that has consistently provided good results. However, if you argue that transpilation to a new language is effectively a refactor, then all the 'use AI to rewrite' projects are evidence in favor. See&nbsp;[vnext](https://blog.cloudflare.com/vinext/),&nbsp;[chardet](https://github.com/chardet/chardet/issues/327), and another anecdotal experience that Ben Orenstein spoke about&nbsp;[in a podcast](https://hackersincorporated.com/episodes/ben-spent-600-on-amp-credits)&nbsp;with Adam Wathan from Tailwindcss.&nbsp;[[Back]](#ref1)

<a name="note2">**2.**</a>&nbsp;[Musk](https://www.youtube.com/watch?v=SZkmJVwPkAY)&nbsp;said that by the end of 2026 AI will write binary. Steve Yegge claims that&nbsp;[you stop reviewing code after step 5 of 8 in agentic development](https://steve-yegge.medium.com/welcome-to-gas-town-4f25ee16dd04).[[Back]](#ref2)

<a name="note3">**3.**</a>&nbsp;I disagree plenty with Musk, but I do agree that we are in the singularity, and [I've written about it before](https://javiergonzalez.io/blog/la-singularidad-que-pas%C3%B3/). I don't claim any ability to predict the future beyond a few (2-3) years at most.[[Back]](#ref3)