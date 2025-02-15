
import { createContext} from 'react'



export const UserIdContext =createContext()
export default function UserIdContextProvider({children}) {

  const id = localStorage.getItem('userId')

  return <UserIdContext.Provider value={{id}}>
    {children}
  </UserIdContext.Provider>
}
