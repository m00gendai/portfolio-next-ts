import { NextRequest, NextResponse } from "next/server"
import {isFormValue} from "@/interfaces"

export async function POST(req: NextRequest){

    let nodemailer:any = require('nodemailer')

    const data: isFormValue = await req.json()

    const transporter = nodemailer.createTransport({
        port: 465,     
        host: "mail.cyon.ch",
          auth: {
            user: "info@mrweber.ch",
            pass: process.env.SMTP!,
          },
        secure: true,
      });
        
      const mailData = {
          from: data.mail,
          to: `info@mrweber.ch`,
          cc: data.mail,
          subject: `mrweber: Nachricht von ${data.name}`,
          text: data.message,
          html: `<div>${data.message}</div>`
      }
      
      try{
        await transporter.sendMail(mailData)
      } catch(err){
        return NextResponse.json(data)
      }
    
      return NextResponse.json(data)
}