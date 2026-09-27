



import {

  useQuery,
} from '@tanstack/react-query'
import { axiosInstance } from "../config/index"
import type { AxiosRequestConfig } from 'axios'


interface IAuthGetData {
    queryKey:string[] , 
    url:string , 
    config?: AxiosRequestConfig 
}

const useAuthGetData = ({queryKey , url , config}:IAuthGetData) => {
 return useQuery({
        queryKey,
        queryFn: async () => {
            const response = await axiosInstance.get(url , config)
            return response; 
        }
    })

}
export default useAuthGetData; 