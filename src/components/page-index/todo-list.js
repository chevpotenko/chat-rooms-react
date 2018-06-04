import React from 'react';

export default function Users(props) {

    let curentRoomIndex = props.currentRoom;
    const todoItems = props.roomsList[curentRoomIndex].todo.map((todo, index) =>
        <li key={ index }>
            { todo }
            <span className="btn-delete">x</span>
        </li>
    );

    return (
        <div className="column">
            <div className="todo">
                <h3>Todo list</h3>
                    {
                        props.user[0].value ? (
                            <div className="room-control">
                                <input type="text"
                                        className="room-newitem"
                                        placeholder="Name"/>
                                <button className="room-add">add</button>
                            </div>
                        ) : ('')
                    }  
                <ul className="todo-list">{ todoItems }</ul>
            </div>
        </div>
    );
}