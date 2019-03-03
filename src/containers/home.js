import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './home.css';
import Axios from 'axios';

class Home extends Component {
    state = {
        didSearch: false,
        videos: [],
    }

    clickHandler = e => {
        const buttonDiv = e.target.parentNode;
        const inputDiv = buttonDiv.parentNode;
        const searchQuery = inputDiv.children[0].value;
        inputDiv.children[0].value = '';

        if (!searchQuery) {
            alert('Must input search term.');
            return;            
        }
        
        Axios({
            method: 'get',
            url: 'https://www.googleapis.com/youtube/v3/search',
            params: {
              part: 'snippet',
              maxResults: 8,
              videoDefinition: 'high',
              type: 'video',
              videoEmbeddable: 'true',
              key: 'AIzaSyBA0U8ir7qJWROY9zMNsiYgTsGFvRO5oD0',
              q: searchQuery,
              pageToken: ''
            }
          })
          .then(response => {
            return response.data.items;
          })
          .then(vids => {
            const vidArr = [];
            for (let video of vids) {
                vidArr.push({
                    vidName: video.snippet.title,
                    vidThumbnail: video.snippet.thumbnails.high.url,
                    videoId: video.id.videoId,
                });
            }
            
            this.setState({
                  didSearch: true,
                  videos: vidArr,
            })
          });
    }

    render(){
        return(
            <>
                {
                    (!this.state.didSearch && this.state.videos.length < 1) ? 
                        <div className='container'>
                            <div className='row'>
                                <div className='col col-12 searchbar-props'>
                                    <div className="input-group input-group-lg">
                                      <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
                                      <div className="input-group-append">
                                        <span className="input-group-text button-color" id="inputGroup-sizing-lg" 
                                            onClick={this.clickHandler}>Search</span>
                                      </div>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col col-12'>
                                    <div class="card">
                                        <div class="card-body initialcard-props">
                                            No search results yet, please submit a search term above.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> 
                        : <div className='container'>
                            <div className='row'>
                                <div className='col col-12 searchbar-props'>
                                    <div className="input-group input-group-lg">
                                      <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
                                      <div className="input-group-append">
                                        <span className="input-group-text bg-danger" id="inputGroup-sizing-lg" 
                                            onClick={this.clickHandler}>Search</span>
                                      </div>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                {
                                    this.state.videos.map((e, i) => {
                                        return(
                                            <div className='col col-6' 
                                                style={{'textAlign': 'center'}} key={i}>
                                                <Link to={`/video/${e.videoId}`}>
                                                    <img src={e.vidThumbnail} alt='vidThumbnail' />
                                                    <p style={{'marginTop': '2.5%'}}>{e.vidName}</p>
                                                </Link>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>

                }
            </>
        )
    }
}

export default Home;