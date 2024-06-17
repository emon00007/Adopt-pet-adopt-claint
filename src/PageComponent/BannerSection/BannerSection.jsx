import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { Navigation, Autoplay,Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Link } from 'react-router-dom';


const BannerSection = () => {
    return (
        <Swiper
        modules={[Navigation, Autoplay,Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        loop={true}
        className='sm:h-[400px] md:h-[400px] lg:h-[600px] z-10'>
        <SwiperSlide >
            <img className='relative  w-screen h-full' src="https://i.ibb.co/rb6Qfm5/dog-puppy-on-garden-royalty-free-image-1586966191-1.jpg" alt="" />
            <div className='absolute hidden lg:block bg-transparent border border-white text-white p-8 rounded-2xl left-[40%] top-[40%]'>
                <h1 className='font-semibold text-xl md:text-2xl md:font-bold lg:text-3xl lg:font-bold' >Support them They are <br /> waiting for Home. <Link to={'/donationCampaignPage'} className='  text-yellow-500'>Donate Now</Link></h1>
                <p className='mt-4'>You can adobe a pet and give it a beautiful home<br /> .  And can give you a beautiful life.  Why are you late?</p>
            </div>
        </SwiperSlide>

        

        <SwiperSlide  >
            <img className='relative  w-screen h-full' src="https://i.ibb.co/fDT90BB/pexels-kowalievska-1170986.jpg" alt="" />
            <div className='absolute hidden lg:block bg-transparent border border-white text-white p-8 rounded-2xl left-[40%] top-[40%]'>
                <h1 className='font-semibold text-xl md:text-2xl md:font-bold lg:text-3xl lg:font-bold' >Support them They are <br /> waiting for Home. <Link to={'/donationCampaignPage'} className='  text-yellow-500'>Donate Now</Link></h1>
                <p className='mt-4'>You can adobe a pet and give it a beautiful home<br /> .  And can give you a beautiful life.  Why are you late?</p>
            </div>
        </SwiperSlide>

        <SwiperSlide >
            <img className='relative  w-screen h-full' src="https://i.ibb.co/ngbX3KC/Baby-Bird-FI-1920x900.jpg" alt="" />
            <div className='absolute hidden lg:block bg-transparent border border-white text-white p-8 rounded-2xl left-[40%] top-[40%]'>
                <h1 className='font-semibold text-xl md:text-2xl md:font-bold lg:text-3xl lg:font-bold' >Support them They are <br /> waiting for Home. <Link to={'/donationCampaignPage'} className='  text-yellow-500'>Donate Now</Link></h1>
                <p className='mt-4'>You can adobe a pet and give it a beautiful home<br /> .  And can give you a beautiful life.  Why are you late?</p>
            </div>
        </SwiperSlide>
        <SwiperSlide >
            <img className='relative  w-screen h-full' src="https://i.ibb.co/VMLrDN5/07-CAT-STRIPES-medium-Square-At3-X-v2.jpg" alt="" />
            <div className='absolute hidden lg:block bg-transparent border border-white text-white p-8 rounded-2xl left-[40%] top-[40%]'>
                <h1 className='font-semibold text-xl md:text-2xl md:font-bold lg:text-3xl lg:font-bold' >Support them They are <br /> waiting for Home. <Link to={'/donationCampaignPage'} className='  text-yellow-500'>Donate Now</Link></h1>
                <p className='mt-4'>You can adobe a pet and give it a beautiful home<br /> .  And can give you a beautiful life.  Why are you late?</p>
            </div>
        </SwiperSlide>




    </Swiper>
    );
};

export default BannerSection;