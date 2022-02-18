import Layout from '@landing/Layout';
import {
setDefaultValues
} from '@redux/actions/app';
import {
getNavigatorLocale, setDefaultColorMode
} from '@utils/global';
import React, {
memo, useEffect
} from 'react';
import {
useDispatch
} from 'react-redux';

// import moment from 'moment';

export const IndexPage = ({Component, pageProps}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const locale = getNavigatorLocale();
    const mode = setDefaultColorMode();

    // moment.locale(locale.toUpperCase());
    dispatch(setDefaultValues({
locale, mode
}));
  }, []);

  console.log('int maing component yeah....');
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default memo(IndexPage);
