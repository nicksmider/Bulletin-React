import React, {Component} from 'react'
import Note from './Note'
import FaPlus from 'react-icons/lib/fa/plus'

class Board extends Component {
    constructor(props){
        super(props);
        this.state = {
            notes : [
                
            ]
        };
        this.eachNote = this.eachNote.bind(this);
        this.update = this.update.bind(this);
        this.remove = this.remove.bind(this);
        this.add = this.add.bind(this);
        this.nextId  = this.nextId.bind(this);
    }
    componentWillMount(){
        var self = this;
        if (this.props.count){
            fetch(`https://baconipsum.com/api/?type=all-meat&sentences=${this.props.count}`)
                .then(response=> response.json())
                .then(json => json[0]
                    .split('. ')
                    .forEach(sentence => self.add(sentence.substring(0,25))))
        }
    }
    eachNote(note,i){
        return (
            <Note   key={note.id} 
                    index = {note.id} 
                    onChange={this.update}
                    onRemove={this.remove}>
                {note.note}
            </Note>
        )
    }
    remove(id) {
        this.setState(prevState => ({
            notes: prevState.notes.filter(note =>note.id !== id)
        }));
    }
    update(newText, i){
        console.log('update item', i, newText);
        this.setState(prevState=>({
            notes : prevState.notes.map(
                note => (note.id !== i) ? note : {...note, note: newText}
            )
        }))
    }
    add(text) {
        this.setState(prevState=> ({
            notes : [
                ...prevState.notes,
                {
                    id : this.nextId(),
                    note : text
                }
            ]
        }));
    }
    nextId() {
        this.uniqueID = this.uniqueID || 0;
        return this.uniqueID++;
    }
    render() {
        return (
            <div className="board">
                {this.state.notes.map(this.eachNote)}
                <button onClick={this.add.bind(null, "New Note")}
                        id = "add">
                    <FaPlus/>    
                </button>
            </div>
        )
    }
}

export default Board;