import { useState, useCallback } from "react"

/** хук useForm для управления формами */
const useForm = () => {
  const [enteredValues, setEnteredInputValues] = useState({})
  const [errors, setErrors] = useState({})
  const [isFormValid, setIsFormValid] = useState(false)

  /** обработчик полей формы */
  const handleChangeInput = (event) => {
    const name = event.target.name
    const value = event.target.value

    /** обновляем состояние введенных данных */
    setEnteredInputValues({
      ...enteredValues,
      [name]: value,
    })

    /** обновляем состояние ошибок */
    setErrors({
      ...errors,
      [name]: event.target.validationMessage,
    })

    /** обновляем состояние валидности форм */
    setIsFormValid(event.target.closest("#form").checkValidity())
  }

  /** сброс формы */
  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsFormValid = false) => {
      setEnteredInputValues(newValues)
      setErrors(newErrors)
      setIsFormValid(newIsFormValid)
    },
    [setEnteredInputValues, setErrors, setIsFormValid]
  )
  return {
    enteredValues,
    handleChangeInput,
    isFormValid,
    errors,
    resetForm,
  }
}

export default useForm
