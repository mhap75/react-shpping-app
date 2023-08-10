import {BiCheckCircle} from 'react-icons/bi';
import {IconContext} from "react-icons";
import {RiAlarmWarningLine} from 'react-icons/ri';

const validCheckMark = (
    <span className="bg-success text-green-900 shadow-sm shadow-green-700 p-1 rounded-full w-fit"><BiCheckCircle/></span>)

export const FormInput = ({name, formik, placeHolder, type = "text", label, autoComplete}) => {
    return (<label htmlFor={name} className="flex items-center flex-col font-bold gap-2">
        <p className="flex items-center justify-between gap-2">{label}{!formik.errors[name] && formik.touched[name] && validCheckMark}</p>
        <input placeholder={placeHolder} type={type} id={name}
               name={name}
               {...formik.getFieldProps(name)}
            className="input input-bordered input-secondary w-full max-w-sm min-w-[40dvw] input-sm"
               autoComplete={autoComplete}
        />
        {formik.errors[name] && formik.touched[name] && (
            <div className="alert alert-warning shadow-lg p-1 px-2 w-fit text-sm my-2">
            <div className="gap-1">
                <IconContext.Provider value={{size: "1.1rem"}}>
                    <RiAlarmWarningLine />
                </IconContext.Provider>
            <span>{formik.errors[name]}</span>
            </div>
            </div>)
        }
    </label>)
}