
export const Select = ( {options, onChange, valueSelected, name} ) => {

    return (
        <select
            className={'form-select'}
            onChange={(e) =>onChange (e)}
            name={name}
        >
            {
                options.map( (option, index) => (
                    <option
                        key={index}
                        value={option.value}
                        selected={option.value === valueSelected ? true : false}
                    >
                        {option.label}
                    </option>
                ))
            }
        </select>
    )
}

