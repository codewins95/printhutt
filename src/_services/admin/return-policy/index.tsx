import type { ReturnPolicy } from "@/lib/types";
import axios from "axios";


export async function getReturnPolicies(page: string, search: string) {
    try {
        const { data } = await axios.get(`/api/return-policy?page=${page}&search=${search}&limit=10`);
        return data;
    } catch (error: any) {
        console.log('Error in getting all return-policy (service) =>', error)
        throw new Error(error || error.message)
    }
}

export async function createReturnPolicy(formData: Partial<ReturnPolicy>) {
    try {
        const { data } = await axios.post(`/api/return-policy`, formData)
        return data;
    } catch (error: any) {
        console.log('Error in Add New return-policy (service) =>', error);
        throw new Error(error || error.message)
    }
}

export async function modifyReturnPolicy(id: string, formData: Partial<ReturnPolicy>) {
    try {
        const { data } = await axios.put(`/api/return-policy/${id}`, formData)
        return data;
    } catch (error) {
        console.log('Error in updating return-policy (service) =>', error)
    }
}

export async function removeReturnPolicy(id: string) {
    try {
        const { data } = await axios.delete(`/api/return-policy/${id}`);
        return data;
    } catch (error: any) {
        console.log('Error in delete return-policy (service) =>', error);
        throw new Error(error?.message || 'An error occurred while deleting the return-policy');
    }
}