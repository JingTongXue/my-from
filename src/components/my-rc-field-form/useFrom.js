import { useRef } from "react";

// 定义状态管理库,去管理每一个子项的值，状态
class FormStore {
  constructor() {
    this.store = {}; // 状态值  name: value
    this.fieldEntities = [];
    // 记录回调
    this.callbacks = {};
  }

  // 用来塞一些回调函数
  setCallbacks = (callbacks) => {
    this.callbacks = { ...callbacks, ...this.callbacks };
  }

  // 注册实例(forceUpdate)
  // 注册于取消注册
  // 订阅与取消订阅
  registerFieldEntities = (entity) => {
    this.fieldEntities.push(entity);

    // 删除实例
    return () => {
      // 过滤掉该实例
      this.fieldEntities = this.fieldEntities.filter(item => item !== entity)
      // 删掉组件库里的状态值
      delete this.store[entity.props.name]
    }
  }

  // get
  // 获取所有的状态值
  getFieldsValue = () => {
    return { ...this.store };
  }

  // 获取某个状态值
  getFieldValue = (name) => {
    return this.store[name];
  }


  // set
// password:   123
  setFieldsValue = (newStore) => {
    // 1. update store
    this.store = {
      ...this.store,
      ...newStore
    }
    // console.log("this.store:    ",this.store);

    // 2. update Field
    // 找到更新的是哪个子项,单独拿出来更新即可
    this.fieldEntities.forEach(entity => {
      Object.keys(newStore).forEach(k => {
        if(k === entity.props.name) {
          entity.onStoreChange();
        }
      })
    })
  }

  validate = () => {
    let err = [];
    // todo 校验

    // 简化校验
    const store = this.getFieldsValue();
    const fieldEntities = this.fieldEntities;
    fieldEntities.forEach((entity) => {
      let {name, rules} = entity.props;
      let value = this.getFieldValue(name);
      if (rules[0] && (value == null || value.replace(/\s*/, "") === "")) {
        err.push({name, err: rules[0].message});
      }
    });
    return err;
  }

  // 提交
  submit = () => {
    let err = this.validate();
    const { onFinish, onFinishFailed } = this.callbacks;
    if(err.length === 0 ) {
      // 校验通过
      onFinish(this.getFieldsValue());
    } else {
      // 校验未通过
      onFinishFailed(err,this.getFieldsValue());
    }

  }

  getForm = () => {
    return {
      getFieldsValue: this.getFieldsValue,
      getFieldValue: this.getFieldValue,
      setFieldsValue: this.setFieldsValue,
      registerFieldEntities: this.registerFieldEntities,
      submit: this.submit,
      setCallbacks: this.setCallbacks,
    }
  }


}



export default function useForm(form) {
  // 存值， 在组建卸载之前指向的都是同一个值
  const formRef = useRef();

  if(!formRef.current) {
    if(form) {
      formRef.current = form;
    } else {
      const fromStore = new FormStore();
      formRef.current = fromStore.getForm();
    }
  }


  return [formRef.current];
}