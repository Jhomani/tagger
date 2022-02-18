import MainService from './main.service';

export interface InPayment {
  id: string,
  title: string,
  type: string,
  points: number,
  details: string[],
  price: number
}

export interface InPayInfo {
  link: string;
  paymentId: string;
  discount: number
}

interface InPaymentModel extends InPayment {
  description?: string,
  historyDetail?: string,
  details: string[],
}

class PaymentService extends MainService {
  constructor() {
    super();
  }

  async getPlans(sufix = '') {
    const filter: Filter<InPaymentModel> = {
      order: ['points ASC'],
      fields: {
        id: true,
        [`${sufix}title`]: true,
        points: true,
        [`${sufix}details`]: true,
        type: true
      },
      where: {type: 'plan'}
    };

    try {
      const products = await this.getMethod(
        '/products/with-promotion', filter
      );

      console.log(products);
      return products;
    } catch (err) {
      throw new Error(err);
    }
  }

  async claimLink(variable: object) {
    const body = {
      firstName: '',
      lastName: '',
      ...variable
    };

    try {
      const paymentInfo = await this.postMethod('/payments/purchase', body);

      return paymentInfo;
    } catch (err) {
      throw new Error(err);
    }
  }

  async updatePayment(chunks: object, id: string) {
    try {
      const paymentInfo = await this.updateById('/payments', id, chunks);

      return paymentInfo;
    } catch (err) {
      throw new Error(err);
    }
  }
}

const payments = new PaymentService();

export default payments;
