import loadingGif from '../assets/loading.gif';

function SearchSpinner() {
  return (
    <div className='w-full h-full flex fixed top-20 bottom-20 z-20 left-0 right-0 justify-center items-center bg-slate-200 opacity-50'>
      <img src={loadingGif} alt="loading" />
    </div>
  )
}

export default SearchSpinner
