import React from 'react';
import './CartPage.css';
import user from '../../assets/user.webp';
import remove from '../../assets/remove.png'
import Table from '../Common/Table';
import QuantityInput from '../SingleProduct/QuantityInput';

const CartPage = () => {
  return (
    <section className='align_center cart_page'>
        <div className="align_center user_info">
            <img src={user} alt="User Profile"/>
            <div>
                <p className='user_name'>John</p>
                <p className='user_email'>john@example.com</p>
            </div>
        </div>
        <Table headings={["Item", "Price", "Quantity", "Total", "Remove"]}>
            <tbody>
                <tr>
                    <td>iphone</td>
                    <td>$999</td>
                    <td className='align_center table_quantity_input'><QuantityInput/></td>
                    <td>$999</td>
                    <td><img src={remove} alt="remove" className='cart_remove_icon'/></td>
                </tr>
            </tbody>
        </Table>
        <table className='cart_bill'>
            <tbody>
                <tr>
                    <td>Subtotal</td>
                    <td>$999</td>
                </tr>
                <tr>
                    <td>Shipping Charge</td>
                    <td>$5</td>
                </tr>
                <tr className='cart_bill_final'>
                    <td>Total</td>
                    <td>$1004</td>
                </tr>
            </tbody>
        </table>
        <button className="search_button checkout_button">Checkout</button>
    </section>
  )
}

export default CartPage