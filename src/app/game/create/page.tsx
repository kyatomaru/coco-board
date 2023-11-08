"use client"

import * as React from 'react';
import { useRouter } from 'next/navigation'
import Header from "@/components/Header";
import TitleBox from "@/components/TitleBox";
import Footer from "@/components/Footer";

export default function Home() {
  const router = useRouter()

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const response = await fetch('/api/game/create', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'content-type': 'application/json'
      }
    }).then((res) => {
      if (res.ok) {
        try {
          router.push('/notes/2023-06-27')
        } catch (error) {
          console.log(error)
        }
      }
    })
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Header />
      <TitleBox title="Create Page" />
      <form onSubmit={onSubmit} method='POST'>
        <div className="p-5">
          title
          <input defaultValue="Initial value" type="text" name='title' />
        </div>
        <div className="p-5">
          place
          <input defaultValue="Initial value" type="text" name='place' />
        </div>
        <div className="p-5">
          weather
          <input defaultValue="Initial value" type="text" name='weather' />
        </div>
        <div className="p-5">
          team1
          <input defaultValue="Initial value" type="text" name='team1' />
          <input defaultValue="Initial value" type="text" name='score1' />
        </div>
        <div className="p-5">
          team2
          <input defaultValue="Initial value" type="text" name='team2' />
          <input defaultValue="Initial value" type="text" name='score2' />
        </div>
        <div className="p-5">
          position
          <input defaultValue="Initial value" type="text" name='position' />
        </div>
        <div className="p-5">
          good
          <textarea defaultValue="Initial value" name="good" id="" cols={30} rows={10}></textarea>
        </div>
        <div className="p-5">
          bad
          <textarea defaultValue="Initial value" name="bad" id="" cols={30} rows={10}></textarea>
        </div>
        <div className="p-5">
          problem
          <textarea defaultValue="Initial value" name="problem" id="" cols={30} rows={10}></textarea>
        </div>
        <button type='submit'>決定</button>
      </form>
      <Footer />
    </main >
  )
}
