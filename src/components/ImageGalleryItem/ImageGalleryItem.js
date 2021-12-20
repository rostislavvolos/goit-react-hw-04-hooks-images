import styles from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';
import {memo} from 'react';

 function ImageGalleryItem({picture, onClick}) {
  //  console.log(picture);
    return (
    <li className={styles.gallery_item} onClick={()=> onClick(picture.largeImageURL)}>
  <img src={picture.webformatURL} alt={picture.tags} className={styles.image}/>
</li>
    )
}


export default memo(ImageGalleryItem);


ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  tags: PropTypes.string,
  bigImage: PropTypes.func,
};