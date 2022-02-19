import {
  LightMode
} from '@components/icons';
import {
  Button, Navbar
} from '@components/index';
import {
  Language
} from '@components/Language';
import {
  toggleColorMode
} from '@utils/global';
import React from 'react';

interface InLandingLayout {
  authenticated?: boolean;
  children: JSX.Element | string;
}

const items = [
  // {
  //   path: '#prices',
  //   label: <Language langKey='navPrice' />
  // },
  {
    path: '/handle-tags',
    label: <Language langKey='handleTags' />
  },
  {
    label:
      <Button
        type="secondary"
        onClick={toggleColorMode}
        icon={<LightMode size="20" />}
        shape="round"
      />
  }
];

const LandingLayout = ({children}: InLandingLayout) => {
  return <>
    <Navbar items={items} />
    {children}
    <h1> this is footer </h1>
    <h1> this is footer </h1>
    <h1> this is footer </h1>
    <h1> this is footer </h1>
  </>;
};

export default LandingLayout;
