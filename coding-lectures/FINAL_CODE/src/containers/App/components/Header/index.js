import React, { Component }    from 'react'
import PropTypes               from 'prop-types'
import { withRouter }          from 'react-router-dom'
import AppBar                  from 'components/AppBar'
import Toolbar                 from '@material-ui/core/Toolbar'
import Typography              from '@material-ui/core/Typography'
import IconButton              from '@material-ui/core/IconButton'
import Menu                    from '@material-ui/core/Menu'
import MenuItem                from '@material-ui/core/MenuItem'
import AccountCircle           from '@material-ui/icons/AccountCircle'
import Navigation              from './components/Navigation'
import { styles }              from './styles.scss'

class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      anchorEl: null
    }
  }

  getMenu() {
    const { anchorEl } = this.state

    return (
      <div>
        <IconButton
          aria-haspopup="true"
          color="inherit"
          className="dropdown"
          aria-owns={anchorEl ? 'simple-menu' : null}
          onClick={this.handleClick}
        >
          <AccountCircle />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.close}
        >
          <MenuItem data-link="account">Sign In</MenuItem>
        </Menu>
      </div>
    )
  }

  goTo = (evt) => {
    const { history } = this.props
    const { link } = evt.currentTarget.dataset

    history.push(link)
    this.close()
  }

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget })
  }

  displayRecordingCount = () => {
    const { recordingCount } = this.props
    return recordingCount > 0 ? `${recordingCount} recordings` : '0 recordings'
  }

  close = () => {
    this.setState({ anchorEl: null })
  }


  render() {
    const menu = this.getMenu()

    return (
      <div className={styles}>
        <AppBar>
          <Toolbar>
            <Typography variant="title" color="inherit">
              { this.displayRecordingCount() }
            </Typography>
            {menu}
          </Toolbar>
        </AppBar>
        <Navigation />
      </div>
    )
  }
}


Header.propTypes = {
  history: PropTypes.shape({}).isRequired,
  recordingCount: PropTypes.number.isRequired
}

export default withRouter(Header)
