import { forwardRef } from 'react';

const Form = ({ title, children }) => {
  return (
    <fieldset className="border border-slate-700 text-slate-400 flex flex-col items-center py-4 px-5 mb-4">
      <legend className="px-1 uppercase text-sm">{title}</legend>
      {children}
    </fieldset>
  );
};

const Label = ({ label, children, isRequired }) => {
  return (
    <label className="text-sm cursor-pointer">
      {label}
      {isRequired ? (
        <span className="bg-pink-800 text-white text-xs py-1 px-2 rounded-md float-right">
          Required
        </span>
      ) : (
        <></>
      )}
      {children}
    </label>
  );
};

const TextBox = forwardRef(
  ({ label, isRequired, type, placeholder, ...rest }, ref) => {
    return (
      <Label label={label} isRequired={isRequired}>
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          className="w-full rounded-md py-2 px-2 mb-2 mt-2"
          required={isRequired}
          {...rest}
        />
      </Label>
    );
  },
);

const TextArea = forwardRef(
  ({ label, isRequired, placeholder, rows, ...rest }, ref) => {
    console.log(ref);
    return (
      <Label label={label} isRequired={isRequired}>
        <textarea
          ref={ref}
          placeholder={placeholder}
          className="w-full rounded-md py-2 px-2 mb-2 mt-2"
          rows={rows}
          required={isRequired}
          {...rest}
        ></textarea>
      </Label>
    );
  },
);

const Button = ({ children, onClick }) => {
  return (
    <button
      className="bg-green-600 hover:bg-yellow-500 hover:text-black text-white py-1 px-4 rounded-md w-32"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export { Form, Label, TextBox, TextArea, Button };
