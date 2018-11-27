import React, {Component} from 'react'
import config from './config.json';
import style from './Greeter.css'
class Greeter extends Component{
  render() {
    return (
      //使用cssModule添加类名的方法
      <div className={style.root}>
        {config.greetText}
      </div>
    );
  }
}

export default Greeter