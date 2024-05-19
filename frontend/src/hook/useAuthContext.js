import { AuthContext } from "../context/AuthContext";
import {useContext} from 'react'

export const useAuthContext = () =>{
    const context = useContext(AuthContext)

    if(!context){
        throw Error('useAuthContext must be used in right place')
    }

    return context
}


//this is important for GIANT applications, so only certain branches have access
//def overkill in this situation