import { useMemo, useState } from 'react'
import { CastingDataContext } from './CastingDataContext'
import { getTodayDate } from '../utils/formatters'

export function CastingProvider({ children }) {
  const [malEntries, setMalEntries] = useState([
    {
      id: 1,
      date: getTodayDate(),
      kg: 75,
    },
  ])
  const [saleEntries, setSaleEntries] = useState([
    {
      id: 1,
      date: getTodayDate(),
      kadiKg: 10,
      kadiRate: 60,
      lokhandKg: 40,
      lokhandRate: 100,
    },
  ])

  const totals = useMemo(() => {
    const totalMal = malEntries.reduce((sum, entry) => sum + entry.kg, 0)
    const kadiSell = saleEntries.reduce(
      (sum, entry) => sum + entry.kadiKg * entry.kadiRate,
      0,
    )
    const lokhandSell = saleEntries.reduce(
      (sum, entry) => sum + entry.lokhandKg * entry.lokhandRate,
      0,
    )
    const usedMal = saleEntries.reduce(
      (sum, entry) => sum + entry.kadiKg + entry.lokhandKg,
      0,
    )

    return {
      kadiSell,
      lokhandSell,
      remainingMal: totalMal - usedMal,
      totalIncome: kadiSell + lokhandSell,
      totalMal,
      usedMal,
    }
  }, [malEntries, saleEntries])

  const addMalEntry = ({ date, kg }) => {
    setMalEntries((current) => [
      ...current,
      {
        id: Date.now(),
        date,
        kg,
      },
    ])
  }

  const addSaleEntry = (entry) => {
    setSaleEntries((current) => [
      ...current,
      {
        id: Date.now(),
        ...entry,
      },
    ])
  }

  const value = {
    addMalEntry,
    addSaleEntry,
    malEntries,
    saleEntries,
    totals,
  }

  return (
    <CastingDataContext.Provider value={value}>
      {children}
    </CastingDataContext.Provider>
  )
}
