# APEX IQ·Test Off-Page Promotion Kit

Ready-to-post copy for the off-page launch. Rewritten 2026-08-10 against current platform rules (sources at the bottom) and checked line by line against what the product actually does.

**Why this matters right now:** Search Console shows 0 clicks and 5 impressions across the site's entire 24-day history. Nothing links to the domain and there's no social presence pointing at it. So these posts aren't only a traffic play. The links they generate are the outside signal a 3-week-old `.icu` domain needs before Google takes it seriously enough to crawl and rank properly. Right now nothing else you could do to the site matters as much as this.

---

## 0. Order of operations

Post these one at a time, in this order.

| Order | Platform | When | Reasoning |
|---|---|---|---|
| 1 | **Reddit**, r/InternetIsBeautiful | Tue to Thu, around 9-11am ET | Lowest risk, biggest reach, and you can try again if it flops. Shows you which angle actually earns clicks before you spend a one-shot. |
| 2 | **Reddit**, r/SideProject | 3 or 4 days after the first | Different crowd. Builders, not casual browsers. Never post to two subs the same day, it reads as spam and gets pulled. |
| 3 | **Show HN** | Weekday, around 8-10am ET | You get one clean attempt at this. Spend it after Reddit has told you what lands. |
| 4 | **Product Hunt** | Tue to Thu, 12:01am PT | Most work to prepare, and please read the warning in section 4 before you commit to it. |

Spread these over about two weeks.

Three rules that apply everywhere: don't ask friends to upvote (HN and PH both screen for it and it can sink the post outright), reply to comments in the first few hours, and don't post from an account named after the product.

---

## 1. Reddit, r/InternetIsBeautiful

*Post this one first. Big sub, likes clean web things you can use immediately. One rule matters a lot here: they don't allow products stuck behind a signup. IQ·Test is fine because the score really is free with no email. If that ever changes, this sub is off the table.*

* **Title**: `A 16-question cognitive quiz that shows your score right away. No email, no signup.`

* **Body**:
  ```text
  Every free IQ test I tried had the same shape. Forty questions, ten minutes of your life, and then a wall asking for your email or your card before it would show you a single number. It annoyed me enough that I built the opposite of it.

  Sixteen questions, four categories (numeric, verbal, logic, pattern), about five minutes. Your score and a radar chart breaking down the four categories show up the second you hit the last question. No email. No account. Nothing hidden.

  It is not a clinical IQ test and I say that on the page. It's a curiosity thing. There's an optional paid report if you want a written analysis, but you never have to go near it to see your result.

  https://iq-test.icu/

  If you do take it, I'd really like to know whether the difficulty feels right. That's the part I'm least sure about.
  ```

Leading with the frustration rather than the feature list is deliberate, that's what earns upvotes on this sub. The no-signup line is in there because it's the sub's actual rule. And saying "not a clinical test" up front isn't only a compliance thing. On Reddit, beating people to the obvious criticism buys you credibility instead of a pile-on.

---

## 2. Reddit, r/SideProject

*Three or four days after the first post. Around 180k members, built for founders showing their work, so self-promotion is the point. One hard requirement: show the actual thing. Screenshots or a demo. A bare link gets ignored and low-effort "check this out" posts get removed.*

**Attach two or three screenshots.** A question screen, the result screen with the radar chart, and the pricing tiers. Don't skip this, the sub expects it.

* **Title**: `Built a 16-question cognitive quiz on Cloudflare Workers. Free score, optional $1.99-$6.99 report.`

* **Body**:
  ```text
  What it is: a five-minute cognitive skills quiz. Sixteen questions across numeric, verbal, logic and pattern reasoning. Your score and a radar chart of the four categories are free and instant, no email gate. If you want more there are three one-time reports: $1.99 for the percentile breakdown, $3.99 adds a written analysis of your reasoning style plus a historical figure match, $6.99 adds a printable certificate. No subscription anywhere in it.

  Why I built it: everything else in this category either hides your score behind a signup or runs a thirty-dollar-a-month subscription trap. I wanted to find out whether a flat one-time price works when the score itself is actually free.

  Stack:
  - Static frontend. Vanilla JS and CSS, no framework. OkLCH colour space, custom SVG radar chart drawn client side.
  - Cloudflare Workers for the API, same origin under /api/*. Zero npm dependencies in the worker, just raw fetch() to everything.
  - Supabase for sessions, Stripe Checkout for payment, Resend for delivery.
  - The written analysis comes from an LLM at purchase time, with a fallback template if the call fails or trips the content guard.

  The awkward part was the honesty constraint. I wouldn't fabricate user counts and I wouldn't claim any clinical validity, and that rules out most of the conversion playbook this category runs on. Took away a lot of easy levers.

  https://iq-test.icu/

  What I'd like feedback on: does the free-score-then-optional-report split feel fair to you, or is the paywall sitting in the wrong place?
  ```

This covers what the sub asks for (what, why, stack, specific feedback ask). The honesty paragraph is the real differentiator here. Builders respond to a genuine tradeoff far more than to a feature list.

---

## 3. Show HN

*One shot, so spend it after Reddit. Show HN is for things people can actually try, and IQ·Test fits because nothing blocks the score.*

**The mechanics, which the old draft had wrong:**
- Put `https://iq-test.icu/` in the **URL field** and leave the **text field empty**. Submissions without a URL get penalized.
- Your description goes in as your **own first comment**, right after you submit.
- Use a personal account with some history on it. Not one named after the product. HN calls that out specifically and a fresh account named for the project is the quickest way to get buried.

* **Title**: `Show HN: A 16-question cognitive quiz with no signup wall`

* **First comment**:
  ```text
  I built this because every online IQ test I tried ran the same play: forty questions, then a paywall or an email form before you see a single number.

  This one is sixteen questions, about five minutes, and your score plus a per-category radar breakdown renders instantly. No email, no account. There's an optional one-time report ($1.99 to $6.99) with a written analysis, but the score isn't bait for it. If you take the quiz and leave, that's a fine outcome.

  Constraints I set for myself, which might be the more interesting part:

  No claim of clinical or psychometric validity anywhere. It's a self-insight quiz and the page says as much. The historical figure matching is framed thematically, along the lines of "your logic result echoes the kind of thinking associated with X", never as a numeric claim about a real person. Historiometric IQ estimates for historical figures aren't reliable and I didn't want to launder them into something that looks like data.

  No invented social proof. No "two million people have taken this". If a counter ever shows up on the site it'll be a real count(*).

  Zero npm dependencies in the Worker. Raw fetch() to Stripe, Supabase and the LLM provider. The whole API is one file.

  The obvious hole, since someone will find it anyway: scoring runs client side, so anyone with devtools open can manipulate it. At this price point I took that tradeoff rather than ship a server-side answer key I hadn't tested properly. Happy to be talked out of it.

  I'd like to hear what people make of the difficulty curve across the four categories.
  ```

HN rewards stated constraints and punishes marketing voice. Naming the client-side scoring problem yourself is the most valuable line in the whole post, because on HN admitting your own flaw turns what would have been the top critical comment into credibility instead. The old draft's line about tailoring OkLCH colours and vignette backdrops "to keep it premium" is exactly the register that gets a post flagged, so it's gone.

---

## 4. Product Hunt

> **Read this before you spend the effort.** The thing that best predicts a Product Hunt launch landing well is the warm audience you already have on the day you go live, roughly 500 to 1,000 engaged followers. IQ·Test has no social presence at all right now. No X, no Instagram, no TikTok, no list beyond quiz leads. Launching cold will very likely underperform, and you only get one first launch. PH has also gotten much better at filtering launches that look manufactured, so there's no clever way around it.
>
> **What I'd do:** run Reddit and HN first. If they bring real traffic and a few hundred followers, come back here in four to six weeks with an actual audience behind you. Launching cold this week spends the one thing you can't spend twice.

When you do go: Tuesday to Thursday, 12:01am PT. Skip Mondays, that's when big companies launch and you'll get buried. Skip weekends, traffic drops by roughly 40%. Then stay on the thread and answer every comment for the first four hours.

* **Product Name**: IQ·Test
* **Tagline**: `Your cognitive score, free and instant. No signup.`
* **Description**:
  ```text
  A five-minute cognitive skills quiz with no signup wall and no subscription. Sixteen questions across numeric, verbal, logic and pattern reasoning, and your score plus a radar chart breakdown appears the moment you finish. Free, no email needed. Optional one-time reports from $1.99 to $6.99 add percentile detail, a written analysis of your reasoning style, and a thematic historical figure match. Not a clinical assessment, and the page says so.
  ```
* **Topics**: Education, Productivity, Fun, Web App
* **First comment, as maker**:
  ```text
  Hey Product Hunt 👋

  I built IQ·Test after getting tired of quizzes that make you finish forty questions and then hold your score hostage behind an email form or a thirty-dollar-a-month subscription.

  Two things I did differently.

  The score is free and instant. No email, no account, no tricks. If you take it and never come back, that's completely fine by me.

  And I wouldn't fake anything. No invented user numbers, no clinical validity claims, and the historical figure match is a thematic pairing rather than a numeric comparison. Historical IQ estimates aren't reliable and I didn't want to dress them up as data.

  It runs on Cloudflare Workers with a dependency-free API, Supabase and Stripe, so it loads fast just about anywhere.

  I'd like feedback on two things: whether the question difficulty feels balanced, and whether the free versus paid split sits in the right place.
  ```

---

## 5. AlternativeTo.net

Low effort, do it whenever.

* **Title**: IQ·Test
* **Description**: `A fast, privacy-focused cognitive skills quiz. Your score and category breakdown are free and instant with no signup, and reports are a flat one-time price instead of a subscription. It's a self-insight quiz rather than a clinical assessment, and it says so.`
* **Alternative to**: Mensa Practice Test, IQTest.com, Brain Metrics Initiative, 123test

---

## 6. About r/cognitiveTesting

The old kit had a post drafted for r/cognitiveTesting. I'd hold it, at least until the other launches are done.

That sub is about 63k people who know psychometrics well, and it calls itself the largest forum for cognitive and IQ testing anywhere. A sixteen-question commercial quiz with no validation work behind it is close to the least sympathetic thing you could put in front of them. The likely outcome is a thread explaining that the instrument has no norming, no validity evidence and too few items, all of which would be fair. That's exactly why it would be hard to answer.

If you do go there eventually, go in as a real discussion and don't lead with the product. The historiometry angle from the old kit was the right instinct and the facts hold up. Cox's 1926 study did estimate childhood IQs for around three hundred historical figures from biographical records, and Mill, whom she scored near 190, did start Greek at three. Ask the question because you're actually curious, mention what you built only if it comes up naturally, and go in expecting a cool reception either way.

---

## 7. One thing I found and didn't touch

`brand/BRAND.md` says the body font is Inter and numbers are set in JetBrains Mono. The live site loads neither. `public/index.html` pulls Space Grotesk and Fraunces and nothing else.

Doesn't affect any of the posts above, but the brand doc and the shipped site are describing two different products. Two ways to square it, and since it's a design call I'd rather you pick than have me choose for you:

1. Update `BRAND.md` to say Space Grotesk, which is cheapest since the site is already internally consistent.
2. Load Inter and JetBrains Mono and wire them to the tokens the way the doc originally intended, which matches the design intent but adds font weight to the page.

Tell me which and I'll make them agree.

---

## Sources

Rules and norms checked 2026-08-10 against:
- [Show HN official guidelines](https://news.ycombinator.com/showhn.html) for the URL field requirement, upvote solicitation and username guidance
- [Reddit self-promotion rules 2026](https://redship.io/blog/reddit-self-promotion-rules) for cross-sub norms
- [r/SideProject rules and posting policy](https://www.mediafa.st/subreddit/sideproject) for the show-the-product requirement and removal criteria
- [r/InternetIsBeautiful analysis](https://gummysearch.com/r/InternetIsBeautiful/) for the no-signup rule
- [Product Hunt 2026 launch playbook](https://blog.innmind.com/how-to-launch-on-product-hunt-in-2026/) for timing, the warm audience predictor and quality filtering
- [Catharine Cox Miles](https://en.wikipedia.org/wiki/Catharine_Cox_Miles) and [Mill's Autobiography](https://www.gutenberg.org/files/10378/10378-h/10378-h.htm) for the historiometry claims in section 6
