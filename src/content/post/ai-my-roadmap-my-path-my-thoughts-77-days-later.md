---
title: "AI: My Roadmap, My Path, My Thoughts (77 Days Later)"
description: "Reflection on 77 days of relentless AI learning, cognitive strategies, and the coming human era."
publishDate: "2025-08-31T21:00:00Z"
tags: ["AI", "learning", "Berkeley", "career", "reflection"]
hidden: false
---

# 🧭 AI: My Roadmap, My Path, My Thoughts (77 Days Later)

When I look back at the past 77 days, I see a clear line connecting my entire career in IT to where I stand today.  
I’ve always been a “wave rider”:

- Linux in the late years, once open source became unstoppable.  
- Virtualization, when it was the new paradigm.  
- Containers, followed by Kubernetes orchestration.  
- OpenShift, scaling the ecosystem further.  

I saw the rise of data science, but avoided it — mostly because of my lack of math, statistics, and probability. Like many, I encountered GPT in 2023 and sensed its potential, but I let 2024 slip by without a plan.  

Then 2025 came. Regenerated, hungry, fully awake. Around April I stepped into the AI jungle. It was overwhelming: endless courses, strange names, no taxonomy, no clear “what’s next.”  
That chaos convinced me I needed a plan. Chris Gardner once said: *“Everyone has a dream, but not everyone has a plan.”* If I was going to invest months into this journey, the plan itself would be the most critical piece.  

After weeks of research, conversations, and exploration, I started mapping anchor points. That became my [AI Roadmap 2025–2028](https://olimp.run/posts/ai-strategy-roadmap-2025-2028/).  

---

## 🚶 The Path – 77 Days of Relentless Learning

For the past three months, I have lived and breathed AI every single day. Courses, books, notes — and, equally important, cognitive psychology techniques: generalization, 5 Whys, stretching and compressing concepts, analogies, Feynman technique, associations, active coding, and creating memory traces. Every morning, during a 45-minute walk with my dog, I repeated what I had learned the day before. That ritual turned knowledge into habit.  

I built my first mind map from an Udemy course (*AI Engineer 2025*). It had gaps, but gave me orientation. Kai-Fu Lee’s *AI Superpowers* fueled my “healthy fear.” Melanie Mitchell’s *AI: A Guide for Thinking Humans* balanced it with skepticism about AGI and ASI. Some courses were shallow (“AI for Professionals” — pure tool-listing, no depth), but others raised my level significantly — especially Red Hat’s Expert Extras and the *Red Hat AI Foundations Technologist Certificate*. At that point, I began spotting simplifications and even factual errors in high-level material.  

Finally, I wrapped up with Andrew Ng’s *AI for Everyone*, which I could approach easily by then. On August 31, 2025, I feel I have built strong foundations. In two days, on September 2, I start the **UC Berkeley Executive Education: Artificial Intelligence – Business Strategies and Applications** program. It gathers professors, C-levels, and senior professionals. I go there prepared — not to sip with a teaspoon, but to collect with buckets.  

---

## 📚 What I Learned

My flashcards tell a story — a journey from first definitions to the inner workings of modern AI systems.

I started with the **big picture**: what intelligence means, how AI is divided into fields like ML, CV, NLP, knowledge representation, and generative AI. I learned to classify AI by capability levels — from narrow AI to AGI and ASI — and saw that the dividing line is adaptability across tasks. This gave me the taxonomy I needed to not get lost.

Then I moved into **Machine Learning fundamentals**. I understood that ML is about training mathematical functions on data instead of hand-coding rules, and that the model is just the trained function with parameters (weights, biases). I mapped out the main paradigms: supervised, unsupervised, and reinforcement learning. Supervised meant classification and regression. Unsupervised meant clustering and PCA. RL meant agents, actions, rewards, policies, and trial-and-error learning. Already here I saw a core principle: it’s the data quality, not the algorithm, that dominates outcomes.

Next came **traditional algorithms**: linear regression, logistic regression, decision trees, k-NN, SVMs. I drilled into their internals: loss functions, splitting, regression to the mean. That made me comfortable reading models as functions, not black boxes.

From there I entered **neural networks**. I broke them down neuron by neuron: values, weights, biases, activations. I saw the role of layers — input, hidden, output — and how depth and width shape capacity. Overfitting was no longer an abstract warning; it was a structural risk of too many parameters on too little data. I learned why stopping criteria matter, and how preprocessing (resize, normalize) prepares data.

This led me into **deep learning**. CNNs taught me how convolutions and receptive fields work, and how architectures like U-Net and GANs emerged from them for segmentation and generation. I discovered diffusion models as a new generative paradigm, and NeRF for 3D scenes. I saw that hybrid architectures (LLM + diffusion) are the frontier of multimodal AI.

In parallel, I dug into **NLP**. First n-grams, then RNNs and LSTMs, and why they struggled with long context. Then came embeddings: vectors in high-dimensional space capturing semantics, where “king – man + woman ≈ queen.” That insight unlocked how transformers work: tokenization, embeddings, positional encodings, and attention. Attention stopped being a buzzword — it became the weighting mechanism that makes global context possible. Transformers showed me why parallelism beat sequential RNNs, and why d_model is the backbone width of the system.

Finally, I arrived at **LLMs as systems**. I mapped the whole lifecycle: model design, dataset curation, pretraining, evaluation, supervised fine-tuning, RLHF, testing. I learned prompt engineering as a discipline of its own. I studied RAG as a way to graft external knowledge into models. And I looked at evaluation: factuality vs faithfulness, hallucinations, inconsistency, and the knobs that drive generation — temperature, top-p, top-k, seed.

The last layer was **ethics and trust**. I didn’t treat it as an afterthought. I learned about fairness, transparency, bias, and why safety is a technical problem, not a political slogan.  

---

### 🔑 What Was Hardest

Not everything came smoothly. A few things consumed disproportionate time and energy:

- **Taxonomy.** Building consistent taxonomies of AI turned out harder than expected. Most authors present only one angle, ignoring that different aspects (by capability, by paradigm, by domain) overlap. Untangling that chaos and making a coherent map was surprisingly difficult.  
- **Ethics.** I assumed AI ethics would be lightweight, but it turned into a large body of material with real depth. It was not something to “skim over.”  
- **Embeddings & latent space.** Understanding how tokens are encoded into vectors, how embeddings form semantic neighborhoods, and how latent spaces behave was probably the single hardest concept.  
- **Transformers.** Closely tied to embeddings, transformers required a lot of iteration before I could visualize how tokens flow through attention and layers.  
- **Traditional ML & probabilistic models.** I wanted to understand them “under the hood,” which meant going deep into loss functions, splits, Markov chains, Bayesian networks. This slowed me down, but made the foundation stronger.  
- **Confusion between models.** At one point, I struggled because I was learning simple MLPs on MNIST while simultaneously trying to grasp CNNs and normalizing flows. My mental models of “where neurons are and what they do” clashed until I sorted them out.  

---

In the end, these difficulties became the most valuable part of the journey. They forced me not only to *know* the definitions, but to *rebuild my mental models* until they matched reality.

## 💭 Thoughts – Fear, Hope, and the Next Human Era

Through these months, I confronted my own “fears.” Not pejorative fears, but fuel — a reminder that time is short. Kai-Fu Lee amplified this urgency, while Melanie Mitchell tried to calm it. Geoffrey Hinton, in interviews, showed the inevitability of what’s coming.  

Another great revolution is unfolding — one that hits white-collar jobs first. Specialized blue-collar work (a plumber, for example) will be safe for longer, but the direction is clear. Policies already show preparation: shorter workweeks, universal basic income pilots (e.g., by Y Combinator, where Sam Altman was involved), and [reports that consistently forecast a bleak outlook for jobs](https://olimp.run/posts/ai/kai-fu-lee/chapter6-reflection/).  

This led me to broader reflections. The Industrial Revolution shifted us from the **Physical Era** (muscles) to the **Mental Era** (intellect). AI is now challenging the mental domain — machines will outperform us in intellectual tasks. What’s next? Perhaps a **Personal and Spiritual Era**, where humans finally have space to grow emotionally, socially, and spiritually.  

Thinkers like Sadhguru and Michael Brown (*The Presence Process*) highlight this path: focusing not on running endlessly in the wheel, but on inner growth. Most people will drown in passivity, but a minority could use this shift to build a better, more meaningful life — maybe even a utopia.  

And one provocative thought I borrow with conviction: better to be governed by AI than by corrupt, shortsighted politicians. At least AI could be transparent, structured, and rational.  

Because even in 2025, humanity remains emotionally underdeveloped. This revolution might finally force us to address that gap.  

