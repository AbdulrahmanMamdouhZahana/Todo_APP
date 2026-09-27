export interface IRegisterFormInput {
    name: "email" | "username" | "password",
    type: string,
    placeholder: string,
    validation: {
        required: boolean,
        minLength?: number,
        pattern?: RegExp
    }
}


export interface ILoginFormInput {
    name: "identifier" | "password",
    type: string,
    placeholder: string,
    validation: {
        required: boolean,
        minLength?: number,
        pattern?: RegExp
    }
}


export interface ErrorResponse {
    error: {
        message: string
    }
}


export interface ITodo {
    documentId: string , 
    title : string , 
    description : string,
}

// export interface IFormTodoInput {
//     title: string,
//     description: string,

//     user?:{
//       connect: string[]
//     }
// }

export interface IErrors  {
    title?: string,
    description?: string
}