

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