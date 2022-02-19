// import { getOrCreateStore } from "./with-redux-store";
// import { RESET_AUTH_TO_INITIAL } from "@constants/ActionTypes";
// import Router from "next/router";
// import MenuJSON from "@containers/Wrapper/menu.json";
// import { role } from "./middlewareRole";

export const getFilter = (payload, filterAffiliates) => {
  if (payload) {
    const {type, value} = payload;
    if (type === 'societyId' && typeof filterAffiliates?.subSocietyId !== 'undefined') {
      delete filterAffiliates['subSocietyId'];
    }
    const filterApply = value !== '' ? {[type]: value} : false;
    if (filterApply) {
      return {
        ...filterAffiliates,
        ...filterApply
      };
    } else {
      delete filterAffiliates[type];
      return filterAffiliates;
    }
  } else {
    return filterAffiliates;
  }
};

export const buildFormData = (data) => {
  const formData = new FormData();
  formData.append('file', data);
  return formData;
};

export const useIndex = ({data, index}) =>
  data?.reduce(
    (valorAnterior, valorActual) => ({
      ...valorAnterior,
      [valorActual[index]]: valorActual
    }),
    {}
  );

export const getFileStorages = (object) => {
  let fileStorages = {};
  if (object?.fileStorages && object.fileStorages.length > 0) {
    const {link, id, name} = object.fileStorages[0];
    fileStorages = {
      url: link,
      uid: id,
      name: name,
      status: 'done'
    };
  }
  return fileStorages;
};

export const getFileStoragesObject = (object) => {
  let fileStorages = {};
  const {link, id, name} = object;
  fileStorages = {
    url: link,
    uid: id,
    name: name,
    status: 'done'
  };
  return fileStorages;
};

export const cleanObject = (object) => {
  for (const propName in object) {
    if (object[propName] === null || object[propName] === undefined) {
      delete object[propName];
    }
  }
};

export const getUploadProps = ({fileList: fileListUpload, dispatch, nameFields, multiple = false, form, size = 1}) => {
  return {
    name: `FILE_${nameFields.toUpperCase()}`,
    multiple,
    onRemove: () => {
      setTimeout(() => form.resetFields([nameFields]), 1000);
      return true;
    },
    beforeUpload: (info) => {
      setTimeout(() => {
        if (size === 1) {
          form.resetFields([nameFields]);
        }
        form.setFieldsValue({[nameFields]: info});
      }, 1000);
      return false;
    },
    onChange: (info) => {
      let fileList = [...info.fileList];
      fileList = fileList.slice(-size);
      fileList = fileList.map((file) => {
        if (file.response) {
          file.url = file.response.url;
        }
        return file;
      });
      dispatch(fileList);
    },
    onPreview: async (file) => {
      let src = file.url;
      if (!src) {
        src = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(file.originFileObj);
          reader.onload = () => resolve(reader.result);
        });
      }
      const image = new Image();
      image.src = src;
      const imgWindow = window.open(src);
      imgWindow.document.write(image.outerHTML);
    },
    fileList: fileListUpload
  };
};

export const downloadFile = ({file, name}) => {
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(file);
    link.setAttribute('href', url);
    link.setAttribute('download', name);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export const getFileStorageObjectByTag = (fileStorages, objectTag) => {
  const object = Array.isArray(fileStorages)
    ? fileStorages?.find(({tag}) => tag === objectTag)
    : fileStorages.tag === objectTag
      ? fileStorages
      : undefined;
  return object;
};

export const getHostname = (req, trueHost = false) => {
  let hostname = 'localhost';
  if (req) {
    const host = req ? req.headers['x-forwarded-host'] ?? req.headers.host : '';
    hostname = host?.indexOf('localhost') !== -1 && !trueHost ? 'localhost' : host;
  }
  return hostname;
};

export const getCookieName = (hostname: string, cookieName: string) => {
  let cookieNameFinished: string;
  const isServer = typeof window === 'undefined';
  const fullName = `${hostname}-${cookieName}`;

  if (!isServer) cookieNameFinished = btoa(fullName);
  else cookieNameFinished = Buffer.from(fullName, 'utf-8').toString('base64');

  return cookieNameFinished.slice(0, 10);
};

export const getEnableAuthData = (auth) => {
  if (!auth) return {};
  const enableKey = ['userToken', 'dataUser', 'userType'];
  return Object.keys(auth).reduce((accumulator, currentValue) => ({
    ...accumulator,
    ...(enableKey.includes(currentValue)
      ? {[currentValue]: auth[currentValue]}
      : {}
    )
  }), {});
};

export const getEnableUserData = (user) => {
  if (!user) return {};
  const enableKey = [
    'id',
    'firstName',
    'lastName',
    'identityCard',
    'birthday',
    'username',
    'email',
    'codeReference',
    'nit',
    'gender',
    'Biography',
    'phone',
    'proffesion',
    'affiliationDate',
    'upToDate',
    'userTypeId',
    'userStateId',
    'instituteId',
    'societyId',
    'subSocietyId',
    'customizablePageId',
    'userTypeName',
    'fileStorages'
  ];
  return Object.keys(user).reduce((accumulator, currentValue) => {
    return {
      ...accumulator,
      ...(enableKey.includes(currentValue) ? {[currentValue]: user[currentValue]} : {})
    };
  }, {});
};

export const getRndInteger = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min)) + min;

export const setDefaultColorMode = (): 'dark' | 'light' => {
  let mode: 'light' | 'dark' = 'light';

  if (matchMedia && matchMedia('(prefers-color-scheme: dark)').matches) {
    const html = document.getElementsByTagName('html')[0];
    html.classList.add('__dark-mode');

    mode = 'dark';
  }

  return mode;
};

export const getNavigatorLocale = (): 'EN' | 'ES' => {
  let locale: 'EN' | 'ES' = 'EN';

  if (document) {
    const browserLocale = navigator.language.slice(0, 2);
    locale = (browserLocale.toUpperCase() == 'EN') ? 'EN' : 'ES';
  }

  return locale;
};

export const toggleColorMode = () => {
  if (document) {
    const html = document.getElementsByTagName('html')[0];
    html.classList.toggle('__dark-mode');
  }
};
