import axios, { AxiosError, AxiosResponse } from 'axios';

import { toast } from 'react-toastify';

import { histroy } from '../..';
import { Activity } from '../models/activity';
import { store } from '../stores/store';
axios.defaults.baseURL = 'http://localhost:5000/api';

const sleep =(delay:number) =>{
    return new Promise ((resolve)=>{
        setTimeout(resolve,delay)
    })
} 
axios.interceptors.response.use (async response=>{
        await sleep(1000);
        return response;

},(error : AxiosError)=> {
    const {data,status,config} = error.response !;
    switch(status){
        case 400:
            if(typeof data==='string'){
                toast.error(data)
            }
            if(config.method==='get' && data.errors.hasOwnProperty('id')){
                histroy.push('/not-found');
            }
            if(data.errors)
            {
                const modalStateErrors=[];
                for(const key in data.errors)
                {
                    if(data.errors[key])
                    {
                        modalStateErrors.push(data.errors[key])
                    }
                }
                throw modalStateErrors.flat();

            }
            break;
            case 401:
            toast.error('unauthorised');
            break;
            case 404:
        histroy.push('/not-found')
            break;
            case 500:
            store.commonStore.setServerError(data);
            histroy.push('/server-error')
            break;
            
    }
    return Promise.reject(error);
}
)
const responseBody = <T> (response: AxiosResponse <T>) => response.data;
const requests ={
    get:<T>(url:string) => axios.get<T>(url).then(responseBody),
    post:<T>(url:string,body:{}) => axios.get<T>(url).then(responseBody),
    put:<T>(url:string, body:{}) => axios.get<T>(url).then(responseBody),
    del:<T>(url:string) => axios.get<T>(url).then(responseBody),
}
const Activities = {
    list:() => requests.get<Activity[]>('/activities'),
    details:(id: string ) => requests.get<Activity>(`/activities/${id}`),
    create:(activity: Activity) => axios.post<void>('/activities',activity),
    update:(activity: Activity) => axios.put<void>(`/activities/${activity.id}`,activity),
    delete:(id: string ) => axios.delete<void>(`/activities/${id}`)
}
const agent ={
    Activities
}
export default agent;