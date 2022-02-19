import {Language, Select} from '@components/index';
import {addBannerTag} from '@redux/actions/tags';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

const availableForMural = [];
const TaggerContainer = () => {
  const {tags: {tags, banner}} = useSelector((store: MainStorage) => store);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const addDelMuralTag = async (tid: number, del = false) => {
    try {
      setLoading(true);

      await new Promise((resolve, reject) =>
        dispatch(addBannerTag({
          resolve,
          reject,
          tid,
          mid: banner.id,
          del
        }))
      );
    } catch (e) {
      console.log(e);
    }

    setLoading(false);
  };

  useEffect(() => {
    const imgTags = banner.tags ?? [];

    availableForMural.length = 0;

    tags.forEach(({key, label}) => {
      let haveThiTag = false;

      for (const item of imgTags) {
        if (item.id === key) {
          haveThiTag = true;
          break;
        }
      }

      if (!haveThiTag) availableForMural.push({key, label});
    });
  }, [banner.tags, tags]);

  const createAt = new Date(banner?.createdAt ?? 0);

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
          options={availableForMural}
          size="medium"
          placeholder='Etiquetas'
          onSelected={addDelMuralTag}
        />
      </div>
      <div className='image-data'>
        <h4>{banner?.title}</h4>
        <p className='txt-body2 g-mt-1'>
          Creado en: {createAt.toLocaleDateString('es-CL')}
        </p>
        <img src={banner?.imageUrl} alt="banner" />

        {loading && banner.id
          ? <p className='txt-center'>Guardando...</p>
          : <div>
            {banner.tags?.map(({id, label}, i) => (
              <span key={i} role="label" className='txt-body2'>
                {label}
                <span
                  onClick={addDelMuralTag.bind({}, id, true)}
                  role="icon"
                > ✕ </span>
              </span>
            ))
            }
          </div>
        }
      </div>
    </div>
  </>;
};

export default TaggerContainer;
