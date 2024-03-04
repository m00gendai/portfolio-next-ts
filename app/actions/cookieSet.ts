"use server"

import { cookies, headers } from "next/headers";

export default async function setThatCookie(name:string, value:string){
    const headerList = headers()
    const domain:string = headerList.get("host") || ""

    if(domain !== "localhost:3000"){
        cookies().set({
            name: name,
            value: value,
      
        })
    }
    if(domain === "localhost:3000"){
        cookies().set({
            name: name,
            value: value,
        })
    }
}