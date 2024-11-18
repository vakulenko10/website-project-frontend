import React from 'react'
import Container from '../../Container'
import { Link } from 'react-router-dom'

const Contact = () => {
  return (
    <section className='relative flex flex-col items-center justify-start bg-transparent bg-text3'>
        <div className='w-full relative h-[20rem] bg-color7 border-t-4 border-black'>
            <div className="absolute w-full mt-[-10rem] flex text-center justify-center items-center md:gap-[20rem]">
                <Link to="https://www.etsy.com/listing/1592686641/oil-painting-sea-sunset?click_key=eef8354f303cc8e4da4f76ff89b576b159778cfc%3A1592686641&click_sum=a35f634b&ref=shop_home_active_31&pro=1" target='_blank'><img src="https://res.cloudinary.com/dujdz2jbl/image/upload/v1731432057/frontend/lytf9793p9wzdak5eaag.png"  className="h-[15rem] md:h-[20rem] painting"/></Link>
                <Link to="https://www.etsy.com/listing/1592398419/painting-mountains?click_key=7dd4dfa5b231793078eceedd2fef91576eaa1be7%3A1592398419&click_sum=857db687&ref=shop_home_active_30&pro=1" target='_blank'><img src="https://res.cloudinary.com/dujdz2jbl/image/upload/v1731432057/frontend/siyjofankhgraggf4odw.png" className="h-[15rem] md:h-[20rem] painting"/></Link>
            
            </div>
        </div>
        
        <div className='bg-color6 w-full'>
        <Container>
            <img src="https://res.cloudinary.com/dujdz2jbl/image/upload/v1731430887/frontend/uf7lunrwdhdws20sgupe.png"/>
        </Container>
        </div>
        
    </section>
  )
}

export default Contact