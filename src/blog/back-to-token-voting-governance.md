---
layout: 'layouts/blogpost.html'
title: 'Back to Token Voting Governance'
tags: ['main']
topics: ['cryptocurrency', 'governance']
date: '2022-04-13'
meta:
  desc: "Decision making should not be thought of as financial policy"
intro:
  description: 'Decision making should not be thought of as financial policy'
---
__This is the first in the series of essays in which we discuss our thinking behind governance tokens from people in the frontlines of building them out. ValorizeDAO is a community of people building out governance token standards and a platform for people to launch them with no code. Find out more at [Valorize](https://www.valorize.app)__

[Here is an interview](https://www.youtube.com/watch?v=pvRUlaC3SAE) and discussion about Valorize and this article

A few months ago, Vitalik wrote a piece called Moving Beyond Coin Voting Governance which outlined the types of vulnerabilities associated with highly fungible and oftentimes market valued assets as a proxy for voting rights. I think his analysis is an excellent example of why the current model of token governance is flawed, but I disagree with his implied conclusion (That he doubled down on in ETHDenver 2022) that all token voting should stop. For corporate-like structures that are owned by the people that provide value in it, utilizing a fungible asset that can weigh how valuable a specific entity or contributor has been to a community at a current point in time is extremely useful. I want to reintroduce the criticism of Vitalik in token voting in the context of the current token design frameworks, describe why his criticism of it is based on foundations of tokens being built as financial instruments based off monetary policy, and introduce a framework for creating tokens which are used to align incentives, rather than communicate information around market conditions.

Weighted voting is a system that allows for actors in a system to signal (and automatically execute in the case of on-chain governance) their preference for a decision in a way that is proportional to some multiplier. Actually, it is a well studied system, and the one that is preferred by corporations providing an extremely useful metric for signaling value within the system. There have been a few talks about moving DeGov away from fungible tokens and towards NFTs, and a lot of experiments have appeared in that space with Proof-of-Personhood, poaps, and other measures to improve sybil-resistance. I do think that these measures can be introduced to token governance systems to make token voting more effective.

There are three main reasons that token voting is so problematic today:

- We are designing governance structures as though they are monetary policies

- The monetary policies we use for governance tokens are prioritizing the stability of price, while governance should prioritize signaling the amount of value that a contributor has given to a community

- Removing the priority we give towards unit price enables better governance primitives

Governance Policy is not Monetary Policy
Seems like an obvious statement.

However, if you take a moment to look at the governance policy of some of the most popular DAOs you'll see a lot of similarities:

Taking the ENS DAO which you can find in this link. Don't worry if you can't read code, I will explain what is happening here.

(This is simplified to only show the things to do with the token issuance)
<div class="flex justify-center">
  <img class="mx-auto" src="/images/bttvg_1.png" alt="A sample storage for a smart contract">
</div>

And further down we can see the mint function:
<div class="flex justify-center">
  <img class="mx-auto" src="/images/bttvg_2.png" alt="A sample mint function">
</div>


The summary is that on launch, there is an initial supply of 100,000,000 tokens, and every year, the supply can be increased at a rate of 2%. I don't know where this idea came from, but I would venture to assume that it came from the 2% marker of that central banks give as an ideal rate for a country's monetary supply. The reasons banks have for doing so is that it encourages spending by individuals, keeps interest rates stable, and have room to be managed in an economic downturn. The merits of their argument should be evaluated on the metrics they propose, but the question is this: are those the metrics we need to evaluate when discussing governance models?

### Governance Should Prioritize Contributors' Value at a Given Snapshot in Time
So if we accept that prioritizing interest rates, consumer spending, and managing economic downturns might not be the best thing to prioritize for governance, what then should we be prioritizing? I have a proposal for that, which is to make governance tokens a signal the value given by a member to a community.

Current models for tokens are a mixture between something 'like' equities, and something 'like' money. However, they are kind of bad at both. A corollary for governance tokens might be Voting Shares in a corporation which are useful because people that are more 'invested' in a company have more of a say, and if you control more than half of a corporation's equity, you are effectively in charge of making decisions for that corporation. The thing about equity shares with voting power is that they are usually accompanied by some sort of dividend agreement which can be modified to achieve certain outcomes like monetary premium. As opposed to governance tokens, which do not traditionally provide dividends, however are often used as the form of payment by the parent organization to their contributors.

It is of note to touch on why there is such an emphasis on governance tokens going away from providing dividends to users, and the main reason is regulatory requirements in the US. Creating dividend mechanisms (and most importantly) talking about 'getting paid for holding the token' makes certain tokens fail the Howey test. This is why you will often see the language, as you did in the Constitution DAO, as 'worthless governance tokens'.

However, when governance tokens are often used as payment to members, what many DAOs are effectively doing is providing a downward price pressure to the token as every payment would need to meet with a sale order to convert those tokens to an asset with higher velocity because most contributors cannot pay rent with tokens. By doing this, the signaling power of the weight of a token for governance is effectively undermined. Only those contributors that have supplementary income to the DAO retain the signal value of the governance token.

In an ideal scenario, the tokens are distributed proportionately to the people that have contributed in a way that signals the value of that contribution. And then the question arises, how do you measure that value so it is accurately represented over a period of time? Now equities generally operate in a manner that disproportionately values early contributors through SAFE notes and vesting schedules. SAFE notes give organizations much more flexibility, but once an equity is issued, the only way to dilute earlier investors is to buy them out. Equity might be better understood as a measure of the financial risk taken by early investors and contributors as opposed to the measure of the value of their contributions. This property is questionable when designing a token voting system.

### Unit Price vs Weighted Voting
Let's design a governance token that is good at capturing current contribution value of members and ignore the unit price of a token for a second. This token will not be too complex in its functionality, the things we want to focus on is initial supply, maximum supply, and yearly increase in supply (inaccurately referred to as inflation rates in the world of tokens). Because we want to focus on providing governance rights to this token, we want to constantly give the token to the people that are providing value to the community. The mechanics of how that is measured are non-trivial, but we will make the massive assumption that it is measured correctly. The hope is that once a vote happens, the outcome will be representative of the wishes of the most valuable community members.

What should be the initial supply? This question is almost irrelevant. The real question is how is the supply distributed. The initial supply should only really be as large enough so that the ratio of the contributors can accurately be described. That is you don't want 10 tokens divided by 13 people evenly, unless you have sufficient divisibility per unit.

The next thing to consider is the rate of supply increase of the token. If we set this to 0, we are effectively saying that the initial distribution was an accurate representation of the voting weight distribution and future contributors could only get voting power through buying that voting power, or receiving it from someone that received it in the first round. This is why there is usually a treasury reserve of tokens for future distributions. Another approach is to not create this reserve and mint tokens instead, the outcome is quite similar.

Back to our question of how to define the rate of new issuance of tokens, the metric that we could use is “For how long should a contribution hold its voting weight”? Without considering unit price, if the newly issued tokens are given to the members that are actively providing value to a community the effect of diluting a governance token is that every doubling period of the token supply equals the half life of the value of a contribution. So instead of disproportionately benefiting early contributors, the mechanism can be designed to favor people that are currently providing value.

This places the onus on the community distribution mechanism to provide an efficient model for distributing the tokens to valuable contributors. Given this, the implication is that for any given contributor, so long as they continue to provide value at an equal rate than before, their voting weight should remain the same. The other effect is that hostile token takeover maneuvers are diluted over time reducing the risk of a permanent takeover.

The last question is, what should be the total maximum supply? For the scheme, as described above, it necessitates the supply to be unlimited, so long as it is predictable.

To summarize everything, the implication here is that for a governance token, having a distribution rate in the mid to high double digits seems like one of the most efficient ways to maintain voting power distributed in a fair way over time. If we stay true to the thing that some projects have offered (that governance tokens are not money nor equity) then we can extrapolate a behavior that would most accurately serve their intended purpose. In the nascent space of DAOs and tokenized communities, experiments like this should be implemented.

Stay Tuned for Part 2 where we go over how given this thinking, we might create a two token model, one for representing value of contributions as described here, and one for maintaining unit price.
Thank you to Florian Strauff, George Hristoff, Marco Huberts and Pavel Fedotov for their input on this article.