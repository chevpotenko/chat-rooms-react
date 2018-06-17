import React from 'react';

class AddForm extends React.Component {

    render() {
        return (
            <div className="room-control">
                <input type="text"
                        className="room-newitem"
                        placeholder="Name"
                        ref="inputValue"/>
                <button className="room-add"
                        onClick={ () => this.props.onAddItem(this.refs.inputValue.value) }>add</button>
            </div>
        );
    }
}

export default AddForm;