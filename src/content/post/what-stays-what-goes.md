---
title: "What Stays, What Goes"
description: "After EX267, the RHOAI 3.3 release notes raised a sharper question than 'what changed': what do I let into my head, and on what filter?"
publishDate: "2026-05-10T21:00:00Z"
tags: ["reflection", "personal growth", "learning", "career", "mental models", "parenting", "ai"]
hidden: false
---

EX267 done. AI267 internalised. Two days after I [wrote about going hands-on](https://olimp.run/posts/ocp-ai-field-notes-after-ex267/), I opened the RHOAI 3.3 release notes and started reading.

I expected to be impressed. I was not. I was tired before page two.

Not because the content is bad. Because the content is *enormous*. New GA features, new technology previews, new developer previews, deprecations, removals, even documentation inconsistencies. Each item is real work for somebody. Each item is also a small claim on my attention.

The first reaction was not technical curiosity. It was operational: *what do I absorb here, and what do I drop on sight?*

That is not a question about OpenShift AI. That is a question about how I spend my days.

## Pompliano, Extended

In January I [wrote about Anthony Pompliano](https://olimp.run/posts/learning-without-mentors-pompliano-incredible-life/), and one frame stuck with me. It came from his wife: a *content diet*. You guard your nutrition. You do not guard your inputs. *Why feed your brain junk and expect clarity?*

The original target was the obvious noise. News cycles. Outrage feeds. Algorithmic timelines designed to keep you angry and scrolling.

I want to extend it.

Junk is not only the obvious junk. There is a second layer, and it wears the costume of work. Things that look productive, look technical, look career-relevant. Things that do not compound. You spend two months on them. They get deprecated. You did not build anything that stays.

A 3.x release notes flood is exactly that mirror. Some of it is durable. A lot of it is noise wearing a tie.

## The Quiet Self-Reproach

Here is the part I do not say at work.

For the last few years I have been catching myself in the same internal complaint. I spend long hours learning things that some developer somewhere invented, that the project they work on packaged into a release, and that the next release will quietly remove. I am studying frameworks with shelf lives shorter than a master's degree.

If I had spent those same hours on mathematics. On physics. On something that compounds for decades and not for product cycles. I would be in a different place by now.

That sentence is real. It is not rhetorical. It sits in my head most weeks.

I am not saying I want to drop everything and become a graduate student in topology. I am saying *the trade-off is honest*. The hours I burn on a deprecated runtime are hours I do not spend on something that would still be load-bearing in 2040.

## The Evidence

The question is not hypothetical. I just opened the release notes.

In 3.x, the model serving stack has consolidated to one path. TGIS standalone is gone. Caikit-NLP is gone. Caikit Standalone is deprecated. The OpenVINO Model Server plugin is deprecated. ModelMesh is gone. KServe Serverless is gone. What remains is KServe RawDeployment, vLLM as the main runtime, and llm-d for distributed inference. That is not a refactor. That is an entire ecosystem of runtime choices being collapsed into a single stack across a handful of releases.

The training stack flipped in the same window. KFTOv1 deprecated. Kubeflow Trainer v2 went GA in 3.3 after one release as Technology Preview. A generation change in the main training mechanism, completed inside the time it took me to study the previous version.

Two operators were extracted and replaced. CodeFlare Operator removed in favour of KubeRay. Embedded Kueue removed in favour of Red Hat Build of Kueue, with OCP 4.18 as a hard prerequisite.

In parallel, new surface area appeared and started growing fast. Llama Stack with FIPS, air-gap, single-node, OpenAI-compatible citations, FAISS, RAGAS, all just in 3.3. Model Catalog with Hugging Face integration and governance. Model-as-a-Service. Hardware Profiles replacing Accelerator Profiles. Feature Store. Generative AI Studio. TrustyAI Guardrails Orchestrator.

Read against my study notes from two months ago, the picture is uncomfortable. I learned ModelMesh patterns. They are gone. I learned the ONNX runtime lineage that came with ModelMesh. It is collapsing. I learned KFTOv1 conventions. They are deprecated.

None of that is wasted in absolute terms. The architectural reasoning transfers. The mental models survive. But specific knowledge of specific surfaces? Some of it expired before I finished writing it down.

This is the world the question lives in. The filter is not optional.

## Two Tracks

So why do I keep doing this work?

Because life has its rules. There is a family. There is a mortgage. There is the job that pays both. None of that is a transcendent philosophical choice. It is a base condition. Pretending otherwise would be theatre.

Once I accept the base condition, the question is no longer *should I do this work*. The question is *if I am doing it, on what terms?* And the answer is: sharp ones.

The filter for paid work is the client value chain. Time saved. Money saved. Risk eliminated. Anything I learn that does not eventually translate into one of those three at a customer site is, for me, a candidate for the drop pile. Not because it is uninteresting. Because it does not compound on the track I am paid to run on.

That is not ideology. That is hygiene of attention.

Then there is the second track.

Free time is not for fun. Or rather, it is not *only* for fun. Discipline says that the so-called fun things actually taste better when there is contrast, when most of what you do is the thing you must do, done well. The remaining hours, the deliberate ones, do not need to go to entertainment. They can go to the things I keep telling myself I should be doing.

That is where mathematics and physics come back into the picture.

And not for love of the subject. I am not a closet mathematician. I am a man with a daughter who is going to spend the next fifteen years walking through education, and I want to be useful to her for the entire walk. That requires a brain that is still working, still flexible, still capable of carrying real material. Mathematics and physics do that to a brain. They also give me something concrete to hand her when she runs into the wall, which she will, because everyone does.

Two compounds. One direction is the client. The other direction is me, and through me, my daughter. Neither is junk. Both are intentional.

## Closing

Two tracks. The first pays. The second compounds cognitive capacity and prepares me to be useful to my daughter for the next fifteen years.

The filter on both tracks is the same: *does this compound, or is this noise?*

The rest is discipline.
