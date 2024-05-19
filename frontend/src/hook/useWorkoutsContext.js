import { WorkoutsContext } from "../context/WorkoutContext";
import {useContext} from 'react'

export const useWorkoutsContext = () =>{
    const context = useContext(WorkoutsContext)

    if(!context){
        throw Error('useWorkoutsContext must be used in right place')
    }

    return context
}


//this is important for GIANT applications, so only certain branches have access
//def overkill in this situation