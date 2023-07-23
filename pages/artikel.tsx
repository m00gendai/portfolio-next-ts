import React from "react";
import Header from "../../components/Header"
import Link from "next/link";

 export default function Page(){
 
 return (
    <>
    
    <main className="main">
      <section className="section">
        <h1 className="title">Artikel</h1>
        <Link href="/artikel/test">Los</Link>
      </section>
    </main>
    </> 
 )
  }