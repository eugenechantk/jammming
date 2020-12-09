import React from 'react'
import './App.css';
import {SearchBar} from '../SearchBar/SearchBar'
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      searchResults: [],
      playListName: 'My Jamssss',
      playListTracks: [],
    }
    this.addTrack = this.addTrack.bind(this)
    this.removeTrack = this.removeTrack.bind(this)
    this.updatePlaylistName = this.updatePlaylistName.bind(this)
    this.savePlaylist = this.savePlaylist.bind(this)
    this.search = this.search.bind(this)
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

  updatePlaylistName (e) {
    this.setState({playListName: e.target.value})
  }

  savePlaylist () {
    const trackURI = this.state.playListTracks.map(track => {
      return `spotify:track:${track.id}`
    })
    // console.log(trackURI)
    return trackURI
  }

  async search (term) {
    const searchTracks = await Spotify.search(term)
    // console.log(searchTracks)
    this.setState({searchResults: searchTracks})
  }

  render () {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar 
            searchResults={this.state.searchResults}
            onSearch={this.search}
          />
          <div className="App-playlist">
            <SearchResults 
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist 
              onChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
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
