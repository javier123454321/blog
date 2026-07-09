## Here are My Thoughts on How to Go from Vibecoding To Something Closer To Engineering

Before, I wrote about vibecoding when I was just starting out to seriously try the approach. I've been doing something that more 'serious' people are calling agentic engineering which is clearly an attempt at sounding more legitimate when doing the same thing. I have updated my thinking about this process and want to document my learning here.&nbsp;

## The harness and its boundaries

The first time that I was able to structure a task into smaller instructions and feed that into a ralph loop, I had a moment of realization. Even if the tools were not there in its current capabilities, there was a clear and significant benefit as I was able to make a (slightly lower quality) version of an app that would take me probably a few days of full time work. It finished in about an hour of prompting and an hour of letting a harness run and about a $10/month subscription. I made a blog editor that used git as a backend and simplified my blog's interface significantly. Even if the code was by all intents and purposes bad, the application clunky and the UI ugly the ability to produce somehting remotely close to what I was able to was significant. I simply developed a prompt and handed it off to an agent, and that is revolutionary. I realized there is no way that this will not become the future for creating applications.

I give this background as the context of the next iteration of this idea. Knowing the limits of agentic engineering, can we give the agents enough of a railway to avoid some of these issues and create something a bit more 'useful'? How far can a guardrail take this process? I started by creating a new project. I chose Go as the backend, mostly because the tooling is already there out of the box for being strict. If I am going to take this seriously, I need strict guidelines for the code that will be generated that can be analyzed statically.&nbsp;

The following are the guidelines that I made for my next application:

### 0. Provide the Scaffolding

If you tell the LLM to build a UI, it might dump a bunch of in line styles in a single html page, or make a React app, or put the entire backend in a single file, or do a lot of things that we simply don't want. Give the agent a scaffold, lean into frameworks for this and generate it before giving the agent the wheel. Don't start a blank project with a blank folder. I made this mistake once and I ended with a Node app that also used Bun.

### 1. Lean on Compilers, and every commit should be compileable

This is how I program, but not necessarily how the llm does. With git, you can add a pre-commit hook that runs this out of the box. This is a fundamental step, we have decades of research, development, and practice with compilers. They are great. Interpreted languages are a liability when combined with statistical text generators, do not use them.

### 2. Statically Typed Languages are no longer optional

This is related to No 1, but worth repeating. If using a dynamic interpreted language, use either a superset that is typed or lean on type hints and use a linter that prevents the machine from commiting something that is not typed. This is a non-negotiable.

### 3. Linting and static analysis on every step.

This is&nbsp; way to harden the app. Again, these first three steps are a way to superset deterministic tools to your probabilistic text generator. Use them, and use them before EVERY commit. Not by providing instructions to the LLM, which will be read most of the time, but by giving the llm hard checks to use every time.

### 4. Testing, testing, testing

Every task should have a corresponding integration test that you could verify. For better peace of mind lean more on integration and e2e tests. These allow you to verify things, not just assume correctness.

### 5. For UI use a component library.

There are skills for making UIs, but they don't work so well. The best is to give the agent a component library and a reference document on how to use it. This makes the app feel more polished and will be easier to extend later.

### 6. Pieces of work should be atomic

Never tell the agent make a feature. Tell the agent let's make all the tasks for this feature, break down the plan into its constituent parts, and use an issue tracker where one issue is an atomic task. The agent WILL drift, even if the task is miniscule, but it will do so less, the smaller the task. Work with it to break down the steps.

### 7. One piece of work is one agent session

Here is where the SDLC can be leaned on. Epics, stories, tasks, spikes, and sprints are all still useful. You are the orchestrator for your agents. You can still have the PM agent that shapes the work in conversation with you, but the outcome of a planning session is the individual pieces of work, not the feature. Don't plan and execute in the same session, that pollutes the context. Once the work is planned, either manually or with a ralph loop tool, spin up a fresh session to work on a single work item that gets destroyed after it is done. I have been using openclaw as my 'PM' agent and my ralph loop orchestrator. I work with the agent to create github issues, each with acceptance criteria and labels. Once all the issues are ready, I add a label that I can tell Openclaw to run a ralph loop skill which triggers OpenCode to work on a single item. Once done the session is killed and OpenClaw opens one PR per issue.&nbsp;

### 8. Every piece of work has proof of its functioning

This is where you start leaning in the test suite and on the agent skills, but on top of the test you instuct the agent to show the proof of the thing working with images or payloads. I am still leaning on PRs, with all the changes stacked on top of each other, and every PR having verification instructions which were part of the acceptance criteria of the ticket that triggered the work.

### 9. Loops over parallel sessions

Parellel agents tackling work speed up the process incrementally, and increase the complexity of orchestration and verification exponentially. Loops are a way to structure the work so the context gets managed much better, you can verify and steer the work much easier and maintain control and quality standards of the thing you're building. I still lean on orchestrators to hand off the work to agents, but the limiting factor is you as the 'soul' that provides the agents the judgement of how the thing should work, what it needs to do, how it should behave, and whether it is working as expected.

I have found that these rules have led me to have much greater success in achieving something closer to Agentic Engineering. The application that I am currently working on has a much more 'polished' look and feel than the first iteration of a vibecoded application. My workflow right now is the following:

1. $1
2. $1
3. $1
4. $1
5. $1
6. $1
## Observations

I still review the code. I know that's not the hippest. I check a lot of the architecture, and here is where I might see the need for a pattern that will simplify the boundary for future work. That is actually extremely important. I wrote previously about how coding with agents should not encourage slop, rather it can be used to make cleaner architectural decisions and I have only comfirmed that with a fully "Agentically Engineered" application.&nbsp;

This is a bit more expensive than what I would like for a side project that has no revenue. I am paying more for making this application than what I would pay to use it. Of course the economics are not so simple. I am getting some educational value, and the application is completely customized to my needs/workflows. I don't know how to account for my spend on this.

## Conclusion

This seems to me to get beyond what I expected, and expect it to get better. I am waiting for the token price to be lower as right now at market price it has become prohibitive to do this. I also would hope that local models could do some of the tasks limited in scope, but do not have the hardware at the moment to run it at the quality I am hoping. I actually don't particularly need the models to get better, I need them cheaper, as the harness/guardrails do the bulk of the verification. However, this process is convincing for me to see it as the future.&nbsp;