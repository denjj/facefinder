import React, {Component} from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin'
import Register from './components/Register/Register'
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const particlesSettings = {
  "particles": {
    "number": {
      "value": 160,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 1,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 1,
        "opacity_min": 0,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 4,
        "size_min": 0.3,
        "sync": false
      }
    },
    "line_linked": {
      "enable": false,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 1,
      "direction": "none",
      "random": true,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 600
      }
    }
  },
  "interactivity": {
    "detect_on": "window",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "bubble"
      },
      "onclick": {
        "enable": false,
        "mode": "repulse"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 250,
        "size": 0,
        "duration": 2,
        "opacity": 0,
        "speed": 3
      },
      "repulse": {
        "distance": 400,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
}

const app = new Clarifai.App({
  apiKey: '5bf6e76d0e974dc0b06a41f66805fdb2'
 });

const initialState = {
    input: '',
    imageUrl: '',
    box: {},
    route: 'signin',
    isSignedIn: false,
    user: {
      id: '',
      username: '',
      entries: 0,
      joined: ''
    }
}

class App extends Component {
  constructor(){
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        username: data.username,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  calculateFaceLocation = (data) => {
    const faceBoundary = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: faceBoundary.left_col * width,
      topRow: faceBoundary.top_row * height,
      rightCol: width - (faceBoundary.right_col * width),
      bottomRow: height - (faceBoundary.bottom_row * height)

    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.displayFaceBox({});
    this.setState({imageUrl: this.state.input});
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => {
        if (response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    this.setState({route: route});
    //console.log("route changed to", route);
    if (route === 'home') {
      //console.log("currently signed in")
      this.setState({isSignedIn: true});
    } else {
      //console.log("currently signed out")
      this.setState(initialState)
    }
  }

  switchRoute = () => {
    switch(this.state.route){
      case 'signin': return <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>;
      case 'register': return <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>;
      default: return(
        <>
          <Navigation onRouteChange={this.onRouteChange}/>
          <Logo />
          <Rank username={this.state.user.username} entries={this.state.user.entries} />
          <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
          <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
        </>
      )
    }
  }

  render(){
    return (
      <div className="App">
        <Particles className='particles' params={particlesSettings}/> 
        {this.switchRoute()}
      </div>
    );
  };

}

export default App;
