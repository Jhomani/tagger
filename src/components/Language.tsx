import {getOrCreateStore} from '@utils/with-redux-store';
import languages from 'locales';
import React from 'react';
import {useSelector} from 'react-redux';

interface InLagCom {
  langKey: string
}

export const Language = ({langKey}: InLagCom) => {
  const {locale} = useSelector((storage: MainStorage) => storage.app);
  const message = languages[locale][langKey] ?? 'no fout message';

  return <>{message}</>;
};

export const getRawMessage = (key: string): string => {
  const {locale} = getOrCreateStore().getState().app;
  const message = languages[locale][key] ?? 'no fout message';

  return message;
};
