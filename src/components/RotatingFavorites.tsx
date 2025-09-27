import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { Country } from '@/types/Country';

interface RotatingFavoritesProps {
  countries: Country[];
  onCountryClick: (country: Country) => void;
}

const RotatingFavorites: React.FC<RotatingFavoritesProps> = ({ countries, onCountryClick }) => {
  const quantity = countries.length;

  return (
    <StyledWrapper quantity={quantity}>
      <div className="wrapper">
        <div className="inner">
          {countries.map((country, index) => (
            <div key={country.cca3} className="card" style={{ '--index': index } as React.CSSProperties} onClick={() => onCountryClick(country)}>
              <Image
                src={country.flags.png}
                alt={`Bandera de ${country.name.common}`}
                width={150}
                height={100}
                className="img"
              />
            </div>
          ))}
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div<{ quantity: number }>`
  .wrapper {
    width: 100%;
    height: 600px;
    position: relative;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .inner {
    --w: 160px;
    --h: 110px;
    --translateZ: 400px;
    --rotateX: 10deg;
    --perspective: 2000px;
    --quantity: ${props => props.quantity};
    position: absolute;
    width: var(--w);
    height: var(--h);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) perspective(var(--perspective));
    z-index: 2;
    transform-style: preserve-3d;
    animation: rotating 25s linear infinite;
  }
  @keyframes rotating {
    from {
      transform: translate(-50%, -50%) perspective(var(--perspective)) rotateX(var(--rotateX)) rotateY(0deg);
    }
    to {
      transform: translate(-50%, -50%) perspective(var(--perspective)) rotateX(var(--rotateX)) rotateY(360deg);
    }
  }

  .card {
    position: absolute;
    border: 2px solid rgba(142, 249, 252, 0.5);
    border-radius: 12px;
    overflow: hidden;
    inset: 0;
    transform: rotateY(calc((360deg / var(--quantity)) * var(--index))) translateZ(var(--translateZ));
    cursor: pointer;
  }

  .img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default RotatingFavorites;
