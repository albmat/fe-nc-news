import ReactLoading from 'react-loading';

const Loading = () => {
  return (
    <div className='LoadingDiv'>
      <ReactLoading
        type={'spinningBubbles'}
        color={'red'}
        height={50}
        width={50}
      />
    </div>
  );
};

export default Loading;
