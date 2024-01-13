function Input({
  id,
  title,
  isRequired,
  placeholder,
  handleChange,
  isError,
  errMsg,
}) {
  return (
    <>
      <label
        htmlFor={id}
        className="text-sm leading-7 text-gray-700 dark:text-gray-200"
      >
        {title}
        <span className="text-red-500">{isRequired ? " *" : null}</span>
      </label>
      <input
        required={isRequired}
        className="mt-1 block h-10 w-full rounded-sm bg-gray-100 bg-opacity-50 px-3 py-1 text-base leading-8 text-gray-700 outline outline-1 outline-gray-700 transition-colors duration-200 ease-in-out placeholder:text-gray-500 focus:ring-1 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-400"
        id={id}
        name={id}
        type="text"
        placeholder={placeholder}
        onChange={handleChange}
      />
      <p
        className={`mt-1.5 h-4 whitespace-normal text-xs italic sm:whitespace-pre-line ${
          isError ? "text-red-500" : "text-green-500"
        }`}
      >
        {isError ? "Hợp lệ" : errMsg}
      </p>
    </>
  );
}

export default Input;
