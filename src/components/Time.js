import React from 'react'

const Time = ({date, ...props}) => {
  const dateObject = new Date(date)

  const dateTime = dateObject
    .toISOString()
    .replace(/...\..*/, '')
    .replace('T', ' ')

  const handsomeDate = dateObject
    .toDateString()
    .toLowerCase()

  return (
    <time
      {...props}
      dateTime={dateTime}>
      {handsomeDate}
    </time>
  )
}

export default Time
