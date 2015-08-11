import React, {PropTypes} from 'react'; // eslint-disable-line no-unused-vars
import Image from '../Image';
import Button from '../Button';
import TextBox from '../TextBox';
import Extention from '../Extention';

class Clip extends React.Component {
  static propTypes = {
    clip: PropTypes.object
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      removeButton: 'cog js-remove hide',
      editButton: 'hide',
      titleInput: 'hide',
      atitle: '',
      editClick: false,
      editClikCount: 0
    };
  }

  onMouseEnter(e) {
    e.preventDefault();
    this.setState({
      removeButton: 'cog js-remove',
      editButton: this.state.editClick ? 'active' : ''
    });
  }

  onMouseLeave(e) {
    e.preventDefault();
    this.setState({
      removeButton: 'cog js-remove hide',
      editButton: this.state.editClick ? 'active' : 'hide'
    });
  }

  onEditButtonClick(e) {
    e.preventDefault();
    if(this.state.editClikCount === 0) {
      this.setState({
        editClikCount: 1,
        editClick: true,
        editButton: 'active',
        titleInput: 'block',
        atitle: 'hide'
      });
      React.findDOMNode(this.refs.titleInput).focus();
    } else {
      this.setState({
        editClikCount: 0,
        editClick: false,
        titleInput: 'hide',
        atitle: 'block'
      });
    }
  }

  onTitleChange(e) {
    e.preventDefault();
    console.log('titleChamge');
  }

  render () {
    let editButtonClass = 'js-edit-button btn btn-default btn-xs ' + this.state.editButton;
    let titleInput = 'edit-name ' + this.state.titleInput;
    let aTitle = 'item-link ' + this.state.atitle;
    let clip = this.props.clip;
    let id = clip._id; // eslint-disable-line no-underscore-dangle
    let thumb = '';

    if(clip.type === 'image') {
      thumb = <Image clip={clip} />;
    } else {
      thumb = <Extention clip={clip} />;
    }

    return (
      <div
        className="col-lg-3 col-xs-12 col-md-4 col-sm-6 item-row"
        key={id}
        onMouseEnter={this.onMouseEnter.bind(this)}
        onMouseLeave={this.onMouseLeave.bind(this)}
        ref="parentdiv">
        <div data-id={id} className="item js-item">
          <div className="item-overlay hide"></div>
          <span className={this.state.removeButton}>
            <span className="cog-inner remove">
              <span className="glyphicon glyphicon-remove-circle remove-circle"></span>
            </span>
          </span>
          <a href={clip.detailUrl} className="link">
            <div className="item-inner">
              {thumb}
            </div>
          </a>
          <div className="title-block">
            <span className="title">
              <a title={clip.originalName} href={clip.url} className={aTitle}>{clip.name}</a>
              <TextBox
                className={titleInput}
                type="text"
                placeholder={clip.name}
                ref="titleInput"
                onChange={this.onTitleChange.bind(this)} />
            </span>
            <div className="btn-group pull-right">
              <Button
                type="button"
                className={editButtonClass}
                onClick={this.onEditButtonClick.bind(this)}
                buttonFor=<span className="glyphicon glyphicon-pencil"></span> />
            </div>
            <div>
              <span className="small timeago-text">3 days ago</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Clip;