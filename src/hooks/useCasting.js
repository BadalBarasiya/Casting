import { useContext } from 'react'
import { CastingDataContext } from '../context/CastingDataContext'

export function useCasting() {
  const context = useContext(CastingDataContext)

  if (!context) {
    throw new Error('useCasting must be used inside CastingProvider')
  }

  return context
}
