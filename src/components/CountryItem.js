import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import '../styles/Country.css';

export default function CountryItem({
  name, statistic, flag, map, iso2, index,
}) {
  const navigate = useNavigate();

  const darkStyle = [1, 2].includes((index % 4) % 3);

  return (
    <>
      <style>
        {`#country-data-${iso2}::before {
          background-image: url(${map});
        }`}
      </style>
      <div
        id={`country-data-${iso2}`}
        className={`country-data ${darkStyle ? 'country-data-dark' : ''}`}
        role="presentation"
        onClick={() => navigate(`/countries/${iso2}/cities`, {
          state: {
            name, statistic, map, flag,
          },
        })}
      >
        <div className="country-data-header">
          <img className="country-flag" crossOrigin="anonymous" src={flag} alt={`${name} flag`} />
          <h3 className="country-name">{name}</h3>
        </div>
        <span className="country-statistic">{new Intl.NumberFormat().format(statistic)}</span>
      </div>
    </>
  );
}

CountryItem.propTypes = {
  name: PropTypes.string.isRequired,
  statistic: PropTypes.number.isRequired,
  flag: PropTypes.string.isRequired,
  map: PropTypes.string.isRequired,
  iso2: PropTypes.string.isRequired,
  index: PropTypes.number,
};

CountryItem.defaultProps = {
  index: 0,
};
