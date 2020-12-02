import React from 'react'
import './App.css';
import {SearchBar} from '../SearchBar/SearchBar'
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      searchResults: [
        {'name': 'Tiny Dancer', 'artist': 'Elton John', 'album': 'Madman Across The Water', 'id': '001'},
        {'name': 'Tiny Dancer', 'artist': 'Tim McGraw', 'album': 'Love Story', 'id': '002'},
        {'name': 'Tiny Dancer', 'artist': 'The White Raven', 'album': 'Tiny Dancer', 'id': '003'}
      ],
      playListName: 'My Jamssss',
      playListTracks: [
        {'name': 'Tiny Dancer', 'artist': 'Elton John', 'album': 'Madman Across The Water', 'id': '001'},
        {'name': 'Tiny Dancer', 'artist': 'Tim McGraw', 'album': 'Love Story', 'id': '002'},
      ],
    }
    this.addTrack = this.addTrack.bind(this)
    this.removeTrack = this.removeTrack.bind(this)
  }

  addTrack (track) {
    if (this.state.playListTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    let newPlayList = this.state.playListTracks
    newPlayList.push(track)
    this.setState({playListTracks: newPlayList})
  }

  removeTrack (track) {
    const newPlayList = this.state.playListTracks.filter(savedTrack => savedTrack.id !== track.id)
    console.log(track, newPlayList)
    this.setState({playListTracks: newPlayList})
  }

  render () {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar 
            searchResults={this.state.searchResults}
          />
          <div className="App-playlist">
            <SearchResults 
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist 
              playListName={this.state.playListName}
              playListTracks={this.state.playListTracks}
              onRemove={this.removeTrack}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
