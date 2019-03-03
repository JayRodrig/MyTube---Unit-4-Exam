import React, {Component} from 'react';
import './video.css'

class Video extends Component {
    state = {
        videoURL: `https://www.youtube.com/embed/${this.props.match.params.id}?autoplay=1&fs=1&origin=http://localhost:3000`,
        comments: [],
    }

    clickHandler = e => {
        const buttonDiv = e.target.parentNode;
        const commentFormDiv = buttonDiv.parentNode;
        const userName = commentFormDiv.children[0].children[1].children[0].value;
        const userComment = commentFormDiv.children[1].children[1].children[0].value;
        commentFormDiv.children[0].children[1].children[0].value = '';
        commentFormDiv.children[1].children[1].children[0].value = '';
        
        if (!userName || !userComment) {
            alert('Must insert a name and a comment.');
            return;
        }
        
        const commentArr = this.state.comments;
        commentArr.unshift({
            userName: userName,
            comment: userComment,
        })
        this.setState({
            comments: commentArr,
        });
    }

    render() {
        return(
            <>
                <div className='container'>
                    <div className='row iframe-props'>
                        <div className='col col-12' style={{
                            'textAlign': 'center',
                            'marginBottom': '2%',
                            }}>
                            <iframe title='yt-video' type="text/html" width="800" height="500"
                                src={this.state.videoURL} frameBorder="0">
                            </iframe>
                        </div>
                    </div>
                    <div className='row commentform-row' style={{'justifyContent': 'center'}}>
                        <div className='col col-10 comment-form'>
                            <h4>Name</h4>
                            <div class="input-group mb-3">
                              <input type="text" class="form-control" aria-label="Sizing example input" 
                                aria-describedby="inputGroup-sizing-default" placeholder='Name...' />
                            </div>
                        </div>
                        <div className='col col-10 comment-form'>
                            <h4>Comment</h4>
                            <div class="input-group mb-3">
                              <input type="text" class="form-control" aria-label="Sizing example input" 
                                aria-describedby="inputGroup-sizing-default" placeholder='...' />
                            </div>
                        </div>
                        <div className='col col-10 submit-button' style={{'justifyContent': 'left'}}>
                            <button type="button" class="btn btn-primary btn-lg"
                                onClick={this.clickHandler}>Submit</button>
                        </div>
                    </div>
                    {
                        (this.state.comments.length < 1) ? 
                            <div className='row comment-row'>
                                <div className='col col-12' style={{'textAlign': 'center'}}>
                                        <h4>Be the first person to leave a comment on this video!</h4>
                                </div>
                            </div> : 
                            this.state.comments.map((e, i) => {
                                return(
                                    <div className='row' style={{
                                        'marginTop': '2%',
                                        'justifyContent': 'center',
                                        }} key={i}>
                                        <div className='col col-10'>
                                            <h5>{e.userName}</h5>
                                            <p>{e.comment}</p>
                                        </div>
                                    </div>
                                )   
                            })
                    }
                </div>
            </>
        )
    }
}

export default Video;