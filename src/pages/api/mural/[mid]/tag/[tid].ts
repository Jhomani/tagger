import images from 'database/banners.json';
import tags from 'database/tags.json';
import fs from 'fs';
import {
  NextApiRequest, NextApiResponse
} from 'next';

export default async function getAllTags(req: NextApiRequest, res: NextApiResponse) {
  const {mid, tid} = req.query;
  let image, resp, tag;
  const intTid = typeof tid === 'string' ? parseInt(tid) : -1;


  for (const img of images) {
    if (typeof mid === 'string' && img.id === parseInt(mid)) {
      image = img;
      break;
    }
  }

  for (const tg of tags) {
    if (tg.id === intTid) {
      tag = tg;
      break;
    }
  }

  if (!image || !tag)
    return res.status(404).json({messsage: 'Banner or Tag not found'});


  if (req.method === 'PATCH') {
    image.tags.push(tag);

    resp = {messsage: 'Successful added tag'};
  } else if (req.method === 'DELETE') {
    let itag = -1;

    image.tags?.forEach((item: {id: number}, i) => {
      if (item.id === intTid) itag = i;
    });

    if (itag !== -1) image.tags?.splice(itag, 1);

    resp = {messsage: 'Successful deleted tag'};
  }

  if (!resp)
    return res.status(404).json({messsage: 'sorry we only accept PATCH OR DELETE requests'});
  else {
    fs.writeFileSync('database/banners.json', JSON.stringify(images, null, 2));

    return res.status(200).json(resp);
  }
}
