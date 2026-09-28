import { useMemo, useState } from 'react'
import {
  cables,
  connectors,
  isMechanicallyCompatible,
  type Connector,
  type ConnectorId,
} from './data'

type UseCase = 'general' | 'vna' | 'production' | 'fixture'

function pickConnector(freq: number, useCase: UseCase): Connector {
  if (useCase === 'vna' && freq <= 34) {
    return connectors.find((c) => c.id === '3.5')!
  }
  return connectors.find((c) => c.maxGHz >= freq) ?? connectors.at(-1)!
}

function pickCable(useCase: UseCase) {
  if (useCase === 'vna') return cables.find((c) => c.id === 'phase-stable')!
  if (useCase === 'production') return cables.find((c) => c.id === 'ruggedized')!
  if (useCase === 'fixture') return cables.find((c) => c.id === 'semi-rigid')!
  return cables.find((c) => c.id === 'general-flex')!
}

function App() {
  const [freq, setFreq] = useState(40)
  const [useCase, setUseCase] = useState<UseCase>('vna')
  const [instrumentPort, setInstrumentPort] = useState<ConnectorId>('2.92')
  const [dutPort, setDutPort] = useState<ConnectorId>('sma')

  const recommendation = useMemo(
    () => pickConnector(freq, useCase),
    [freq, useCase],
  )
  const cable = useMemo(() => pickCable(useCase), [useCase])
  const compatible = isMechanicallyCompatible(instrumentPort, dutPort)

  const instrument = connectors.find((c) => c.id === instrumentPort)!
  const dut = connectors.find((c) => c.id === dutPort)!
  const bottleneck = Math.min(
    instrument.maxGHz,
    dut.maxGHz,
    recommendation.maxGHz,
  )

  return (
    <div className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">RF / Microwave Test Engineering</p>
          <h1>RF Interconnect Guide</h1>
          <p className="hero-copy">
            Identify connectors, understand mating compatibility, and choose a
            sensible cable for the measurement you are trying to make.
          </p>
        </div>
        <div className="hero-badge">V0.1 · engineering preview</div>
      </header>

      <main>
        <section className="selector-grid" aria-labelledby="selector-title">
          <div className="panel controls-panel">
            <div className="section-heading">
              <p className="kicker">1 · Start with the measurement</p>
              <h2 id="selector-title">What are you connecting?</h2>
            </div>

            <label>
              Maximum test frequency
              <div className="input-row">
                <input
                  type="number"
                  min="0.1"
                  max="70"
                  step="0.1"
                  value={freq}
                  onChange={(e) =>
                    setFreq(Math.max(0.1, Math.min(70, Number(e.target.value) || 0.1)))
                  }
                />
                <span>GHz</span>
              </div>
            </label>

            <div className="preset-row" aria-label="Frequency presets">
              {[18, 26.5, 40, 50, 67].map((value) => (
                <button
                  key={value}
                  className={freq === value ? 'chip active' : 'chip'}
                  onClick={() => setFreq(value)}
                >
                  {value} GHz
                </button>
              ))}
            </div>

            <label>
              Test type
              <select
                value={useCase}
                onChange={(e) => setUseCase(e.target.value as UseCase)}
              >
                <option value="general">General RF bench test</option>
                <option value="vna">VNA / precision S-parameters</option>
                <option value="production">Production / frequent mating</option>
                <option value="fixture">Fixed fixture / low movement</option>
              </select>
            </label>

            <div className="two-col">
              <label>
                Instrument port
                <select
                  value={instrumentPort}
                  onChange={(e) =>
                    setInstrumentPort(e.target.value as ConnectorId)
                  }
                >
                  {connectors.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                DUT port
                <select
                  value={dutPort}
                  onChange={(e) => setDutPort(e.target.value as ConnectorId)}
                >
                  {connectors.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <div className="panel result-panel" aria-live="polite">
            <p className="kicker">Recommended starting point</p>
            <div className="result-title-row">
              <div>
                <h2>{recommendation.name}</h2>
                <p>{recommendation.alias ?? 'precision coaxial interface'}</p>
              </div>
              <span className="frequency-pill">≤ {recommendation.maxGHz} GHz</span>
            </div>

            <div className="result-block">
              <span className="result-label">Cable class</span>
              <strong>{cable.name}</strong>
              <p>{cable.description}</p>
            </div>

            <div className="status-grid">
              <div>
                <span>Mechanical mating</span>
                <strong className={compatible ? 'ok' : 'warn'}>
                  {compatible ? 'Directly intermateable' : 'Adapter required'}
                </strong>
              </div>
              <div>
                <span>Known connector bottleneck</span>
                <strong className={bottleneck >= freq ? 'ok' : 'warn'}>
                  {bottleneck} GHz
                </strong>
              </div>
            </div>

            {bottleneck < freq && (
              <div className="warning-box">
                At least one selected connector is below the requested frequency.
                Verify the exact instrument, cable, adapter and DUT connector
                datasheets before measuring.
              </div>
            )}

            {compatible && instrument.family === 'A' && instrument.id !== dut.id && (
              <div className="note-box">
                “Intermateable” only describes the mechanical interface. It does
                not mean the higher-frequency performance of the precision
                connector is retained.
              </div>
            )}
          </div>
        </section>

        <section className="section">
          <div className="section-heading">
            <p className="kicker">2 · Identify the connector</p>
            <h2>Connector photo guide</h2>
            <p>
              Real examples are shown whenever the image source is traceable.
              Vendor images stay externally hosted until redistribution rights are
              confirmed.
            </p>
          </div>

          <div className="connector-grid">
            {connectors.map((connector) => (
              <article className="connector-card" key={connector.id}>
                <a
                  className="image-frame"
                  href={connector.imageSourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  title="Open image source"
                >
                  <img src={connector.imageUrl} alt={connector.imageAlt} loading="lazy" />
                </a>
                <div className="card-body">
                  <div className="card-title-row">
                    <div>
                      <h3>{connector.name}</h3>
                      {connector.alias && <span>{connector.alias}</span>}
                    </div>
                    <b>{connector.maxGHz} GHz</b>
                  </div>
                  <dl>
                    <div><dt>Impedance</dt><dd>{connector.impedanceOhm} Ω</dd></div>
                    <div><dt>Baseline torque</dt><dd>{connector.torqueNm} N·m</dd></div>
                    <div><dt>Family</dt><dd>{connector.family}</dd></div>
                  </dl>
                  <ul>
                    {connector.notes.map((note) => <li key={note}>{note}</li>)}
                  </ul>
                  <p className="credit">
                    Image: {connector.imageCredit} · {connector.imageLicense}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-heading">
            <p className="kicker">3 · Check mechanical compatibility</p>
            <h2>Intermateability matrix</h2>
            <p>
              This matrix is deliberately mechanical-only. Electrical performance
              still depends on the exact parts and the weakest element in the chain.
            </p>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Connector</th>
                  {connectors.map((c) => <th key={c.id}>{c.name}</th>)}
                </tr>
              </thead>
              <tbody>
                {connectors.map((row) => (
                  <tr key={row.id}>
                    <th>{row.name}</th>
                    {connectors.map((col) => (
                      <td key={col.id} className={isMechanicallyCompatible(row.id, col.id) ? 'yes' : 'no'}>
                        {isMechanicallyCompatible(row.id, col.id) ? '✓' : 'Adapter'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="section">
          <div className="section-heading">
            <p className="kicker">4 · Choose the cable by measurement behavior</p>
            <h2>Cable guide</h2>
          </div>
          <div className="cable-grid">
            {cables.map((item) => (
              <article className="cable-card" key={item.id}>
                <div className="cable-illustration" aria-hidden="true">
                  <span className="plug left" />
                  <span className="line" />
                  <span className="plug right" />
                </div>
                <h3>{item.name}</h3>
                <p className="best-for">{item.bestFor}</p>
                <p>{item.description}</p>
                <div className="mini-specs">
                  <span>Movement: {item.movement}</span>
                  <span>Phase stability: {item.phaseStability}</span>
                </div>
                {item.example && (
                  <a href={item.example.url} target="_blank" rel="noreferrer">
                    Example: {item.example.name} ↗
                  </a>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="source-section">
          <h2>Engineering baseline</h2>
          <p>
            V0.1 uses manufacturer documentation as the controlling reference for
            connector frequency, torque and compatibility. Every numeric value in
            the project should eventually point to an explicit source, and exact
            product datasheets override family-level guidance.
          </p>
          <div className="source-links">
            <a
              href="https://helpfiles.keysight.com/scopes/FlexDCA-UG/Content/Topics/Connector-Care/connector-elec-care.htm"
              target="_blank"
              rel="noreferrer"
            >
              Keysight connector care / connector table ↗
            </a>
            <a
              href="https://www.hubersuhner.com/en/shop/product-family/5107"
              target="_blank"
              rel="noreferrer"
            >
              HUBER+SUHNER test assembly example ↗
            </a>
          </div>
        </section>
      </main>

      <footer>
        <span>RF Interconnect Guide · V0.1</span>
        <span>Always verify the exact component datasheet before connecting expensive RF hardware.</span>
      </footer>
    </div>
  )
}

export default App
