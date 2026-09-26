function TaskItem({ task, onToggle, onDelete }) {
    return (
        <div className={`task-item ${task.completed ? 'completed' : ''}`}>
            <div className="task-info">
                <h3>{task.text}</h3>

                <div className="task-details">
                    <span className={`priority ${task.priority.toLowerCase()}`}>
                        {task.priority}
                    </span>

                    <span className="category">
                        {task.category}
                    </span>
                </div>
            </div>

            <div className="task-actions">
                <button onClick={() => onToggle(task.id)}>
                    {task.completed ? 'Undo' : 'Complete'}
                </button>

                <button onClick={() => onDelete(task.id)}>
                    Delete
                </button>
            </div>
        </div>
    );
}

export default TaskItem;