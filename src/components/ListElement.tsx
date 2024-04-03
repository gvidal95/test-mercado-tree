import { PropsWithChildren, useState } from 'react';

import '../App.css'

export const ListElement = ({ children }: PropsWithChildren) => {
  const [expanded, setExpanded] = useState(true);

  const handleClickExpanded = () => {
    setExpanded(!expanded);
  }

  return (
    <li className={expanded ? 'list' : 'list list_no_expanded'}>
      <span className='list_icon' onClick={handleClickExpanded}>{expanded ? "-" : "+"}</span>
      {children}
    </li>
  )
}
