# RF Interconnect Guide

An interactive RF/microwave test interconnect selection and identification guide for engineers.

Core question: I have an RF instrument and a DUT. What should I use to connect them safely and correctly?

## V0.2

The current version includes:

- interactive frequency / use-case / port selector
- visual male / female connector identifier
- three-step identification workflow: gender → mating family → exact interface verification
- SMA, 3.5 mm, 2.92 mm, 2.4 mm and 1.85 mm connector guide
- real connector example images with source and license metadata
- warnings against identifying precision interfaces by thread appearance alone
- SMA-to-precision-port damage warning
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

The first releases intentionally focus on:

- SMA
- 3.5 mm
- 2.92 mm / K
- 2.4 mm
- 1.85 mm / V

The project distinguishes:

- visual identification
- mechanical mating
- electrical bandwidth
- recommended measurement practice

Those are not the same thing.

## Identification rule

The UI uses a conservative workflow:

1. Determine male/female from the center contact.
2. Determine the likely mating family.
3. Verify the exact interface from markings, datasheets and precision metrology where necessary.

SMA, 3.5 mm and 2.92 mm should not be distinguished from thread appearance alone.

## Data quality

Family-level values are guidance, not universal part ratings. Exact component datasheets are controlling.

See docs/data-sources.md for the current source trail.

## Image policy

Real images must have source, author/vendor, license or redistribution status, and alt text. Vendor images should remain externally linked unless redistribution rights are confirmed.

## Roadmap

- concrete cable assembly database with photos and datasheets
- adapter / port-saver chain builder
- insertion-loss estimation versus frequency and length
- power handling / DC block / attenuator considerations
- calibration kit and VNA workflow guidance
- 1.0 mm, Type N, BNC, TNC, SMP, SMPM and waveguide extensions
- bilingual Chinese / English UI

## License

Code: MIT.

Third-party images keep their original licenses and attribution terms.
