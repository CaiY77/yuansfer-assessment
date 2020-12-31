import React, { Component } from 'react';
import axios from 'axios';
import {Form, Button, Message} from 'semantic-ui-react';
import './App.css'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      applyName: "",
      applyEmail: "",
      error: false,
      addSuccess: false,
      show:false,
      code: ''
    }
  }

  createSandboxUser = async () => {

    const {applyName , applyEmail} = this.state;

    const params = new URLSearchParams();
    params.append('applyName',applyName);
    params.append('applyEmail', applyEmail);
    
    try{
      await axios.post('https://portal.yuansfer.yunkeguan.com/api/storeTestaccount/add',params)
      .then(response => response.data)
      .then(data =>{
        this.setState({
          code: data.ret_code,
          applyEmail:'',
          applyName:'',
          addSuccess: true,
          show: true
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
    const { addSuccess, error, applyEmail, applyName, code, show} = this.state
    return (<div>
      <div className='form-contain'>

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
          {
            
          }
        </Form>

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

      </div>

      {
        (show)
        ? (<div className='code-contain'>
            <Message 
              color='yellow'
              className="mess-contain"
              header='Please use the following credentials:'
              content={code}
            />
          </div>)
        : null
      }

    </div>);
  }
}
 
export default App;
