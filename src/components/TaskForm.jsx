import { useState } from 'react';

function TaskForm({ onAddTask }) {
    const [text, setText] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [category, setCategory] = useState('General');

    function handleSubmit(e) {
        e.preventDefault();

        if (text.trim() === '') return;

        onAddTask({
            id: Date.now(),
            text: text,
            priority: priority,
            category: category,
            completed: false,
        });

        setText('');
    }

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter your task"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            <button type="submit">Add Task</button>

            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
            </select>

            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option>General</option>
                <option>Work</option>
                <option>Personal</option>
                <option>Study</option>
            </select>
        </form>
    );
}

export default TaskForm;