
export const Input = ( {type, onChange, defaultValue, name} ) => {
    return (
        <input
            type={type}
            className={'form-control'}
            onChange={(e)=>onChange(e)}
            defaultValue={defaultValue ? defaultValue : ''}
            name={name}
        />
    )
}