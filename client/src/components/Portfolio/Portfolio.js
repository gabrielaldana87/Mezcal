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
        description='A project to engage with Income Inequality along the path of the New York City Subway.'
        url='/subway'
        buttonText='View Project'
      />
      <ProductCard
        photos={[
          './images/portfolio/Race_Map.gif'
        ]}
        productName='US Census API'
        description='Explore Demographic and Economic variables from the US Census as Interactive Graphs.'
        url='/discovery'
        buttonText='View Project'
      />
      <ProductCard
        photos={[
          './images/portfolio/time_extraction_of_patient_paths.png'
        ]}
        productName='Walking Paths'
        description='Visualize the walking path of an individual using geolocational data. Measure distance travelled using interactive brush.'
        url='https://github.com/nukeop'
      />
      <ProductCard
        photos={[
          './images/portfolio/network_diagram.png'
        ]}
        productName='Network Diagram'
        description='Discover a social network of interactions amongst users with group clusters to showcase communities.'
        url='https://github.com/nukeop'
      />
      <ProductCard
        photos={[
          './images/portfolio/heart_rate_monitors.png'
        ]}
        productName='Ocelot'
        description='A visualization platform to monitor clinical patient state and determine patterns in patient physiology along with medication administration.'
      />
      </div>
      </>
    )
  }

}

export default Portfolio;