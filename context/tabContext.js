import { useState, createContext, useContext } from 'react'
import { Tabs } from '../components/Menu'

export const TabContext = createContext()

export default function TabContextComp({ children }) {
  const [tab, setTab] = useState(0)

  function handleChange(event, newValue) {
    setTab(newValue)
  }

  return (
    <TabContext.Provider value={tab}>
      <Tabs value={tab} onChange={handleChange} />
      {children}
    </TabContext.Provider>
  )
}

// Custom hook that shorthands the context!
export const useTab = () => useContext(TabContext)
