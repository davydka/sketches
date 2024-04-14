import React from "react";
import Header from "@/components/Header";

const PageWrapper = ({children}: {
  children: React.ReactNode,
}) => {
  return (
    <main className="flex px-6 py-0.5 min-h-screen flex-col">
      <Header className='mb-4'/>
      {children}
    </main>
  )
}

export default PageWrapper
