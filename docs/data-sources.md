# Data sources

This file records the engineering baseline used by the prototype.

## Connector family baseline

Primary reference:

- Keysight, Electrical Connector Care:
  https://helpfiles.keysight.com/scopes/FlexDCA-UG/Content/Topics/Connector-Care/connector-elec-care.htm

Family-level values currently used:

| Interface | Frequency baseline | Torque baseline | Mechanical mating group |
|---|---:|---:|---|
| SMA | ≤ 24 GHz | 0.9 N·m | SMA / 3.5 / 2.92 |
| 3.5 mm | ≤ 34 GHz | 0.9 N·m | SMA / 3.5 / 2.92 |
| 2.92 mm | ≤ 40 GHz | 0.9 N·m | SMA / 3.5 / 2.92 |
| 2.4 mm | ≤ 50 GHz | 0.9 N·m | 2.4 / 1.85 |
| 1.85 mm | ≤ 70 GHz | 0.57 N·m | 2.4 / 1.85 |

These values are not universal ratings for every product. Exact instrument and component datasheets take precedence.

## Visual identification and connector care

Keysight SMA connector care:
https://helpfiles.keysight.com/scopes/FlexDCA-UG/Content/Topics/Connector-Care/connectors_sma.htm

Keysight 3.5 mm precision connector care:
https://helpfiles.keysight.com/scopes/FlexDCA-UG/Content/Topics/Connector-Care/connectors_3_55.htm

The V0.2 visual identifier deliberately avoids claiming that SMA, 3.5 mm and 2.92 mm can always be distinguished from a casual front-view photograph. They share a mating geometry but differ in construction and mechanical details.

Keysight specifically warns that an excessively long SMA male center pin can damage the female contact fingers of a precision 3.5 mm interface. The site therefore treats SMA-to-precision mating as a connector-care event, not merely a compatibility checkbox.

The front-view male/female drawings in the application are original schematic illustrations created for this project. They are intentionally labeled not to scale.

## Image sources

### SMA / 3.5 mm / 2.92 mm comparison

- Source: Wikimedia Commons
- File: SMA-family-male-female.jpg
- Author: TheUnnamedNewbie
- License: CC BY-SA 4.0
- URL: https://commons.wikimedia.org/wiki/File:SMA-family-male-female.jpg

### 1.85 mm male / female

- Source: Wikimedia Commons
- File: 1.85mm connector male female.jpg
- Author: Slingmos
- License: Public domain
- URL: https://commons.wikimedia.org/wiki/File:1.85mm_connector_male_female.jpg

### 2.4 mm example

- Source: Rosenberger product page
- Product example: RPC-2.40 straight plug
- Image remains externally hosted and is not redistributed in the repository.
- URL: https://products.rosenberger.com/radio-frequency/connectors/138942/09s121-271s3-straight-plug

## Cable example

- HUBER+SUHNER SUCOFLEX 500 family:
  https://www.hubersuhner.com/en/shop/product-family/5107

The product family is used only as an example of a phase/amplitude-stable microwave test assembly. It is not an endorsement or a universal recommendation.
