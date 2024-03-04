"use server"

import { cookies, headers } from "next/headers";

export default async function deleteCookie(name:string){
    const headerList = headers()
    const domain:string = headerList.get("host") || ""
    if(domain !== "localhost:3000" && domain !== "127.0.0.1:3000"){
        cookies().set({
            name: name,
            value: "",
            maxAge: 0,
         
        })
        if(name === `${process.env.COOKIE_ANALYTICS}`){
            cookies().getAll().map(cookie=>{
                if(cookie.name.startsWith("_ga")){
                    cookies().set({
                        name: cookie.name,
                        value: "",
                        maxAge: 0,
                        domain: `.${domain}`
                    })
                }
            })
        }
    } else {
        cookies().set({
            name: name,
            value: "",
            maxAge: 0
        })
        if(name === `${process.env.COOKIE_ANALYTICS}`){
            cookies().getAll().map(cookie=>{
                if(cookie.name.startsWith("_ga")){
                    cookies().set({
                        name: cookie.name,
                        value: "",
                        maxAge: 0,
                    })
                }
            })
        }
    }
}