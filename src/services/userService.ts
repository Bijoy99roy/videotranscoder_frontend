import { makeRequests } from "./makeRequests"

export async function logOut(){
    try{
         await makeRequests(`/api/v1/auth/logout`, {
            method: "GET",

        })
        
    } catch (error) {
        console.log("Error occured while logging user out.")
        return false
    }
    
}