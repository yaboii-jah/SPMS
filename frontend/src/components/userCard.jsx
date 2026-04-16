import './UserCard.css'

export function UserCard({ user, onEdit }) {
    return (
        <div className="user-card">
            <div className="user-info">
                <p className="name">
                    {user.last_name} {user.first_name}
                </p>
                <p className="role">{user.role}</p>
            </div>

            <button className="edit-btn" onClick={() => onEdit(user.user_id)}>
                Edit
            </button>
        </div>
    )
}