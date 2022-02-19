import {Language, Select} from '@components/index';
import {getCurrentBanner} from '@redux/actions/tags';
import React, {
  memo, useEffect, useState
} from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';

const IndexPage = () => {
  const {
    tags: {tags, banner}
  } = useSelector((store: MainStorage) => store);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleSelected = (selected: number) => {
    console.log(selected, 'in used');
  };

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

  const createAt = new Date(banner?.createdAt ?? 0);

  const handleDeleteTag = (id) => {
    console.log(id, '<< delete this');
  };

  const ImageData = (
    <div className='image-data'>
      <h4>{banner?.title}</h4>
      <p className='txt-body2 g-mt-1'>
        Creado en: {createAt.toLocaleDateString('es-CL')}
      </p>
      <img src={banner?.imageUrl} alt="banner" />

      {loading && banner.id
        ? <p className='txt-center'>Guardando...</p>
        : <div>
          {banner.tags?.map(({key, label}, i) => (
            <span key={i} role="label" className='txt-body2'>
              {label}
              <span
                onClick={handleDeleteTag.bind(this, key)}
                role="icon"
              > ✕ </span>
            </span>
          ))
          }
        </div>
      }

    </div>
  );

  return <>
    <div className="tagger">
      <h3 className="tagger-title g-my-5">
        <Language langKey="landingTitle" />
      </h3>

      <div className='select-tag-section'>
        <span>
          Agrega una etiqueta a la imagen: &nbsp;
        </span>
        <Select
          options={tags}
          size="medium"
          placeholder='Etiquetas'
          onSelected={handleSelected}
        />
      </div>
      {loading && !banner.id
        ? <p className='txt-center'>Cargando banner...</p>
        : ImageData
      }

    </div>
  </>;
};

export default memo(IndexPage);
