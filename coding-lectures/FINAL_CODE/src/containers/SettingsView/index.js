import React, { Component } from 'react'
import EmptyState           from 'components/EmptyState'
import { styles }           from './styles.scss'

class SettingsView extends Component {
  render() {
    return (
      <div className={styles}>
        <EmptyState message="Settings data goes here." />
      </div>
    )
  }
}

export default SettingsView
