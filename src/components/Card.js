import React, { useState } from 'react';

const Card = (props) => {
      const [hovered, setHovered] = useState(false);
      const toggleHover = () => {
            setHovered(!hovered);
      };

      return (
            <div
                  className="card"
                  onMouseEnter={toggleHover}
                  onMouseLeave={toggleHover}
            >
                  <p className="font-Nunito tracking-wider hover:text-yellow-400">
                        {props.items.title}
                  </p>
                  <div className={hovered ? 'animate-ping' : ' '}>
                        {props.items.icon}
                  </div>
                  <p className="pcard">{props.items.abb}</p>
            </div>
      );
};

export default Card;
