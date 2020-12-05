import React from 'react'
import { TrackList } from '../TrackList/TrackList'
import './Playlist.css'

export class Playlist extends React.Component {
    render () {
        return (
            <div className="Playlist">
                <input 
                    value={this.props.playListName}
                    onChange={this.props.onChange}
                />
                <TrackList 
                    tracks={this.props.playListTracks}
                    onRemove={this.props.onRemove}
                    isRemoval={true}
                />
                <button 
                    className="Playlist-save"
                    onClick = {this.props.onSave}
                >
                    SAVE TO SPOTIFY
                </button>
            </div>
        )
    }
}