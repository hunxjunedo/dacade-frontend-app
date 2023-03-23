import classNames from "classnames";
import { useState, ChangeEvent, ReactElement } from "react";

/**
 * Interface for TextInput component props
 * @date 3/22/2023 - 4:31:28 PM
 *
 * @interface Props
 * @typedef {Props}
 */
interface TextInputProps {
  type?: string;
  value?: string;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  inputClass?: string;
  error?: string;
  handleInput?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

/**
 * TextInput component
 * @date 3/22/2023 - 4:31:51 PM
 *
 * @param {Prop} props
 * @returns {ReactElement}
 */
export function TextInput({
  value = "",
  label,
  disabled,
  placeholder,
  inputClass = "",
  error,
  handleInput,
}: TextInputProps): ReactElement {
  const [isFocused, setIsFocused] = useState(false);

  const isFilled = value.trim().length > 0;

  return (
    <div>
      <div className="floating-input relative">
        {label && (
          <label
            className={classNames(
              "absolute top-0 left-0 text-lg px-5 py-5 z-10 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out items-center",
              {
                "text-gray-400 flex items-center": !isFilled && !isFocused,
                "text-gray-400 scale-75 -translate-y-3 translate-x-1":
                  isFocused || isFilled,
                "text-red-600": error,
                "text-blue-500": isFocused && !error,
              }
            )}
          >
            {label}
          </label>
        )}
        <textarea
          value={value}
          placeholder={placeholder}
          autoComplete="off"
          disabled={disabled}
          className={classNames(
            "w-full border border-solid border-gray-200 h-56 resize-none m-0 pt-5 md:pt-7.5 pl-15 pr-2 md:px-10.75 block text-lg focus:outline-none placeholder-gray-400 placeholder-opacity-100",
            inputClass
          )}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={handleInput}
        />
      </div>
      {error && (
        <div className="bg-red-50 help text-sm text-red-900 px-5 py-1.5">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}

export default TextInput;
