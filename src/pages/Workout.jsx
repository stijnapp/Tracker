import { faFlagCheckered, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import AnimateInOut from "../components/AnimateInOut";
import Modal from "../components/Modal";
import Page from "../components/Page";
import ActiveWorkoutInfo from "../components/Workout/ActiveWorkoutInfo";
import WorkoutExercise from "../components/Workout/WorkoutExercise";
import { db } from "../helpers/db";

export default function Workout() {
    const [activeWorkoutId, setActiveWorkoutId] = useState(db.getActiveWorkoutId())
    const [workoutExerciseIds, setWorkoutExerciseIds] = useState(db.getWorkoutExerciseIds(activeWorkoutId))
    const [isEndingModalOpen, setIsEndingModalOpen] = useState(false)

    const startNewWorkout = () => {
        const newWorkoutId = db.addWorkout().id
        setActiveWorkoutId(newWorkoutId)
        setWorkoutExerciseIds(db.getWorkoutExerciseIds(newWorkoutId))
    }

    const endworkout = () => {
        // TODO: does something else need saving?
        db.endActiveWorkout()
        setActiveWorkoutId(null)
        setWorkoutExerciseIds([])
        setIsEndingModalOpen(false)
        // TODO: global success alert "Workout saved successfully" or "Workout ended"
    }

    return (
        <Page title="Workout">
            <AnimateInOut className="flex flex-col gap-4">
                {!activeWorkoutId && <button className="btn-primary" onClick={startNewWorkout}>Start workout</button>}
            </AnimateInOut>

            <AnimateInOut className="flex flex-col gap-4 mb-40">
                {activeWorkoutId && (
                    <>
                        <ActiveWorkoutInfo activeWorkoutId={activeWorkoutId} />

                        {workoutExerciseIds.map((exerciseId) => (
                            <WorkoutExercise key={exerciseId} workoutId={activeWorkoutId} workoutExerciseId={exerciseId} newestExercise={exerciseId === workoutExerciseIds[workoutExerciseIds.length - 1]} />
                        ))}

                        <button className="btn-primary"><FontAwesomeIcon icon={faPlus} className="mr-2" />Add exercise</button>
                        <button className="btn-danger" onClick={() => setIsEndingModalOpen(true)}><FontAwesomeIcon icon={faFlagCheckered} className="mr-2" />End workout</button>
                    </>
                )}
            </AnimateInOut>

            {/* modal for ending workout */}
            <Modal showModal={isEndingModalOpen} onClose={() => setIsEndingModalOpen(false)} title="End workout">
                <p>Are you sure you want to end this workout?</p>
                <p className="mb-2">You can always edit the workout later via the history page.</p>
                <div className="flex gap-4">
                    <button className="btn-secondary w-full" onClick={() => setIsEndingModalOpen(false)}>Keep going</button>
                    <button className="btn-danger w-full" onClick={endworkout}>End workout</button>
                </div>
            </Modal>
        </Page>
    )
}

// export function ActiveWorkout() {
//     // start of workout
//     // foreach exerciseId: <Exercise workoutId={id} exerciseId={exerciseId} />
// }

// export function Exercise({ workoutId, exerciseId }) {
//     // name
//     // nickname
//     // description
//     // foreach setId: <Set workoutId={workoutId} exerciseId={exerciseId} setId={setId} />

//     // <Collapsible>
//     //     <CollapsibleHeader/>
//     //     <CollapsibleContent/>
//     // </Collapsible>
// }

// export function Set({ workoutId, exerciseId, setId }) {
//     // weight
//     // reps
//     // previous results
// }