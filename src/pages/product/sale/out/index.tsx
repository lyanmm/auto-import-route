import { Link } from 'react-router-dom';

export default function ProductSale(props) {
  return (
    <div>
      Product/Sale/Out
      <Link to={'detail'}>detail</Link>
    </div>
  );
}

export const meta = {
  title: '产品销售出库',
};
