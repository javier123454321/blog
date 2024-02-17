---
layout: 'layouts/blogpost.html'
title: 'The Functional Core Imperative Shell Paradigm'
tags: ['main']
topics: ['software', 'design patterns']

date: '2024-02-16'
meta:
  desc: 'How we are designing a new application using The Functional Core Imperative Shell Paradigm'
intro:
  title: 'We are building a greenfield project the "right" way'
  text: 'How we are attempting to tackle the complecity of modern frontend development'
---
I am in a small team of developers that are building a new Nuxt application in our company and here are some of the decisions that we are arriving at to make this a successful launch based on the years of learning from making other vue.js applications at scale. A website frontend is actually quite complex, but can be categorized in a few base concepts.

<ul class="list-disc">
 <li> Server Data</li>

 <li> Business Logic</li>

 <li> Rendering Logic</li>

 <li> User IO</li>
 </ul>

So starting with the assumption that software that is actively updated has high entropy (a tendency to deteriorate over time), we were very careful to design the system in a way that focuses on predictability, testability, and reliability. We wanted something that we could apply functional programming concepts to, but knew that if we weren't explicit and efficient, the bulk of the project that is imperative by necessity would get mixed up with the rest of the project and the tendency for software to deteriorate would manifest sooner than hoped for. That is why we went with the Functional Core Imperative Shell paradigm for code organization.

## The Functional Core Imperative Shell paradigm

Functional programming works well for the Business Logic and the Rendering Logic parts of an application. There should be no surprises in business what the app does if, let's say, a user doesn't provide a valid credit card. Likewise, the visual cue that informs a user of the incorrect credit card should be deterministic, consistent, and tested. Functional programming, at its core is to create this style of deterministic, testable (and theoretically bug free) software. A useful side effect is that it is also a more intuitive way to think about organizing the code. The problem with sticking to this paradigm in a frontend application is that the user I/O is the crucial aspect that drives the application's behavior.

Here is a simple image that describes the paradigm:

<img class="mx-auto max-w-full object-scale-down" src="/images/fcis/fcis-diagram1.png">

### Functional Core

The functional core is a way to separate the functionality of the user interface into clean boundaries. The driver of this paradigm is to create predictable frontend components. Functional programming is, in its purest form about reducing or completely removing extraneous variables from affecting the outcome of your code. That means that you can reliably tell, that given a condition the outcome will be constant. If you go around looking for examples, you'll find people speaking about an `add` function. However, in frontend development, simple arithmetic functions are rarely used.

**Functional Frontends**

For a frontend to be functional, we need to think in clean boundaries for the components that we are using. In vue, that means relying on props and events to communicate from parent to child, and on clearly delimiting user interactions. Frontends are dynamic things, and you might argue that relying on events is imperative in its core, so to me, the functional aspect is to delineate the boundary explicitly to be as predictable as it can be. There will still be internal state to manage, so you might go a step further and attempt to completely get things out the imperative shell to be minimal, but you can minimize the side effects by reducing everything to clean boundaries.

The problem is that it is hard to define a clean functional boundary, so that is where testing comes in. When we write the test for components first, we begin to define the components in terms of its interactions, and interfaces. The harder a component is to test, the more we are straying from a functional core, as the cause of difficult to test components is increasing the context they need to function. TDD works best for this approach.

A side note here is that TDD is used as a way to design components. So not only are the things tested, they are designed and developed through tests. That's why tests first makes sense.

Where possible, business logic is removed from the components themselves and built in a functional way, also with testing first. This further removes the shell of the component to be about the imperative functions, and the components themselves are `as functional as possible` within the context of the application. This creates the following relationship:

<img class="mx-auto max-w-full object-scale-down" src="/images/fcis/fcis-diagram2.png">

**Business Logic**

Where it makes sense, we try to put business logic into functions that can be imported, and are clearly bound (and tested). The main aspect of this paradigm is to keep this away from the presentation layer, which is handled by the framework. This is straight forward, if you need to do heavy processing of data in the frontend, then do so in an external utility that you bring in. This is where you do the type of stuff that intro to functional programming tutorials do. The basic Add function, the string manipulation, the data validation and sanitization, etc.

### The Imperative Shell

At the 'top' context of our component based frontend application, we have the page level components, which are where things related to navigation happen. This is actually nicely complimentary to Server Side Rendered technology like Nuxt, Next, and SvelteKit, which pushes you to use a route based approach to your structure. This is where we worry about integrating with APIs, handle data fetching and modifying, and do the more 'imperative' type of work. This part we don't TDD, but we do use a E2E test suite to ensure its stability.

### Drawbacks

Now because we are pushing every bit of data fetching to the route, we end up doing a lot of things in these route components. Ideally, we design them in a way where the actual processing of data is done outside of this 'thin shell' but there does seem to be a tendency to do some of the work in here. We have to sometimes fight our instincts, or to take longer designing the component in this way.

### Final Thoughts

This is an experiment for a greenfield project I am currently working on, and it has been successful for the first 6 months of life. However, we are still working with the initial dev team of 4 engineers, so communication is clear, and we are able to go in and enforce the standard across the codebase. Like I mentioned before, the tendency is to want to fetch data close to where it will be consumed and displayed, or manipulate it close to where it will be fetched, and this paradigm requires holding ourselves to a higher agreed standard.

As we roll this out to the wider team, it will be interesting to see how it will actually work in practice, and how it will scale as we integrate more and more of the functionality of our extremely complex application gets integrated.

Finally, I will say that it has been absolutely brilliant to work in this paradigm. There is an extremely high level of confidence that we are not introducing breaking changes, for the most part. The functional core is solid, reliable, and carries out its function well. I am much more confident in this approach and will likely opt for following it given the chance
