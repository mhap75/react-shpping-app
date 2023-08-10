import {FormInput} from "../Common/FormInput";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import http from "../../services/http";
import toast, {Toaster} from "react-hot-toast";
import {useAuthActions} from "../../context/AuthProvider";

const initialValues = {
    name: "", email: "", password: "", confPass: "", phoneNumber: "",
}

const phoneRegExp = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9][0-9]{2})\s*\)|([2-9][0-9]{2}))\s*(?:[.-]\s*)?)?([2-9][0-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/i;

export const SignUp = () => {

    const setAuth = useAuthActions()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const redirect = searchParams.get("redirect") || "/"

    const validationSchema = Yup.object({
        name: Yup.string().required("Name cannot be empty"),
        email: Yup.string().email("Invalid email address").required("Email cannot be empty"),
        password: Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must be at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character").required("Password cannot be empty"),
        confPass: Yup.string().oneOf([Yup.ref("password"), null], "Passwords don't match").required("Please confirm your password"),
        phoneNumber: Yup.string()
            .matches(phoneRegExp, 'Phone number is not valid')
            .required('Phone number is required'),
    })

    const onSubmit = async (values, {resetForm}) => {
        const {name, phoneNumber, email, password} = values;
        const userData = {name, phoneNumber, email, password: password.replace(/\D/g, '')}
        try {
            const {data} = await http.post('/user/register', userData)
            setAuth(data)
            toast.custom((<div className="alert alert-success shadow-lg">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none"
                         viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span>Your account has been successfully created</span>
                </div>
            </div>), {duration: 2000})
            setTimeout(() => {
                toast.remove();
                navigate(`${redirect !== "/" ? "/" : ""}${redirect}`, {replace: true});
            }, 2100)
        } catch (err) {
            toast.custom((<div className="alert alert-error shadow-lg">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none"
                         viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span>{err.response.data.message}</span>
                </div>
            </div>), {duration: 4000})
        }
    }

    const formik = useFormik({
        initialValues, validateOnMount: true, enableReinitialize: true, onSubmit, validationSchema
    })

    return (<section className="container mx-auto">
        <form
            className="flex flex-col gap-5 bg-neutral-focus shadow-md shadow-primary-content mx-auto my-4 w-fit rounded-lg p-5"
            onSubmit={formik.handleSubmit}>
            <FormInput name="name" label="Name" placeHolder="Firstname and surname" formik={formik}/>
            <FormInput name="email" label="Email" placeHolder="example@mail.domain" formik={formik} type="email"/>
            <FormInput name="phoneNumber" label="Phone" placeHolder="(555) 555-5555" formik={formik}
                       type="tell"/>
            <FormInput name="password" label="Password" placeHolder="*********" formik={formik} type="password"/>
            <FormInput name="confPass" label="Confirm Password" placeHolder="*********" formik={formik}
                       type="password"/>
            <button disabled={!formik.isValid} className="btn btn-info btn-block btn-sm max-w-sm min-w-[40dvw]">Sign
                up
            </button>
            <Link to={`/login${redirect !== "/" ? `?redirect=${redirect}` : "" }`} className="link link-secondary text-sm">Already a member? Login</Link>
        </form>
        <Toaster/>
    </section>)
}