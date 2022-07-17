import React from "react";
import FieldContext from "./FieldContext";
import useForm from "./useFrom";

export default function Form (
  {children, form, onFinish, onFinishFailed}, ref
  ) {
  // 适配class组件
  const [ formInstance ] = useForm(form);

  React.useImperativeHandle(ref, () => formInstance);

  formInstance.setCallbacks({
    onFinish,
    onFinishFailed
  })
  return (
    <form onSubmit={(e) => {
      // 提交时默认的事件禁止掉(比如重新刷新页面)
      e.preventDefault();
      formInstance.submit();
    }}>
      <FieldContext.Provider value={formInstance}>
        {children}
      </FieldContext.Provider>
    </form>
  )
}