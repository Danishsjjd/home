import { useEffect, useState } from "react"

const CountDown = ({ date }) => {
  const [remainingTime, setRemainingTime] = useState({})

  const titles = ["days", "hours", "minutes", "seconds"]

  useEffect(() => {
    const obj = setInterval(() => {
      const timeInS = Math.floor((new Date(date) - new Date().getTime()) / 1000)
      const seconds = timeInS % 60
      const minutes = Math.floor((timeInS / 60) % 60)
      const hours = Math.floor((timeInS / 60 / 60) % 24)
      const days = Math.floor(timeInS / 60 / 60 / 24)
      setRemainingTime({ seconds, minutes, hours, days })
    }, 1000)

    return () => {
      clearInterval(obj)
    }
  }, [date])
  return (
    <div className="grid auto-cols-max grid-flow-col justify-center gap-4 text-center text-white sm:gap-14">
      {titles.map((title) => (
        <div className="flex flex-col" key={title}>
          <span className="countdown flex justify-center text-2xl sm:text-7xl">
            <span style={{ "--value": remainingTime[title] }}></span>
          </span>
          <span className="mt-3">{title.toUpperCase()}</span>
        </div>
      ))}
    </div>
  )
}

export default CountDown
