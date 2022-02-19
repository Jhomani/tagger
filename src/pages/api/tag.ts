import {NextApiRequest, NextApiResponse} from 'next';
import tags from 'src/database/tags.json';

export default async function getAllTags(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET')
    res.status(404).json({messsage: 'sorry we only accept GET requests'});

  res.json(tags);
}
