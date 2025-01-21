import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * @param {{
 *  label: string,
 *  options: {value: string, label: string, icon?: IconDefinition}[],
 *  value: string,
 *  setValue: (value: string) => void,
 *  className?: string
 * }} args
 * @returns {JSX.Element}
 */
export default function RadioButtonGroup({ label, options, value, setValue, className = "" }) {
    return (
        <fieldset className={className}>
            <legend className="mb-2 font-semibold">{label}</legend>
            <ul className="flex flex-col gap-1">
                {options.map(({ value: optionValue, label: optionLabel, icon }) => (
                    <label key={optionValue} htmlFor={optionValue} className="flex justify-between gap-4 items-center p-2 rounded-lg ring-1 ring-transparent has-[:checked]:ring-primary has-[:checked]:text-primary has-[:checked]:bg-primary/10">
                        {icon && <FontAwesomeIcon icon={icon} className="aspect-square" />}
                        <p className="flex-auto">{optionLabel}</p>
                        <input type="radio" name={optionValue} id={optionValue} checked={value === optionValue} onChange={() => setValue(optionValue)} className="box-content h-2 w-2 appearance-none rounded-full border-[5px] border-floating-light bg-floating-light bg-clip-padding outline-none ring-1 ring-gray-950/10 checked:border-primary checked:ring-primary" />
                    </label>
                ))}
            </ul>
        </fieldset>
    )
}

