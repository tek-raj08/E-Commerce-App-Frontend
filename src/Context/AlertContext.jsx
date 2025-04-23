import { createContext, useContext, useState } from "react";


const AlertContext = createContext()

export const AlertProvider = ({children}) => {

    const [alert, setAlert] = useState(null)

    const showAlert = (message, type) => {

        setAlert({
            message: message,
            type: type
        })

        setTimeout(() => {
            setAlert(null)
        }, 1000);

    }


    return(
        <AlertContext.Provider value={{alert, showAlert, setAlert}}>
            {children}
        </AlertContext.Provider>
    )
}

export const useAlert = () => useContext(AlertContext)
