import request, {
  deleteOptions,
  getOptions,
  patchOptions,
  postOptions
} from '../utils/request';

export default class MainService {

  public getMethod(endpoint: string, filter = {}) {
    const options = getOptions();
    const encodeFilter = encodeURI(JSON.stringify(filter));

    const url = `${process.env.BACK_URL}/${endpoint}?filter=${encodeFilter}`;

    return request(url, options);
  }

  public postMethod(endpoint: string, body = {}) {
    const options = postOptions(body);
    const url = `${process.env.BACK_URL}/${endpoint}`;

    return request(url, options);
  }

  public deleteById(endpoint: string, body = {}) {
    const options = deleteOptions(body);
    const url = `${process.env.BACK_URL}/${endpoint}`;

    return request(url, options);
  }

  public updateById(endpoint: string, id: string, body = {}) {
    const options = patchOptions(body);
    const url = `${process.env.BACK_URL}/${endpoint}/${id}`;

    return request(url, options);
  }
}
