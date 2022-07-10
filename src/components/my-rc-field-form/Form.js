import FieldContext from "./FieldContext";

export default function Form ({children, form, onFinish, onFinishFailed}) {
  form.setCallbacks({
    onFinish,
    onFinishFailed
  })
  return (
    <form onSubmit={(e) => {
      // 提交时默认的事件禁止掉(比如重新刷新页面)
      e.preventDefault();

      form.submit();

    }}>
      <FieldContext.Provider value={form}>
        {children}
      </FieldContext.Provider>
    </form>
  )
}