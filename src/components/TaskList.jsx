import TaskItem from './TaskItem';

function TaskList({ tasks, onToggle, onDelete }) {
    if (tasks.length === 0) {
        return (
            <div className="empty-message">
                <p>No tasks yet. Add your first task!</p>
            </div>
        );
    }

    return (
        <div className="task-list">
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={onToggle}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}

export default TaskList;