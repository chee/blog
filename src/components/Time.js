import React from 'react'

const Time = ({ date }) => (
    <time dateTime={(new Date(date)).toISOString().replace(/...\..*/, '').replace('T', ' ')}>
      {(new Date(date)).toDateString().toLowerCase()}
    </time>
)

export default Time
