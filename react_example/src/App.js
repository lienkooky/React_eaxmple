import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [funcShow, setFuncShow] = useState(true);
  const [classShow, setClassShow] = useState(true);

  return (
    <div className="container">
      <h1>helloworld</h1>
      <input
        type="button"
        value="remove func"
        onClick={function () {
          setFuncShow(false);
        }}
      />
      <input
        type="button"
        value="remove comp"
        onClick={function () {
          setClassShow(false);
        }}
      />
      {funcShow ? <FuncComp initNumber={2} initDate={1}></FuncComp> : null}
      {classShow ? <ClassComp initNumber={2} initDate={1}></ClassComp> : null}
    </div>
  );
}

let funStyle = 'color: blue';
let funId = 0;

// 렌더링 순서
// render -> 맨위 useEffect -> 두번째 useEffect -> 세번째 useEffect
// number키 조작시
// render -> 두번째 useEffect return -> 두번재 useEffect
// date키 조작시
// render -> 세번째 useEffect return -> 세번재 useEffect
// remove func키 조작시
// 맨위 useEffect return -> 두번째 useEffect return -> 세번째 useEffect return

function FuncComp(props) {
  let numberState = useState(props.initNumber);
  let number = numberState[0];
  let setNumber = numberState[1];
  // console.log(number, setNumber);

  let dateState = useState(props.initDate);
  let date = dateState[0];
  let setDate = dateState[1];
  // console.log(date, setDate);

  useEffect(() => {
    console.log('%cfunc => useEffect (componentDidMount)' + ++funId, funStyle);
    document.title = number;
    return function () {
      console.log(
        '%cfunc => useEffect return (componentWillUnMount)' + ++funId,
        funStyle
      );
    };
  }, []);

  useEffect(() => {
    console.log(
      '%cfunc => useEffect number (componentDidMount & componentDidUpdate)' +
        ++funId,
      funStyle
    );
    document.title = number;
    return function () {
      console.log(
        '%cfunc => useEffect number return (componentDidMount & componentDidUpdate)' +
          ++funId,
        funStyle
      );
    };
  }, [number]);

  useEffect(() => {
    console.log(
      '%cfunc => useEffect date (componentDidMount & componentDidUpdate)' +
        ++funId,
      funStyle
    );
    document.title = date;
    return function () {
      console.log(
        '%cfunc => useEffect date return (componentDidMount & componentDidUpdate)' +
          ++funId,
        funStyle
      );
    };
  }, [date]);

  console.log('%cfunc => render' + ++funId, funStyle);
  return (
    <div className="container">
      <h2>function style component</h2>
      <p>Number : {number}</p>
      <input
        type="button"
        value="random"
        onClick={function () {
          setNumber(Math.random());
        }}
      ></input>
      <p>Date : {date}</p>
      <input
        type="button"
        value="date"
        onClick={function () {
          setDate(new Date().toString());
        }}
      ></input>
    </div>
  );
}

// 렌더링 순서
// componentWillMount -> render -> componentDidMount
// number키 조작시
// shouldComponentUpdate -> componentWillUpdate -> render -> componentDidUpdate
// date키 조작시
// shouldComponentUpdate -> componentWillUpdate -> render -> componentDidUpdate
// remove func키 조작시
// componentWillUnmount

class ClassComp extends React.Component {
  state = {
    number: this.props.initNumber,
    date: this.props.initDate,
  };

  componentWillMount() {
    console.log('%ccalss => componentWillMount', 'color:red');
  }

  componentDidMount() {
    console.log('%ccalss => componentDidMount', 'color:red');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('%ccalss => shouldComponentUpdate', 'color:red');
    return true;
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('%ccalss => componentWillUpdate', 'color:red');
  }

  componentDidUpdate(nextProps, nextState) {
    console.log('%ccalss => componentDidUpdate', 'color:red');
  }

  componentWillUnmount() {
    console.log('%ccalss => componentWillUnmount', 'color:red');
  }

  render() {
    console.log('%ccalss => render', 'color:red');
    return (
      <div className="container">
        <h2>class style component</h2>
        <p>Number : {this.state.number}</p>
        <input
          type="button"
          value="random"
          onClick={function () {
            this.setState({ number: Math.random() });
          }.bind(this)}
        ></input>
        <p>Date : {this.state.date}</p>
        <input
          type="button"
          value="date"
          onClick={function () {
            this.setState({ date: new Date().toString() });
          }.bind(this)}
        ></input>
      </div>
    );
  }
}

export default App;
