import React, { Component } from "react";
import FieldContext from "./FieldContext";


export default class Field extends Component {
  static contextType = FieldContext;

  componentDidMount() {
    // 通过didmount注册到状态管理库的注册组件池里
    this.unregister = this.context.registerFieldEntities(this);
  }

  componentWillUnmount() {
    // 卸载
    this.unregister();
  }


  // 调用该方法，强制更新组件
  onStoreChange = () => {
    this.forceUpdate();
  }

  getControlled = () => {
    const { getFieldValue, setFieldValue } = this.context;
    const { name } = this.props;
    return {
      value: getFieldValue(name), // 通过name去获取状态值
      onChange: (e) => {
        const newValue = e.target.value;
        // set state
        setFieldValue({[name]: newValue})
        console.log("newValue:    ",newValue);
      }
    }
  }

  render() {
    const { children } = this.props;
    console.log('render');
    const returnChildBide = React.cloneElement(children, this.getControlled())

    return returnChildBide
  }
}