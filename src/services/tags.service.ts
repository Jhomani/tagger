import MainService from './main.service';

export class TagsService extends MainService {
  constructor() {
    super();
  }

  async getTags() {
    try {
      type Tag = {id: number, label: string};
      const tags = <Tag[]>await this.getMethod('/tag');

      return tags.map(({id, label}) => ({
        key: id,
        label
      }));
    } catch (err) {
      throw new Error(err);
    }
  }

  async getBanner() {
    try {
      const banner = await this.getMethod('/image');

      return banner;
    } catch (err) {
      throw new Error(err);
    }
  }
}
