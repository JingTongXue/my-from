import React, { Component, useEffect, useLayoutEffect } from "react";
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
    const { getFieldValue, setFieldsValue } = this.context;
    const { name } = this.props;
    return {
      value: getFieldValue(name), // 通过name去获取状态值
      onChange: (e) => {
        const newValue = e.target.value;
        // set state
        setFieldsValue({[name]: newValue})
        // console.log("newValue:    ",newValue);
      }
    }
  }

  render() {
    const { children } = this.props;
    // console.log('render');
    const returnChildBide = React.cloneElement(children, this.getControlled())

    return returnChildBide
  }
}


// export default function Field(props) {
//   const { children, name } = props;
//   const { getFieldValue, setFieldsValue, registerFieldEntities } = React.useContext(FieldContext);
  
//   const [, forceUpdate] = React.useReducer((x) => x + 1, 0);

//   useLayoutEffect(() => {
//     // 通过didmount注册到状态管理库的注册组件池里
//     const unregister = registerFieldEntities({props, onStoreChange: forceUpdate});

//   }, []);


//   // 调用该方法，强制更新组件
//   const onStoreChange = () => {
//     this.forceUpdate();
//   }

//   const getControlled = () => {
//   return {
//     value: getFieldValue(name), // 通过name去获取状态值
//     onChange: (e) => {
//       const newValue = e.target.value;
//       // set state
//       setFieldsValue({[name]: newValue})
//       // console.log("newValue:    ",newValue);
//     }
//   }
// }

//   const returnChildBide = React.cloneElement(children, getControlled())

//   return returnChildBide
// }