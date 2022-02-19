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

  async addBannerTag({mid, tid}) {
    try {
      const resp = await this.updateById(`/mural/${mid}/tag`, tid);

      return resp;
    } catch (err) {
      throw new Error(err);
    }
  }

  async deleteBannerTag({mid, tid}) {
    try {
      const resp = await this.deleteById(`/mural/${mid}/tag`, tid);

      return resp;
    } catch (err) {
      throw new Error(err);
    }
  }
}
