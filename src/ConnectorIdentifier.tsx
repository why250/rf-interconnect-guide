import { useMemo, useState } from 'react'
import { connectors, type ConnectorId } from './data'

type Gender = 'male' | 'female'

function FrontView({ gender }: { gender: Gender }) {
  const isMale = gender === 'male'

  return (
    <svg
      className="front-view"
      viewBox="0 0 320 250"
      role="img"
      aria-label={isMale ? 'Simplified male coaxial connector front view' : 'Simplified female coaxial connector front view'}
    >
      <circle cx="160" cy="125" r="104" className="diagram-shell" />
      <circle cx="160" cy="125" r="76" className="diagram-thread-zone" />
      <circle cx="160" cy="125" r="46" className="diagram-dielectric-zone" />
      {isMale ? (
        <>
          <circle cx="160" cy="125" r="12" className="diagram-pin" />
          <line x1="173" y1="118" x2="238" y2="78" className="diagram-leader" />
          <text x="243" y="75" className="diagram-label">center pin</text>
          <line x1="95" y1="72" x2="54" y2="42" className="diagram-leader" />
          <text x="10" y="36" className="diagram-label">coupling nut</text>
        </>
      ) : (
        <>
          <circle cx="160" cy="125" r="15" className="diagram-socket" />
          <circle cx="160" cy="125" r="7" className="diagram-socket-hole" />
          <line x1="176" y1="116" x2="239" y2="76" className="diagram-leader" />
          <text x="243" y="73" className="diagram-label">center socket</text>
          <line x1="90" y1="70" x2="48" y2="40" className="diagram-leader" />
          <text x="9" y="34" className="diagram-label">outer thread</text>
        </>
      )}
      <text x="160" y="232" textAnchor="middle" className="diagram-caption">
        schematic — not to scale
      </text>
    </svg>
  )
}

export default function ConnectorIdentifier() {
  const [connectorId, setConnectorId] = useState<ConnectorId>('2.92')
  const [gender, setGender] = useState<Gender>('male')

  const connector = useMemo(
    () => connectors.find((item) => item.id === connectorId)!,
    [connectorId],
  )

  const familyText =
    connector.family === 'A'
      ? 'Family A: SMA / 3.5 mm / 2.92 mm'
      : 'Family B: 2.4 mm / 1.85 mm'

  const exactIdWarning =
    connector.family === 'A'
      ? 'SMA, 3.5 mm and 2.92 mm intentionally share a mating geometry. Do not identify the exact type from thread appearance alone; check equipment markings, datasheets, dielectric construction and gauges when precision hardware is involved.'
      : '2.4 mm and 1.85 mm are mechanically intermateable but are still different interfaces. Confirm the marking or product documentation before assuming the higher-frequency rating.'

  return (
    <section className="section identifier-section" aria-labelledby="identifier-title">
      <div className="section-heading">
        <p className="kicker">2 · Visual identifier</p>
        <h2 id="identifier-title">What connector is in my hand?</h2>
        <p>
          Use the center contact to determine gender first. Then identify the
          connector family. Only after that should you decide the exact interface.
        </p>
      </div>

      <div className="identifier-layout">
        <div className="panel identifier-controls">
          <div>
            <span className="step-number">Step 1</span>
            <h3>Center contact → gender</h3>
            <p className="identifier-help">
              For the threaded coax interfaces covered here, a protruding center
              pin is the male contact; a receptacle / contact fingers form the
              female center contact.
            </p>
          </div>

          <div className="gender-toggle" role="group" aria-label="Connector gender">
            <button
              type="button"
              className={gender === 'male' ? 'gender-button active' : 'gender-button'}
              onClick={() => setGender('male')}
            >
              <span className="contact-symbol pin-symbol" aria-hidden="true" />
              Male · pin
            </button>
            <button
              type="button"
              className={gender === 'female' ? 'gender-button active' : 'gender-button'}
              onClick={() => setGender('female')}
            >
              <span className="contact-symbol socket-symbol" aria-hidden="true" />
              Female · socket
            </button>
          </div>

          <div className="diagram-card">
            <FrontView gender={gender} />
          </div>

          <div>
            <span className="step-number">Step 2</span>
            <h3>Choose the likely family</h3>
          </div>

          <div className="identifier-connector-buttons">
            {connectors.map((item) => (
              <button
                type="button"
                key={item.id}
                className={connectorId === item.id ? 'id-choice active' : 'id-choice'}
                onClick={() => setConnectorId(item.id)}
              >
                <span>{item.name}</span>
                <small>{item.maxGHz} GHz class</small>
              </button>
            ))}
          </div>
        </div>

        <div className="identifier-result">
          <article className="identifier-photo-card">
            <a
              href={connector.imageSourceUrl}
              target="_blank"
              rel="noreferrer"
              className="identifier-photo"
              title="Open original image source"
            >
              <img src={connector.imageUrl} alt={connector.imageAlt} />
            </a>
            <div className="identifier-photo-body">
              <div className="id-result-title">
                <div>
                  <span className="step-number">Step 3 · verify exact type</span>
                  <h3>{connector.name} · {gender}</h3>
                  {connector.alias && <p>{connector.alias}</p>}
                </div>
                <span className="family-badge">{connector.family}</span>
              </div>

              <div className="identity-facts">
                <div>
                  <span>Mechanical family</span>
                  <strong>{familyText}</strong>
                </div>
                <div>
                  <span>Family-level frequency baseline</span>
                  <strong>{connector.maxGHz} GHz</strong>
                </div>
                <div>
                  <span>Center contact</span>
                  <strong>{gender === 'male' ? 'Pin' : 'Socket / fingers'}</strong>
                </div>
              </div>

              <div className="identification-warning">
                <strong>Do not identify by threads alone.</strong>
                <p>{exactIdWarning}</p>
              </div>

              {connector.id === 'sma' && (
                <div className="precision-warning">
                  <strong>Precision-port warning</strong>
                  <p>
                    Before mating SMA male hardware to a precision 3.5 mm or 2.92
                    mm female port, inspect and gauge the SMA pin. A protruding or
                    damaged pin can damage the female contact fingers.
                  </p>
                </div>
              )}

              <p className="credit">
                Image: {connector.imageCredit} · {connector.imageLicense}
              </p>
            </div>
          </article>

          <div className="decision-strip">
            <div>
              <span>1</span>
              <p><strong>Pin or socket?</strong><br />Determine gender.</p>
            </div>
            <div className="decision-arrow">→</div>
            <div>
              <span>2</span>
              <p><strong>Which mating family?</strong><br />A or B.</p>
            </div>
            <div className="decision-arrow">→</div>
            <div>
              <span>3</span>
              <p><strong>Exact interface?</strong><br />Verify markings / datasheet.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
