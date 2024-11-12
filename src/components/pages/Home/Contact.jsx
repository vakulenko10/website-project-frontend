import React from 'react'
import Container from '../../Container'

const Contact = () => {
  return (
    <section className='relative min-h-screen flex flex-col items-center justify-center bg-transparent bg-text3'>
        <div className='w-full relative h-[20rem] bg-color7 border-t-4 border-black'>
            <div className="absolute w-full top-[-10rem] flex text-center justify-center items-center md:gap-[20rem]">
                <img src="https://res.cloudinary.com/dujdz2jbl/image/upload/v1731432057/frontend/lytf9793p9wzdak5eaag.png"  className="h-[15rem] md:h-[20rem]"/>
                <img src="https://res.cloudinary.com/dujdz2jbl/image/upload/v1731432057/frontend/siyjofankhgraggf4odw.png" className="h-[15rem] md:h-[20rem]"/>
            
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