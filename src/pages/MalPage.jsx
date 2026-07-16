import { useState } from 'react'
import { FiPackage } from 'react-icons/fi'
import { GiFoundryBucket } from 'react-icons/gi'
import { useCasting } from '../hooks/useCasting'
import { getTodayDate, numberFormat } from '../utils/formatters'

function MalPage() {
  const { addMalEntry, malEntries, totals } = useCasting()
  const [malDate, setMalDate] = useState(getTodayDate())
  const [malKg, setMalKg] = useState(75)

  const handleAddMal = (event) => {
    event.preventDefault()

    if (!malDate || malKg <= 0) {
      return
    }

    addMalEntry({
      date: malDate,
      kg: malKg,
    })
    setMalKg(0)
  }

  return (
    <>
      <section className="erp-page-heading">
        <p className="erp-eyebrow">Casting Foundry ERP</p>
        <h1>Add Mal</h1>
        <p>Add total Mal in kilograms before converting it into Kadi and Lokhand.</p>
      </section>

      <section className="mal-workspace mal-workspace--single">
        <div className="mal-card mal-card--form">
          <div className="mal-card__header">
            <div>
              <p className="erp-eyebrow">Mal Stock</p>
              <h2>Add Mal Quantity</h2>
            </div>
            <GiFoundryBucket className="mal-card__header-icon" />
          </div>

          <form className="mal-form" onSubmit={handleAddMal}>
            <label className="field field--wide">
              <span>Date</span>
              <div className="field__control field__control--plain">
                <input
                  type="date"
                  value={malDate}
                  onChange={(event) => setMalDate(event.target.value)}
                />
              </div>
            </label>

            <label className="field field--wide">
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

            <div className="mal-stock-total">
              <FiPackage />
              <span>Total Mal Added</span>
              <strong>{numberFormat.format(totals.totalMal)} kg</strong>
            </div>

            <div className="table-card">
              <h3>Mal Entries</h3>
              <div className="data-table-wrap">
                <table className="data-table">
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
          </form>
        </div>
      </section>
    </>
  )
}

export default MalPage
