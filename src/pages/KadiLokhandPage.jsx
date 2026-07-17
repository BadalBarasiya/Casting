import { useState } from 'react'
import { GiFoundryBucket, GiMetalBar } from 'react-icons/gi'
import CastingSummary from '../components/CastingSummary'
import { useCasting } from '../hooks/useCasting'
import { getTodayDate, moneyFormat, numberFormat } from '../utils/formatters'

function KadiLokhandPage() {
  const { addSaleEntry, saleEntries, totals } = useCasting()
  const [saleDate, setSaleDate] = useState(getTodayDate())
  const [kadiKg, setKadiKg] = useState(10)
  const [kadiRate, setKadiRate] = useState(60)
  const [lokhandKg, setLokhandKg] = useState(40)
  const [lokhandRate, setLokhandRate] = useState(100)

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
  }

  return (
    <>
      <section className="erp-page-heading">
        <p className="erp-eyebrow">Casting Foundry ERP</p>
        <h1>Kadi & Lokhand</h1>
        <p>
          Enter Kadi and Lokhand weight with selling rates to calculate income
          and remaining Mal.
        </p>
      </section>

      <section className="mal-workspace" aria-labelledby="mal-calculator-title">
        <div className="mal-card mal-card--form">
          <div className="mal-card__header">
            <div>
              <p className="erp-eyebrow">Mal Conversion</p>
              <h2 id="mal-calculator-title">Kadi & Lokhand Sales</h2>
            </div>
            <GiFoundryBucket className="mal-card__header-icon" />
          </div>

          <form className="mal-form" onSubmit={handleAddSale}>
            <label className="field field--wide">
              <span>Date</span>
              <div className="field__control field__control--plain">
                <input
                  type="date"
                  value={saleDate}
                  onChange={(event) => setSaleDate(event.target.value)}
                />
              </div>
            </label>

            <div className="material-row">
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
                    onChange={(event) => setKadiKg(Number(event.target.value))}
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

            <div className="material-row">
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
          </form>
        </div>

        <CastingSummary totals={totals} />
      </section>
    </>
  )
}

export default KadiLokhandPage
