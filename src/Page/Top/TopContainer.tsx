import { connect } from 'react-redux';
import { TopComponent, TopComponentProps } from './TopComponent';

export const TopContainer: React.ComponentClass<TopComponentProps> = connect()(TopComponent);
