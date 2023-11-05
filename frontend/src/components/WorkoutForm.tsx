import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createGoal } from '../features/goals/goalSlice'
import { AppDispatch } from '../redux/store'


const GoalForm = () => {
    const [text, setText] = useState('')

    const dispatch = useDispatch<AppDispatch>()

    const onSubmit = e => {
        e.preventDefault()
        dispatch(createGoal({text}))
        setText('')
    }

    return (
        <section className='form'>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        name="text"
                        id="text"
                        placeholder="Write a goal..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <button className="btn btn-block" type="submit">Pin Goal</button>
                </div>
            </form>
        </section>
    )
}
export default GoalForm