---
layout: 'layouts/blogpost.html'
title: 'The CLI is the new UI?'
tags: ['main', 'tech', 'ai']
topics: ['artificial intelligence']
date: '2026-04-28'
meta:
  desc: "There is a trend towards software providing text interfaces for agents to interact with. What is it's implication foor software?"
intro:
  text: "There is a trend out there where companies are moving to text based interfaces. I've been asking myself what that could mean for the future of human machine interaction."
---
Back in 2021 and 2022, there was a lot of talk about a major screen shift toward the metaverse. Some people described AR and VR as the next computing paradigm, as significant as the move from desktop to mobile. Huge amounts of money were operatioinalized to that end<a name="ref1"></a>[(1)](#note1). And while there was real technical development, the whole thing often felt awkward in practice and never seemed to really take hold.

Today, of course, something else is happening. If the metaverse and cryptocurrencies were part of the zeitgeist before 2023, the current moment is about probabilistic text generation. In keeping with the trend, the shift that I find the most interesting is the shift (back) towards textual interfaces to interact with software products. The Model Context Protocol emerged as a way of giving structured context to models. The appeal of MCP was that it let developers define what tools an agent could use, which helped introduce some determinism into stochastic systems.

But the latest trend seems to be moving away from those abstractions and back toward something older: the command line interface<a name="ref2"></a>[(2)](#note2). In retrospect, it seems obvious that text transforming models are good at technology of an era when text was the dominant way people interacted with computers.

### The user interface of the future will probably not be a command line

For the same reason it went out of vogue for the majority of people to interact with a computer, the CLI will not replace the UI. However, this move by companies to make their software experience textual driven by the economics of how people are using LLMs today is one of the most interesting developments in the software industry. When things like [Salesforce](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference_unified.htm) are loosening the grip on the UX of their product in order to provide users a possibility to use it via another app, you can extrapolate that the trend will continue. Who knows, maybe the new UI will be the textarea[(3)](#note3).

Where the success of the mobile app was often dictated by the clarity of its user interface, LLMs might be shifting away from user interfaces being determined by the services. In some sense, this is actually a return to some level of the Web2 promise that we could have multiple interfaces to a service, and these interfaces are based on the user preference, not curated by the people providing the service. In the future where you can [generate personal software cheaply](/blog/on-vibecode/), maybe we will have people crafting their interfaces to our products, and the role of software will be to provide the 'hard data' that backs it.

## **Notes**

<a name="note1">**1.**</a> https://www.mckinsey.com/capabilities/growth-marketing-and-sales/our-insights/value-creation-in-the-metaverse seems like a fever dream as this publication would never go out by a serious consultancy today. [[Back]](#ref1)

<a name="note2">**2.**</a> &nbsp;The canary in the coal mine for this trend is software development, with [Android Studio](https://www.devclass.com/development/2026/04/21/google-previews-android-cli-for-new-world-of-agentic-development/5218263), [Playwright CLI](https://playwright.dev/docs/getting-started-cli) for example choosing or moving towards CLI over MCP.[[Back]](#ref2)

<a name="note3">**3.**</a>&nbsp;No, it won't, or I hope it wont. However you can't deny that a significant number of products are adding textareas to their interfaces.&nbsp;[[Back]](#ref3)
