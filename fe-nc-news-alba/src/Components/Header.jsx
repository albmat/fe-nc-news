import { Link } from '@reach/router';

const Header = (props) => {
  return (
    <header className='AppHeader'>
      <Link className='Link' to='/articles'>
        <h1>
          <span className='SpanHeader'>North</span>coders News
        </h1>
      </Link>
    </header>
  );
};

export default Header;
