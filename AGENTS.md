# AGENTS.md

## Project mission

RF Interconnect Guide helps RF/microwave engineers answer:

I have an RF instrument and a DUT. What should I use to connect them safely and correctly?

The site should be practical for bench use, not a generic connector encyclopedia.

## Product principles

1. Start from the measurement: frequency, instrument port, DUT port, measurement type, cable movement and power.
2. Separate mechanical intermateability from electrical performance.
3. Treat the weakest item in the chain as the practical bandwidth limit.
4. Prefer explicit warnings over silent assumptions.
5. Show real connector/cable examples when the image source and reuse status are known.
6. For expensive precision interfaces, connector-care guidance is part of the selection result.

## Data and fact policy

- Family-level values are guidance only.
- Exact component datasheets are controlling.
- Every numeric engineering claim should have a traceable source.
- Prefer manufacturer documentation, metrology/test-equipment vendors, standards and original datasheets.
- When sources disagree, preserve the disagreement or qualify the value instead of inventing a single universal rating.
- Do not call two connectors compatible without specifying whether that means mechanical mating, electrical rating, or recommended practice.

## Image policy

Each real image needs:
- source URL
- author/vendor
- license or redistribution status
- alt text

Prefer:
1. self-created diagrams,
2. public-domain or permissively licensed media,
3. externally linked vendor images.

Do not copy vendor images into the repository unless redistribution rights are confirmed.

## Development workflow

- main is the stable branch.
- Make meaningful changes on a feature branch.
- Use Draft PRs for work in progress.
- Keep data changes reviewable and source-backed.
- Avoid adding a backend until a static-data approach is clearly insufficient.

## V0.1 scope

Connectors:
- SMA
- 3.5 mm
- 2.92 mm / K
- 2.4 mm
- 1.85 mm / V

Cable classes:
- general flexible
- low-loss flexible
- phase-stable VNA
- ruggedized / armored
- semi-rigid / conformable

Primary screens:
- interactive selector
- connector photo guide
- mechanical compatibility matrix
- cable class guide
- sources and engineering caveats
