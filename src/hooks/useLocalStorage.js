import { useEffect, useState } from "react"

function useLocalStorage(key, defaultValue){ 
    // 
    const [value, setValue] = useState(() => {
        const jsonValue = localStorage.getItem(key)
        if(jsonValue != null) return JSON.parse(jsonValue)
        // get value from local storage, if we have a value return it. 
        // otherwise return default value 
        if (typeof defaultValue === 'function'){ 
            return defaultValue() 
        } else { 
            return defaultValue
        }

    })
    // whenever key value changes, we update our localstorage
   
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}

export default useLocalStorage; 