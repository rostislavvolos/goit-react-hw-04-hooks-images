import './styles/App.css';
import Searchbar from './components/Searchbar/Searchbar';
import { useCallback, useEffect, useState } from 'react';
import { productsApi } from './services/searchApi';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import Loader from './components/Loader/Loader';
import Modal from "./components/Modal/Modal"


const initialState = {
  pictures: [],
  imgTags: '',
  largeImage: '',
  error: null,
  showModal: false,
  loading: false,
  finish: false,
}


const App = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [state, setState] = useState(initialState);



  

// const onChangeQwery = query => {
//   setQuery(query);
// };
  // componentDidUpdate (prevProps, prevState) {
  //   const {query, loading, page} = this.state
  //   if (prevState.query !== query || (loading && prevState.page < page)) {
  //     this.fetchProducts()
  //   }
  // }

  
  useEffect(() => {
    if (!query) return;
    setState({ pictures: [], isLoading: true, finish: false });
    fetchProducts();
  }, [query]);

  useEffect(() => {
    if (!query) {
      return;
    }
    fetchProducts();
  }, [page]);




  
  const toggleModal = () => {
    setState(({showModal}) => {
      return {
        ...state,
        showModal: !showModal
      }
    })
  };

  const bigImage = (largeImage) => {
    setState({
      ...state,
      largeImage,
      showModal: true
    })
    
  };


  const searchQuery = useCallback((query) => {
    setQuery(query);
    setPage(1);
    state.pictures = [];
    state.error = null;
    state.finish = false;
    state.loading = false;
  }, [])

  const fetchProducts = async () => {
    try {
      const {data} = await productsApi.searchPictures(page, query)
      setState(({pictures}) => {
        const newState = {
          pictures: [...pictures , ...data.hits],
          loading: false,
          error: null,
         
        }
        if (data.hits.length < 11) {
          newState.finish = true
        }
        if (data.hits.length < 1) {
          newState.error = true
        }
        return newState;
      })
    }
    catch (error) {
      setState({loading: false, error: null,})
    }
  }


  const loadMore = () => {
    setPage(prevState => {
      return prevState + 1;
    });
    state.loading = true;
    setState({ ...state });
  };

    const {pictures, error, finish, loading, showModal, largeImage, imgTags} = state



    return (
      <div className="App"> 
      <Searchbar onSubmit={searchQuery}/>
      {error && <h1 className='error-title'>ну я хз, ниче нету, попробуй другое</h1>}
      <ImageGallery pictures={pictures} onClick={bigImage}/>
      {loading && <Loader />}
      {!finish && pictures.length > 11 && !loading && (<Button onClick={loadMore}/>)}
      {showModal && (<Modal closeModal={toggleModal}>
            <img src={largeImage} alt={imgTags} />
          </Modal>)}
    </div>
    )
}

export default App;
