
export const Button = ( {label, icon, nameClass, style, onClick, name} ) => {
    return (
        <button
            className={'btn d-flex m-auto' + nameClass}
            style={style}
            onClick={(e) => onClick(e)}
            name={name}
        >
            {label} {icon}
        </button>
    )
}