import React from 'react';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
  }

  handleChange = (event) => {    
    this.setState({value: event.target.value});  
  }
  handleSubmit = (event) => {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <div>
      <form onSubmit={this.handleSubmit}>  
        <h1>SAMPLETEXT</h1>      
          <label>
        
          Enter a username:    
          <input 
          type="text" 
          value={this.state.value} 
          placeholder={'idk put something'}
          onChange={this.handleChange} />  

          Enter a password:
          <input
          type='text'
          value={this.state.value}
          placeholder={'passsword'}
          onChange={this.handleChange}/>

        </label>
        <input type="submit" value="send to paul" />
      </form>
      </div>
      
    );
  }
}

export default LoginPage;
