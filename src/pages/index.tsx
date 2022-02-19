import {
  Language,
  Select
} from '@components/index';
import React, {
  memo
} from 'react';

const options = [
  {
    key: 0,
    label: 'Carlos'
  },
  {
    key: 2,
    label: 'Mauro'
  },
  {
    key: 3,
    label: 'Jose'
  },
  {
    key: 5,
    label: 'Romeo'
  },
  {
    key: 10,
    label: 'Antonio'
  }
];

const IndexPage = () => {
  console.log('refesh this component');

  const handleSelected = (selected: number) => {
    console.log(selected, 'in used');
  };

  return <>
    <div className="landing">
      <h2 className="landing-title g-my-4">
        <Language langKey="landingTitle" />
      </h2>

      <Select
        options={options}
        initial={10}
        onSelected={handleSelected}
      />

    </div>
  </>;
};

export default memo(IndexPage);
