# IQ·Test — Brand

## The idea
Four minor nodes orbit one bright, unplaced node — that's you, before the test. The emblem is a small constellation: four lines for four categories (numeric, verbal, logic, pattern), one line breaking past the ring because a mind that's still being placed doesn't stay inside the frame. Taking the test is the act of that node finding its place among the others — visually, not just narratively. The splash screen draws this emblem before the page loads; the result screen redraws it with your node now connected, glowing, placed.

This is why the aesthetic is "engraved medallion," not "app dashboard": prestige and permanence, not a progress bar.

## Palette
| Token | Hex | Use |
|---|---|---|
| `--ink` | `#12100D` | Page background — warm near-black, like an ink plate, not cool tech-navy |
| `--ink-2` | `#1B1712` | Cards on dark |
| `--parchment` | `#F1E6C9` | Paper surfaces, aged not cream-clean |
| `--gold` | `#C9A24B` | Prestige accent — emblem, borders, "you've unlocked something rare" |
| `--ember` | `#9C3B2C` | Urgency accent — reserved ONLY for price/CTA, never decorative |
| `--text` | `#EDE3CB` | Body text on dark |

Gold and ember are never used together in equal weight — gold sets the mood, ember only appears where money changes hands. That contrast is deliberate: everything is calm prestige until the one moment you're asked to act.

## Type
- **Display (Fraunces)** — headlines, the emblem's implied "weight." A characterful serif with real ink-and-press personality, not a generic geometric sans.
- **Body (Inter)** — everything readable.
- **Mono (JetBrains Mono)** — numbers only: scores, prices, percentiles. Numbers get to look like data; nothing else does.

## Motion
One orchestrated moment (the splash draw-in), then stillness. No ambient decoration, no looping animation competing for attention while someone reads. `prefers-reduced-motion` skips the splash entirely — content shows immediately.

## Voice
Says "which mind matches yours," never "scientifically accurate." Confident and warm, not clinical. Sells the feeling of discovery, not a measurement.
