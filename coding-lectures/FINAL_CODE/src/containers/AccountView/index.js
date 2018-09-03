import React, { Component } from 'react'
import EmptyState           from 'components/EmptyState'
import { styles }           from './styles.scss'

class AccountView extends Component {
  render() {
    return (
      <div className={styles}>
        <EmptyState message="User profile data goes here." />
      </div>
    )
  }
}

export default AccountView
