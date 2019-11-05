import React, { Component } from 'react';
import './Weather.css';

import axios from 'axios';

class Weather extends Component {
    state = {
        cityName: '',
        tempArray: [],
        isLoading:true
    }

    componentDidMount(){
        const API_KEY = '9a67c4506583457f9fc4a2a8c7ff4866';
        window.navigator.geolocation.getCurrentPosition(
            position => {
        
            let lat = position.coords.latitude;
            let lon = position.coords.longitude
            
            axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${API_KEY}&days=3`)
            .then(res => {
                console.log(res.data.data)
                this.setState({ 
                    isLoading: false, 
                    cityName: res.data.city_name,
                    tempArray:res.data.data
                })
            },
            err=>{
                console.log(err);
            })
            }
            ,
            err => console.log(err)
        );
    }
    render() {
        return (
            <div className='container'>
                {
                    this.state.isLoading ? <div className='loading'>
                            <div className="spinner-border text-light" role="status">
                            <span className="sr-only">Loading...</span>
                            </div>
                        </div>

                  :<div className="card m-4 m-sm-5 ">
                    <div className='background d-none d-lg-flex'>
                        <div className='background-text'>
                            <p className='background-title'>Weather Checker</p>
                            <p className='background-para'>Find out weather and dress accordingly</p>
                        </div>
                    </div>
                    <div className="card-body">
                            { this.state.tempArray.map(tempItem => (
                            <div className="card-text">
                                <h5 className="card-title date">{tempItem.datetime}</h5>
                                <li>Temp:<span> {tempItem.temp}°</span></li>
                                <li>Wind Speed:<span> {tempItem.wind_spd}</span></li>
                            </div>
                                ))
                            }
                        <p className="card-text">
                            <small className="text-muted">Last updated 3 mins ago</small>
                        </p>
                    </div>
                    
                </div>
                }
            </div>
        )
    }
}

export default Weather;
