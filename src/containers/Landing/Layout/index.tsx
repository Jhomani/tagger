import {LightMode} from '@components/icons';
import {
  Button,
  getRawMessage,
  Navbar,
  Select
} from '@components/index';
import {switchLanguage} from '@redux/actions/app';
import {toggleColorMode} from '@utils/global';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

interface InLandingLayout {
  authenticated?: boolean;
  children: JSX.Element | string;
}

const LandingLayout = ({children}: InLandingLayout) => {
  const {locale} = useSelector((store: MainStorage) => store.app);
  const dispatch = useDispatch();

  const handleSelected = (selected: 'EN' | 'ES') => {
    dispatch(switchLanguage(selected));
  };

  const options = [
    {
      key: 'EN',
      label: getRawMessage('english')
    },
    {
      key: 'ES',
      label: getRawMessage('spanish')
    }
  ];

  const items = [
    {
      label:
        <Select
          options={options}
          initial={locale}
          onSelected={handleSelected}
        />
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

  return <>
    <Navbar items={items} />
    {children}
    <h6 className='txt-center g-my-3'> this is footer </h6>
  </>;
};

export default LandingLayout;
