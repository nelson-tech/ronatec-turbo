import React, { useState } from 'react'

const CustomView: React.FC = props => {
  const handleSync: React.MouseEventHandler<HTMLButtonElement> = e => {
    e.preventDefault()

    const things = fetch('/api/categories/sync/wc')
  }

  const handleParents: React.MouseEventHandler<HTMLButtonElement> = e => {
    e.preventDefault()

    const things = fetch('/api/categories/sync/wc_parents')
  }

  return (
    <div
      className=""
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <button onClick={handleSync}>Sync Now</button>
      <button onClick={handleParents}>Sync Parents</button>
    </div>
  )
}

export default CustomView
