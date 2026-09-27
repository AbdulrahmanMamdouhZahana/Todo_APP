import type { IRegisterFormInput } from "../interfaces";
import type { ILoginFormInput } from "../interfaces";




export const registerFormInput: IRegisterFormInput[] = [

    {
        name: "username",
        type: "text",
        placeholder: "Enter your username",
        validation: { required: true, minLength: 5 }
    },


    {
        name: "email",
        type: "text",
        placeholder: "Enter your Email",
        validation: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }
    },


    {
        name: "password",
        type: "password",
        placeholder: "Enter your password",
        validation: { required: true, minLength: 6 }
    }

]



export const LoginFormInput: ILoginFormInput[] = [

    {
        name: "identifier",
        type: "email",
        placeholder: "Enter your Email",
        validation: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }
    },


    {
        name: "password",
        type: "password",
        placeholder: "Enter your password",
        validation: { required: true, minLength: 6 }
    }

]

