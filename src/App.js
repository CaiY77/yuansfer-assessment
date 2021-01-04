import React, { Component } from 'react';
import axios from 'axios';
import {Form, Button, Message, Dimmer, Loader} from 'semantic-ui-react';
import './App.css'
import Payment from './payment';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      applyName: "",
      applyEmail: "",
      error: false,
      addSuccess: false,
      show:false,
      code: '',
      dim:false
    }
  }

  createSandboxUser = async () => {

    const {applyName , applyEmail} = this.state;

    this.setState({
      dim:true
    })

    const params = new URLSearchParams();
    params.append('applyName',applyName);
    params.append('applyEmail', applyEmail);
    
    try{
      await axios.post('https://portal.yuansfer.yunkeguan.com/api/storeTestaccount/add',params)
      .then(response => response.data)
      .then(data =>{
        this.setState({
          code: data,
          addSuccess: true,
          show: true,
          dim: false
        })
      })
      
      setTimeout(()=>{
        this.setState({
          addSuccess: false
        })
      },3000)

    }catch(e){
      this.setState({
        error:true
      })

      setTimeout(()=>{
        this.setState({
          error: false
        })
      },3000)
    }

  }

  handleInputs = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() { 
    const { dim,addSuccess, error, applyEmail, applyName, code, show} = this.state
    return (<div>
      

      <div className='form-contain'>
      <h1 className="main-head">Mock SandBox Creation</h1>
        <Form error className='form-Input' onSubmit = { this.createSandboxUser }>

          <Form.Input
            required
            name="applyName"
            className="form-font"
            onChange={this.handleInputs}
            value ={applyName}
            icon='user'
            iconPosition='left'
            label='Your Name'
            placeholder="Enter Your Name"
          />

          <Form.Input 
            required
            name="applyEmail"
            className="form-font"
            onChange={this.handleInputs}
            value={applyEmail}
            icon='mail'
            iconPosition='left'
            label='Email Address'
            placeholder="Your Email Address"
            type ="email"
          />
          <div className="button-contain">
            <Button className="button-style" content="Create My Sandbox Account" color ="blue" />
          </div>
          
          <Message 
            className="err-mess"
            color="green"
            header="Success"
            content="Your Sandbox Enviorment was successfully created!"
            style={{display: (addSuccess)? 'block': 'none'}}
          />
          <Message 
            error
            className="err-mess"
            header="Error"
            content="There seems to be an issue creating your Sandbox Enviorment. Please try again later."
            style={{display: (error)? 'block': 'none'}}
          />
        </Form>

      </div>

      {
        (show)
        ? (<div className='code-contain'>
            <Message 
              color='yellow'
              className="mess-contain"
            >
              <Message.Header>API Response</Message.Header>
              <p> Ret Code : {code.ret_code} , Ret Msg : {code.ret_msg}</p>

            </Message>
          </div>)
        : null
      }
      {
        (dim)
        ? (<Dimmer className="dimmer" active>
            <Loader size='massive'>Creating Account . . .</Loader>
        </Dimmer>)
        : null
      }
      <Payment />

    </div>);
  }
}
 
export default App;
