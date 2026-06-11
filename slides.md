---
theme: default
title: Phyelds
titleTemplate: '%s'
colorSchema: light
routerMode: hash
mdc: true
selectable: true
layout: default
class: first-slide
transition: slide-left
defaults:
  layout: default
  transition: slide-left
---

<div class="cover-badges">
  <div class="cover-badge badge-available" role="img" aria-label="Artifacts Available"></div>
  <div class="cover-badge badge-reusable" role="img" aria-label="Artifacts Evaluated — Reusable"></div>
</div>

<div class="cover-qr-row" style="position: absolute; top: 1.4rem; left: 1.6rem; display: flex; gap: 1rem; align-items: center; z-index: 10;">
  <QrCard title="Repository" url="https://github.com/phyelds/phyelds" short="github.com/.../phyelds" :size="6.5" />
  <QrCard title="Binder Demo" url="https://mybinder.org/v2/gh/phyelds/phyelds-examples/HEAD?urlpath=%2Fdoc%2Ftree%2F%2Fbinder%2Fphyelds-example.ipynb" short="Interactive demo" :size="6.5" />
</div>

<div class="cover-center-shell">
  <div class="cover-logo-wrap">
    <PhyeldsLogo />
  </div>

  <h2 class="cover-subtitle">A Pythonic Framework for Aggregate Computing</h2>


  <div class="cover-meta-row">
    <div class="cover-mini-meta"><strong style="color: var(--deck-orange);">Gianluca Aguzzi</strong> · Davide Domini · Nicolas Farabegoli · Mirko Viroli</div>
    <div class="cover-mini-meta">University of Bologna</div>
  </div>

  <p class="cover-kicker">COORDINATION 2026 · Urbino · 11 June 2026</p>

</div>

---
layout: default
class: stage-slide
---

<div class="slide-shell">

# Why coordinating large networks is still hard?

- The goal: engineer <span class="u-solid-teal">emergent global behavior</span> from purely <span class="mark-teal">local interactions</span>.
- The setting is inherently <span class="mark-orange">open</span> (devices join and leave), <span class="mark-teal">dynamic</span> (topology and conditions keep changing), and gives each node only <span class="mark-green">partial information</span>.
- Yet traditional <span class="u-solid-orange">device-centric</span> code tangles collective logic with low-level mechanics — message passing, retries, state synchronization.



<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.4rem; margin-top: 0.7rem;">
  <div v-click style="border-top: 2px solid var(--deck-teal); padding-top: 0.45rem;">
    <div style="font-weight: 700; color: var(--deck-teal);">Where it matters</div>
    <div style="font-size: 0.82rem; color: var(--deck-muted); line-height: 1.35;">Sensor networks, edge-cloud systems, robot swarms, federated learning.</div>
  </div>
  <div v-click style="border-top: 2px solid var(--deck-green); padding-top: 0.45rem;">
    <div style="font-weight: 700; color: var(--deck-green);">The bottleneck</div>
    <div style="font-size: 0.82rem; color: var(--deck-muted); line-height: 1.35;">As the network grows, reasoning about <span class="u-solid-orange">global system state</span> becomes the real engineering cost.</div>
  </div>
  <div v-click style="border-top: 2px solid var(--deck-orange); padding-top: 0.45rem;">
    <div style="font-weight: 700; color: var(--deck-orange);">Needed abstraction</div>
    <div style="font-size: 0.82rem; color: var(--deck-muted); line-height: 1.35;">Describe the <span class="u-solid-teal">collective behavior</span>, keep local execution underneath.</div>
  </div>
</div>


</div>

---
layout: default
class: stage-slide
---

<div class="slide-shell" style="gap: 0.6rem;">

# Aggregate Computing
## A macroprogramming top-down approach to coordination

<div class="visual-box visual-box-wide" style="margin: 0 auto 0.2rem;">
  <AggregateFlow :click="$clicks" />
</div>

<v-clicks>

- Over a distributed network, an aggregate program manipulates an <span class="u-solid-teal">evolving computational field</span><sup class="cite">[1,3]</sup> 
  - a distributed data structure mapping every device to a value across the continuum.
- Richer behaviour is <span class="u-solid-orange">composed</span> from simpler fields through functional operators (<code>f ∘ g</code>)
  -  modular, reusable coordination building blocks.
- Each device runs only <span class="mark-orange">local</span> code, yet a <span class="mark-teal">global self-organizing behaviour emerges</span> 
  - so developers reason about the whole from local rules.

</v-clicks>

<Cites refs="1,3" />

</div>

---
layout: default
class: viz-slide
---

<div class="slide-shell">

# Self-organizing-like local rounds

<div class="split-grid">

<div>

<ul>
  <li><strong>Each round consists of three repeated phases:</strong>
    <ul>
      <li v-click="1">
        <strong style="color: var(--deck-orange);">1. Sense</strong> — collect sensor inputs & incoming neighbor messages.
      </li>
      <li v-click="2">
        <strong style="color: var(--deck-teal);">2. Compute</strong> — run local state evaluation logic to produce <span class="mark-teal">new state</span> and <span class="mark-green">outbound messages</span>.
      </li>
      <li v-click="3">
        <strong style="color: var(--deck-green);">3. Interact / Act</strong> — share results & interact with physical neighbors.
      </li>
    </ul>
  </li>
  <li v-click="4">Rounds are <span class="u-solid-orange">asynchronous</span>: there is no global lock-step.</li>
</ul>

</div>

<div class="visual-box">
  <LocalRoundLoop :click="$clicks" />
</div>
</div>
</div>

---
layout: default
class: stage-slide
---

<div class="slide-shell" style="gap: 0.5rem;">

# A Decade of Applications
## Aggregate computing already has a proven track record

<div style="margin-top: 0.2rem; color: var(--deck-muted); font-size: 0.92rem;">
Born for <span class="u-solid-teal">large-scale coordination</span>, it has been applied across many domains where <span class="mark-teal">global behavior</span> emerges from <span class="mark-green">local interactions</span><sup class="cite">[1,2]</sup>:
</div>

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.4rem; margin-top: 0.7rem;">
  <div style="border-top: 2px solid var(--deck-teal); padding-top: 0.45rem;">
    <div style="font-weight: 700; color: var(--deck-teal);">Sensor Networks</div>
    <div style="font-size: 0.82rem; color: var(--deck-muted); line-height: 1.35;">Distributed <span class="mark-teal">sensing</span> &amp; monitoring over dense device fields.</div>
  </div>
  <div style="border-top: 2px solid var(--deck-green); padding-top: 0.45rem;">
    <div style="font-weight: 700; color: var(--deck-green);">Swarm Robotics</div>
    <div style="font-size: 0.82rem; color: var(--deck-muted); line-height: 1.35;">Collective movement, flocking &amp; <span class="mark-green">self-organizing</span> teams.</div>
  </div>
  <div style="border-top: 2px solid var(--deck-orange); padding-top: 0.45rem;">
    <div style="font-weight: 700; color: var(--deck-orange);">Smart Cities &amp; IoT</div>
    <div style="font-size: 0.82rem; color: var(--deck-muted); line-height: 1.35;">Crowd-aware services across the <span class="mark-orange">edge–cloud continuum</span>.</div>
  </div>
</div>

<div style="margin-top: 0.8rem; color: var(--deck-muted); font-size: 0.92rem;" v-click>
And two <span class="u-solid-orange">emerging frontiers</span> where the synergy with modern AI runs <span class="u-solid-orange">both ways</span><sup class="cite">[9,10]</sup>:
</div>

<v-clicks>
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.4rem; max-width: 820px; margin: 0.5rem auto 0;">
  <div style="border-left: 3px solid var(--deck-green); padding-left: 0.65rem; font-size: 0.9rem; line-height: 1.4;">
    <span style="font-weight: 700; color: var(--deck-green);">Federated Learning</span> — AC orchestrates <span class="mark-green">scalable, decentralized</span> model training.
  </div>
  <div  style="border-left: 3px solid var(--deck-teal); padding-left: 0.65rem; font-size: 0.9rem; line-height: 1.4;">
    <span style="font-weight: 700; color: var(--deck-teal);">Multi-Agent RL</span> — ML brings <span class="mark-teal">data-driven adaptation</span> into aggregate programs.
  </div>
</div>

</v-clicks>
<Cites refs="1,2,9,10" />

</div>

---
layout: default
class: stage-slide
---

<div class="slide-shell">

# The Gap
## ...but those two frontiers are hard to reach in practice


- The hardest part of <span class="mark-green">federated learning</span> and <span class="mark-teal">RL / MARL</span> is exactly <span class="u-solid-teal">coordination</span> — precisely what aggregate computing does best.
- So pushing those frontiers should be easy... yet a <span class="u-solid-orange">practical barrier</span> gets in the way — and it starts with the <span class="mark-orange">tooling</span>.
- The paradigm does have <span class="u-solid-teal">mature, real-world implementations</span> — but all of them target the JVM / C++:


<div style="display: flex; gap: 3rem; justify-content: center; align-items: baseline; margin: 0.7rem auto 0.4rem;" v-click>
  <div style="text-align: center;">
    <div style="font-weight: 700; color: var(--deck-teal); font-size: 1.2rem; border-bottom: 2px solid var(--deck-teal); padding-bottom: 0.2rem;">Protelis</div>
    <div style="font-size: 0.68rem; color: var(--deck-muted); letter-spacing: 0.1em; text-transform: uppercase; margin-top: 0.3rem;">Java</div>
  </div>
  <div style="text-align: center;">
    <div style="font-weight: 700; color: var(--deck-orange); font-size: 1.2rem; border-bottom: 2px solid var(--deck-orange); padding-bottom: 0.2rem;">ScaFi</div>
    <div style="font-size: 0.68rem; color: var(--deck-muted); letter-spacing: 0.1em; text-transform: uppercase; margin-top: 0.3rem;">Scala</div>
  </div>
  <div style="text-align: center;">
    <div style="font-weight: 700; color: var(--deck-green); font-size: 1.2rem; border-bottom: 2px solid var(--deck-green); padding-bottom: 0.2rem;">FCPP</div>
    <div style="font-size: 0.68rem; color: var(--deck-muted); letter-spacing: 0.1em; text-transform: uppercase; margin-top: 0.3rem;">C++</div>
  </div>
</div>

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.4rem; margin-top: 0.7rem;">
  <div v-click style="border-top: 2px solid var(--deck-teal); padding-top: 0.45rem;">
    <div style="font-weight: 700; color: var(--deck-teal);">...but JVM / C++ only</div>
    <div style="font-size: 0.82rem; color: var(--deck-muted); line-height: 1.35;">Those proven ecosystems all live on the <span class="mark-orange">JVM / C++</span>.</div>
  </div>
  <div v-click style="border-top: 2px solid var(--deck-green); padding-top: 0.45rem;">
    <div style="font-weight: 700; color: var(--deck-green);">ML lives in Python</div>
    <div style="font-size: 0.82rem; color: var(--deck-muted); line-height: 1.35;">AI/ML practitioners and (some of) roboticists work in <span class="mark-teal">Python</span>.</div>
  </div>
  <div v-click style="border-top: 2px solid var(--deck-orange); padding-top: 0.45rem;">
    <div style="font-weight: 700; color: var(--deck-orange);">So the two stay apart</div>
    <div style="font-size: 0.82rem; color: var(--deck-muted); line-height: 1.35;">Without native field calculus in Python, the communities never really meet.</div>
  </div>
</div>

</div>

---
layout: default
class: stage-slide
---

<div class="slide-shell">

# Bridging the Gap
## ...so we bring field calculus natively into Python

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.4rem; margin-top: 1rem;">
  <div style="border-top: 2px solid var(--deck-teal); padding-top: 0.45rem;">
    <div style="font-weight: 700; color: var(--deck-teal);">Pythonic API</div>
    <div style="font-size: 0.82rem; color: var(--deck-muted); line-height: 1.35;">Coordination logic looks like standard, idiomatic Python instead of a functional DSL.</div>
  </div>
  <div  style="border-top: 2px solid var(--deck-green); padding-top: 0.45rem;">
    <div style="font-weight: 700; color: var(--deck-green);">Lightweight Core</div>
    <div style="font-size: 0.82rem; color: var(--deck-muted); line-height: 1.35;">A micro-runtime built with modular, reusable, and highly extensible internals.</div>
  </div>
  <div style="border-top: 2px solid var(--deck-orange); padding-top: 0.45rem;">
    <div style="font-weight: 700; color: var(--deck-orange);">Integration-First</div>
    <div style="font-size: 0.82rem; color: var(--deck-muted); line-height: 1.35;">Designed to connect with <span class="mark-teal">ML libraries</span>, <span class="mark-orange">notebooks</span>, and <span class="mark-green">simulators</span>.</div>
  </div>
</div>

<div style="margin-top: 1.2rem; max-width: 820px; margin-left: auto; margin-right: auto;">
  <div style="border-left: 3px solid var(--deck-teal); padding-left: 0.65rem; font-size: 0.9rem; line-height: 1.4;">
    <span style="font-weight: 700; color: var(--deck-teal);">Target ecosystem</span> —
    <span class="mark-teal" style="font-weight: 600;">PyTorch &amp; JAX</span> ·
    <span class="mark-orange" style="font-weight: 600;">Jupyter</span> ·
    <span class="mark-green" style="font-weight: 600;">VMAS &amp; Mujoco</span>
  </div>
</div>

<div style="display: flex; gap: 1.6rem; align-items: center; justify-content: center; margin-top: 0.6rem;">
  <QrCard title="Repository" url="https://github.com/phyelds/phyelds" short="github.com/.../phyelds" :size="5.4" />
  <QrCard title="Binder Demo" url="https://mybinder.org/v2/gh/phyelds/phyelds-examples/HEAD?urlpath=%2Fdoc%2Ftree%2F%2Fbinder%2Fphyelds-example.ipynb" short="Interactive demo" :size="5.4" />
</div>

</div>


---
layout: default
class: stage-slide
clicks: 2
---

<div class="slide-shell">

# Architecture at a glance


<ArchitectureOverview :click="$clicks" />

</div>

---
layout: default
class: code-slide
---

<div class="slide-shell">

# Core API 1: the engine loop

```python {all|3-7|8|9|all}
from phyelds import engine

engine.get().setup(
    node_context=node_ctx,
    messages=received_messages,
    state=previous_state,
)
result = my_aggregate_program()
new_state, outbound = engine.get().cooldown()
```

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.4rem; margin-top: 0.7rem;">
  <div v-click="1" style="border-top: 2px solid var(--deck-teal); padding-top: 0.45rem;">
    <div style="font-weight: 700; color: var(--deck-teal);">Setup</div>
    <div style="font-size: 0.82rem; color: var(--deck-muted); line-height: 1.35;"><code class="mono mark-teal">setup</code> injects local context, inbound messages, and previous state.</div>
  </div>
  <div v-click="2" style="border-top: 2px solid var(--deck-green); padding-top: 0.45rem;">
    <div style="font-weight: 700; color: var(--deck-green);">Run</div>
    <div style="font-size: 0.82rem; color: var(--deck-muted); line-height: 1.35;">The aggregate program runs as plain Python in the active VM.</div>
  </div>
  <div v-click="3" style="border-top: 2px solid var(--deck-orange); padding-top: 0.45rem;">
    <div style="font-weight: 700; color: var(--deck-orange);">Cooldown</div>
    <div style="font-size: 0.82rem; color: var(--deck-muted); line-height: 1.35;"><code class="mono mark-orange">cooldown</code> returns the new state and outbound messages.</div>
  </div>
</div>


</div>

---
layout: default
class: code-slide
---

<div class="slide-shell">

# Core API 2: remember and neighbors

<div class="section-lead">
  Two primitives, two dimensions of field interaction — <span class="mark-teal">time</span> and <span class="mark-orange">space</span>.
</div>

<div class="split-grid" style="grid-template-columns: 1fr 1fr; align-items: start; gap: 1.5rem; margin-top: 0.2rem;">

<div>

<div style="font-weight: 600; color: var(--deck-teal); margin-bottom: 0.4rem;"> Temporal interaction <span style="font-weight: 500; color: var(--deck-muted);">— how a field evolves over time </span></div>

```python {all|3|4|all}
@aggregate
def counter():
    set_value, value = remember(0)
    set_value(value + 1)
    return value
```

</div>

<div v-click="4">

<div style="font-weight: 600; color: var(--deck-orange); margin-bottom: 0.4rem;"> Spatial interaction <span style="font-weight: 500; color: var(--deck-muted);">— query &amp; aggregation over neighbors</span></div>

```python {all|3|4|all}
@aggregate
def max_of(my_value):
    nbr_values = neighbors(my_value)
    return max(nbr_values.values())
```


</div>

</div>

</div>

---
layout: default
class: stage-slide
---

<div class="slide-shell">

# Core API 3: Rich building blocks

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.4rem; margin-top: 1.2rem;">
  <div style="border-top: 2px solid var(--deck-teal); padding-top: 0.45rem;">
    <div style="font-weight: 700; color: var(--deck-teal); font-size: 1.05rem; margin-bottom: 0.5rem;">Space, Time &amp; Distance</div>
    <div style="font-size: 0.82rem; line-height: 1.45; color: var(--deck-muted);">
      <ul style="padding-left: 1.1rem; margin: 0;">
        <li><strong>Device:</strong> <code class="mono">local_id</code>, <code class="mono">local_position</code>, <code class="mono">sense</code></li>
        <li><strong>Time:</strong> <code class="mono">time</code>, <code class="mono">decay</code></li>
        <li><strong>Distances:</strong> Euclidean / hop-count</li>
      </ul>
    </div>
  </div>

  <div style="border-top: 2px solid var(--deck-green); padding-top: 0.45rem;">
    <div style="font-weight: 700; color: var(--deck-green); font-size: 1.05rem; margin-bottom: 0.5rem;">Spread &amp; Aggregation</div>
    <div style="font-size: 0.82rem; line-height: 1.45; color: var(--deck-muted);">
      <ul style="padding-left: 1.1rem; margin: 0;">
        <li><strong>Spread:</strong> <code class="mono">distance_to</code>, <code class="mono">broadcast</code></li>
        <li><strong>Collect:</strong> <code class="mono">collect_with</code>, <code class="mono">count_nodes</code></li>
        <li><strong>Gossip:</strong> <code class="mono">gossip_max</code> / <code class="mono">min</code></li>
      </ul>
    </div>
  </div>

  <div style="border-top: 2px solid var(--deck-orange); padding-top: 0.45rem;">
    <div style="font-weight: 700; color: var(--deck-orange); font-size: 1.05rem; margin-bottom: 0.5rem;">Regional Organization</div>
    <div style="font-size: 0.82rem; line-height: 1.45; color: var(--deck-muted);">
      <ul style="padding-left: 1.1rem; margin: 0;">
        <li><strong>Elect:</strong> <code class="mono">elect_leaders</code></li>
        <li><strong>Partition:</strong> Voronoi regions</li>
        <li><strong>Coordinate:</strong> <code class="mono">collect</code> → <code class="mono">broadcast</code></li>
      </ul>
    </div>
  </div>
</div>


</div>

---
layout: default
class: stage-slide
---

<div class="slide-shell">

# Channel: from source to target

<div class="split-grid" style="grid-template-columns: 1.1fr 0.9fr; gap: 1.5rem; align-items: center; margin-top: 0.5rem;">

<div>

- **Goal:** a robust channel from a <span class="mark-green">source</span> ($S$) to a <span class="mark-orange">target</span> ($T$).
- **Built** from simple blocks<sup class="cite">[2,5]</sup>: neighbor distances → <span class="u-solid-orange">distance gradient</span> → shortest path → <span class="mark-teal">width</span>.
- **Self-stabilizing & redundant:** adapts to failures, message loss, and movement.

</div>

<div style="text-align: center;">
  <div class="visual-box" style="padding: 0.5rem;">
    <ChannelEvolution />
  </div>
</div>

</div>

<Cites refs="2,5" />

</div>

---
layout: default
class: viz-slide
---

<div class="slide-shell">

# Channel: step-by-step construction

<div class="split-grid" style="grid-template-columns: 520px 1fr; gap: 1.5rem; align-items: start; margin-top: 0.2rem;">

<div style="font-size: 0.63rem; width: 520px; overflow: hidden; display: flex; flex-direction: column;">

```python {all|3|4|5|6-10|11-13|all}
@aggregate
def main(width):
    distances = neighbors_distances()
    d_source = distance_to(sense("source"), distances)
    d_target = distance_to(sense("target"), distances)
    d_target_source = broadcast(
        sense("target"), 
        d_source, 
        distances
    )
    channel = 1.0 if 
        d_source + d_target <= d_target_source + width 
        else 0.0
    return channel
```

<div class="code-caption" style="margin-top: 0.5rem; font-size: 0.76rem; line-height: 1.45;">
  <span v-if="$clicks <= 1">
    <strong style="color: var(--deck-teal);">endpoints</strong> — Build local geometric view with neighbor distances.
  </span>
  <span v-else-if="$clicks === 2">
    <strong style="color: var(--deck-teal);">source gradient</strong> — Compute distance field from source <code class="mono">S</code>.
  </span>
  <span v-else-if="$clicks === 3">
    <strong style="color: var(--deck-orange);">target gradient</strong> — Compute distance field from target <code class="mono">T</code>.
  </span>
  <span v-else-if="$clicks === 4">
    <strong style="color: var(--deck-orange);">distance S-T</strong> — Share source distance from target to obtain <code class="mono">d(S,T)</code>.
  </span>
  <span v-else>
    <strong style="color: var(--deck-green);">channel</strong> — Check inequality: <code class="mono">d_source + d_target &le; d_target_source + width</code>.
  </span>
</div>

</div>

<div style="text-align: center;">
  <div class="visual-box" style="margin-bottom: 0.5rem;">
    <ChannelEvolution :click="$clicks" />
  </div>
</div>

</div>

</div>

---
layout: default
class: stage-slide
---

<div class="slide-shell">

# What is Federated Learning?
## Collaborative learning without ever sharing the data

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.4rem; margin-top: 0.9rem;">
  <div  style="border-top: 2px solid var(--deck-teal); padding-top: 0.45rem;">
    <div style="font-weight: 700; color: var(--deck-teal);">Federated Learning (FL)</div>
    <div style="font-size: 0.82rem; color: var(--deck-muted); line-height: 1.35;">Many devices <span class="mark-teal">collaboratively train</span> a shared model while keeping their data <span class="mark-green">local and private</span><sup class="cite">[8]</sup>.</div>
  </div>
  <div  style="border-top: 2px solid var(--deck-green); padding-top: 0.45rem;">
    <div style="font-weight: 700; color: var(--deck-green);">The catch</div>
    <div style="font-size: 0.82rem; color: var(--deck-muted); line-height: 1.35;">Classic FL leans on a <span class="mark-orange">central server</span> to coordinate rounds — a single point of failure and a <span class="u-solid-orange">scalability bottleneck</span>.</div>
  </div>
  <div  style="border-top: 2px solid var(--deck-orange); padding-top: 0.45rem;">
    <div style="font-weight: 700; color: var(--deck-orange);">Self-Organizing FL</div>
    <div style="font-size: 0.82rem; color: var(--deck-muted); line-height: 1.35;">Devices <span class="u-solid-teal">autonomously form federations</span><sup class="cite">[9,10]</sup>, each learning a specialized model tuned to <span class="mark-green">local (non-IID)</span> data.</div>
  </div>
</div>

<div style="margin-top: 1.1rem; max-width: 820px; margin-left: auto; margin-right: auto;" v-click>
  <div style="border-left: 3px solid var(--deck-teal); padding-left: 0.65rem; font-size: 0.9rem; line-height: 1.4;">
    <span style="font-weight: 700; color: var(--deck-teal);">Why aggregate computing fits</span> — no central coordinator: <span class="mark-teal">leader election</span>, <span class="mark-orange">region formation</span>, and <span class="mark-green">model aggregation</span> are all just field calculus.
  </div>
</div>

<Cites refs="8,9,10" />

</div>

---
layout: default
class: code-slide
---

<div class="slide-shell">

# Decentralized Federated Learning via Phyelds

```python {all|3-4|5|6|7|8|9|10|11|all}
@aggregate
def client(initial_model_params):
    set_value, value = remember((initial_model_params, 0))
    local_model, tick = value
    evolved_model, _ = local_training(local_model, training_data)
    distances = loss_based_distances(evolved_model, validation_data)
    leader = elect_leaders(threshold, distances)
    potential = distance_to(leader, distances)
    models = collect_with(potential, [evolved_model], lambda x, y: x + y)
    area_model = broadcast(leader, average_weights(models), distances)
    set_value((area_model, tick + 1))
```

<div style="display: grid; grid-template-columns: 1fr 350px; gap: 1.2rem; align-items: center; margin-top: 0.4rem;">

<div class="code-caption" style="font-size: 0.78rem; line-height: 1.45;">
  <span v-if="$clicks === 0">
    <strong style="color: var(--deck-teal);">high-level view</strong> — each node trains locally and aggregates with neighbors to evolve a global model across rounds.
  </span>
  <span v-else-if="$clicks === 1">
    <strong style="color: var(--deck-teal);">state persistence</strong> — each device remembers its local model (a field of models) across rounds.
  </span>
  <span v-else-if="$clicks === 2">
    <strong style="color: var(--deck-orange);">local training</strong> — each node trains on its private on-board dataset.
  </span>
  <span v-else-if="$clicks === 3">
    <strong style="color: var(--deck-teal);">relationship mapping</strong> — similarity distances are derived from local and neighbor validation loss.
  </span>
  <span v-else-if="$clicks === 4">
    <strong style="color: var(--deck-green);">regional leaders</strong> — dynamic leaders are elected from model similarity, partitioning the network into regions.
  </span>
  <span v-else-if="$clicks === 5">
    <strong style="color: var(--deck-green);">potential field</strong> — each node computes its distance to the regional leader.
  </span>
  <span v-else-if="$clicks === 6">
    <strong style="color: var(--deck-orange);">aggregation</strong> — models are collected up the regional tree and summed.
  </span>
  <span v-else-if="$clicks === 7">
    <strong style="color: var(--deck-orange);">sharing</strong> — the averaged model is broadcast back across the region.
  </span>
  <span v-else-if="$clicks === 8">
    <strong style="color: var(--deck-teal);">state update</strong> — the new regional model is stored for the next round.
  </span>
  <span v-else>
    <strong style="color: var(--deck-green);">put together</strong> — local training + self-organizing regional aggregation = decentralized federated learning.
  </span>
</div>

<div class="visual-box" style="margin: 0; padding: 0.3rem;">
  <FederatedLearningStep :click="$clicks" />
</div>

</div>

</div>

---
layout: default
class: stage-slide
---

<div class="slide-shell">

# Multi-Agent Reinforcement Learning
## Collective behavior needs a world to live in

<div style="margin-top: 0.2rem; color: var(--deck-muted); font-size: 0.92rem;">
Many agents learn to act <span class="mark-teal">together</span> in a shared environment — but a learned policy is only as trustworthy as the <span class="u-solid-teal">world you can test it in</span>:
</div>

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.4rem; margin-top: 0.7rem;">
  <div style="border-top: 2px solid var(--deck-teal); padding-top: 0.45rem;">
    <div style="font-weight: 700; color: var(--deck-teal);">Multi-Agent Learning typically Needs coordination</div>
    <div style="font-size: 0.82rem; color: var(--deck-muted); line-height: 1.35;">Agents must align their actions from <span class="mark-teal">local observations</span> (via communication or shared environment signals).</div>
  </div>
  <div style="border-top: 2px solid var(--deck-green); padding-top: 0.45rem;">
    <div style="font-weight: 700; color: var(--deck-green);">Behavior lives in interaction</div>
    <div style="font-size: 0.82rem; color: var(--deck-muted); line-height: 1.35;">Collective dynamics only emerge by <span class="mark-green">running</span> them — you need a simulated world to observe and <span class="u-solid-teal">verify</span> them.</div>
  </div>
  <div  style="border-top: 2px solid var(--deck-orange); padding-top: 0.45rem;">
    <div style="font-weight: 700; color: var(--deck-orange);">VMAS is one such world</div>
    <div style="font-size: 0.82rem; color: var(--deck-muted); line-height: 1.35;">A <span class="mark-orange">GPU-accelerated</span>, <span class="u-solid-orange">differentiable</span> 2D physics engine<sup class="cite">[11]</sup> for MARL &amp; swarm robotics.</div>
  </div>
</div>

<div style="margin-top: 0.9rem; max-width: 820px; margin-left: auto; margin-right: auto;" v-click>
  <div style="border-left: 3px solid var(--deck-teal); padding-left: 0.65rem; font-size: 0.9rem; line-height: 1.4;">
    <span style="font-weight: 700; color: var(--deck-teal);">The goal</span> — drive VMAS agents with <span class="mark-teal">aggregate programs</span>: express collective behavior via field calculus.
  </div>
</div>

<Cites refs="11" />

</div>

---
layout: default
class: viz-slide
---

<div class="slide-shell">

# Integrating Phyelds with VMAS


- Phyelds ships a native simulator, but is designed to <span class="u-solid-orange">plug into external frameworks</span> through thin bindings
- <span class="u-solid-orange">The integration</span> needs just two components: a <span class="mark-teal">runner</span> that, each step, executes agent actions and feeds observations back; and an <span class="mark-teal">environment wrapper</span> that initializes agents and updates their state.
- We validate it by reproducing <span class="mark-green">Vicsek flocking</span><sup class="cite">[12]</sup> as an aggregate program — agents align with neighbors within a radius, and <span class="u-solid-teal">collective motion emerges</span>.


<v-clicks>
<div class="visual-box visual-box-wide">
  <FlockingStages />
</div>
</v-clicks>

<Cites refs="11,12" />

</div>

---
layout: default
class: stage-slide
---

<div class="slide-shell">

# Vicsek Flocking as an Aggregate Program

```python {all|3-4|5|6-7|8|9-10|11-12|all}
@aggregate
def action():
    myself = sense('agent')
    vel = myself.state.vel.squeeze()
    neighbors_info = neighbors(vel).exclude_self()
    velocities = [vel for vel in neighbors_info.values()]
    avg_vel = mean_velocity(velocities)
    theta = velocity_to_angle(vel, avg_vel)
    noise = perturbation()
    theta = theta + 0.1 * noise
    next_vel = [torch.cos(theta).item(), torch.sin(theta).item()]
    store("action", next_vel)
```

<div class="code-caption" style="margin-top: 0.55rem; font-size: 0.76rem; line-height: 1.45; min-height: 2.8rem;">
  <span v-if="$clicks === 0">
    <strong style="color: var(--deck-teal);">the whole rule</strong> — every agent runs this each step; alignment with neighbors is all it takes for <span class="mark-green">flocking to emerge</span>.
  </span>
  <span v-else-if="$clicks === 1">
    <strong style="color: var(--deck-orange);">sense self</strong> — read the agent from the environment and extract its current velocity.
  </span>
  <span v-else-if="$clicks === 2">
    <strong style="color: var(--deck-teal);">gather neighbors</strong> — collect the velocity field of nearby agents, excluding the agent itself.
  </span>
  <span v-else-if="$clicks === 3">
    <strong style="color: var(--deck-teal);">average</strong> — compute the mean heading of the neighborhood.
  </span>
  <span v-else-if="$clicks === 4">
    <strong style="color: var(--deck-green);">align</strong> — turn toward the neighbors' average direction.
  </span>
  <span v-else-if="$clicks === 5">
    <strong style="color: var(--deck-orange);">perturb</strong> — add Vicsek noise so the alignment stays stochastic.
  </span>
  <span v-else-if="$clicks === 6">
    <strong style="color: var(--deck-green);">act</strong> — write the new velocity back as the agent's action for this step.
  </span>
  <span v-else>
    <strong style="color: var(--deck-green);">put together</strong> — local alignment + noise = <span class="u-solid-teal">collective motion</span>, expressed as field calculus.
  </span>
</div>

<Cites refs="11,12" />

</div>

---
layout: default
class: end-slide
transition: fade
---

<div class="slide-shell">

# Three takeaways

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.4rem; margin-top: 0.7rem;">
  <div style="border-top: 2px solid var(--deck-teal); padding-top: 0.45rem;">
    <div style="font-weight: 700; color: var(--deck-teal);">Python-native aggregate computing</div>
    <div style="font-size: 0.82rem; color: var(--deck-muted); line-height: 1.35;">Lower barrier to entry for <span class="mark-teal">ML</span>, <span class="mark-orange">education</span>, and <span class="mark-green">robotics</span>.</div>
  </div>
  <div style="border-top: 2px solid var(--deck-green); padding-top: 0.45rem;">
    <div style="font-weight: 700; color: var(--deck-green);">Small core, rich composition</div>
    <div style="font-size: 0.82rem; color: var(--deck-muted); line-height: 1.35;">A compact calculus layer can support <span class="u-solid-orange">reusable coordination patterns</span>.</div>
  </div>
  <div style="border-top: 2px solid var(--deck-orange); padding-top: 0.45rem;">
    <div style="font-weight: 700; color: var(--deck-orange);">Integration matters</div>
    <div style="font-size: 0.82rem; color: var(--deck-muted); line-height: 1.35;">The value is not only the runtime, but how naturally it <span class="mark-green">plugs into existing Python ecosystems</span>.</div>
  </div>
</div>

<p class="closing-line">
  Next: <span class="mark-teal">scalability</span> · <span class="mark-orange">benchmarking</span> · <span class="mark-green">broader simulator support</span> · <span class="mark-teal">real deployments</span>
</p>

</div>

---
layout: default
class: end-slide
---

<div class="slide-shell">

<div class="thanks-grid">

<div class="thanks-left">
  <PhyeldsLogo style="max-width: 140px; max-height: 140px; margin-bottom: 0.2rem;"></PhyeldsLogo>
  <div class="thanks-title">Thank You!</div>
  <div class="thanks-subtitle">
     A Pythonic Framework for Aggregate Computing
  </div>
  <div class="thanks-qr-row">
    <QrCard title="Repository" url="https://github.com/phyelds/phyelds" :size="5.8" />
    <QrCard title="Interactive demo" url="https://mybinder.org/v2/gh/phyelds/phyelds-examples/HEAD?urlpath=%2Fdoc%2Ftree%2F%2Fbinder%2Fphyelds-example.ipynb" :size="5.8" />
  </div>
  <div class="thanks-details">
    <strong>Contact:</strong> gianluca.aguzzi@unibo.it
  </div>
</div>

<div class="collage-container">
  <div class="collage-item collage-arch">
    <BaseImg src="phyelds-arch.png" class="collage-img" alt="Global Architecture" />
  </div>
  <div class="collage-item collage-gradient">
    <div class="collage-scale-wrapper">
      <FieldEvolution />
    </div>
  </div>
  <div class="collage-item collage-frame1">
    <BaseImg src="vmas-frame-0001.png" class="collage-img" alt="Initial state" />
  </div>
  <div class="collage-item collage-channel">
    <div class="collage-scale-wrapper">
      <ChannelEvolution />
    </div>
  </div>
  <div class="collage-item collage-frame885">
    <BaseImg src="vmas-frame-0885.png" class="collage-img" alt="Stable state" />
  </div>
</div>

</div>

</div>

---
layout: default
class: stage-slide
---

<div class="slide-shell">

# References

<References />

</div>



