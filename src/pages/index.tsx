import TaggerContainer from '@landing/Tagger';
import {getCurrentBanner} from '@redux/actions/tags';
import React, {
  memo, useEffect, useState
} from 'react';
import {useDispatch} from 'react-redux';

const IndexPage = () => {
  let resp;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = async () => {
    try {
      setLoading(true);

      await new Promise((resolve, reject) =>
        dispatch(getCurrentBanner({
          resolve,
          reject
        }))
      );
    } catch (e) {
      console.log(e);
    }

    setLoading(false);
  };

  if (loading) resp = <p className='txt-center'>Cargando banner...</p>;
  else resp = <TaggerContainer />;

  return resp;
};

export default memo(IndexPage);
