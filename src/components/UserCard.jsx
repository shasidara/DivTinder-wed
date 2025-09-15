const UserCard = ({user}) => {
    const {
        photoURL,
        firstName,
        lastName,
        age,
        gender,
        about,
        skills,
    }= user;

    return(
        <div className="card bg-base-100 w-96 shadow-xl">
            <figure>
                <img
                src={photoURL}
                alt="Profile" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                {age && gender && (<p>{age + ", " + gender}</p>)}
                <p>{about}</p>
                <p>{skills}</p>
                <div className="card-actions justify-center">
                    <button className="btn btn-primary">ignore</button>
                    <button className="btn btn-secondary">interested</button>
                </div>
            </div>
        </div>
    );
};

export default UserCard;