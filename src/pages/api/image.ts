import images from 'database/banners.json';
import {NextApiRequest, NextApiResponse} from 'next';

export default async function getImage(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET')
    res.status(404).json({messsage: 'sorry we only accept GET requests'});

  res.json(images[0]);
}
