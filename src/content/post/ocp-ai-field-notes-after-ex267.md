---
title: "OCP AI: Field Notes After EX267"
description: "Inside OpenShift AI after AI267 and EX267: what is in the box, where the course earned its keep, and what I see in the product, the team, and the customer landscape."
publishDate: "2026-05-10T20:00:00Z"
tags: ["ai", "mlops", "red hat", "openshift", "learning", "career", "reflection"]
hidden: false
---

EX267 passed. That is the cleanest sentence I can write about the last few months, and also the least useful one. The certificate is a checkmark. What it actually marks is a transition.

This is the fourth post in a line. Eleven months ago I sketched out [a five-stage AI roadmap](https://olimp.run/posts/ai-strategy-roadmap-2025-2028/). [77 days in](https://olimp.run/posts/ai-my-roadmap-my-path-my-thoughts-77-days-later/) I had built foundations and was on my way to Berkeley. By [November](https://olimp.run/posts/berkeley-ai-exec-journey-self-study-to-executive-lens/) I had closed the executive lens chapter and learned how to talk about AI in business terms without becoming a buzzword salesman.

The pattern was clean: literacy, frameworks, executive language. What the roadmap quietly assumed but never spelled out was the part that comes after that: the product itself. Not as a slide. As a system you actually touch.

That is where I am now. EX267 was the door, not the goal. The phase after it is hands-on: deploying things, breaking them, fixing them, reading docs against logs, writing small amounts of code on purpose. I am still early in this, and I plan to stay in it for a long time. The roadmap I drew a year ago is being edited in flight, because it had to be. At the start I did not know enough to know what I did not know.

What follows is what I actually think about OCP AI now that I am inside it. Less narrative, more opinion. What stuck, what surprised me, what I see in the product, in the ecosystem, and in myself.

## Late February to Mid-March

I started learning OpenShift AI (OCP AI in Red Hat shorthand) seriously around the end of February. On March 13, 2026 I sat EX267 and passed it on the first try.

A lot of people treat these exams as the endgame. I have never been able to. For me a certification is a trailhead, not a finish line. I tasted the product. The exam confirmed the taste was real. Now starts the part that actually matters: learning what is *not* documented, what does not work, and what just shipped.

> Real learning starts where the documentation ends.

The course material I worked from (AI267) was on RHOAI 2.25. RHOAI 3.3 had landed at the start of March. By the time I finished, the product had moved under my feet. That is fine. Versions move. What you learn underneath the version number stays.

## Why Red Hat Got the Timing Right Again

Eleven months ago I called myself a wave rider: Linux when open source became inevitable, virtualization when it was the new paradigm, then containers, then Kubernetes, then OpenShift. Riding the right wave at the right time was a pattern, not a coincidence.

I think Red Hat is doing it again.

OpenShift was the answer to containers and orchestration in production. OpenShift AI is the answer to MLOps in production. It is not perfect yet. The architecture is right.

The product is solving the same kind of problem the original OpenShift solved, translated into ML. Dependency hell. Except in ML, dependency hell is worse, because it includes hardware drivers, accelerator stacks, frameworks, runtimes, model serving stacks, and the cultural distance between data scientists and operators.

A modular Kubernetes-based platform that absorbs that complexity, gives you a smooth path from PoC to production, and hands DS, ML engineers, and ML devs hardware that is *ready to use* (drivers in place, libraries in place, runtimes in place, GPUs and AI accelerators visible to the workload), is genuinely valuable. The plumbing is solved. That alone is worth taking seriously.

## What is Actually in the Box

Installation is almost embarrassingly clean: an operator, plus a `DataScienceCluster` CR that enables the components you want. That is it.

Core components: `dashboard`, `datasciencepipelines`, `kserve`, `workbenches`. Optional ones: `codeflare`, `kueue`, `modelmeshserving`, `ray`, `trainingoperator`, `trustyai`. A few of these are dying or moving in 3.x: ModelMesh is out, CodeFlare is being absorbed into KubeRay, Serverless drops out, and Service Mesh has to be migrated to 3.x mainly because of Gateway API and SM's implementation of it. The platform is reshaping itself in public, which is exactly what you would expect from something this young and this central.

The four anchors of the surface area are:

- **Workbenches** for DS, ML engineers, and ML devs. Stateful, named, with PVCs attached, and S3-compatible data connections for artifacts. Locally, you can do everything on your laptop. For enterprise, where you cannot pull data home, where you collaborate with multiple people, and where you need traceability, the architecture choice is correct.
- **Pipelines** built on Argo Workflows, authored either in code with the KFP SDK in Python, or graphically with Elyra.
- **Model Serving** with multiple supported runtimes: Caikit standalone, TGIS, Caikit-TGIS, vLLM, OpenVINO. ONNX and OpenVINO get serious airtime, partly because ModelMesh is going away and the focus shifted.
- **Distributed workloads**, which in ML is not a nice-to-have. Training, and even serving heavy models, without distributed orchestration is not a real option.

User management is still primitive: OAuth, no proper RBAC. RBAC arrives in 3.x. That is a real gap right now and a sign of how young this platform still is.

## The Course: Where it Earned its Keep, and Where it Did Not

The DS Projects + Workbenches walkthrough was strong. The abstraction makes sense once you actually sit in it.

The ML hands-on chapter was more practical than I expected. Data preparation written from a DS perspective with usable code provided by the authors, then traditional ML in scikit-learn, then PyTorch and TensorFlow. A guided tour of the Python ML ecosystem: numpy, scipy, pandas, plotly, seaborn. Brief pointers to transformers, LangChain (which has effectively become LangGraph), and the bee agent framework (which is itself getting dropped in newer versions). Even the brief mentions are useful: they tell you what to go read next.

Distributed workloads got a teaser. Useful as orientation, but you only really understand it once you fight a real workload with real constraints. That fight is in front of me, not behind me.

Evaluation: this is where the earlier study paid off. Confusion matrix, precision, recall, sensitivity, specificity, accuracy as a sometimes-misleading comfort metric. Without that prework the section would have been thin. With it, it slotted in cleanly.

Model Serving is where the course wasted my time. It spent significant attention on ModelMesh, which is gone in 3.x. The pivot to ONNX and OpenVINO is the de facto direction now. You can argue the time was not wasted, that context matters, that you should know what came before. In operational terms it was time spent on a corpse.

Pipelines was strong. Real code, realistic examples. KFP became something I could actually reason about: defining components, decorating functions for `dsl.pipeline`, wiring things together. Then a section on Elyra. Elyra is fine. It is even nice for early adoption when teams are still finding their first pipeline. I do not see it as the enterprise endgame. Real teams will move into code, because pipelines deserve to live in version control, in review, and in tests.

## What I See Now

After the course I switched to release notes, internal updates, and roadmap signals. The pace is hard to keep up with, but a few things have already hardened in my head.

**OpenShift AI is its own product, even if the name suggests otherwise.** It runs on OpenShift, but the team is different, the priorities are different, the operating model is different. Treating it as "OpenShift with a checkbox for AI" is a category error. It is a separate product on a shared substrate.

**Red Hat is putting serious weight behind it.** Internally the dynamics are unmistakable. This is not a side bet. This is treated as the next center of gravity.

**This is the first product in my ten years at Red Hat that requires two competence sets at the same time: ML and Ops.** I have learned a lot of products. None of them sat across two communities the way this one does. Many features in release notes turn out, on close reading, to be curated libraries: gathered, packaged, certified, integrated. That is real work and it has real value, but to *feel* what they actually do, you have to roll up your sleeves and become a dev for the duration.

**MLOps is DevOps on steroids.** Same principles, much higher complexity, much less mature tooling, much wider blast radius if you get it wrong. I expect a lot more interaction with data scientists, ML engineers, and ML devs in the next few years. The customer side of this is going to look different from anything I have done before.

**Most customers do not yet appreciate the seriousness of AI/ML.** They have a vague picture, a cluster of buzzwords, and an expectation that "we will throw a model up." They do not yet see the complexity, the cost, the data requirements, or the operating effort. Red Hat's offering lands with the customers who *do* see it. Those customers will use the platform, succeed with it, and become reference points whether anyone uses that phrase or not. The rest will fail their first attempt, look at who succeeded, and copy. By the time that happens, OpenShift AI will already be past the feature-definition phase and into the "make it good for everyone" phase.

That is a healthy adoption curve, not a problem.

## Closing

The exam is closed. The product is in my hands. The roadmap is being edited as I walk it.

I have a gut feel about OpenShift AI. It is the right direction. I am glad I went in.

Real learning starts now. The undocumented, the broken, the just-shipped. That is the work.
