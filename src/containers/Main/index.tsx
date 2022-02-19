import Layout from '@landing/Layout';
import {setDefaultValues} from '@redux/actions/app';
import {getTagsStart} from '@redux/actions/tags';
import {getNavigatorLocale, setDefaultColorMode} from '@utils/global';
import React, {memo, useEffect} from 'react';
import {batch, useDispatch} from 'react-redux';

// import moment from 'moment';

export const IndexPage = ({Component, pageProps}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const locale = getNavigatorLocale();
    const mode = setDefaultColorMode();

    batch(() => {
      dispatch(setDefaultValues({
        locale,
        mode
      }));
      dispatch(getTagsStart());
    });
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default memo(IndexPage);
