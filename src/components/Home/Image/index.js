import './index.scss';
import photo from '../../../assets/images/homepage-image.jpg'

const Image = () => {
    
    return (
        <div className="image-container">
            <img className="photo" src={photo} alt="handsome dude"/>
        </div>
    )
}

export default Image
