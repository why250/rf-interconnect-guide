import { useMemo, useState } from 'react'
import {
  adapterMatchesPorts,
  adapters,
  directMatePossible,
  oppositeGender,
  precisionConnectors,
  type Gender,
  type PrecisionConnectorId,
} from './adapterData'

const genderOptions: Gender[] = ['female', 'male']

export default function AdapterFinder() {
  const [portAConnector, setPortAConnector] =
    useState<PrecisionConnectorId>('2.92')
  const [portAGender, setPortAGender] = useState<Gender>('female')
  const [portBConnector, setPortBConnector] =
    useState<PrecisionConnectorId>('1.85')
  const [portBGender, setPortBGender] = useState<Gender>('female')
  const [frequencyGHz, setFrequencyGHz] = useState(40)

  const mechanicalDirect = directMatePossible(
    portAConnector,
    portAGender,
    portBConnector,
    portBGender,
  )

  const geometryMatches = useMemo(
    () =>
      adapters.filter((adapter) =>
        adapterMatchesPorts(
          adapter,
          portAConnector,
          portAGender,
          portBConnector,
          portBGender,
        ),
      ),
    [portAConnector, portAGender, portBConnector, portBGender],
  )

  const validMatches = geometryMatches.filter(
    (adapter) => adapter.maxGHz >= frequencyGHz,
  )
  const bestGeometryMatch = geometryMatches
    .slice()
    .sort((a, b) => b.maxGHz - a.maxGHz)[0]

  const recommended = validMatches
    .slice()
    .sort(
      (a, b) =>
        b.maxGHz - a.maxGHz ||
        a.maxInsertionLossDb - b.maxInsertionLossDb,
    )[0]

  const requiredA = oppositeGender(portAGender)
  const requiredB = oppositeGender(portBGender)

  return (
    <section className="section adapter-section" aria-labelledby="adapter-title">
      <div className="section-heading">
        <p className="kicker">3 · Real adapter finder</p>
        <h2 id="adapter-title">Find a concrete adapter by port and gender</h2>
        <p>
          V0.3 starts with KMCO adapters listed by SHF for 2.92 mm, 2.4 mm and
          1.85 mm. Port gender matters: the adapter end must be the opposite
          gender of the port it mates with.
        </p>
      </div>

      <div className="adapter-layout">
        <div className="panel adapter-controls">
          <div className="adapter-port-grid">
            <div className="adapter-port-card">
              <span className="step-number">Port A</span>
              <label>
                Connector
                <select
                  value={portAConnector}
                  onChange={(e) =>
                    setPortAConnector(e.target.value as PrecisionConnectorId)
                  }
                >
                  {precisionConnectors.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Port gender
                <select
                  value={portAGender}
                  onChange={(e) => setPortAGender(e.target.value as Gender)}
                >
                  {genderOptions.map((gender) => (
                    <option key={gender} value={gender}>
                      {gender}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="adapter-port-card">
              <span className="step-number">Port B</span>
              <label>
                Connector
                <select
                  value={portBConnector}
                  onChange={(e) =>
                    setPortBConnector(e.target.value as PrecisionConnectorId)
                  }
                >
                  {precisionConnectors.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Port gender
                <select
                  value={portBGender}
                  onChange={(e) => setPortBGender(e.target.value as Gender)}
                >
                  {genderOptions.map((gender) => (
                    <option key={gender} value={gender}>
                      {gender}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <label>
            Required measurement frequency
            <div className="input-row">
              <input
                type="number"
                min="0.1"
                max="70"
                step="0.1"
                value={frequencyGHz}
                onChange={(e) =>
                  setFrequencyGHz(
                    Math.max(0.1, Math.min(70, Number(e.target.value) || 0.1)),
                  )
                }
              />
              <span>GHz</span>
            </div>
          </label>

          <div className="adapter-gender-rule">
            <span>
              Port A {portAGender} → adapter end <strong>{requiredA}</strong>
            </span>
            <span>
              Port B {portBGender} → adapter end <strong>{requiredB}</strong>
            </span>
          </div>
        </div>

        <div className="panel adapter-result" aria-live="polite">
          {mechanicalDirect ? (
            <>
              <p className="kicker">Mechanical direct-mate path exists</p>
              <h3>No adapter is required for geometry alone</h3>
              <p className="adapter-result-copy">
                These two selected ports have opposite genders and belong to a
                mechanically intermateable interface pair. Use an adapter only
                when you need a port saver, gender change, calibration strategy,
                or a controlled transition.
              </p>
              <div className="note-box">
                Direct mechanical mating does not automatically guarantee the
                target-frequency performance of the complete measurement chain.
              </div>
            </>
          ) : recommended ? (
            <>
              <p className="kicker">Matching product example</p>
              <div className="adapter-part-heading">
                <div>
                  <h3>{recommended.partNumber}</h3>
                  <p>{recommended.manufacturer}</p>
                </div>
                <span className="frequency-pill">DC–{recommended.maxGHz} GHz</span>
              </div>

              <div className="rf-chain" aria-label="Recommended RF adapter chain">
                <div className="chain-node">
                  <span>Port A</span>
                  <strong>{portAConnector} mm</strong>
                  <small>{portAGender}</small>
                </div>
                <div className="chain-link">↔</div>
                <div className="chain-node adapter-node">
                  <span>Adapter</span>
                  <strong>{recommended.partNumber}</strong>
                  <small>
                    {recommended.endA.connector} {recommended.endA.gender} /
                    {' '}{recommended.endB.connector} {recommended.endB.gender}
                  </small>
                </div>
                <div className="chain-link">↔</div>
                <div className="chain-node">
                  <span>Port B</span>
                  <strong>{portBConnector} mm</strong>
                  <small>{portBGender}</small>
                </div>
              </div>

              <div className="adapter-spec-grid">
                <div><span>Max frequency</span><strong>{recommended.maxGHz} GHz</strong></div>
                <div><span>Max SWR</span><strong>{recommended.maxSWR}</strong></div>
                <div><span>Insertion loss</span><strong>&lt; {recommended.maxInsertionLossDb} dB</strong></div>
                <div><span>Coupling torque</span><strong>{recommended.couplingTorqueNm} N·m</strong></div>
                <div><span>Mating life</span><strong>&gt; {recommended.matingCycles} cycles</strong></div>
                <div><span>Series</span><strong>{recommended.series}</strong></div>
              </div>

              <a
                className="datasheet-button"
                href={recommended.datasheetUrl}
                target="_blank"
                rel="noreferrer"
              >
                Open manufacturer datasheet ↗
              </a>
            </>
          ) : bestGeometryMatch ? (
            <>
              <p className="kicker">Geometry match found, bandwidth fails</p>
              <h3>No validated adapter in the current database at {frequencyGHz} GHz</h3>
              <p className="adapter-result-copy">
                The matching KMCO geometry is {bestGeometryMatch.partNumber},
                but its datasheet limit is {bestGeometryMatch.maxGHz} GHz.
                Do not promote the connector-family rating to the adapter itself.
              </p>
              <div className="warning-box">
                Reduce the required frequency, choose a different interconnect
                strategy, or verify another adapter with a datasheet explicitly
                covering the target frequency.
              </div>
              <a
                className="datasheet-button"
                href={bestGeometryMatch.datasheetUrl}
                target="_blank"
                rel="noreferrer"
              >
                Inspect the limiting datasheet ↗
              </a>
            </>
          ) : (
            <>
              <p className="kicker">No database match</p>
              <h3>This geometry is not covered yet</h3>
              <p className="adapter-result-copy">
                V0.3 intentionally contains only the first precision-adapter
                subset. The database will expand instead of guessing a product.
              </p>
            </>
          )}
        </div>
      </div>

      <div className="adapter-database-summary">
        <div>
          <strong>{adapters.length}</strong>
          <span>product variants in V0.3</span>
        </div>
        <div>
          <strong>3</strong>
          <span>precision connector families</span>
        </div>
        <div>
          <strong>6</strong>
          <span>in/between-series groups</span>
        </div>
        <div>
          <strong>SHF / KMCO</strong>
          <span>traceable product source</span>
        </div>
      </div>
    </section>
  )
}
