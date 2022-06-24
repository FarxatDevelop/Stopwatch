import React from "react";

class Stopwatch extends React.Component {

  state = {
    second: 0,
    minute: 0,
    hour: 0,
    btnDisable: false,
    interval: "",
    history: [],
  };

  startBtn = () => {
    this.setState({
      btnDisable: true,
    });
    
    const interval = setInterval(() => {
      const {second, minute, hour } = this.state;
      if (second >= 59) {
        this.setState({
          second: 0,
          minute: minute + 1
        });
        if (minute >= 59) {
          this.setState({
            second: 0,
            minute: 0,
            hour: hour + 1
          });
          if (hour >= 59) {
            this.setState({
              second: 0,
              minute: 0,
              hour: 0,
            });
          };
        };
      } else {
        this.setState({
          second: second + 1,
        });
      };
    }, 1000);
    this.setState({
      interval,
    });
  };
  
  stopBtn = () => {
    clearInterval(this.state.interval);
    this.setState({
      btnDisable: false,
    });
  };

  intervalBtn = () => {
    const { history, second, minute, hour } = this.state;
    this.setState({
      history: history.push(`${hour}: ${minute} : ${second}`),
    });

    this.setState({
      history: history
    })
  };

  clearBtn = () => {
    this.stopBtn();
    this.setState({
      second: 0,
      minute: 0,
      hour: 0,
    });
  };

  render() {
    const { second, minute, hour, btnDisable } = this.state;
    const { startBtn, stopBtn, intervalBtn, clearBtn } = this;
    return (
      <div className="container">
        <div className="wrapper">
          <header>
            <h1><span> Online </span> Stopwatch</h1>
          </header>
          <div className="timer-body">
            <div className="left">
              <div className="time">
                <h3>{ hour }</h3>
                <label>Hour</label>
              </div>
              <div className="time">
                <h3>{ minute }</h3>
                <label>Minute</label>
              </div>
              <div className="time">
                <h3>{ second }</h3>
                <label>Secunde</label>
              </div>
            </div>
            <div className="right">
              <div className="btns">
                <button className="start" onClick={startBtn} disabled={btnDisable}>Start</button>
                <button className="stop" onClick={stopBtn}>Stop</button>
                <button className="interval" onClick={intervalBtn}>Interval</button>
                <button className="restart" onClick={clearBtn}>Clear</button>
              </div>
              <div className="interval-container">
                {
                  this.state.history.map((item, index) => <p>{index + 1}) { item }</p>)
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
};

export default Stopwatch;