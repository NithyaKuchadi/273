import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import ComposeMessage from './ComposeMessage';
import { getInboxMessages } from '../../actions/inbox_actions';
import { Nav, Tab, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../Profile/ProfileOfBuyer.css';

class Inbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sentMsgs: [],
            inboxMsgs: [],
            hide_sentMsgs: true,
            hide_inboxMsgs: false
        }
    }

    async componentDidMount() {
        var email = null;
        email = localStorage.getItem('cookie3');
        await this.props.getInboxMessages(email);
        if (this.props.msgs.msgs) {
            let array = this.props.msgs.msgs;
            let arrayLength = array.length;

            let inbox = [];
            let sent = [];
            for (var i = 0; i < arrayLength; i++) {
                if (array[i].to === email) {
                    inbox.push(array[i]);
                }
                if (array[i].from === email) {
                   sent.push(array[i]);
                }
            }
           this.setState({ inboxMsgs: inbox, sentMsgs: sent });
        }

    }

    handleSelect = async (key) => {
        var email = null;
        email = localStorage.getItem('cookie3');
        if (key === "second") {
            await this.props.getInboxMessages(email);
            let array = this.props.msgs.msgs;
            let arrayLength = array.length;
           let sent = [];
            for (var i = 0; i < arrayLength; i++) {
                if (array[i].from === email) {
                    sent.push(array[i]);
                }
            }
            this.setState({ sentMsgs: sent });
        }
        if (key === "first") {
            await this.props.getInboxMessages(email);
            let array = this.props.msgs.msgs;
            let arrayLength = array.length;
           let inbox = [];
            for (var i = 0; i < arrayLength; i++) {
                if (array[i].to === email) {
                    inbox.push(array[i]);
                }
            }
            this.setState({ inboxMsgs: inbox });
        }
    }

    render() {
        let redirectVar = null;
        if (!localStorage.getItem('cookie2')) {
            redirectVar = <Redirect to="/login" />;
        }
        let InboxClick = (e) => {
            this.setState(
                {
                    hide_sentMsgs: true,
                    hide_inboxMsgs: false
                }
            )
        }
        let SentMsgsClick = (e) => {
            this.setState(
                {
                    hide_sentMsgs: false,
                    hide_inboxMsgs: true
                }
            )
        }

        let inboxDiv = this.state.inboxMsgs.map((record, index) => {
            let hrefLink = "#href" + index;
            let id = "href" + index;
            let str = record.timestamp;
            let time = str.substring(0, str.indexOf('('));

            return (

                <div class="card1">
                    <div class="card-header">
                       <div className="row">
                                <div className="col">
                                    From: {record.from}
                               <br/>
                                {time}
                                <br/>
                                {record.message}
                                </div>

                            </div>
                    </div>
                   
                </div>
            )
        });

        let sentboxDiv = this.state.sentMsgs.map((record, index) => {
            let hrefLink = "#href" + index;
            let id = "href" + index;
            let str = record.timestamp;
            let time = str.substring(0, str.indexOf('('));

            return (
                <div className="card1">
                    <div className="card-header">
                        <div className="row">
                            <div className="col float-left">
                                To: {record.to}
                                <br/>
                                {time}
                            </div>
                            <div className="col float-right">
                                {record.message}
                            </div>

                        </div>
                    </div>
                   
                </div>
            )
        });
        let navLogin = (
            <div>
                <ul className="nav navbar-right">
                    <li><Link to="/" onClick={this.handleLogout}><span className="glyphicon glyphicon-user"></span>Logout</Link></li>
                </ul>
                
            </div>
        );

        return (
            <div>
                {redirectVar}
                <div>
                    <div>
                        <nav className="navbar">
                            <div className="container-fluid">
                                <div className="navbar-header">
                                    <a className="navbar-brand" href="/Buyerlogin">GRUBHUB</a>
                                </div>
                                <div>
                                </div>
                                {navLogin}
                            </div>
                        </nav>

                        <div className="col-sm-3">
                            <h3 className="h2-id">Messaging</h3>
                            <ul>
                                <Row>
                                    <button className="btn btn-primary float-left" style={{ marginTop: "10px" }} data-toggle="modal" data-target="#composeMessage">
                                        <i className="fa fa-plus" aria-hidden="true" style={{ marginRight: "5px" }}>
                                        </i>Message</button>
                                    <ComposeMessage />
                                </Row>
                                <li onClick={InboxClick} className="li-id"><Link to="/Inbox">Inbox</Link></li>
                                <li onClick={SentMsgsClick} className="li-id"><Link to="/Inbox">Sent</Link></li>
                            </ul>

                        </div>
                        {!this.state.hide_inboxMsgs && <div className="col-sm-9">
                            <h3>Inbox Messages</h3>
                            {inboxDiv}
                        </div>}
                        {!this.state.hide_sentMsgs && <div className="col-sm-9">
                            <h3>Sent Messages</h3>
                            {sentboxDiv}
                        </div>}
                    </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = state => ({
    msgs: state.inbox.msgs
});

export default connect(mapStateToProps, { getInboxMessages })(Inbox);