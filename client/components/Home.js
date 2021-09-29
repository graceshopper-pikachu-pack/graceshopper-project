import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { firstName } = props;

  return (
    <div>
      <div className='homepage-container'>
        <div id='homepage'>
          <div id='homepage-head'>
            <h2 id='homepage-text'>
              MEET OUR NEWEST RESIDENTS AT THE ANIMAL CONSERVANCY
            </h2>
          </div>
          <Link to='/products' className='homepage-button'>
            MAKE A DONATION
          </Link>
        </div>
      </div>
      <h2>Welcome {firstName}! Please checkout our selection!</h2>
      <div id='rounded-images-categories'>
        <div className='rounded-images-categories'>
          <img
            src='https://nationalzoo.si.edu/sites/default/files/styles/1400_scale/public/newsroom/20181129-roshanpatel03.jpg?itok=6ZIFQmw1'
            className='rounded-images-categories'
          />
          AMPHIBIANS
        </div>
        <div className='rounded-images-categories'>
          <img
            src='https://www.greatadventuresafaris.com/wp-content/uploads/Shoebill-storck-boat-rip-inMurchison-falls-National-Park-1200x675.jpg'
            className='rounded-images-categories'
          />
          BIRDS
        </div>
        <div className='rounded-images-categories'>
          <img
            src='https://s28164.pcdn.co/files/common-clownfish-89-1280x720.jpg'
            className='rounded-images-categories'
          />
          FISH
        </div>
        <div className='rounded-images-categories'>
          <img
            src='https://animals.sandiegozoo.org/sites/default/files/2017-12/animals_hero_matschiestreekangaroo.jpg'
            className='rounded-images-categories'
          />
          INVERTEBRATES
        </div>
        <div className='rounded-images-categories'>
          <img
            src='https://nationalzoo.si.edu/sites/default/files/styles/1400_scale/public/animals/redpanda-002.jpg?itok=9-kbse5G'
            className='rounded-images-categories'
          />
          MAMMALS
        </div>
        <div className='rounded-images-categories'>
          <img
            src='https://animals.sandiegozoo.org/sites/default/files/2017-12/animals_hero_blue-iguana.jpg'
            className='rounded-images-categories'
          />
          REPTILES
        </div>
      </div>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    firstName: state.auth.firstName,
  };
};

export default connect(mapState)(Home);
