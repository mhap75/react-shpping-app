import {FormInput} from "../Common/FormInput";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import toast, {Toaster} from "react-hot-toast";
import http from "../../services/http";
import {useAuthActions} from "../../context/AuthProvider";

const initialValues = {
    email: "", password: ""
}

export const LogIn = () => {

    const navigate = useNavigate()
    const setAuth = useAuthActions()
    const [searchParams] = useSearchParams()
    const redirect = searchParams.get("redirect") || "/"

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email address").required("Email cannot be empty"),
        password: Yup.string().required("Password cannot be empty"),
    })

    const onSubmit = async (values) => {
        try {

            const {data} = await http.post('/user/login', values)
            setAuth(data)
            // localStorage.setItem('authData', JSON.stringify(data)) -> done better in the AuthProvider

            toast.custom((<div className="alert alert-success shadow-lg">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none"
                         viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span>You have successfully logged in</span>
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
            <FormInput name="email" autoComplete="email" label="Email" placeHolder="example@mail.domain" formik={formik} type="email"/>
            <FormInput name="password" autoComplete="password" label="Password" placeHolder="*********" formik={formik} type="password"/>
            <button disabled={!formik.isValid} className="btn btn-info btn-block btn-sm max-w-sm min-w-[40dvw]">
                Log in
            </button>
            <Link to={`/signup${redirect !== "/" ? `?redirect=${redirect}` : ""}`} className="link link-secondary text-sm">Don't have an account? Signup</Link>
        </form>
        <Toaster/>
    </section>)
}