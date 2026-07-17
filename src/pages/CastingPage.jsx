import { useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { GiFoundryBucket, GiMetalBar } from 'react-icons/gi'
import CastingSummary from '../components/CastingSummary'
import { useCasting } from '../hooks/useCasting'
import { getTodayDate, moneyFormat, numberFormat } from '../utils/formatters'

function CastingPage() {
  const { addMalEntry, addSaleEntry, malEntries, saleEntries, totals } =
    useCasting()
  const [activeTab, setActiveTab] = useState('mal')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [malDate, setMalDate] = useState(getTodayDate())
  const [malKg, setMalKg] = useState(75)
  const [saleDate, setSaleDate] = useState(getTodayDate())
  const [kadiKg, setKadiKg] = useState(10)
  const [kadiRate, setKadiRate] = useState(60)
  const [lokhandKg, setLokhandKg] = useState(40)
  const [lokhandRate, setLokhandRate] = useState(100)

  const handleAddMal = (event) => {
    event.preventDefault()

    if (!malDate || malKg <= 0) {
      return
    }

    addMalEntry({ date: malDate, kg: malKg })
    setMalKg(0)
    setIsFormOpen(false)
  }

  const handleAddSale = (event) => {
    event.preventDefault()

    if (!saleDate || (kadiKg <= 0 && lokhandKg <= 0)) {
      return
    }

    addSaleEntry({
      date: saleDate,
      kadiKg,
      kadiRate,
      lokhandKg,
      lokhandRate,
    })
    setKadiKg(0)
    setLokhandKg(0)
    setIsFormOpen(false)
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setIsFormOpen(false)
  }

  return (
    <>
      <section className="erp-page-heading">
        <p className="erp-eyebrow">Casting Foundry ERP</p>
        <h1>Casting</h1>
        <p>
          Add Mal stock and record Kadi and Lokhand production.
        </p>
      </section>

      <div className="casting-toolbar">
        <button
          className="primary-action casting-add-button"
          type="button"
          onClick={() => setIsFormOpen(true)}
        >
          <FiPlus />
          <span>Add</span>
        </button>

        <div
          className="casting-tabs"
          role="tablist"
          aria-label="Casting modules"
        >
          <button
            className={`casting-tab ${
              activeTab === 'mal' ? 'casting-tab--active' : ''
            }`}
            type="button"
            role="tab"
            aria-selected={activeTab === 'mal'}
            onClick={() => handleTabChange('mal')}
          >
            <GiFoundryBucket />
            <span>Mal</span>
          </button>
          <button
            className={`casting-tab ${
              activeTab === 'kadi-lokhand' ? 'casting-tab--active' : ''
            }`}
            type="button"
            role="tab"
            aria-selected={activeTab === 'kadi-lokhand'}
            onClick={() => handleTabChange('kadi-lokhand')}
          >
            <GiMetalBar />
            <span>Kadi & Lokhand</span>
          </button>
        </div>
      </div>

      {activeTab === 'mal' && (
        <section className="casting-tab-panel" role="tabpanel">
          {isFormOpen && (
            <div className="mal-card mal-card--form">
              <div className="mal-card__header">
                <div>
                  <p className="erp-eyebrow">Mal</p>
                  <h2>Add Mal</h2>
                </div>
                <GiFoundryBucket className="mal-card__header-icon" />
              </div>

              <form className="mal-form" onSubmit={handleAddMal}>
                <label className="field">
                  <span>Date</span>
                  <div className="field__control field__control--plain">
                    <input
                      type="date"
                      value={malDate}
                      onChange={(event) => setMalDate(event.target.value)}
                    />
                  </div>
                </label>

                <label className="field">
                  <span>Mal Quantity</span>
                  <div className="field__control">
                    <input
                      min="0"
                      step="0.01"
                      type="number"
                      value={malKg}
                      onChange={(event) => setMalKg(Number(event.target.value))}
                    />
                    <strong>kg</strong>
                  </div>
                </label>

                <button className="primary-action" type="submit">
                  Add Mal
                </button>
              </form>
            </div>
          )}

          <div className="mal-card mal-card--form">
            <div className="table-card">
              <h3>Mal Entries</h3>
              <div className="data-table-wrap">
                <table className="data-table data-table--compact">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Mal Added</th>
                    </tr>
                  </thead>
                  <tbody>
                    {malEntries.map((entry) => (
                      <tr key={entry.id}>
                        <td>{entry.date}</td>
                        <td>{numberFormat.format(entry.kg)} kg</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <CastingSummary
            className="casting-summary"
            totals={totals}
            wide
          />
        </section>
      )}

      {activeTab === 'kadi-lokhand' && (
        <section className="casting-tab-panel" role="tabpanel">
          {isFormOpen && (
            <div className="mal-card mal-card--form">
              <div className="mal-card__header">
                <div>
                  <p className="erp-eyebrow">Kadi & Lokhand</p>
                  <h2>Add Kadi & Lokhand</h2>
                </div>
                <GiMetalBar className="mal-card__header-icon" />
              </div>

              <form className="mal-form" onSubmit={handleAddSale}>
                <label className="field">
                  <span>Date</span>
                  <div className="field__control field__control--plain">
                    <input
                      type="date"
                      value={saleDate}
                      onChange={(event) => setSaleDate(event.target.value)}
                    />
                  </div>
                </label>

                <div className="material-row material-row--stacked">
                  <div className="material-row__title">
                    <GiFoundryBucket />
                    <span>Kadi Sale</span>
                  </div>
                  <label className="field">
                    <span>Kadi Weight</span>
                    <div className="field__control">
                      <input
                        min="0"
                        step="0.01"
                        type="number"
                        value={kadiKg}
                        onChange={(event) =>
                          setKadiKg(Number(event.target.value))
                        }
                      />
                      <strong>kg</strong>
                    </div>
                  </label>
                  <label className="field">
                    <span>Rate</span>
                    <div className="field__control">
                      <input
                        min="0"
                        step="0.01"
                        type="number"
                        value={kadiRate}
                        onChange={(event) =>
                          setKadiRate(Number(event.target.value))
                        }
                      />
                      <strong>Rs/kg</strong>
                    </div>
                  </label>
                </div>

                <div className="material-row material-row--stacked">
                  <div className="material-row__title">
                    <GiMetalBar />
                    <span>Lokhand Sale</span>
                  </div>
                  <label className="field">
                    <span>Lokhand Weight</span>
                    <div className="field__control">
                      <input
                        min="0"
                        step="0.01"
                        type="number"
                        value={lokhandKg}
                        onChange={(event) =>
                          setLokhandKg(Number(event.target.value))
                        }
                      />
                      <strong>kg</strong>
                    </div>
                  </label>
                  <label className="field">
                    <span>Rate</span>
                    <div className="field__control">
                      <input
                        min="0"
                        step="0.01"
                        type="number"
                        value={lokhandRate}
                        onChange={(event) =>
                          setLokhandRate(Number(event.target.value))
                        }
                      />
                      <strong>Rs/kg</strong>
                    </div>
                  </label>
                </div>

                <button className="primary-action" type="submit">
                  Add Kadi & Lokhand
                </button>
              </form>
            </div>
          )}

          <div className="mal-card mal-card--form">
            <div className="table-card">
              <h3>Kadi & Lokhand Entries</h3>
              <div className="data-table-wrap">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Kadi</th>
                      <th>Kadi Sell</th>
                      <th>Lokhand</th>
                      <th>Lokhand Sell</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {saleEntries.map((entry) => {
                      const kadiSell = entry.kadiKg * entry.kadiRate
                      const lokhandSell = entry.lokhandKg * entry.lokhandRate

                      return (
                        <tr key={entry.id}>
                          <td>{entry.date}</td>
                          <td>{numberFormat.format(entry.kadiKg)} kg</td>
                          <td>Rs {moneyFormat.format(kadiSell)}</td>
                          <td>{numberFormat.format(entry.lokhandKg)} kg</td>
                          <td>Rs {moneyFormat.format(lokhandSell)}</td>
                          <td>Rs {moneyFormat.format(kadiSell + lokhandSell)}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <CastingSummary
            className="casting-summary"
            totals={totals}
            wide
          />
        </section>
      )}
    </>
  )
}

export default CastingPage
