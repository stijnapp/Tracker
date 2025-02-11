import { useEffect, useRef, useState } from "react"
import { db } from "../../helpers/db"
import Input from "../Form/Input"

export default function Set({ workoutId, workoutExerciseId, setId, newSet = null, potentialDelete = null }) {
    const [set, setSet] = useState(db.getSetById(workoutId, workoutExerciseId, setId))
    const weightInputRef = useRef(null)
    const repsInputRef = useRef(null)

    const handleWeightChange = (e) => {
        let newWeight = e.target.valueAsNumber
        if (!e.target.checkValidity()) {
            newWeight = set.weight
        }
        db.updateSet(workoutId, workoutExerciseId, setId, { ...set, weight: newWeight })
        if (!newWeight && !set.reps && potentialDelete !== null) {
            potentialDelete('weight')
            return
        }
        setSet(db.getSetById(workoutId, workoutExerciseId, setId))
    }

    const handleRepsChange = (e) => {
        let newReps = e.target.valueAsNumber
        if (!e.target.checkValidity()) {
            newReps = set.reps
        }
        db.updateSet(workoutId, workoutExerciseId, setId, { ...set, reps: newReps })
        if (!set.weight && !newReps && potentialDelete !== null) {
            potentialDelete('reps')
            return
        }
        setSet(db.getSetById(workoutId, workoutExerciseId, setId))
    }

    useEffect(() => {
        if (newSet?.setId === setId) {
            if (newSet.type === 'weight') {
                weightInputRef.current.focus()
            } else if (newSet.type === 'reps') {
                repsInputRef.current.focus()
            }
        }
    }, [newSet, setId])

    return (
        <>
            <p className="col-span-1 text-sm text-gray-500 dark:text-gray-400 text-nowrap">Set {set.id}</p>
            <Input inputRef={weightInputRef} type="number" step="0.01" min="0" label="Weight" value={set.weight ?? ''} onChange={handleWeightChange} className="col-span-3" />
            <Input inputRef={repsInputRef} type="number" step="0.1" min="0" label="Reps" value={set.reps ?? ''} onChange={handleRepsChange} className="col-span-3" />
        </>
    )
}