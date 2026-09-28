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

const recommendedInterfaceForFrequency = (
  frequencyGHz: number,
): PrecisionConnectorId => {
  if (frequencyGHz <= 40) return '2.92'
  if (frequencyGHz <= 50) return '2.4'
  return '1.85'
}

const interfaceMaxGHz: Record<PrecisionConnectorId, number> = {
  '2.92': 40,
  '2.4': 50,
  '1.85': 70,
}

const connectorLabel = (id: PrecisionConnectorId) =>
  precisionConnectors.find((item) => item.id === id)?.label ?? id

export default function AdapterFinder() {
  const [portAConnector, setPortAConnector] =
    useState<PrecisionConnectorId>('2.92')
  const [portAGender, setPortAGender] = useState<Gender>('female')
  const [portBConnector, setPortBConnector] =
    useState<PrecisionConnectorId>('2.92')
  const [portBGender, setPortBGender] = useState<Gender>('female')
  const [frequencyGHz, setFrequencyGHz] = useState(40)
  const [autoSelectInterface, setAutoSelectInterface] = useState(true)

  const frequencyRecommendation =
    recommendedInterfaceForFrequency(frequencyGHz)

  const handleFrequencyChange = (value: number) => {
    const nextFrequency = Math.max(0.1, Math.min(70, value || 0.1))
    setFrequencyGHz(nextFrequency)

    if (autoSelectInterface) {
      const nextConnector = recommendedInterfaceForFrequency(nextFrequency)
      setPortAConnector(nextConnector)
      setPortBConnector(nextConnector)
    }
  }

  const handleManualConnectorChange = (
    port: 'A' | 'B',
    connector: PrecisionConnectorId,
  ) => {
    setAutoSelectInterface(false)
    if (port === 'A') setPortAConnector(connector)
    else setPortBConnector(connector)
  }

  const applyFrequencyRecommendation = () => {
    setPortAConnector(frequencyRecommendation)
    setPortBConnector(frequencyRecommendation)
    setAutoSelectInterface(true)
  }

  const selectedPortsSupportFrequency =
    interfaceMaxGHz[portAConnector] >= frequencyGHz &&
    interfaceMaxGHz[portBConnector] >= frequencyGHz

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
          The target frequency can drive the connector-family recommendation.
          Keep auto-select enabled for a new interconnect design; disable it by
          manually choosing a connector when the physical hardware port is fixed.
        </p>
      </div>

      <div className="frequency-recommendation-bar">
        <div>
          <span className="step-number">Frequency-aware interface</span>
          <strong>
            {frequencyGHz} GHz → {connectorLabel(frequencyRecommendation)}
          </strong>
          <small>
            Lowest connector family in the current database that covers the
            requested frequency.
          </small>
        </div>
        <label className="auto-select-toggle">
          <input
            type="checkbox"
            checked={autoSelectInterface}
            onChange={(e) => setAutoSelectInterface(e.target.checked)}
          />
          <span>Auto-select interface</span>
        </label>
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
                    handleManualConnectorChange(
                      'A',
                      e.target.value as PrecisionConnectorId,
                    )
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
                    handleManualConnectorChange(
                      'B',
                      e.target.value as PrecisionConnectorId,
                    )
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
                onChange={(e) => handleFrequencyChange(Number(e.target.value))}
              />
              <span>GHz</span>
            </div>
          </label>

          <div className="frequency-presets" aria-label="Frequency presets">
            {[18, 26.5, 40, 50, 67].map((value) => (
              <button
                type="button"
                key={value}
                className={frequencyGHz === value ? 'chip active' : 'chip'}
                onClick={() => handleFrequencyChange(value)}
              >
                {value} GHz
              </button>
            ))}
          </div>

          {!selectedPortsSupportFrequency && (
            <div className="interface-upgrade-warning">
              <div>
                <strong>
                  Selected connector family cannot support {frequencyGHz} GHz.
                </strong>
                <p>
                  Recommended design interface: {connectorLabel(frequencyRecommendation)}.
                  An adapter cannot recover bandwidth already lost at a lower-frequency
                  physical port.
                </p>
              </div>
              <button type="button" onClick={applyFrequencyRecommendation}>
                Apply recommendation
              </button>
            </div>
          )}

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
          {!selectedPortsSupportFrequency ? (
            <>
              <p className="kicker">Connector-family bandwidth fails</p>
              <h3>
                Change the physical interface before selecting an adapter
              </h3>
              <p className="adapter-result-copy">
                At {frequencyGHz} GHz the selected port family is already the
                bottleneck. The recommended interface in the current scope is{' '}
                {connectorLabel(frequencyRecommendation)}.
              </p>
              <div className="warning-box">
                Do not use a lower-frequency connector followed by a higher-frequency
                adapter as a way to claim the higher measurement bandwidth.
              </div>
              <button
                type="button"
                className="datasheet-button"
                onClick={applyFrequencyRecommendation}
              >
                Switch both ports to {connectorLabel(frequencyRecommendation)}
              </button>
            </>
          ) : mechanicalDirect ? (
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
                The current release intentionally contains only the first
                precision-adapter subset. The database will expand instead of
                guessing a product.
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
