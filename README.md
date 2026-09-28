# RF Interconnect Guide

An interactive RF/microwave test interconnect selection guide for engineers.

Core question: I have an RF instrument and a DUT. What should I use to connect them safely and correctly?

## V0.1

The first version includes:

- interactive frequency / use-case / port selector
- SMA, 3.5 mm, 2.92 mm, 2.4 mm and 1.85 mm connector guide
- real connector example images with source and license metadata
- mechanical intermateability matrix
- cable-class selection for general RF, VNA, production and fixed-fixture use
- engineering warnings for bandwidth bottlenecks and precision-interface mating
- GitHub Pages deployment workflow

## Run locally

Install dependencies with npm install, then run npm run dev.

Build with npm run build.

## GitHub Pages

The repository includes a Pages workflow at .github/workflows/deploy.yml.

After the first merge to main, enable Settings → Pages → Source: GitHub Actions if GitHub has not selected it automatically.

## Engineering scope

V0.1 intentionally starts with the interfaces most common in RF/microwave bench testing:

- SMA
- 3.5 mm
- 2.92 mm / K
- 2.4 mm
- 1.85 mm / V

The project distinguishes:

- mechanical mating
- electrical bandwidth
- recommended measurement practice

Those are not the same thing.

## Data quality

Family-level values are guidance, not universal part ratings. Exact component datasheets are controlling.

See docs/data-sources.md for the current source trail.

## Image policy

Real images must have source, author/vendor, license or redistribution status, and alt text. Vendor images should remain externally linked unless redistribution rights are confirmed.

## Roadmap

- male / female visual identification walkthrough
- adapters and port savers
- concrete cable assembly database with photos and datasheets
- insertion-loss estimation versus frequency and length
- power handling / DC block / attenuator considerations
- calibration kit and VNA workflow guidance
- 1.0 mm, Type N, BNC, TNC, SMP, SMPM and waveguide extensions
- bilingual Chinese / English UI

## License

Code: MIT.

Third-party images keep their original licenses and attribution terms.
