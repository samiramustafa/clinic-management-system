import { useEffect, useState } from "react";
import axios from "axios";

function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/users/')
            .then(response => {
                console.log(response.data);
                setUsers(response.data); // Store the data in the state
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <div>
            <h1>Users</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.name}</li> // Replace 'name' with the correct field from your response
                ))}
            </ul>
        </div>
    );
}

export default Users;
