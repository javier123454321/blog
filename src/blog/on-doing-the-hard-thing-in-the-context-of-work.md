---
layout: 'layouts/blogpost.html'
title: 'On Doing the Hard Thing (In the Context of Work)'

tags: ['main']
topics: ['software']
date: '2026-01-05'
meta:
  desc: 'A reflection on tackling complex legacy code and improving productivity at work.'
intro:
  text: "Recently, I have been on a bit of a mission at work. Here's the extremely tedious to unwind some legacy implementation of how our local frontend connected to the services in the backend."
---

Recently, I have been on a bit of a mission at work. It started when our greenfield project was reaching maturity, and we wanted to host it in the same domain as what would eventually be our legacy app. Turns out that it was easy to do, but extremely tedious to unwind some legacy implementation of how our local frontend connected to the services in the backend. So I decided that I should effectively reverse engineer the thing, as it felt important to know how our application ran locally, and it effectively was last touched by an engineer or two that have not worked for the company for the better part of a decade.

## The Black Box

I'm not sure what I can and cannot explain about the setup, but I will describe it in loose detail.

  1. We had an NGINX reverse proxy that would start up in parallel to a Spring Boot server locally.
  2. However, we didn't just have an NGINX file; rather, we had a Handlebars file which would build the NGINX file based on user configuration.
  3. The NGINX proxy, once built, would forward the requests to our microservice aggregator, which would use a header to give an IP address to the entry point of the app.
  4. This header contained the local IP of the client making the request with Spring Boot's port and was used to tunnel requests back to the local server, which would then render a Thymeleaf template with information about things like configuration, session, and other user information, as well as the tenant in our multi-tenant application.
  5. The frontend was simultaneously running a full build in watch mode, built to the `/dist` folder nested in the Spring Boot application, and the NGINX server would serve the static assets in there.

To further complicate things, the `/dist` folder also included the Thymeleaf templates that would be used by Spring Boot and were only accessible once you ran that build.

This would make it so that each frontend change would take around 30–60 seconds to render in the browser!!

Yeah, if that seems convoluted or like it could be simpler, well, you're right. Also, the point is not to describe the overengineered spaghetti, but rather to paint a picture. However, the real kicker is that there was simply near-zero institutional knowledge about the thing, and when things like cloud migrations happened, or when a new dev or QA environment needed to be supported, we had to play a cat-and-mouse game to look up the right information to support it. Since there was no team that owned this part of the setup, whenever someone would go in and change something in there, it would be a surgical operation that would create a new possible path to traverse through the convoluted control flow.

## Unwinding the spaghetti

After spending a bit of time setting up the new version of our frontend (all on edge so we didn't have to deal with the mess above), we started worrying about how to do the migration. This is where the hosting of the two applications in the same domain started sending me into the world of investigating the black box that everyone had avoided for years now. I needed to understand how the application communicated with our microservice aggregator, and I did talk to a few people who told me the big picture, which started to make sense of the mess. So step by step, as I started understanding, I started documenting, divulging, and tweaking.

### Step 1. Rendering local environments without needing to overwrite hosted ones

It started with a simple quality-of-life fix, to change the proxied headers so engineers working on an environment didn't have to forward traffic to actual hosted sites to their local machines. Before, to develop on a `beta` (dev) environment, an engineer had to forward all traffic from `beta.{tenantname}.com` to localhost, which of course meant that they couldn't visit the site online without updating their `/etc/hosts` file. This was... annoying and a cause of lots of lost time, as engineers had to constantly be updating that file and couldn't compare the beta environment with their local environment. So the update was to let people connect via `local.beta.{tenantname}.com`, which was a pretty easy fix and led me to the next iteration:

Time spent understanding and implementing the fix: <strong>2 days</strong>

Money Saved for the Company: <strong>$16,500/year [^1]</strong>

### Step 2. Forwarding traffic dynamically to the correct backing service

For example, being able to go to `local.alpha.{tenantname}.com` or `local.beta.{tenantname}.com` without updating configuration. This seemed like a straightforward addition to the step before; however, it did somewhat throw me a curve in that [NGINX does not use the same DNS resolver when you use a variable upstream address](https://stackoverflow.com/a/71224059). But we already had a way to build the NGINX file dynamically with Handlebars, so I leveraged that and resolved the possible backing environments to their respective IPs before running the NGINX server. This took a while to figure out, as the IP addresses of the environments are dynamic and need to be resolved inside the corporate VPN.
Money Saved for the Company: $58,000/year [^2]

### Step 3. Becoming the guy that knows how to do things related to this part of the app

By this point, most people knew me as the guy. Oh, there's an issue with the environments? Ask Javier first. There's this environment that we effectively don't know how to support, but someone depends on for internal testing and it's behaving in a buggy way? Ask Javier again how to connect to it to debug and solve it. Funny enough, no one working on the frontend of the application knew how to connect to this environment that we were responsible for supporting. But effectively, I now knew how to resolve this issue because I had 1. solved it before, 2. built tools for myself to make it easier to debug, and 3. understood what the application was doing. Turns out that no matter how much documentation I provided, people still saw this as an uninteresting and impenetrable part of the codebase. (Except David; he was cool and really helped out as a sounding board for how to get this done. David is awesome.) After I touched it, the environment, which was previously unmaintainable but still used, now had an easy way to connect.

### Step 4. The Cloud Migration

So having done this, we eventually started moving away from one cloud provider to another for reasons. I wasn't part of the migration team, but it effectively meant that every few weeks, one old environment would be sunset for certain tenants, and a new environment would spin up that we had to support. Guess who became the guy that was in charge of making sure every other frontend developer could connect to the new environments? Guess who also became the guy that had to sunset the old ones that would fail to resolve and add new environments that were different based on different tenants due to different regions, a constraint we didn't have before. Yeah, it was a lot of back and forth getting to the bottom of a process that basically was a poster child of siloed organizations. The cloud team throwing some changes, at random times, to the frontend developers, and us being surprised that we now had to support a new environment. The turbulence settled after some month or two, and all in all, for an infrastructure migration at that scale, there were fewer problems than I would have bet on.

## Step 5. The final battle, the frontend build system

Now, after the dust settled with these changes, I had been toying with updating the build system altogether so we could run a proper dev server locally with hot module reloading, caching, and modern frontend practices. I had done some proofs of concept with Vite on how to get this working, with mild success. Then one day, once I proved out HMR locally, I showed it to my boss and told him I would focus on this, as it would be a huge productivity unlock for every developer working on the frontend. It would also enable the migration at a much quicker pace.
It started with understanding the Vite WebSocket connection, how to forward the traffic via the NGINX setup, and unwinding the build steps to forward the right files. However, the issue here is that the application looked up the files based on the computed information of the Thymeleaf template. For example, a template might look like this:

```html
<script src="/dist/app{commitHash}.js" />
```

Which meant I had to go in and manually tweak the Thymeleaf templates, though they were being built by a Handlebars template. (Yeah, those savvy enough to work both in JS and in Java might notice that I just said we used a templating language to build a fragment used by another templating language.) At first, I did not touch the build process at all—just focused on dev and then worried about building things correctly when we crossed that bridge. I naturally had to deal with outdated Sass, which prevented the CSS from working in dev mode, and with resolving all the imports and chunking things accurately.
Once I got HMR working and could see instantaneous changes, as well as the app loading correctly along with the styles, it was time to unbundle the build system. Now, changing a 500-line-long webpack config is not for the faint of heart, but most things were simply able to just... go. I removed all Handlebars from the repo because that was crazy to do in the first place, consolidated all the scattered templates into a single folder, and bundled the steps needed for Thymeleaf into a single yarn command called prep. I then resolved the rest of the outputs and was ready to test it out on the developers.
Money Saved for the Company: $282,000/year [^4]

## The other side

So everything got merged in, and now we have something that feels much more modern on the frontend. One thing about a change like this is that it not only increases the speed at which you write and see your code changes, it increases overall job satisfaction. There is a cost to developers not feeling like they are working on relevant technology; we've lost good teammates at my current company because of that. The cost is high when you lose people that care enough to not want to work on outdated systems and are left with people that don't care quite as much, and the above costs don't account for those devs we lost. [^5]
My story related to this is to talk about my growth as an engineer. I worked for years on this codebase without touching this part of the codebase. However, there is a particular type of satisfaction that this job gives you in getting into a system that no one knows, that affects my daily work, understanding it, and going through the ultimate test of understanding, which is being able to simplify it. That's a satisfaction that reminds me of why I love this type of work.

## Footnotes

[^1]: I calculated this roughly to be 10 minutes per developer every 3-4 days. Assuming a dev works 235 days/year that comes out to 235/3.5 * 10 which gives you minutes saved per dev per year. Then assume an average of $50/hour and 30 developers working for the codebase.

[^2]: This ends up being 10 minutes a day which is what I calculated by polling around the developers on how many times they did this and how long it took them. Using the same formula above.

[^3]: It is strange to detail this in somewhat of a technical detail, while leaving out key details. It's not clear to me what is relevant, as this is not exactly a super technical document retelling the details. It's a reflection on doing the thing.

This number was calculated a bit differently and it's probably undercalculated for a few reasons that we'll dive into in the conclusion. I calculated this to save the developer 60 seconds every 5 minutes or so, which is how often a developer has to write to file (on the low end) and look at their changes in the browser. Assuming that a dev is writing code 4 hours a day, it turns out to be about 48 minutes a day! (Which is about 1/4 of the total development time is waiting) I consider this to be accurate even if the time is a bit high, because it does not account for the price of context switching. 60 second delays to see your changes updated is an extremely detrimental lag to productivity which went down to close to instant.

48 mins/day * 235 working days * $50/hour average * 30 devs.

[^5]: I personally knew 4 people that left and one of the issues they talked about were our outdated practices. Obviously, this is only one facet in a multivariate calculation that people do when faced with the possibility of leaving to a new job.
