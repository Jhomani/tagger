import {NextApiRequest, NextApiResponse} from 'next';
import images from 'src/database/banners.json';

export default async function getImage(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET')
    res.status(404).json({messsage: 'sorry we only accept GET requests'});

  res.json(images[0]);
}
