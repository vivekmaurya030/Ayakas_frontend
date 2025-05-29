import React from 'react'
import '../styles/NotFoundPage.scss'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <section className="page_404">
	<div className="container">
		<div className="row">	
		<div className="col-sm-12 ">
		<div className="col-sm-10 col-sm-offset-1  text-center">
		<div className="four_zero_four_bg">
			<h1 className="text-center ">🚧 Oops! This page is still cooking...</h1>
		
		
		</div>
		
		<div className="contant_box_404">
		<h3 className="h2">
		🍲 Recipe in Progress!
		</h3>
		
		<p>This page is still being stirred, seasoned, and simmered. Come back later for the finished dish!</p>
		
		<a href="" className="HomeButton" onClick={()=>navigate('/')}>Go to Kitchen</a>
	</div>
		</div>
		</div>
		</div>
	</div>
</section>
  )
}

export default NotFound
