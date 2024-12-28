export default function Switch({ 
    errors,
    id,
    label,
    value, 
    setValue 
} : {
    errors: string[] | undefined,
    id: string,
    label: string,
    value: boolean,
    setValue: React.Dispatch<React.SetStateAction<boolean>>
}) {
    if (/\s/.test(id)) {
        throw new Error('labelId must not contain whitespace characters');
    }

    const labelId = `${id}-label`;
    const switchId = `${id}-switch`;
    const errorId = `${id}-error`;

    const toggleValue = () => setValue(value => !value);

    return (
        <>
            <div role="switch"
                aria-checked={value}
                aria-describedby={errorId}
                aria-label={label}
                aria-labelledby={labelId}
                className="group flex items-center gap-2 m-0.5 p-[8px] border-0 border-solid border-[#005a9c] rounded w-fit select-none hover:p-[6px] focus:p-[6px] focus:border-2 focus:outline-none focus:bg-[#def] focus:cursor-pointer hover:border-2 hover:outline-none hover:bg-[#def] hover:cursor-pointer"
                id={switchId}
                onClick={toggleValue}
                onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && toggleValue()}
                tabIndex={0}
            >
                <span 
                    className="label inline-block"
                    id={labelId} 
                >
                    {label}
                </span>
                <span className="flex items-center gap-1">
                    <span className="relative inline-block border-2 border-black rounded-[12px] h-[20px] w-[40px] focus:bg-white">
                        <span className="absolute top-[2px] left-[2px] inline-block border-2 border-black rounded-[8px] h-[12px] w-[12px] bg-black group-aria-checked:left-[21px] group-aria-checked:bg-green-500 group-aria-checked:border-green-500"></span>
                    </span>
                    <span 
                        aria-hidden="true"
                        className="hidden group-aria-checked:inline" 
                    >
                        On
                    </span>
                    <span 
                        aria-hidden="true"
                        className="inline group-aria-checked:hidden" 
                    >
                        Off
                    </span>
                </span>
            </div>
            <div id={errorId} aria-live="polite" aria-atomic="true">
                {errors &&
                errors.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                    </p>
                ))}
            </div>
        </>
    )
}
