import { connect } from 'react-redux';
import { TopComponent } from './TopComponent';
import { TopState } from './topState';

const mapStateToProps = (state: TopState) => {
  return {
    entries: state.topState.entries,
  };
};

export const TopContainer = connect(mapStateToProps)(TopComponent);
