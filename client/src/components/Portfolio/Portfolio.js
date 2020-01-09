import React , { Component } from 'react';
import Swiper from 'react-id-swiper';
import { ProductCard } from 'react-ui-cards';
import { Link } from "react-router-dom";
import './Portfolio.scss';

class Portfolio extends Component {
  onClick() {
    return <Link to={'/'}>
    </Link>
  }
  ;
  render() {
    return (
      <>
    <h2>Projects</h2>
    <div className='styles__card-container'>
      <ProductCard
        photos={[
          './images/portfolio/subway_map.png'
        ]}
        productName='Subway Paths'
        description='Donec lectus nulla, molestie aliquam nisl vitae, tempor placerat magna. Morbi dignissim in felis vel aliquet.'
        url='/subway'
        buttonText='View Project'
      />
      <ProductCard
        photos={[
          './images/portfolio/Race_Map.gif'
        ]}
        productName='US Census API'
        description='Donec lectus nulla, molestie aliquam nisl vitae, tempor placerat magna. Morbi dignissim in felis vel aliquet.'
        url='/discovery'
        buttonText='View Project'
      />
      <ProductCard
        photos={[
          './images/portfolio/time_extraction_of_patient_paths.png'
        ]}
        productName='Walking Paths'
        description='Donec lectus nulla, molestie aliquam nisl vitae, tempor placerat magna. Morbi dignissim in felis vel aliquet.'
        url='https://github.com/nukeop'
      />
      <ProductCard
        photos={[
          './images/portfolio/network_diagram.png'
        ]}
        productName='Network Diagram'
        description='Donec lectus nulla, molestie aliquam nisl vitae, tempor placerat magna. Morbi dignissim in felis vel aliquet.'
        url='https://github.com/nukeop'
      />
      <ProductCard
        photos={[
          './images/portfolio/heart_rate_monitors.png'
        ]}
        productName='Ocelot'
        description='Donec lectus nulla, molestie aliquam nisl vitae, tempor placerat magna. Morbi dignissim in felis vel aliquet.'
        url='https://github.com/nukeop'
      />
      </div>
      </>
    )
  }

}

export default Portfolio;