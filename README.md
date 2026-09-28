# RF Interconnect Guide

An interactive RF/microwave test interconnect selection, identification, and adapter-selection guide for engineers.

Core question: I have an RF instrument and a DUT. What should I use to connect them safely and correctly?

## V0.3

The current version includes:

- interactive frequency / use-case / port selector
- visual male / female connector identifier
- three-step identification workflow: gender → mating family → exact interface verification
- SMA, 3.5 mm, 2.92 mm, 2.4 mm and 1.85 mm connector guide
- real connector example images with source and license metadata
- mechanical intermateability matrix
- cable-class selection for general RF, VNA, production and fixed-fixture use
- **real adapter finder based on port connector + gender + target frequency**
- **frequency-aware connector-family recommendation with optional auto-select**
- **21 sourced KMCO adapter variants** for 2.92 mm, 2.4 mm and 1.85 mm
- in-series and between-series adapter coverage
- concrete P/N, bandwidth, SWR, insertion-loss, torque and mating-life fields
- direct links to manufacturer datasheets
- GitHub Pages deployment workflow

## V0.3 adapter scope

The first adapter dataset intentionally focuses on the precision interfaces most relevant to 40–70 GHz bench work:

- 2.92 mm / K ↔ 2.92 mm / K
- 2.4 mm ↔ 2.4 mm
- 1.85 mm / V ↔ 1.85 mm / V
- 2.92 mm / K ↔ 1.85 mm / V
- 2.92 mm / K ↔ 2.4 mm
- 2.4 mm ↔ 1.85 mm / V

The UI can auto-select the lowest connector family that satisfies the requested frequency: ≤40 GHz → 2.92 mm, 40–50 GHz → 2.4 mm, and 50–70 GHz → 1.85 mm. Manually selecting a connector disables auto-select so fixed physical hardware is not silently changed.

The UI accounts for **port gender**. A female port requires a male adapter end, and vice versa.

When two ports are mechanically directly mateable, the UI says so instead of forcing an adapter recommendation.

When a matching adapter geometry exists but its datasheet bandwidth is below the requested frequency, the UI refuses to promote the connector-family rating to the adapter.

## Product source

The initial concrete adapter examples come from KMCO products listed by SHF Communication Technologies.

See:

- SHF adapter configurator:
  https://www.shf-communication.com/products/rf-connectors-adapters-cables/rf-adapters/
- detailed source trail:
  docs/data-sources.md

The project treats these as **real product examples**, not endorsements or universal recommendations.

## Run locally

Install dependencies with npm install, then run npm run dev.

Build with npm run build.

## GitHub Pages

The repository includes a Pages workflow at .github/workflows/deploy.yml.

## Engineering rules

The project distinguishes:

- visual identification
- mechanical mating
- electrical bandwidth
- gender compatibility
- specific component limits
- recommended measurement practice

Those are not the same thing.

Exact product datasheets are controlling.

## Image policy

Real images must have source, author/vendor, license or redistribution status, and alt text. Vendor images should remain externally linked unless redistribution rights are confirmed.

A separate local-image-assets change is planned so critical UI imagery does not depend on third-party hotlinks.

## Roadmap

- localize redistributable connector images
- concrete cable assembly database with photos and datasheets
- extend RF chain builder to cable + adapter + port saver
- insertion-loss budget versus frequency and length
- power handling / DC block / attenuator considerations
- calibration kit and VNA workflow guidance
- 1.0 mm, Type N, BNC, TNC, SMP, SMPM and waveguide extensions
- bilingual Chinese / English UI

## License

Code: MIT.

Third-party images keep their original licenses and attribution terms.
