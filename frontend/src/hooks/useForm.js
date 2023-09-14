import { useState, useCallback } from "react"

// Хук useForm для управления формами
const useForm = () => {
  const [enteredValues, setEnteredInputValues] = useState({})
  const [errors, setErrors] = useState({})
  const [isFormValid, setIsFormValid] = useState(false)

  //Обработчик полей формы
  const handleChangeInput = (event) => {
    const name = event.target.name
    const value = event.target.value

    // Обновляем состояние введенных данных
    setEnteredInputValues({
      ...enteredValues,
      [name]: value,
    })

    // Обновляем состояние ошибок
    setErrors({
      ...errors,
      [name]: event.target.validationMessage,
    })

    // Обновляем состояние валидности форм
    setIsFormValid(event.target.closest("#form").checkValidity())
  }

  // Функция для сброса формы
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
