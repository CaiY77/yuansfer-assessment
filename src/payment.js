import axios from 'axios';
import React, { Component } from 'react';
import {Form, Radio, Message,Button} from 'semantic-ui-react';

class Payment extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            merchantNo: '200043',
            storeNo: '300014',
            amount:'',
            currency: '',
            settleCurrency:'',
            vendor: '',
            ipnUrl: 'http://zk-tys.yunkeguan.com/ttest/test',
            callbackUrl: 'http://zk-tys.yunkeguan.com/ttest/test2?status={status}',
            terminal: '',
            goodsInfo:[{"goods_name": "name1","quantity": "quantity1"}],
            verifySign: "72a2c6ce8497adc8a03a78135618e666",
            reference:'test202001011303',
            succPay: false,
            data:{}
         }
    }

    pay = async () =>{
        const {succPay,reference ,settleCurrency, merchantNo, storeNo, amount, currency, vendor, terminal, callbackUrl, verifySign, ipnUrl, goodsInfo} = this.state

        let paymentInfo= {
            merchantNo:merchantNo,
            storeNo:storeNo,
            amount:amount,
            currency:currency,
            vendor:vendor,
            terminal:terminal,
            ipnUrl:ipnUrl,
            verifySign:verifySign,
            callbackUrl:callbackUrl,
            goodsInfo:goodsInfo,
            settleCurrency:settleCurrency,
            reference:reference
        }

        let prox = "https://cors-anywhere.herokuapp.com/"
        let url = 'https://mapi.yuansfer.yunkeguan.com/online/v3/secure-pay'

        try{
            await axios.post( prox + url, paymentInfo)
            .then(res => res.data)
            .then( data => {
                console.log(data)
            })

        } catch (e) {
            console.log(e)
        }
    }

    handleCurr = (e,{value})=> this.setState({currency: value,settleCurrency:value})
    handleVend = (e,{value})=> this.setState({vendor: value})
    handleTerm = (e,{value})=> this.setState({terminal: value})

    handleInputs = event => {
        this.setState({ [event.target.name]: event.target.value });
      };

    render() { 
        const { amount, currency, vendor,terminal,succPay,data} = this.state
        return ( <div className="form-2">
            <h1 className="main-head">Mock Secure Payment</h1>

            <Form error onSubmit={ this.pay }>
            <h1 className="sub-heads">Amount</h1>
                <Form.Input required className ="amount" name="amount" onChange={this.handleInputs} value ={amount} icon='tag' iconPosition='left' placeholder="0.00" type="number" step="0.01"/>
                <h1 className="sub-heads">Terminal</h1>
                <Form.Group required>
                    <Form.Field className ="field-style" control={Radio} label="Online" value="ONLINE" name = 'terminal' checked={terminal === 'ONLINE'} onChange={this.handleTerm} />
                    <Form.Field className ="field-style" control={Radio} label="WAP" value="WAP" name = 'terminal' checked={terminal === 'WAP'} onChange={this.handleTerm} />
                </Form.Group>
                <h1 className="sub-heads">Vendor</h1>
                <Form.Group required>
                    <Form.Field className ="field-style" control={Radio} label="Alipay" value="alipay" name = 'vendor' checked={vendor === 'alipay'} onChange={this.handleVend} />
                    <Form.Field className ="field-style" control={Radio} label="Wechat Pay" value="wechatpay" name = 'vendor' checked={vendor === 'wechatpay'} onChange={this.handleVend} />
                    <Form.Field className ="field-style" control={Radio} label="Paypal" value="paypal" name = 'vendor' checked={vendor === 'paypal'} onChange={this.handleVend} />
                    <Form.Field className ="field-style" control={Radio} label="Venmo" value="venmo" name = 'vendor' checked={vendor === 'venmo'} onChange={this.handleVend} />
                    <Form.Field className ="field-style" control={Radio} label="Union Pay" value="unionpay" name = 'vendor' checked={vendor === 'unionpay'} onChange={this.handleVend} />
                    <Form.Field className ="field-style" control={Radio} label="Credit Card" value="creditcard" name = 'vendor' checked={vendor === 'creditcard'} onChange={this.handleVend} />
                </Form.Group>

                <h1 className="sub-heads">Currency</h1>
                <Form.Group required inline>
                    <Form.Field  className ="field-style" control={Radio} label="USD" value="USD" name = 'currency' checked={currency === 'USD'} onChange={this.handleCurr} />
                    <Form.Field  className ="field-style" control={Radio} label="CNY" value="CNY" name = 'currency' checked={currency === 'CNY'} onChange={this.handleCurr} />
                    <Form.Field  className ="field-style" control={Radio} label="PHP" value="PHP" name = 'currency' checked={currency === 'PHP'} onChange={this.handleCurr} />
                    <Form.Field  className ="field-style" control={Radio} label="IDR" value="IDR" name = 'currency' checked={currency === 'IDR'} onChange={this.handleCurr} />
                    <Form.Field  className ="field-style" control={Radio} label="KRW" value="KRW" name = 'currency' checked={currency === 'KRW'} onChange={this.handleCurr} />
                    <Form.Field  className ="field-style" control={Radio} label="HDK" value="HDK" name = 'currency' checked={currency === 'HDK'} onChange={this.handleCurr} />
                </Form.Group>
                
                {
                    (Object.keys(data).length != 0)
                    ? (
                    <Message style={{width:"50vw !important"}}color="green">
                        <Message.Header className="mess-head">API Response - {data.ret_msg}</Message.Header>
                        <p className="mess-2"><span>Amount:</span> {data.result.amount}</p>
                        <p className="mess-2"><span>Cashier Url:</span> {data.result.cashierUrl}</p>
                        <p className="mess-2"><span>Currency:</span> {data.result.currency}</p>
                        <p className="mess-2"><span>Reference:</span> {data.result.reference}</p>
                        <p className="mess-2"><span>Settle Currency:</span> {data.result.settleCurrency}</p>
                        <p className="mess-2"><span>Transaction Number:</span> {data.result.transactionNo}</p>
                    </Message>)
                    : null
                }

                <div className="button-contain">
                    <Button className="button-style-2" content="Make a Payment" color ="green" />
                </div>

            </Form>  
        </div> );
    }
}

export default Payment;