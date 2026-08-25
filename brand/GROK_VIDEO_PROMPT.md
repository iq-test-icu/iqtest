# IQ·Test Hook Ad, Grok Imagine Prompt Pack

10 seconds, 9:16, built to stop a scroll and drive comments. Written 2026-08-10.

---

## The one decision that matters

Make it look like a phone video, not like an ad.

This is not a style preference, it is the anti-slop strategy. Polished cinematic AI footage looks fake because clean surfaces and smooth motion give the artifacts nowhere to hide. Real phone footage already has grain, mild compression, a bit of handheld sway and autofocus that misses for half a second. All of that noise buries exactly the flaws that make AI video feel wrong. Ugly is safer than beautiful here.

It also stops reading as an ad, which is the point. Nobody stops for a commercial. They stop for a person.

---

## Why this hook

The product's real pull is not the score. It's the historical figure match, because that is identity, and identity is what people repost. The strongest viral mechanic available to you is mild disagreement between two people who got different results, because that is what makes strangers announce their own answer in the comments. Comments are what the algorithm actually rewards.

So the hook is a person, mid-sentence, already annoyed and amused about a result. No setup, no logo, no intro. The first frame is a face already talking.

---

## The prompt

Text to video. 9:16, 10 seconds, 720p.

```text
A woman in her late twenties sits on a couch in a lived-in apartment holding her phone, already mid-sentence and looking straight into the lens as the clip begins. She says, "I got Da Vinci. My sister got Aristotle. We have been arguing about it for an hour." She half-laughs on the last word and glances off to the side. Shot vertically on a phone held in one hand with slight natural handheld sway, autofocus settling once at the start. Soft daylight from a window on the left, a little blown out on her cheek. Unstyled hair, no makeup, plain t-shirt. Behind her is a real room, slightly cluttered, a mug and a folded blanket out of focus. Natural phone camera look with fine grain and mild compression, not cinematic, not colour graded. Audio: her voice close and unprocessed as if picked up by the phone, faint room tone, a distant street sound outside. No music.
```

Both names are real outputs from your report generator, so the line is accurate. Aristotle and Leonardo da Vinci are both in the fallback match set in `worker.js`.

---

## Why the prompt is built this way

**Subject and speech come first.** Grok's Aurora engine renders sequentially, so whatever you write first lands earliest in the clip. Putting "already mid-sentence" in the opening line is what prevents a slow useless first second.

**The dialogue is written out.** Grok generates native synchronized audio with lip sync in one pass, so giving it the exact words is what gets you a clean mouth. Leaving speech vague gets you mush.

**Audio is specified.** If you say nothing about sound, Grok invents a soundtrack, and what it invents is a generic swell that would instantly brand this as AI. "No music" is doing heavy lifting.

**Every anti-slop detail is a specific, not an adjective.** Not "realistic apartment" but a mug and a folded blanket. Not "natural lighting" but blown out on her cheek. Specificity is what separates a real-feeling person from a stock-looking one.

---

## Beat sheet

| Time | What happens |
|---|---|
| 0.0 to 1.0s | Face already talking. No establishing shot. This second decides everything. |
| 1.0 to 4.0s | "I got Da Vinci. My sister got Aristotle." The curiosity gap opens. |
| 4.0 to 7.0s | "We have been arguing about it for an hour." Half-laugh. This is the comment bait. |
| 7.0 to 10.0s | She glances away, small beat, holds. Room for your caption to land. |

---

## Text goes on top, never inside

Do not ask Grok to render any text, letters or numbers. It is the one thing AI video reliably mangles, and a single warped letter kills the whole illusion.

Add these in CapCut or your editor afterward, in the platform's native font so it reads as organic:

- **0.5s, top third:** `which historical genius thinks like you?`
- **7.5s, bottom third:** `16 questions · 5 min · free score, no signup`
- **Caption on the post:** `I got Da Vinci and I'm still not over it. What did you get? iq-test.icu`

That caption is the whole comment engine. It asks a question people cannot resist answering about themselves.

---

## Do not let this into frame

- Any text, letters or numbers rendered by the model
- Colour grading, teal and orange, film look, anything cinematic
- Smooth gimbal motion, dolly moves, slow motion
- Music of any kind
- A styled or model-perfect person, studio lighting, a clean empty background
- Glowing brains, circuit boards, holograms, floating interfaces
- Logos or product screens

---

## Test three, change one thing each time

Grok's own guidance is to run three to five generations and move exactly one variable per run.

**V1, change the speaker.** Same line, a man in his thirties at a kitchen counter. Different demographics pull different audiences and you want to know which one your feed responds to.

**V2, change the emotion.** Replace the amused annoyance with genuine surprise.
> `...she says, "I did not expect a five minute quiz to read me like that." She exhales a short laugh and looks away...`

**V3, change the setting.** Move her outside, walking, phone in hand, more ambient street noise. Motion in frame tends to hold attention slightly longer.

Post the best one, then post the second best a week later. Do not sit on a single asset.

---

## If the face comes out uncanny

Talking AI humans are the highest risk category in the whole medium. If two or three generations still look wrong around the eyes or mouth, stop fighting it and take the face out entirely.

**Fallback prompt, no face:**

```text
A pair of hands holds a phone in vertical frame on a kitchen table, thumb scrolling once and then stopping. The hands go still for a moment, then set the phone down face up on the wood. Shot from just above and behind on another phone, slight handheld sway, soft daylight from the left. A coffee cup and car keys sit out of focus nearby. Natural phone camera look with fine grain, not cinematic, not colour graded. Audio: a single soft scroll tick, room tone, a fridge humming somewhere off screen. No music.
```

Then the overlay text carries the entire message. Less charming, far safer, still native to the feed.

---

## Where this goes

TikTok, Reels, Shorts and X, same file to all four. It works with sound off because the overlay carries it, and better with sound on.

This is also the first thing you will own that gives you a social presence at all, which is the actual bottleneck. Product Hunt wants five hundred to a thousand warm followers before you launch there, and you currently have none. This is where that starts.

---

## Extending generation 1 (added after review)

**What came back:** 544x544, 6.04 seconds, 24fps, with a real audio track at normal speech levels. The scene followed the prompt closely. Mug, folded blanket, window with brick outside, couch, phone in hand, warm side light. She lands the laugh at the end, which gives a clean handoff into a second beat.

**Two problems with the file itself, both in the settings rather than the prompt:**

1. It rendered **square, not 9:16**. A square clip in a vertical feed wastes about half the screen, which costs you reach on exactly the platforms this was made for.
2. It rendered at **544px and 6 seconds**, when Grok supports 720p and a 10 second base.

Extending this file inherits both problems, so you would end up with twelve seconds of low resolution square. **Regenerate the base at 9:16 and 720p first, then extend.** Same prompt, just fix the two dropdowns. It costs one more generation and it doubles the usable screen.

**One thing I could not check:** I can read the video frames but not transcribe the audio, so I do not know whether she actually says the scripted line. Play it back and confirm before you extend, because the continuation line below is written to follow from "we have been arguing about it for an hour." If she says something different, the handoff needs to change with it.

### Extend prompt

Continuity is locked to the real final frame: low ponytail, gold hoop earring, olive t-shirt, phone in her right hand, beige couch, pink rolled blanket on the right, window on the left, teal mug on the sill.

```text
She finishes laughing and turns back to look straight into the lens, still smiling. She says, "Sixteen questions. It took me five minutes. It is free and you do not even have to make an account." She gives a small shrug, glances down at her phone and back up, and the clip holds on her. Same woman with a low ponytail and a gold hoop earring, same olive t-shirt, same phone in her right hand. Same beige couch, pink rolled blanket on the right, window on the left with a brick building outside, teal mug on the sill. Same warm daylight from the left. Same handheld phone camera with fine grain, not cinematic, not colour graded. Audio: her voice close and unprocessed, faint room tone, a distant street sound. No music.
```

### Stronger alternative, if you want comments over clicks

Ending on a question aimed at the viewer will outperform a feature list in the comments, and comments are what the algorithm rewards. Swap the spoken line for:

```text
...She says, "It is sixteen questions and it is free. I need to know what you would get." She raises her eyebrows once and holds...
```

Then your caption is just `Tell me who you got.` and the link. The video asks the question, the caption collects the answers.

### Arc after the extend

| Time | Beat |
|---|---|
| 0 to 6s | Hook. The disagreement. Curiosity gap opens. |
| 6 to 7s | She recovers from the laugh and comes back to lens. |
| 7 to 10s | The reason to act. Short, free, no account. |
| 10 to 12s | Hold. Your end card or caption lands here. |

Keep the overlay text plan from the section above. Still nothing rendered inside the video.

---

## Sources

- [xAI Imagine model capabilities](https://docs.x.ai/developers/model-capabilities/imagine) for duration, aspect ratios and native synchronized audio
- [Grok Imagine Video 1.5 prompt guide](https://www.imagine.art/blogs/grok-imagine-video-1-5-prompt-guide) for sequential rendering and motion prompt length
- [Grok Imagine prompting guide](https://www.genaintel.com/guides/how-to-prompt-grok-imagine) for natural language structure and the one-variable iteration rule
- `worker/worker.js` in this repo for the verified historical figure match set
