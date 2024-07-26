import { FormEvent, HTMLProps, useState } from 'react'

interface Props extends HTMLProps<HTMLInputElement> {
  id: string
  name: string
  className?: string
  label?: string
  errorText?: string
}

const TextInput = ({ className, label, errorText, id, ...props }: Props) => {
  const [validationMessage, setValidationMessage] = useState('')

  const onInvalid = (event: FormEvent) => {
    const input = event.currentTarget as HTMLInputElement

    setValidationMessage(getErrorMessage(input))
  }

  const onBlur = (event: FormEvent) => {
    const input = event.currentTarget as HTMLInputElement

    if (!!validationMessage) {
      setValidationMessage(getErrorMessage(input))
    }
  }

  return (
    <div className="input-wrapper">
      {label && <label htmlFor={id}>{label}</label>}
      <input id={id} onInvalid={onInvalid} onBlur={onBlur} {...props} />
      {!!validationMessage && (
        <div className="validation-message">
          {errorText || validationMessage}
        </div>
      )}
    </div>
  )
}

const getErrorMessage = (target: HTMLInputElement) => {
  const errorsMessage = {
    valueMissing: 'This field is required',
    typeEmailMismatch:
      'Please include "@" in the email address. There is an "@" symbol missing in {value}',
  }

  if (target.validity.valueMissing) {
    return errorsMessage.valueMissing
  }

  if (target.validity.typeMismatch && target.type === 'email') {
    return errorsMessage.typeEmailMismatch.replace('{value}', target.value)
  }

  return target.validationMessage
}

export default TextInput
