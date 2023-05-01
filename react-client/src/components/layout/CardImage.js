/**
 * CardImage component displays an image with text on top of it. The text says "bulls&cows".
 * The image is a thumbnail of a picture named "CowAndBull.jpg" located in the "/assets" folder.
 *
 * @returns a JSX element containing an image and text on top of it.
 */
function CardImage (){
    return (
        <div className="position-relative d-inline-block">
            <img src="/assets/CowAndBull.jpg"
                 className="card-img-top img-thumbnail"
                 alt="cannot find bull and cow"/>
            <p className="position-absolute bottom-0 start-50 translate-middle-x text-uppercase bg-info bg-opacity-50
                                  text-white display-1 d-inline px-3 py-2 rounded fw-bolder">
                bulls&cows
            </p>
        </div>
    );
}

export default CardImage;
