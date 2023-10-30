import Image from 'next/image'
import Header from "../../../../components/Header";
import Box from '@mui/material/Box';
import Footer from "../../../../components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Header />
      <form className="p-24">
        <div className="p-5">
          title
          <input type="text" name='title' />
        </div>
        <div className="p-5">
          place
          <input type="text" name='place' />
        </div>
        <div className="p-5">
          weather
          <input type="text" name='weather' />
        </div>
        <div className="p-5">
          team1
          <input type="text" name='team1' />
          <input type="text" name='score1' />
        </div>
        <div className="p-5">
          team2
          <input type="text" name='team2' />
          <input type="text" name='score2' />
        </div>
        <div className="p-5">
          position
          <input type="text" name='position' />
        </div>
        <div className="p-5">
          good
          <textarea name="good" id="" cols={30} rows={10}></textarea>
        </div>
        <div className="p-5">
          bad
          <textarea name="bad" id="" cols={30} rows={10}></textarea>
        </div>
        <div className="p-5">
          problem
          <textarea name="problem" id="" cols={30} rows={10}></textarea>
        </div>
        <button>決定</button>
      </form>
      <Footer />
    </main >
  )
}
