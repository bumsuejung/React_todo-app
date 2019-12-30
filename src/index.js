import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css"

let todoId = 0;

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            todoList: [],
            date: new Date(),
            inputValue: '',
        }
    }

    handleClock = () => {
        this.setState({
            date: new Date()
        });
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        if (!(this.state.inputValue.trim())) return alert("내용을 입력해주세요.");
        if (this.state.inputValue.length > 150) return alert("150글자 이하로 입력해주세요")
        const newItem = {
            inputValue: this.state.inputValue,
            id: todoId++
        };
        this.setState(state => ({
            todoList: state.todoList.concat(newItem),
            inputValue: ''
        }));

    }

    handleChange = (e) => {
        this.setState({
            inputValue: e.target.value
        });
    }

    handleChkChange = (e) => {
        const check_alls = document.querySelectorAll('input[name="complete"]');
        const allChk = document.querySelector('input[name="allChk"]');

        for (let check_all of check_alls)
            check_all.checked = allChk.checked ? true : false;
    }

    clock = () => {
        this.interval = setInterval(this.handleClock, 1000);
    }

    componentDidMount() {
        this.clock();
    }

    render() {
        const { date, todoList, inputValue } = this.state;
        const [year, month, day, hour, minute, second] = [date.getFullYear(), (date.getMonth() + 1), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()];
        const weeks = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];

        this.handleChkChange()

        return (
            <div className="container">
                <div className="header">
                    <h1>Welcome to TodoApp</h1>
                </div>
                <div className="content">
                    <table>
                        <thead>
                            <tr>
                                <th>{hour > 12 ? "오후" : "오전"} {hour > 12 ? hour - 12 : hour}:{minute}:{second}</th>
                            </tr>
                            <tr>
                                <th>{year}년 {month}월 {day}일 {weeks[date.getDay()]}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {weeks.map((week, ix) => <td key={ix} name={week}>{week}</td>)}
                            </tr>
                        </tbody>
                    </table>
                    <div className="input-card">
                        <div>
                            <form onSubmit={this.handleSubmit}>
                                <input
                                    value={inputValue}
                                    onChange={this.handleChange}                                
                                    type="text" 
                                    placeholder="오늘 할 일을 적어주세요." />
                                <button>추가</button>
                            </form>
                        </div>
                    </div>
                    <div className="addList flex sb">
                        <div className="todoList">                        
                            <h2>해야할 일</h2>
                            <div className="input_chk">
                                <input type="checkbox" name="allChk" id="all" onChange={this.handleChkChange}/>
                                <label htmlFor="all">모두 체크하기</label>
                            </div>
                            <ul>
                                {todoList.map((el, ix) =>
                                    <li key={el.id}>
                                        <div>
                                            <input type="checkbox" name="complete" id={"com"+el.id} />
                                            <label htmlFor={"com"+el.id}>{el.inputValue}</label>
                                        </div>
                                    </li>
                            )}
                            </ul>
                        </div>
                        <div className="completionList">
                            <h2>완료한 일</h2>
                        </div>                    
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));