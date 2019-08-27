import React from 'react';
import './User.css';

function User({pseudo, avatar, onReset}) {

    return (
        <section className="user">

            {/* avatar */}
            <figure>
                <img
                    src={avatar}
                    alt={pseudo + " profil"}
                    // default size (px)
                    width="150"
                    height="150"
                />
            </figure>

            {/* pseudo */}
            <p className="pseudo">{pseudo}</p>

            <div className="reset">
                <button onClick={onReset}>changer</button>
            </div>

        </section>
    );
}

export default User;