import React from 'react'
import AdventuresMap from './adventuresMap'
import './adventuresForm.css'
function AdventureForm(){
    const USER_LOCATION = localStorage.getItem("USER_LOCATION")
return(

<div className="adventures-form">

<h1>Find Your Next Adventure</h1>
<AdventuresMap />

<div><input type="text"/>
<button>Search</button>
</div>

  </div>  
)



}export default AdventureForm