import React from 'react'
import { TrackList } from '../TrackList/TrackList'
import './Playlist.css'

export class Playlist extends React.Component {
    render () {
        return (
            <div className="Playlist">
                <input defaultValue={this.props.playListName}/>
                <TrackList 
                    tracks={this.props.playListTracks}
                    onRemove={this.props.onRemove}
                    isRemoval={true}
                />
                <button className="Playlist-save">SAVE TO SPOTIFY</button>
            </div>
        )
    }
}