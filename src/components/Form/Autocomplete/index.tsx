import { ChangeEvent, MouseEvent, useState } from 'react'
import InputMask from '../InputMask'
import { Container, ListSuggestions } from './styles'

export interface AutocompleteOptions {
  label: string
  value: number | string
}

interface AutocompleteProps {
  label?: string
  name?: string
  value: AutocompleteOptions
  setValue?: React.Dispatch<React.SetStateAction<AutocompleteOptions>>
  options: AutocompleteOptions[]
  setOptions: React.Dispatch<React.SetStateAction<AutocompleteOptions[]>>
  mask?: string
  error?: string
  variation?: string
  placeholder?: string
  shadow?: boolean
  hasError?: boolean
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  onClick?: (event: MouseEvent<HTMLInputElement>) => void
  onKeyUp?: () => void
  isUpperCase?: boolean
  setClickedValue?: (newState: AutocompleteOptions) => void
  onHandleClickAutoComplete?: any
  onSelect?: any
}

export const Autocomplete: React.FC<AutocompleteProps> = ({
  label,
  name,
  value,
  setValue,
  options,
  setOptions,
  mask,
  error,
  shadow,
  onClick,
  onKeyUp,
  setClickedValue,
  variation = '',
  isUpperCase,
  onHandleClickAutoComplete,
  onSelect,
  ...rest
}) => {
  const [showList, setShowList] = useState(false)
  // const [listSuggestionsHeight, setListSuggestionsHeight] = useState(0)
  // const listSuggestionsRef = useRef<HTMLUListElement>(null)

  const onClickSuggestion = (valueClicked: {
    label: string
    value: number | string
  }) => {
    setValue(valueClicked)
    setClickedValue && setClickedValue(valueClicked)
    setOptions([])
    setShowList(false)
  }

  const onChangeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({
      label: e.target.value || null,
      value: 0,
    })
    setClickedValue && setClickedValue(null)

    // if (listSuggestionsRef.current) {
    //   const listItems = [...listSuggestionsRef.current.childNodes]

    //   const sumListItemsOffset = listItems.reduce((acc, item) => {
    //     return acc + item.offsetHeight
    //   }, 0)

    //   setListSuggestionsHeight(sumListItemsOffset)
    // }
  }

  const onFocusInput = () => {
    setShowList(true)
    onHandleClickAutoComplete && onHandleClickAutoComplete()
  }

  const onBlurInput = () => {
    setTimeout(() => {
      setShowList(false)
    }, 300)
  }

  return (
    <Container variation={variation} shadow={shadow}>
      {/* <label htmlFor={label}>{label}</label> */}
      <InputMask
        type="text"
        id={label || ''}
        label={label || ''}
        mask={mask || ''}
        value={value?.label ? String(value?.label).toUpperCase() : ''}
        onChange={onChangeInputValue}
        onFocus={onFocusInput}
        onBlur={onBlurInput}
        autoComplete="off"
        variation={variation}
        onClick={onClick}
        name={name}
        onKeyUp={onKeyUp}
        onSelect={onSelect}
        {...rest}
      />
      {error && <p className="error">{error}</p>}
      {options.length > 0 && showList && (
        <ListSuggestions
          // listSuggestionsHeight={listSuggestionsHeight}
          // ref={listSuggestionsRef}
          fieldError={!!error}
          // hidden={!(options.length > 0 && showList)}
        >
          {options.map((option) => (
            <li key={option.value} onClick={() => onClickSuggestion(option)}>
              {option.label}
            </li>
          ))}
        </ListSuggestions>
      )}
    </Container>
  )
}
