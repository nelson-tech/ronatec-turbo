import React from 'react'
import { useAuth } from 'payload/components/utilities'
import './index.css'
import syncLanco from './syncLanco'

const baseClass = 'after-dashboard'

const AfterDashboard: React.FC = () => {
  const handleClick: React.FormEventHandler<HTMLButtonElement> = e => {
    e.preventDefault()

    syncLanco()
  }
  return (
    <div className={baseClass}>
      <button className="p-8 bg-gray-700 rounded" onClick={handleClick}>
        Sync Lanco Products
      </button>
    </div>
  )
}

export default AfterDashboard
