import React from 'react'

export default function Die(props){
    return(
        <div>
            <h2 className='die'>{props.value}</h2>
        </div>
    )
}