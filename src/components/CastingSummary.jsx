import { FiActivity, FiDollarSign, FiPackage, FiTrendingUp } from 'react-icons/fi'
import { moneyFormat, numberFormat } from '../utils/formatters'

function CastingSummary({ totals, wide = false, className = '' }) {
  const summaryClassName = [
    'mal-card',
    'mal-card--summary',
    className,
  ]
    .filter(Boolean)
    .join(' ')
  const gridClassName = ['summary-grid', wide ? 'summary-grid--wide' : '']
    .filter(Boolean)
    .join(' ')

  return (
    <section className={summaryClassName}>
      <div className={gridClassName}>
        <div className="summary-item">
          <FiPackage />
          <span>Mal</span>
          <strong>{numberFormat.format(totals.totalMal)} kg</strong>
        </div>
        <div className="summary-item">
          <FiDollarSign />
          <span>Kadi Sell</span>
          <strong>Rs {moneyFormat.format(totals.kadiSell)}</strong>
        </div>
        <div className="summary-item">
          <FiDollarSign />
          <span>Lokhand Sell</span>
          <strong>Rs {moneyFormat.format(totals.lokhandSell)}</strong>
        </div>
        <div
          className={`summary-item ${
            totals.remainingMal < 0 ? 'summary-item--warning' : ''
          }`}
        >
          <FiActivity />
          <span>Remaining Mal</span>
          <strong>{numberFormat.format(totals.remainingMal)} kg</strong>
          <small>
            {numberFormat.format(totals.totalMal)} kg -{' '}
            {numberFormat.format(totals.usedMal)} kg
          </small>
        </div>
      </div>

      <div className="income-total">
        <div>
          <span>Total Income</span>
          <strong>Rs {moneyFormat.format(totals.totalIncome)}</strong>
        </div>
        <FiTrendingUp />
      </div>
    </section>
  )
}

export default CastingSummary
