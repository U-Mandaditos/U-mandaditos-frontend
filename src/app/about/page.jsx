'use client';

import Header from "../ui/utilities/Header";
import { useRouter } from "next/navigation";

// app/about/page.jsx
export default function AboutPage() {
    const router = useRouter();

    return (
      <>
        <Header text={"Acerca de"} router={router}/>
        <div>
          <h1>Página About</h1>
          <p>Esta es la página "About".</p>
        </div>  
      </>
    );
  }