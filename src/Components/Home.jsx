import { Link } from '@reach/router';

const Home = () => {
  return (
    <div className='Home'>
      <Link to='/articles/' className='Link'>
        <h3 class='LinkMain'>See all articles</h3>
      </Link>
    </div>
  );
};

export default Home;
