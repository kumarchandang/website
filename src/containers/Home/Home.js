import React, { Component, PropTypes } from 'react';
import { IndexLink } from 'react-router';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import config from '../../../test/config';
import { getClientWidthFunc, getNavButtonFunc, changeLangFunc} from 'redux/modules/auth';
import { joinOpenFunc, joinCloseFunc, joinMsgFunc } from 'redux/modules/joinWarning';
import JoinwarningModal from '../../components/JoinWarn';

import currentDate from './utils/currentDate';
// import getLange from './utils/getLange';

import {ulFunc, divEnFunc, divZnFunc} from './utils/homeFunc';
import {homeUl, homePcUl, homeUlEn, homePcUlEn} from './utils/homeUl';

import Div1 from './components/Div1/Div1';
import Div2 from './components/Div2/Div2';
import Div3 from './components/Div3/Div3';
import Div4 from './components/Div4/Div4';
import Div5 from './components/Div5/Div5';
import Div6 from './components/Div6/Div6';
import Div7 from './components/Div7/Div7';

@connect(
    state => ({clientWidth: state.auth.clientWidth, navButton: state.auth.navButton, language: state.auth.language, titleState: state.auth.titleState,
        icoMsg: state.joinWarning.icoMsg, joinWarningModal: state.joinWarning.joinWarningModal, }),
    {getClientWidthFunc, getNavButtonFunc, changeLangFunc, joinOpenFunc, joinCloseFunc, joinMsgFunc})
export default class Home extends Component {
    static propTypes = {
      clientWidth: PropTypes.number,
      getClientWidthFunc: PropTypes.func,
      navButton: PropTypes.bool,
      getNavButtonFunc: PropTypes.func,
      changeLangFunc: PropTypes.func,
      language: PropTypes.string,

      titleState: PropTypes.string,

      icoMsg: PropTypes.string,
      joinCloseFunc: PropTypes.func,
      joinOpenFunc: PropTypes.func,
      joinWarningModal: PropTypes.bool,
      joinMsgFunc: PropTypes.func,
    };

    constructor(props) {
      super(props);
      this.state = {
        date: {
          days: '02', hours: '03', minutes: '01', seconds: '30',
          ref_days: 'DAY', ref_hours: 'HOUR', ref_minutes: 'MINUTE', ref_seconds: 'SECOND'
        },
      };
    }

    componentWillMount() {
      this.props.joinCloseFunc();
    }
    componentDidMount() {
      // this.interval = setInterval(() => this.tick(), 1000);

      const width = document.documentElement.clientWidth;
      this.props.getClientWidthFunc(width);
    }

    componentWillUnmount() {
      // clearInterval(this.interval);
      this.props.getNavButtonFunc(false);
    }

    onClick() {
      this.props.joinOpenFunc();
    }

    onChangeEn() {
      this.props.changeLangFunc('en');
    }

    onChangeZn() {
      this.props.changeLangFunc('zn');
    }

    getNav() {
      const navButton = this.props.navButton;
      this.props.getNavButtonFunc(!navButton);
    }

    showWarns = () => {
      this.props.joinOpenFunc();
    };
    closeWarns = () => {
      this.props.joinCloseFunc();
    };

    tick() {
      // difference of dates
      const difference = new Date(config.app.icoBar.time) - currentDate(+10);

      // basic math variables
      const _second = 1000;
      const _minute = _second * 60;
      const _hour = _minute * 60;
      const _day = _hour * 24;

      // calculate dates
      let days = Math.floor(difference / _day);
      let hours = Math.floor((difference % _day) / _hour);
      let minutes = Math.floor((difference % _hour) / _minute);
      let seconds = Math.floor((difference % _minute) / _second);

      // fix dates so that it will show two digets
      days = (String(days).length >= 2) ? days : '0' + days;
      hours = (String(hours).length >= 2) ? hours : '0' + hours;
      minutes = (String(minutes).length >= 2) ? minutes : '0' + minutes;
      seconds = (String(seconds).length >= 2) ? seconds : '0' + seconds;

      // based on the date change the refrence wording
      const refDays = (days === 1) ? 'DAY' : 'DAYS';
      const refHours = (hours === 1) ? 'HOUR' : 'HOURS';
      const refMinutes = (minutes === 1) ? 'MINUTE' : 'MINUTES';
      const refSeconds = (seconds === 1) ? 'SECOND' : 'SECONDS';

      this.setState(() => ({
        date: {
          days: days, hours: hours, minutes: minutes, seconds: seconds,
          ref_days: refDays, ref_hours: refHours, ref_minutes: refMinutes, ref_seconds: refSeconds,
        }
      }));
    }


  render() {
    const styles = require('./Home.scss');
    const logo = require('./image/logo.png');
    const logo2 = require('./image/icoLoho2.png');
    const nav = require('./image/nav1.png');
    const github = require('./image/github.png');
    const github2 = require('./image/icoLog4.png');
    // const soon = require('./image/soon.png');

    const Telegram = require('./image/Telegram.png');
    const Reddit = require('./image/Reddit.png');
    const Twitter = require('./image/Twitter.png');
    const Slack = require('./image/Slack.png');
    const Facebook = require('./image/Facebook.png');
    const {navButton, clientWidth, language, joinWarningModal} = this.props;

    const style = {display: 'none'};
    const style1 = {display: 'inline_block'};

    return (
        <div>
            <Helmet script={[{src: '/jquery/jquery.min.js'}]} link={[{rel: 'stylesheet', href: '/css/style4.css'}]}/>

            <div className={styles.homeDiv}>
                <div className={styles.homeHeader + ' container'}>
                    <IndexLink to="/"><img src={clientWidth > 320 ? logo : logo2} /></IndexLink>
                    <img src={nav} className={styles.navbarImg} id="homeNav" onClick={this.getNav.bind(this)}/>

                    { !navButton && clientWidth <= 1024 && language === 'zn' && homeUl(styles.homeHeaderUl, style)}
                    { !navButton && clientWidth <= 1024 && language === 'en' && homeUlEn(styles.homeHeaderUl, style)}
                    { navButton && clientWidth <= 1024 && language === 'zn' && homeUl(styles.homeHeaderUl, style1)}
                    { navButton && clientWidth <= 1024 && language === 'en' && homeUlEn(styles.homeHeaderUl, style1)}

                    {!navButton && clientWidth > 1024 && language === 'zn' &&
                    homePcUl(styles.homeHeaderUl, style1, styles.homeDropdown, styles['homeDropdown-content'])}
                    {!navButton && clientWidth > 1024 && language === 'en' &&
                    homePcUlEn(styles.homeHeaderUl, style1, styles.homeDropdown, styles['homeDropdown-content'])}

                    <a onClick={this.onClick.bind(this)} className={styles.navJoin}>Join us</a>
                    <div className={styles.homeGit}>
                        <a href="https://github.com/wanchain" target="_blank"><img src={clientWidth > 767 ? github : github2} /></a>
                        {/* <a className={styles.navGitaTit} onClick={() => {this.onChangeZn();}}>中文</a>{' | '} */}
                        {/* <a onClick={() => {this.onChangeEn();}}>English</a> */}
                    </div>
                </div>

                <div className="container">
                    <div className={styles.homeHeaderBodyDiv1}>
                        {language === 'zn' &&
                        <div className="rw-words rw-words-1" id={styles.scroll}>
                            {/* <h2>分布式未来"<small>银行</small>"</h2> */}
                            <h2>数字经济超级"<small>金融市场</small>"</h2>
                            <h2>区块链的"<small>互联网</small>"</h2>
                        </div>
                        }
                        {language === 'en' &&
                        <div className="rw-words rw-words-1" id={styles.scroll}>
                            <h2 className={clientWidth > 767 ? styles.indexH2size : ''}>
                                Uniting
                                <small className={clientWidth > 767 ? styles.indexH2size : ''}> the World's Blockchains</small>
                            </h2>
                            <h2 className={clientWidth > 767 ? styles.indexH2size : ''}>
                                A Global Financial Platform for<br/>
                                <small className={clientWidth > 767 ? styles.indexH2size : ''}> Private, Cross-Chain Smart Contracts</small>
                            </h2>
                        </div>
                        }
                        <p className={styles.bannerp}>
                            {language === 'zn' ? '连接不同数字资产，连接现在与未来' :
                                'Links different digital assets, connecting the present and future'}
                            <small>
                                {language === 'zn' ? '万维链旨在建立一个基础设施，以去中心化的方式完成不同区块链网络的连接及价值的交换' :
                                    'Wanchain seeks to create a new distributed financial infrastructure, connecting different blockchain networks together to exchange value.'}
                            </small>
                        </p>

                        {/* ul 众筹开始倒计时 */}
                        { config.app.icoBar.state === 'None' &&
                        ulFunc(styles.countdown, this.state.date.days, this.state.date.ref_days, this.state.date.hours, this.state.date.ref_hours,
                            this.state.date.minutes, this.state.date.ref_minutes, this.state.date.seconds, this.state.date.ref_seconds)
                        }
                        {/* <img src={soon}/> */}
                        {language === 'zn' ?
                            <div className={styles.bannerBtn}>
                                {/* <Link to="/" >众筹</Link> */}
                                <a href={config.app.files.WhitepaperCH} target="_blank">白皮书</a>
                                <a href={config.app.files.YellowpaperCH} target="_blank">黄皮书</a>
                                <a href={config.app.files.CommercialCH} target="_blank">商业白皮书</a>
                            </div>
                        :
                            <div className={styles.bannerBtn}>
                                {/* <Link to="/">ICO</Link> */}
                                <a href={config.app.files.WhitepaperEN} target="_blank">Whitepaper</a>
                                <a href={config.app.files.YellowpaperEN} target="_blank">Yellowpaper</a>
                                <a href={config.app.files.CommercialEN} target="_blank">Commercialpaper</a>
                            </div>
                        }
                        <div className={styles.bannerShare}>
                            <a href="https://t.me/WanchainANN" target="_blank"><img src={Telegram}/></a>
                            <a href="https://www.reddit.com/r/wanchain/" target="_blank"><img src={Reddit}/></a>
                            <a href="https://twitter.com/wanchain_org" target="_blank"><img src={Twitter}/></a>
                            <a href="https://wanchain.herokuapp.com/" target="_blank"><img src={Slack}/></a>
                            <a href="https://www.facebook.com/wanchainfoundation/" target="_blank"><img src={Facebook}/></a>
                            {/* <p>Join our Slack and Telegram for Crowdsale date Announcements</p> */}
                        </div>
                    </div>
                </div>

                {/* div 众筹结束倒计时 */}
                { config.app.icoBar.state === 'after' && language === 'zn' &&
                    divZnFunc(styles.ingBox, styles.ingTitle, styles.countdown, this.state.date.days, this.state.date.ref_days,
                        this.state.date.hours, this.state.date.ref_hours, this.state.date.minutes, this.state.date.ref_minutes,
                        this.state.date.seconds, this.state.date.ref_seconds, styles.ingDetal, styles.ingDetalSpan)}
                { config.app.icoBar.state === 'after' && language === 'en' &&
                    divEnFunc(styles.ingBox, styles.ingTitle, styles.countdown, this.state.date.days, this.state.date.ref_days,
                        this.state.date.hours, this.state.date.ref_hours, this.state.date.minutes, this.state.date.ref_minutes,
                        this.state.date.seconds, this.state.date.ref_seconds, styles.ingDetal, styles.ingDetalSpan)
                }

                <JoinwarningModal show={joinWarningModal} onHide={this.showWarns} onClose={this.closeWarns}/>
            </div>

            <Div1/>
            <Div2/>
            <Div3/>
            <Div4/>
            <Div5/>
            <Div6/>
            <Div7/>
        </div>
    );
  }
}
