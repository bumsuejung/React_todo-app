import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css"

function Lineday({cnt}) {
    let acc = []
    for (let i = 0; i < cnt; i++)
        acc.push(i)
    
    return (
    <td>{acc.map((item, ix) => item)}</td>
    )
}

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    
    render() {

        const today = new Date();
        const [year, month, day, hour, minute, second] = [today.getFullYear(), (today.getMonth() + 1), today.getDate(), today.getHours(), today.getMinutes(), today.getSeconds()];
        const weeks = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];

        return (
            <div className="container">
                <div className="header">
                    <h1>Welcome to TodoApp</h1>
                </div>
                <div className="content">
                    <table>
                        <thead>
                            <tr>
                                <td>{today.getHours() > 12 ? "오후" : "오전"} {hour > 12 ? hour - 12 : hour}:{minute}:{second}</td>
                            </tr>
                            <tr>
                                <td>{year}년 {month}월 {day}일 {weeks[today.getDay()]}</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {weeks.map((week, ix) => <td key={ix} name={week}>{week}</td>)}
                            </tr>
                            <tr>
                                <Lineday cnt={7}/>
                            </tr>
                            <tr>
                                <Lineday cnt={14}/>
                            </tr>
                            <tr>
                                <Lineday cnt={21}/>
                            </tr>
                            <tr>
                                <Lineday cnt={28}/>
                            </tr>
                            <tr>
                                <Lineday cnt={35}/>
                            </tr>
                        </tbody>
                    </table>
                    <div className="input-card">
                        <div>
                            <input type="text" placeholder="오늘 할 일을 적어주세요." />
                        </div>
                    </div>
                    <div className="addList">

                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));
