import TagOpenIcon from '../TagOpenIcon.png';
import TagCloseIcon from '../TagCloseIcon.png';

const ErrorMessage = ({ errorMessage }) => {
  return (
    <div className='ErrorDiv'>
      <img src={TagOpenIcon} className='TagIcon' alt='icon'></img>
      <h3 className='ErrorTitle'>{errorMessage}</h3>
      <img src={TagCloseIcon} className='TagIcon' alt='icon'></img>
    </div>
  );
};

export default ErrorMessage;
